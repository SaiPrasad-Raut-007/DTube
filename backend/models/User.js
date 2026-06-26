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
        default: "https://images.unsplash.com/photo-1607453361165-c629a0d1839d?q=80&w=2548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
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