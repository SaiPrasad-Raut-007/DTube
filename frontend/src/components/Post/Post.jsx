import { useState } from 'react';
import './Post.css';

export default function Post({ 
    creator_name, 
    creator_pic, 
    created_at, 
    message, 
    post_imgs = [], 
    likes, 
    comments_count 
}) {
    const [currentImgIndex, setCurrentImgIndex] = useState(0);

    const nextImg = () => {
        if (currentImgIndex < post_imgs.length - 1) {
            setCurrentImgIndex(prev => prev + 1);
        }
    };

    const prevImg = () => {
        if (currentImgIndex > 0) {
            setCurrentImgIndex(prev => prev - 1);
        }
    };

    return (
        <div className="post-card">
            <div className="post-header">
                <img className="post-creator-pic" src={creator_pic} alt={creator_name} />
                <div className="post-header-info">
                    <span className="post-creator-name">{creator_name}</span>
                    <span className="post-date">{created_at}</span>
                </div>
                <button className="post-options-btn">
                    <span className="material-symbols-rounded">more_vert</span>
                </button>
            </div>

            <div className="post-body">
                <p className="post-message">{message}</p>
                
                {post_imgs.length > 0 && (
                    <div className="post-media-container">
                        {post_imgs.length > 1 && currentImgIndex > 0 && (
                            <button className="post-media-nav left" onClick={prevImg}>
                                <span className="material-symbols-rounded">chevron_left</span>
                            </button>
                        )}
                        
                        <img 
                            className="post-media-img" 
                            src={post_imgs[currentImgIndex]} 
                            alt="Post content" 
                        />
                        
                        {post_imgs.length > 1 && currentImgIndex < post_imgs.length - 1 && (
                            <button className="post-media-nav right" onClick={nextImg}>
                                <span className="material-symbols-rounded">chevron_right</span>
                            </button>
                        )}
                    </div>
                )}
            </div>

            <div className="post-footer">
                <button className="post-action-btn">
                    <span className="material-symbols-rounded">thumb_up</span>
                    {likes && <span className="action-count">{likes}</span>}
                </button>
                
                <button className="post-action-btn">
                    <span className="material-symbols-rounded">thumb_down</span>
                </button>
                
                <button className="post-action-btn">
                    <span className="material-symbols-rounded">share</span>
                </button>

                <button className="post-action-btn">
                    <span className="material-symbols-rounded">chat</span>
                    {comments_count && <span className="action-count">{comments_count}</span>}
                </button>
            </div>
        </div>
    );
}