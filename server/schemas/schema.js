const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const User = new mongoose.model("User", userSchema);

const fileSchema = new mongoose.Schema({
    title: String,
    username: String,
    original_link: String,
    short_url: {
        type: String,
        required: true,
    },
    linkID: {
        type: String,
        required: true,
    },
    clicks: {
        type: Number,
        default: 0,
    }
});

const Files = new mongoose.model("Files", fileSchema);

module.exports = { User, Files };