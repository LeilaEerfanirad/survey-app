const mongoose = require("mongoose")
const QuestionSchema = new mongoose.Schema({
    title: { type: String },
    type: { type: Number },
    order: { type: Number },
    enter_text: { type: String },
    answer_type: { type: Number },
    choices: [{ type: mongoose.Schema.Types.ObjectId, ref: "Choice" }]
})

const Question = mongoose.model('Question', QuestionSchema);
module.exports = Question