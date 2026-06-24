import './VideoCard.css'
import './VIdeoCardSidebar.css'
import './FeaturedVideoCard.css';
import './ChannelVideoCard.css';
import './SearchVideoCard.css';
import './PlaylistVideoCard.css';

export const  VideoCard = ({ thumbnail_img, video_title, content_creator, video_length, views, created_at, creator_profile_pic }) => {
    return (
        <div className="video-card">
            <div className="thumbnail-container">
                <img className="thumbnail-img" src={thumbnail_img} alt={video_title} />
                <p className="thumbnail-video-length">{video_length}</p>
            </div>
            
            <div className="video-details-container">
                <img className="creator-profile-pic" src={creator_profile_pic} alt={content_creator} />
                
                <div className="video-info">
                    <h4 className="video-card-title">{video_title}</h4>
                    <p className="video-card-content-creator">{content_creator}</p>
                    <p className="video-card-views-created-at">{views} • {created_at}</p>
                </div>
            </div>
        </div>
    );
}

export const VideoCardSidebar = ({ thumbnail_img, video_title, content_creator, video_length, views, created_at, creator_profile_pic }) => {
    return (
        <div className="video-card-sidebar">
            <div className="thumbnail-container">
                <img className="thumbnail-img" src={thumbnail_img} alt={video_title} />
                <p className="thumbnail-video-length">{video_length}</p>
            </div>
            
            <div className="video-details-container">
                <img className="creator-profile-pic" src={creator_profile_pic} alt={content_creator} />
                
                <div className="video-info">
                    <h4 className="video-card-title">{video_title}</h4>
                    <p className="video-card-content-creator">{content_creator}</p>
                    <p className="video-card-views-created-at">{views} • {created_at}</p>
                </div>
            </div>
        </div>
    )
}

export const FeaturedVideoCard = ({ thumbnail_img, video_title, video_length, views, created_at, video_description }) => {
    return (
        <div className="featured-video-card">
            <div className="featured-thumbnail-container">
                <img className="featured-thumbnail" src={thumbnail_img} alt={video_title} />
                <p className="featured-video-length">{video_length}</p>
            </div>
            
            <div className="featured-info">
                <h3 className="featured-title">{video_title}</h3>
                <p className="featured-stats">{views} • {created_at}</p>
                <p className="featured-description">{video_description}</p>
            </div>
        </div>
    );
}

export const ChannelVideoCard = ({ thumbnail_img, video_title, video_length, views, created_at }) => {
    return (
        <div className="channel-video-card">
            <div className="channel-thumbnail-container">
                <img className="channel-thumbnail" src={thumbnail_img} alt={video_title} />
                <p className="channel-video-length">{video_length}</p>
            </div>
            
            <div className="channel-info">
                <h4 className="channel-title">{video_title}</h4>
                <p className="channel-stats">{views} • {created_at}</p>
            </div>
        </div>
    );
}

export const SearchVideoCard = ({ 
    thumbnail_img, 
    video_title, 
    video_length, 
    views, 
    created_at, 
    content_creator, 
    creator_profile_pic,
    video_description = "In this video, we cover everything you need to know to master this topic from scratch. Subscribe for more weekly tutorials!" 
}) => {
    return (
        <div className="search-video-card">
            <div className="search-thumbnail-container">
                <img className="search-thumbnail" src={thumbnail_img} alt={video_title} />
                <span className="search-video-length">{video_length}</span>
            </div>
            
            <div className="search-video-details">
                <h3 className="search-video-title">{video_title}</h3>
                <p className="search-video-stats">{views} • {created_at}</p>
                
                <div className="search-video-creator">
                    <img className="search-creator-pic" src={creator_profile_pic} alt={content_creator} />
                    <span className="search-creator-name">{content_creator}</span>
                </div>
                
                <p className="search-video-description">{video_description}</p>
            </div>
        </div>
    );
}

export const PlaylistVideoCard = ({ 
    index, 
    thumbnail_img, 
    video_title, 
    content_creator, 
    video_length, 
    views, 
    created_at 
}) => {
    return (
        <div className="playlist-video-card">
            <div className="playlist-video-index">
                {index}
            </div>
            
            <div className="playlist-video-thumbnail-container">
                <img className="playlist-video-thumbnail" src={thumbnail_img} alt={video_title} />
                <span className="playlist-video-length">{video_length}</span>
            </div>
            
            <div className="playlist-video-details">
                <h3 className="playlist-video-title">{video_title}</h3>
                <p className="playlist-video-subtitle">
                    {content_creator} • {views} • {created_at}
                </p>
            </div>

            <button className="playlist-video-options">
                <span className="material-symbols-rounded">more_vert</span>
            </button>
        </div>
    );
}