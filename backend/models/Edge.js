const mongoose = require("mongoose")
const EdgeSchema = new mongoose.Schema({
    destination: { type: String },
    conditions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Condition" }],
})

const Edge = mongoose.model('Edge', EdgeSchema);
module.exports = Edge