const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
        username: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        // isAdmin: { type: Boolean, default: false, required: true},
        // phone: { type: Number },
        // access_token: { type: String, required: true },
        // refresh_token: { type: String, required: true }
    },
    {
        timestamps: true
    }
);
const User = mongoose.model("User", userSchema)
module.exports = User;