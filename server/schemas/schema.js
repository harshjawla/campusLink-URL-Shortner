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

const passwordSchema = new mongoose.Schema({
    username: { type: String, required: true },
    userID: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 300 }, // 5 minutes expiry
  });

const Password = new mongoose.model("Password", passwordSchema);

module.exports = { User, Files, Password };