require("dotenv").config({ path: "./mongo.env" });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const OpenAI = require('openai');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey"; // use env var in production

// Middleware
app.use(cors());
app.use(express.json());

// ------------------ DB CONNECTION ------------------
mongoose.connect(
    process.env.MONGO_URI,
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

app.post('/api/extract-text', upload.single('file'), async (req, res) => {
    try {
        let text = req.body.text;

        if (req.file) {
            console.log("📄 Received PDF:", req.file.originalname, req.file.mimetype, req.file.size, "bytes");
            const data = await pdfParse(req.file.buffer);
            text = data.text;
        }

        if (!text || text.trim().length === 0) {
            return res.status(400).json({ error: "No text could be extracted from the PDF" });
        }

        res.json({ text });
    } catch (err) {
        console.error("❌ Text extraction error:", err);
        res.status(500).json({ error: "Failed to extract text" });
    }
});





app.post('/api/generate-quiz', async (req, res) => {
    try {
        const { text, category = "AI Generated", difficulty = "medium" } = req.body;

        const response = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a quiz generator. Reply ONLY with valid JSON array. No markdown, no ```." },
                { role: "user", content: `Generate 10 MCQs from this text:\n${text}\nFormat:\n[{"question":"...","options":["A","B","C","D"],"answer":"..."}]` }
            ],
            temperature: 0.7
        });

        let raw = response.choices[0].message.content.trim();

        // Remove code block wrappers if AI still adds them
        raw = raw.replace(/```json/gi, "").replace(/```/g, "");

        let questions;
        try {
            questions = JSON.parse(raw);
        } catch (e) {
            console.error("❌ Failed to parse AI response:", raw);
            return res.status(500).json({ error: "AI did not return valid quiz JSON" });
        }

        // Map into schema
        questions = questions.map(q => {
            const options = q.options || [q.optionA, q.optionB, q.optionC, q.optionD];

            // Normalize answer: match it to actual option text
            let correctAnswer = q.answer;
            if (["A", "B", "C", "D"].includes(correctAnswer.toUpperCase())) {
                const index = { A: 0, B: 1, C: 2, D: 3 }[correctAnswer.toUpperCase()];
                correctAnswer = options[index];
            }

            return {
                category,
                difficulty,
                question: q.question,
                optionA: options[0],
                optionB: options[1],
                optionC: options[2],
                optionD: options[3],
                answer: correctAnswer  // ✅ always actual text
            };
        });


        res.json(questions);
    } catch (err) {
        console.error("AI generation error:", err);
        res.status(500).json({ error: "Failed to generate quiz" });
    }
});



// In server.js

// ------------------ PERFORMANCE ANALYSIS (AI) ------------------
app.post('/api/performance-analysis', async (req, res) => {
    const { score, total, answers } = req.body;

    if (!answers || answers.length === 0) {
        return res.status(400).json({ error: 'No answers provided for analysis.' });
    }

    // 1. Format the user's answers for the AI prompt
    const formattedAnswers = answers.map((ans, index) => {
        const result = (ans.selected && ans.selected.toLowerCase() === ans.correct.toLowerCase()) ? 'Correct' : 'Incorrect';
        return `${index + 1}. Question: "${ans.question}"
   - Your Answer: "${ans.selected || 'Skipped'}"
   - Correct Answer: "${ans.correct}"
   - Result: ${result}`;
    }).join('\n\n');

    // 2. The detailed "expert technical assessor" prompt
    const prompt = `
        You are an expert technical assessor writing a concise performance report based on a user's quiz results.
        The user's final score was ${score} out of ${total}.
        Here is the question-by-question breakdown:
        ${formattedAnswers}

        Analyze this performance and generate a report in a strict JSON format. The tone should be professional and analytical.

        The JSON object MUST have the following three keys:
        1. "strengths": A single, well-written paragraph (as a string) summarizing the user's strong points. Mention specific concepts or topics they answered correctly. For example: "The candidate demonstrates a good understanding of fundamental data structures, correctly answering questions on Hash Tables, Stacks, and the concept of FIFO/LIFO."
        
        2. "improvements": A single, well-written paragraph (as a string) summarizing the user's weak points. Mention specific concepts they struggled with. For example: "The candidate struggles with some aspects of sorting algorithms, especially the time complexities and specific characteristics of algorithms like Insertion Sort and Quick Sort."

        3. "recommendedTopics": An array of 2-3 JSON objects. Each object must have a "title" (a string for the topic name) and a "description" (a string explaining why the topic is recommended and what to focus on). For example: 
           [
             {
               "title": "Sorting Algorithms",
               "description": "The candidate showed confusion on the properties and time complexities of sorting algorithms, specifically Insertion Sort and Quick Sort. A deeper understanding will improve their ability to choose the right algorithm for different situations."
             },
             {
               "title": "Time Complexity Analysis",
               "description": "The candidate had some issues with time complexity. Improving this will help them understand the efficiency of different algorithms."
             }
           ]

        Your entire response must be ONLY the valid JSON object, with no other text.
    `;

    try {
        // 3. Call the OpenAI API and enforce JSON output
        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" },
        });

        const rawResponse = completion.choices[0].message.content;
        const analysis = JSON.parse(rawResponse);

        // 4. Process the detailed 'recommendedTopics' array to add search links
        const recommendedTopicsWithLinks = analysis.recommendedTopics.map(topic => {
            return {
                title: topic.title,
                description: topic.description,
                link: 'https://www.google.com/search?q=' + encodeURIComponent(topic.title)
            };
        });

        // 5. Send the final, structured response to the frontend
        res.json({
            strengths: analysis.strengths,
            improvements: analysis.improvements,
            recommendedTopics: recommendedTopicsWithLinks,
        });

    } catch (error) {
        console.error("Error in performance analysis route:", error);
        res.status(500).json({ error: "Failed to generate performance analysis." });
    }
});




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
