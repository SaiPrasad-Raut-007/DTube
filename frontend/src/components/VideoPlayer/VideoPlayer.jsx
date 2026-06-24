import './VideoPlayer.css'

export default function VideoPlayer() {
    const video_title = "Building a Complete YouTube Clone in React & CSS";
    const creator_name = "Code with Sai";
    const creator_pic = "https://picsum.photos/seed/face1/48/48";
    const creator_subs = "1.05M subscribers";
    const video_description = "In this video, we are building a fully functional YouTube clone using React, CSS Grid, and Flexbox. We will cover components, state management, and responsive design techniques. Drop a like if you enjoy!";
    const thumbnail_placeholder = "https://picsum.photos/seed/mainvid/1280/720";

    return (
        <div className="video-player-container">
            <img className="video-placeholder-img" src={thumbnail_placeholder} alt="video placeholder" />
            
            <div className="video-player-info">
                <h3 className="video-title">{video_title}</h3>
                
                <div className="video-primary-details">
                    <div className="creator-details-section">
                        <img className="creator-pic" src={creator_pic} alt={creator_name} />
                        <div className="creator-text-info">
                            <h4 className="video-creator-name">{creator_name}</h4>
                            <h5 className="video-creator-subs">{creator_subs}</h5>
                        </div>
                        <button className="subscribe-button">Subscribe</button>
                    </div>

                    <div className="video-actions-section">
                        <div className="action-pill like-dislike-pill">
                            <button className="action-button like-button">
                                <span className="material-symbols-rounded">thumb_up</span>
                                <strong>12K</strong>
                            </button>
                            <div className="divider"></div>
                            <button className="action-button dislike-button">
                                <span className="material-symbols-rounded">thumb_down</span>
                            </button>
                        </div>
                        
                        <div className="action-pill">
                            <button className="action-button share-button">
                                <span className="material-symbols-rounded">share</span>
                                <strong>Share</strong>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="video-description-box">
                    <p>{video_description}</p>
                </div>
            </div>

            {/* <CommentSection /> */}
        </div>
    );
}