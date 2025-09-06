const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey"; // use env var in production

// Middleware
app.use(cors());
app.use(express.json());

// ------------------ DB CONNECTION ------------------
mongoose.connect(
    'mongodb+srv://ramsai123:atlas%40123@quiz.6pchbrd.mongodb.net/?retryWrites=true&w=majority&appName=quiz',
    { useNewUrlParser: true, useUnifiedTopology: true }
)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// ------------------ MODELS ------------------
const questionSchema = new mongoose.Schema({
    category: String,
    difficulty: String,
    question: String,
    optionA: String,
    optionB: String,
    optionC: String,
    optionD: String,
    answer: String
});
const Question = mongoose.model('Question', questionSchema);

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    quizHistory: [
        {
            category: String,
            difficulty: String,
            score: Number,
            date: { type: Date, default: Date.now }
        }
    ]
});
const User = mongoose.model('User', userSchema);

// ------------------ AUTH ------------------
app.post('/auth/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ error: "Email already registered" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.json({ message: "User registered successfully" });
    } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ error: "Failed to register user" });
    }
});

app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "User not found" });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, username: user.username, isAdmin: user.isAdmin });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Failed to login" });
    }
});

// ------------------ MIDDLEWARE ------------------
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
};

// adminMiddleware - backend (server.js)

const adminMiddleware = async (req, res, next) => {
    try {
        console.log("🔑 req.userId:", req.userId); // debug
        const user = await User.findById(req.userId);
        console.log("👤 User found:", user?.username, "isAdmin:", user?.isAdmin);

        if (!user || !user.isAdmin) {
            console.log("⛔ Admin check failed!");
            return res.status(403).json({ error: "Access denied. Admins only." });
        }

        console.log("✅ Admin check passed!");
        next(); // Call next() only if admin passes
    } catch (err) {
        console.error("❌ Admin middleware error:", err);
        res.status(500).json({ error: "Server error" });
    }
};


// ------------------ QUIZ ROUTES ------------------

// Save quiz result
app.post('/quiz/save', authMiddleware, async (req, res) => {
    const { category, difficulty, score } = req.body;
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        user.quizHistory.push({ category, difficulty, score });
        await user.save();
        res.json({ message: "Quiz result saved" });
    } catch (err) {
        console.error("Save quiz error:", err);
        res.status(500).json({ error: "Failed to save quiz" });
    }
});

// Fetch quiz history
app.get('/quiz/history', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        res.json(user.quizHistory);
    } catch (err) {
        console.error("History error:", err);
        res.status(500).json({ error: "Failed to fetch quiz history" });
    }
});

// Leaderboard - Best score per user
app.get('/quiz/leaderboard', async (req, res) => {
    try {
        const { category, difficulty } = req.query;

        let matchStage = {};
        if (category) matchStage["quizHistory.category"] = category;
        if (difficulty) matchStage["quizHistory.difficulty"] = difficulty;

        const leaderboard = await User.aggregate([
            { $unwind: "$quizHistory" },
            { $match: matchStage },
            { $sort: { "quizHistory.score": -1 } },
            {
                $group: {
                    _id: "$username",
                    bestScore: { $first: "$quizHistory.score" },
                    category: { $first: "$quizHistory.category" },
                    difficulty: { $first: "$quizHistory.difficulty" },
                    date: { $first: "$quizHistory.date" }
                }
            },
            { $sort: { bestScore: -1 } },
            { $limit: 10 },
            {
                $project: {
                    username: "$_id",
                    score: "$bestScore",
                    category: 1,
                    difficulty: 1,
                    date: 1
                }
            }
        ]);

        res.json(leaderboard);
    } catch (err) {
        console.error("Leaderboard error:", err);
        res.status(500).json({ error: "Failed to fetch leaderboard" });
    }
});

// ------------------ ADMIN ROUTES ------------------

// Add new quiz question (admin only)
app.post('/api/questions/add', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        console.log("📥 Add question request body:", req.body);

        const { category, difficulty, question, optionA, optionB, optionC, optionD, answer } = req.body;

        // Validate that required fields exist (optional step, but recommended)
        if (!category || !difficulty || !question || !optionA || !optionB || !optionC || !optionD || !answer) {
            return res.status(400).json({ error: "All question fields must be filled" });
        }

        const newQuestion = new Question({ category, difficulty, question, optionA, optionB, optionC, optionD, answer });
        await newQuestion.save();

        console.log("✅ Question saved to DB:", newQuestion);
        res.json({ message: "Question added successfully!" });
    } catch (err) {
        console.error("❌ Add question error:", err);
        res.status(500).json({ error: "Failed to add question" });
    }
});



// ------------------ QUESTIONS API ------------------
app.get('/api/meta', async (req, res) => {
    try {
        const categories = await Question.distinct('category');
        const difficulties = await Question.distinct('difficulty');
        res.json({ categories, difficulties });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch quiz metadata' });
    }
});

app.get('/api/questions', async (req, res) => {
    try {
        const { category, difficulty } = req.query;
        let query = {};
        if (category) query.category = category;
        if (difficulty) query.difficulty = difficulty;

        const questions = await Question.find(query);
        res.json(questions);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch questions' });
    }
});

// ------------------ HEALTH CHECK ------------------
app.get('/ping', (req, res) => res.send('pong'));

// ------------------ START SERVER ------------------
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
