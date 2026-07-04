import Comment from '../models/Comment.js';

export const createComment = async (req, res) => {
    try {
        const { text, parent_comment_id } = req.body;
        const { videoId } = req.params;
        const userId = req.user.id;

        if (!text) {
            return res.status(400).json({ error: "Comment text is required." });
        }

        const newComment = new Comment({
            text, 
            author: userId,
            parent_comment_id: parent_comment_id,
            video_id: videoId,
        });

        await newComment.save();

        if (parent_comment_id) {
            await Comment.findByIdAndUpdate(parent_comment_id, {
                $inc: { reply_count: 1 }
            });
        }

        await newComment.populate("author", "username user_pfp");
        res.status(201).json(newComment);

    } catch (error) {
        res.status(500).json({error: "Server error creating comment."})
    }
}

export const fetchAllComments = async (req, res) => {
    try {
        const {videoId} = req.params;
        const comments = await Comment.find({ video_id: videoId, parent_comment_id: null })
            .populate("author", "username user_pfp")
            .sort({ createdAt: -1 });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({error: "Server error fetching comments."})
    }
}

export const likeComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { userId } = req.user.id;
        
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        const hasLiked = comment.likes.includes(userId);

        if (hasLiked) {
            comment.likes.pull(userId);
        } else {
            comment.likes.push(userId);
        }

        await comment.save();

        res.status(200).json({ 
            isLiked: !hasLiked,
            likesCount: comment.likes.length
        });
    } catch (error) {
        res.status(500).json({error: "Server error liking comment."})
    }
}

export const fetchReplies = async (req, res) => {
    try {
        const { commentId } = req.params; 

        const replies = await Comment.find({ 
            parent_comment_id: commentId 
        })
        .populate("author", "username user_pfp") 
        .sort({ createdAt: 1 }); 

        res.status(200).json(replies);
    } catch (error) {
        console.error("Error fetching replies:", error);
        res.status(500).json({ error: "Server error fetching replies" });
    }
};