const mongoose = require("mongoose")
const ChoiceSchema = new mongoose.Schema({
    name: { type: String },
})

const Choice = mongoose.model('Choice', ChoiceSchema);
module.exports = Choice