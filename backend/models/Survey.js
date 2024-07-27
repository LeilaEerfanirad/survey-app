const mongoose = require("mongoose")
const SurveySchema = new mongoose.Schema({
    name: { type: String },

})

const Survey = mongoose.model('Survey', SurveySchema);
module.exports = Survey