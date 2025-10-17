// models/QuizSession.js
const mongoose = require('mongoose');

const quizSessionSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true }, // join code like ABC123
    creator: { type: String, required: true },
    quizData: {
        type: Object, // store quiz questions, category, difficulty, etc.
        required: true
    },
    participants: [
        {
            username: { type: String },
            score: { type: Number },
            finishedAt: { type: Date, default: Date.now }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('QuizSession', quizSessionSchema);
