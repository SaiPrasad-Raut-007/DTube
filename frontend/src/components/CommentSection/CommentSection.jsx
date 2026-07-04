import toast from "react-hot-toast";
import "./CommentSection.css";
import { useState, useEffect } from "react";
import formatTimeAgo from "../../FormatTimeAgo";

export default function CommentSection({ userData, videoId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comments/fetch/${videoId}`);
        if (response.ok) {
          const data = await response.json();
          setComments(data);
        }
      } catch (error) {
        console.error(error);
        toast.error("Error fetching comments. Please reload the page.");
      }
    };
    if (videoId) {
      fetchComments();
    }
  }, [videoId]);

  const handleCreateComment = async (text) => {
    try {
      const response = await fetch(`/api/comments/create/${videoId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("dtube_token")}`,
        },
        body: JSON.stringify({ text }),
      });
      if (response.ok) {
        const newComment = await response.json();
        setComments([newComment, ...comments]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error creating comment. Please try again.");
    }
  };

  const handleLike = async (commentId) => {
    try {
      const response = await fetch(`/api/comments/like/${commentId}`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${localStorage.getItem("dtube_token")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setComments(
          comments.map((c) =>
            c._id === commentId
              ? { ...c, likes: Array.from({ length: data.likesCount }) }
              : c,
          ),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReply = async (commentId, text) => {
    try {
      const response = await fetch(`/api/comments/create/${videoId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("dtube_token")}`,
        },
        body: JSON.stringify({ text, parent_comment_id: commentId }),
      });

      if (response.ok) {
        const responseData = await fetch(`/api/comments/fetch/${videoId}`);
        const data = await responseData.json();
        setComments(data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error creating reply. Please try again.");
    }
  };

  return (
    <div className="comment-section">
      <CommentInput
        userPfp={userData?.user_pfp}
        onSubmit={handleCreateComment}
      />
      <h3 className="comment-count">{comments.length} Comments</h3>

      {comments.map((comment) => (
        <CommentCard
          key={comment._id}
          commentData={comment}
          onLike={handleLike}
          onReply={handleReply}
          userData={userData}
        />
      ))}
    </div>
  );
}

const CommentInput = ({ userPfp, onSubmit }) => {
  const [commentText, setCommentText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (commentText.trim()) {
      onSubmit(commentText);
      setCommentText("");
    }
  };

  return (
    <div className="comment-input-container">
      <div className="comment-avatar">
        {userPfp ? <img src={userPfp} alt="Current User" /> : <span>U</span>}
      </div>

      <form className="comment-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="comment-text-input"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />

        <div className="comment-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => setCommentText("")}
            disabled={!commentText}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="submit-btn"
            disabled={!commentText.trim()}
          >
            Comment
          </button>
        </div>
      </form>
    </div>
  );
};

const CommentCard = ({ commentData, onLike, onReply, userData }) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replies, setReplies] = useState([]);
  const [showReplies, setShowReplies] = useState(false);

  const handleFetchReplies = async () => {
    if (showReplies) {
      setShowReplies(false);
      return;
    }

    try {
      const response = await fetch(`/api/comments/replies/${commentData._id}`);
      if (response.ok) {
        const data = await response.json();
        setReplies(data);
        setShowReplies(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLikeReply = async (replyId) => {
    try {
      const response = await fetch(`/api/comments/like/${replyId}`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${localStorage.getItem("dtube_token")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setReplies(
          replies.map((r) =>
            r._id === replyId
              ? { ...r, likes: Array.from({ length: data.likesCount }) }
              : r,
          ),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReplySubmit = async (text) => {
    await onReply(commentData._id, text);
    setShowReplyInput(false);

    const response = await fetch(`/api/comments/replies/${commentData._id}`);
    if (response.ok) {
      const data = await response.json();
      setReplies(data);
      setShowReplies(true);
    }
  };

  return (
    <div className="comment-card-wrapper">
      <div className="comment-card">
        <img
          className="comment-user-pic"
          src={commentData?.author?.user_pfp}
          alt={commentData?.author?.username}
        />

        <div className="comment-content">
          <div className="comment-header-info">
            <span className="comment-user-name">
              @{commentData?.author?.username}
            </span>
            <span className="comment-date">
              {formatTimeAgo(commentData?.createdAt)}
            </span>
          </div>

          <p className="comment-text">{commentData.text}</p>

          <div className="comment-actions">
            <button
              className="comment-action-btn"
              onClick={() => onLike(commentData._id)}
            >
              <span className="material-symbols-rounded">thumb_up</span>
              {commentData.likes?.length > 0 && (
                <span className="comment-like-count">
                  {commentData.likes.length}
                </span>
              )}
            </button>
            <button className="comment-action-btn">
              <span className="material-symbols-rounded">thumb_down</span>
            </button>
            <button
              className="comment-reply-btn"
              onClick={() => setShowReplyInput(!showReplyInput)}
            >
              Reply
            </button>

            {showReplyInput && (
              <CommentInput
                userPfp={userData?.user_pfp}
                onSubmit={handleReplySubmit}
              />
            )}

            {commentData.reply_count > 0 && (
              <button
                className="toggle-replies-btn"
                onClick={handleFetchReplies}
              >
                {showReplies
                  ? "Hide replies"
                  : `View ${commentData.reply_count} replies`}
              </button>
            )}
          </div>
        </div>
      </div>

      {showReplies && (
        <div className="replies-container">
          {replies.map((reply) => (
            <div key={reply._id} className="comment-card reply-card">
              <img
                className="comment-user-pic"
                src={reply?.author?.user_pfp}
                alt={reply?.author?.username}
              />

              <div className="comment-content">
                <div className="comment-header-info">
                  <span className="comment-user-name">
                    @{reply?.author?.username}
                  </span>
                  <span className="comment-date">
                    {formatTimeAgo(reply?.createdAt)}
                  </span>
                </div>

                <p className="comment-text">{reply.text}</p>

                <div className="comment-actions">
                  <button
                    className="comment-action-btn"
                    onClick={() => handleLikeReply(reply._id)}
                  >
                    <span className="material-symbols-rounded">thumb_up</span>
                    {reply.likes?.length > 0 && (
                      <span className="comment-like-count">
                        {reply.likes.length}
                      </span>
                    )}
                  </button>
                  <button className="comment-action-btn">
                    <span className="material-symbols-rounded">thumb_down</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
