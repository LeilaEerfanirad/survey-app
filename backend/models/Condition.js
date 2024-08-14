const mongoose = require("mongoose")
const ConditionSchema = new mongoose.Schema({
    boolean_operator: { type: String },
    logical_operator: { type: String },
    first_operand: { type: String },
    second_operand: { type: String },
})

const Condition = mongoose.model('Condition', ConditionSchema);
module.exports = Condition