import "./Library.css";
import { VideoCard } from "../../components/VideoCard/VideoCard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import formatTimeAgo from "../../FormatTimeAgo";

export default function LibraryPage() {
  const [watchVideos, setWatchVideos] = useState(null);
  const [likedVideos, setLikedVideos] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWatchAndLikedVideos = async () => {
      try {
        const [watchRes, likedRes] = await Promise.all([
          fetch("/api/user/watched", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("dtube_token")}`,
            },
          }),
          fetch("/api/user/liked", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("dtube_token")}`,
            },
          }),
        ]);

        if (watchRes.ok && likedRes.ok) {
          const watchData = await watchRes.json();
          const likedData = await likedRes.json();
          setWatchVideos(watchData.watchedVideos);
          setLikedVideos(likedData.likedVideos);
        }
      } catch (error) {
        console.error("Error fetching watch and liked videos:", error);
      }
    };
    fetchWatchAndLikedVideos();
  }, []);

  return (
    <div className="library-page">
      <div className="history-playlist-wrapper library-section">
        <div className="library-section-header">
          <h2 className="library-section-title">
            <span className="material-symbols-rounded">history</span>
            History
          </h2>
          <button
            className="library-see-all-btn"
            onClick={() => navigate("/playlist/watched")}
          >
            See all
          </button>
        </div>
        <div className="library-grid">
          {watchVideos?.map((video) => (
            <div key={video._id} className="library-card-wrapper">
              <VideoCard
                key={video._id}
                videoId={video._id}
                channelId={video.creator._id}
                thumbnail_img={video.thumbnail}
                video_title={video.title}
                content_creator={video.creator?.username}
                creator_profile_pic={video.creator.user_pfp}
                video_length={video.duration}
                views={`${video.view_count} views`}
                created_at={formatTimeAgo(video.createdAt)}
              />
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
          <button
            className="library-see-all-btn"
            onClick={() => navigate("/playlist/liked")}
          >
            See all
          </button>
        </div>
        <div className="library-grid">
          {likedVideos?.map((video) => (
            <div key={video._id} className="library-card-wrapper">
              <VideoCard
                key={video._id}
                videoId={video._id}
                thumbnail_img={video.thumbnail}
                video_title={video.title}
                content_creator={video.creator.username}
                creator_profile_pic={video.creator.user_pfp}
                video_length={video.duration}
                views={`${video.view_count} views`}
                created_at={formatTimeAgo(video.createdAt)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
