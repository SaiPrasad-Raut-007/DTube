import mongoose from "mongoose";

// Comment Schema
const commentSchema = new mongoose.Schema({
text: { 
        type: String, 
        required: true 
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    video_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Video', 
        required: true 
    },

    parent_comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment', 
        default: null   
    },
    reply_count: {
        type: Number,
        default: 0      
    },

    likes: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }]
}, { 
    timestamps: true 
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;