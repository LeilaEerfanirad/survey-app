const mongoose = require("mongoose")
const SurveySchema = new mongoose.Schema({
    name: { type: String },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    scops: [
        {
            buildingId: { type: String, required: true },
            scopIds: { type: [String], required: true }
        }
    ]
})

const Survey = mongoose.model('Survey', SurveySchema);
module.exports = Survey