import mongoose, { mongo } from "mongoose";

// User Schema
const userSchema = new mongoose.Schema({
    // Basic Auth Information
    username: {
        type: String,
        required: true
    },
    user_handle: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User'
    },

    // Channel Profile Information
    user_bio: {
        type: String,
        default: "Welcome to my channel!"
    },
    user_banner: {
        type: String,
        default: "" 
    },
    user_pfp: {
        type: String,
        default: ""
    },

    // Other required Data
    subscribed_to: [{type: mongoose.Schema.Types.ObjectId, ref:'User'}],
    subscribers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    watch_history: [{type: mongoose.Schema.Types.ObjectId, ref: 'Video'}],
    liked_videos: [{type: mongoose.Schema.Types.ObjectId, ref: "Video"}],
}, {timestamps: true});

const User = mongoose.model("User", userSchema);
export default User;