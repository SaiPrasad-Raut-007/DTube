import './Library.css';
import { VideoCard } from '../../components/VideoCard/VideoCard';
import { PlaylistCard } from '../../components/PlaylistCard/PlaylistCard';

const HISTORY_VIDEOS = [
    { id: "hist-1", thumbnail_img: "https://picsum.photos/seed/hist1/320/180", video_title: "How to fetch data in React", content_creator: "Code with Sai", video_length: "12:05", views: "15K views", created_at: "2 days ago", creator_profile_pic: "https://picsum.photos/seed/sai1/36/36" },
    { id: "hist-2", thumbnail_img: "https://picsum.photos/seed/hist2/320/180", video_title: "10 CSS Tricks You Need to Know", content_creator: "Kevin Powell", video_length: "15:45", views: "890K views", created_at: "4 days ago", creator_profile_pic: "https://picsum.photos/seed/kevin/36/36" },
    { id: "hist-3", thumbnail_img: "https://picsum.photos/seed/hist3/320/180", video_title: "Building a Portfolio with Tailwind", content_creator: "Traversy Media", video_length: "1:15:00", views: "56K views", created_at: "1 month ago", creator_profile_pic: "https://picsum.photos/seed/traversy/36/36" }
];

const LIKED_VIDEOS = [
    { id: "liked-1", thumbnail_img: "https://picsum.photos/seed/liked1/320/180", video_title: "React State Management in 2026", content_creator: "React Ninja", video_length: "22:15", views: "45K views", created_at: "2 weeks ago", creator_profile_pic: "https://picsum.photos/seed/face3/36/36" },
    { id: "liked-2", thumbnail_img: "https://picsum.photos/seed/liked2/320/180", video_title: "Next.js 14 App Router Crash Course", content_creator: "Code with Sai", video_length: "45:20", views: "34K views", created_at: "5 days ago", creator_profile_pic: "https://picsum.photos/seed/sai1/36/36" }
];

const SAVED_PLAYLISTS = [
    { id: "saved-pl-1", channel_name: "Code with Sai", channel_pic: "https://picsum.photos/seed/sai1/40/40", playlist_name: "React Mastery: From Zero to Hero", thumbnail: "https://picsum.photos/seed/reactpl/320/180", video_count: "24" },
    { id: "saved-pl-2", channel_name: "DesignCourse", channel_pic: "https://picsum.photos/seed/design/40/40", playlist_name: "UI/UX Fundamentals", thumbnail: "https://picsum.photos/seed/uiux/320/180", video_count: "12" }
];

export default function LibraryPage() {
    return (
        <div className="library-page">            
            <div className="history-playlist-wrapper library-section">
                <div className="library-section-header">
                    <h2 className="library-section-title">
                        <span className="material-symbols-rounded">history</span>
                        History
                    </h2>
                    <button className="library-see-all-btn">See all</button>
                </div>
                <div className="library-grid">
                    {HISTORY_VIDEOS.map((video) => (
                        <div key={video.id} className="library-card-wrapper">
                            <VideoCard {...video} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="liked-videos-playlist-wrapper library-section">
                <div className="library-section-header">
                    <h2 className="library-section-title">
                        <span className="material-symbols-rounded">thumb_up</span>
                        Liked videos
                    </h2>
                    <button className="library-see-all-btn">See all</button>
                </div>
                <div className="library-grid">
                    {LIKED_VIDEOS.map((video) => (
                        <div key={video.id} className="library-card-wrapper">
                            <VideoCard {...video} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="saved-videos-or-playlist-wrapper library-section">
                <div className="library-section-header">
                    <h2 className="library-section-title">
                        <span className="material-symbols-rounded">playlist_play</span>
                        Playlists
                    </h2>
                    <button className="library-see-all-btn">See all</button>
                </div>
                <div className="library-grid">
                    {SAVED_PLAYLISTS.map((playlist) => (
                        <div key={playlist.id} className="library-card-wrapper">
                            <PlaylistCard {...playlist} />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}