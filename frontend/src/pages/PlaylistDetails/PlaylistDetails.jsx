import './PlaylistDetails.css';
import { PlaylistVideoCard } from "../../components/VideoCard/VideoCard";

const DUMMY_PLAYLIST_INFO = {
    title: "React Mastery: From Zero to Hero",
    creator: "Code with Sai",
    views: "1.2M views",
    updated: "Last updated today",
    thumbnail: "https://picsum.photos/seed/reactpl/600/400",
    videoCount: "5 videos"
};

const DUMMY_VIDEOS = [
    { id: "pl-vid-1", thumbnail_img: "https://picsum.photos/seed/pl1a/320/180", video_title: "React Hooks: useState Explained", content_creator: "Code with Sai", video_length: "8:20", views: "45K views", created_at: "6 months ago" },
    { id: "pl-vid-2", thumbnail_img: "https://picsum.photos/seed/pl1b/320/180", video_title: "React Hooks: useEffect Explained", content_creator: "Code with Sai", video_length: "14:10", views: "52K views", created_at: "6 months ago" },
    { id: "pl-vid-3", thumbnail_img: "https://picsum.photos/seed/pl1c/320/180", video_title: "React Hooks: useContext Explained", content_creator: "Code with Sai", video_length: "11:45", views: "38K views", created_at: "5 months ago" },
    { id: "pl-vid-4", thumbnail_img: "https://picsum.photos/seed/pl1d/320/180", video_title: "React Hooks: useRef Explained", content_creator: "Code with Sai", video_length: "9:30", views: "41K views", created_at: "5 months ago" },
    { id: "pl-vid-5", thumbnail_img: "https://picsum.photos/seed/pl1e/320/180", video_title: "React Hooks: useMemo & useCallback", content_creator: "Code with Sai", video_length: "18:00", views: "60K views", created_at: "4 months ago" }
];

export default function PlaylistDetails({ playlistInfo = DUMMY_PLAYLIST_INFO, videos = DUMMY_VIDEOS }) {
    return (
        <div className="playlist-details-page">
            
            <div className="playlist-left-column">
                <div className="playlist-info-card">
                    <img className="playlist-main-thumbnail" src={playlistInfo.thumbnail} alt={playlistInfo.title} />
                    
                    <h1 className="playlist-main-title">{playlistInfo.title}</h1>
                    <h3 className="playlist-creator-name">{playlistInfo.creator}</h3>
                    
                    <div className="playlist-stats">
                        <span>{playlistInfo.videoCount}</span>
                        <span>{playlistInfo.views}</span>
                        <span>{playlistInfo.updated}</span>
                    </div>

                    <div className="playlist-action-buttons">
                        <button className="play-all-btn">
                            <span className="material-symbols-rounded">play_arrow</span> Play all
                        </button>
                        <button className="shuffle-btn">
                            <span className="material-symbols-rounded">shuffle</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="playlist-right-column">
                {videos.map((video, index) => (
                    <PlaylistVideoCard 
                        key={video.id}
                        index={index + 1} 
                        {...video} 
                    />
                ))}
            </div>
            
        </div>
    );
}