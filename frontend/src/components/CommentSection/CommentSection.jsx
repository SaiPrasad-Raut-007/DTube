import './CommentSection.css';

const DUMMY_COMMENTS = [
    { id: "c1", user_name: "ReactNinja22", user_pic: "https://picsum.photos/seed/c1/40/40", created_at: "2 hours ago", comment: "This is exactly what I was looking for! Your explanation of CSS Grid saved me so much headache.", likes: 45, dislikes: 0 },
    { id: "c2", user_name: "FrontendMaster", user_pic: "https://picsum.photos/seed/c2/40/40", created_at: "5 hours ago", comment: "Great tutorial, but could you do a follow-up on how to implement the search bar functionality?", likes: 12, dislikes: 0 },
    { id: "c3", user_name: "DesignSystemGuru", user_pic: "https://picsum.photos/seed/c3/40/40", created_at: "1 day ago", comment: "The dark mode styling is completely on point. Looks exactly like the real thing.", likes: 89, dislikes: 0 },
    { id: "c4", user_name: "JuniorDevLife", user_pic: "https://picsum.photos/seed/c4/40/40", created_at: "1 day ago", comment: "I paused the video 50 times trying to type all this out 😂 Worth it though!", likes: 230, dislikes: 0 },
    { id: "c5", user_name: "CodeWithSai_Fan", user_pic: "https://picsum.photos/seed/c5/40/40", created_at: "2 days ago", comment: "First! Love the content as always.", likes: 4, dislikes: 0 },
    { id: "c6", user_name: "BackendBros", user_pic: "https://picsum.photos/seed/c6/40/40", created_at: "3 days ago", comment: "Now connect this to a Node.js backend and MongoDB database. That would be an epic project.", likes: 56, dislikes: 0 },
    { id: "c7", user_name: "CSS_Hater", user_pic: "https://picsum.photos/seed/c7/40/40", created_at: "4 days ago", comment: "Why flexbox instead of grid for the sidebar?", likes: 2, dislikes: 0 },
    { id: "c8", user_name: "WebDevJourney", user_pic: "https://picsum.photos/seed/c8/40/40", created_at: "1 week ago", comment: "The way you broke down component splitting really helped it click for me. Thank you!", likes: 15, dislikes: 0 },
    { id: "c9", user_name: "BugHunter", user_pic: "https://picsum.photos/seed/c9/40/40", created_at: "1 week ago", comment: "At 14:20 you forgot a closing div tag, just a heads up for anyone watching!", likes: 104, dislikes: 0 },
    { id: "c10", user_name: "UIUX_Daily", user_pic: "https://picsum.photos/seed/c10/40/40", created_at: "2 weeks ago", comment: "Beautiful UI. The spacing and typography choices are very satisfying.", likes: 33, dislikes: 0 }
];

export default function CommentSection() {
    return (
        <div className="comment-section">
            <h3 className="comment-count">{DUMMY_COMMENTS.length} Comments</h3>
            
            {DUMMY_COMMENTS.map((comment) => (
                <CommentCard
                    key={comment.id}
                    user_name={comment.user_name}
                    user_pic={comment.user_pic}
                    created_at={comment.created_at}
                    comment={comment.comment}
                    likes={comment.likes}
                    dislikes={comment.dislikes}
                />
            ))}
        </div>
    );
}

const CommentCard = ({ user_name, user_pic, created_at, comment, likes, dislikes }) => {
    return (
        <div className="comment-card">
            <img className="comment-user-pic" src={user_pic} alt={user_name} />
            
            <div className="comment-content">
                <div className="comment-header-info">
                    <span className="comment-user-name">@{user_name}</span>
                    <span className="comment-date">{created_at}</span>
                </div>
                
                <p className="comment-text">{comment}</p>
                
                <div className="comment-actions">
                    <button className="comment-action-btn">
                        <span className="material-symbols-rounded">thumb_up</span>
                        {/* Only show the number if there are likes */}
                        {likes > 0 && <span className="comment-like-count">{likes}</span>}
                    </button>
                    <button className="comment-action-btn">
                        <span className="material-symbols-rounded">thumb_down</span>
                    </button>
                    <button className="comment-reply-btn">Reply</button>
                </div>
            </div>
        </div>
    );
}