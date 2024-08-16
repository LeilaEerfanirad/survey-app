const mongoose = require("mongoose");

const ConditionSchema = new mongoose.Schema({
    boolean_operator: { type: Number },
    logical_operator: { type: Number },
    first_operand: { type: mongoose.Schema.Types.ObjectId },
    second_operand: { type: mongoose.Schema.Types.ObjectId },
});

const Condition = mongoose.model('Condition', ConditionSchema);
module.exports = Condition;
