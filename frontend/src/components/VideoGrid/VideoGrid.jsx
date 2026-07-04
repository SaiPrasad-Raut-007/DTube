import { useState, useRef, useEffect } from "react";
import { ChannelVideoCard } from "../VideoCard/VideoCard";
import "./VideoGrid.css";
import { Link } from "react-router-dom";
import formatTimeAgo from "../../FormatTimeAgo";

export default function VideoGrid({
  title,
  description,
  is_playlist = false,
  video_list = [],
  playlistId,
}) {
  const trackRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const handleScroll = () => {
    if (trackRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
      setShowLeft(scrollLeft > 0);
      setShowRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 2);
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("resize", handleScroll);
  }, [video_list]);

  const scrollLeft = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -600, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 600, behavior: "smooth" });
    }
  };

  if (!video_list || video_list.length === 0) return null;

  return (
    <div className="video-grid-section">
      <div className="video-grid-header">
        <Link to={`/playlist/${playlistId}`} className="video-grid-title">
          {title}
        </Link>
        {is_playlist && description && (
          <p className="video-grid-description">{description}</p>
        )}
      </div>

      <div className="video-grid-container">
        {showLeft && (
          <button
            className="slider-button left-slider-button"
            onClick={scrollLeft}
          >
            <span className="material-symbols-rounded">chevron_left</span>
          </button>
        )}

        <div
          className="video-grid-track"
          ref={trackRef}
          onScroll={handleScroll}
        >
          {video_list.map((video) => (
            <div key={video._id} className="video-card-wrapper">
              <ChannelVideoCard
                key={video._id}
                videoId={video._id}
                thumbnail_img={video.thumbnail}
                video_title={video.title}
                video_length={video.duration}
                views={`${video.view_count} views`}
                created_at={formatTimeAgo(video.createdAt)}
              />
            </div>
          ))}
        </div>

        {showRight && (
          <button
            className="slider-button right-slider-button"
            onClick={scrollRight}
          >
            <span className="material-symbols-rounded">chevron_right</span>
          </button>
        )}
      </div>
    </div>
  );
}
