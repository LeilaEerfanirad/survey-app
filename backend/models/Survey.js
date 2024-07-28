const mongoose = require("mongoose")
const SurveySchema = new mongoose.Schema({
    name: { type: String },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }]
})

const Survey = mongoose.model('Survey', SurveySchema);
module.exports = Survey