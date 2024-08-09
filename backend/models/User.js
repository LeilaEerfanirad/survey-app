const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    username: { type: String },
    password: { type: String },
    surveies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Survey" }],

})

const User = mongoose.model('User', UserSchema);
module.exports = User