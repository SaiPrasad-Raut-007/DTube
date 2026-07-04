import "./VideoPlayer.css";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import SubscribeButton from "../SubscribeButton/SubscribeButton";
import toast from "react-hot-toast";

export default function VideoPlayer({ videoData, isLiked, likeCount, onLike }) {
  const navigate = useNavigate();

  useEffect(() => {
    const recordView = async () => {
      try {
        const token = localStorage.getItem("dtube_token");
        const headers = {};
        if (token) {
          headers["authorization"] = `Bearer ${token}`;
        }

        await fetch(`/api/videos/view/${videoData._id}`, {
          method: "PUT",
          headers,
        });
      } catch (error) {
        console.error(error);
      }
    };

    if (videoData?._id) {
      recordView();
    }
  }, [videoData._id]);

  const handleShare = async () => {
    try {
      const currentUrl = window.location.href;

      await navigator.clipboard.writeText(currentUrl);

      toast.success("Link copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy link: ", error);
      toast.error("Failed to copy link.");
    }
  };

  return (
    <div className="video-player-container">
      <VideoComponent
        video_src={videoData.video_url}
        video_title={videoData.title}
        creator_name={videoData.creator.username}
      />

      <div className="video-player-info">
        <h3 className="video-title">{videoData.title}</h3>

        <div className="video-primary-details">
          <div className="creator-details-section">
            <div
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/channel/${videoData.creator._id}`);
              }}
              className="creator-link"
            >
              <img
                className="creator-pic"
                src={videoData.creator.user_pfp}
                alt={videoData.creator.username}
              />
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/channel/${videoData.creator._id}`);
              }}
              className="creator-link"
            >
              <div className="creator-text-info">
                <h4 className="video-creator-name">
                  {videoData.creator.username}
                </h4>
                <h5 className="video-creator-subs">
                  {videoData.creator.subscribers?.length || 0} subscribers
                </h5>
              </div>
            </div>
            <SubscribeButton channel={videoData.creator._id} />
          </div>

          <div className="video-actions-section">
            <div className="action-pill like-dislike-pill">
              <button
                className={`action-button like-button ${isLiked ? "liked" : ""}`}
                onClick={onLike}
              >
                <span
                  className={
                    isLiked
                      ? "material-symbols-rounded material-filled"
                      : "material-symbols-rounded"
                  }
                >
                  thumb_up
                </span>
                <strong>{likeCount}</strong>
              </button>
              <div className="divider"></div>
              <button className="action-button dislike-button">
                <span className="material-symbols-rounded">thumb_down</span>
              </button>
            </div>

            <div className="action-pill">
              <button
                className="action-button share-button"
                onClick={handleShare}
              >
                <span className="material-symbols-rounded">share</span>
                <strong>Share</strong>
              </button>
            </div>
          </div>
        </div>

        <div className="video-description-box">
          <p>{videoData.description}</p>
        </div>
      </div>
    </div>
  );
}

const VideoComponent = ({ video_src, video_title, creator_name }) => {
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [speed, setSpeed] = useState(1);

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration;

    const progressPercentage = (current / total) * 100;
    setProgress(progressPercentage);
    setCurrentTime(formatTime(current));
  };

  const handleLoadedMetaData = () => {
    setDuration(formatTime(videoRef.current.duration));
  };

  const handleProgressClick = (e) => {
    const barWidth = e.currentTarget.offsetWidth;
    const clickPosition = e.nativeEvent.offsetX;
    const clickPercentage = clickPosition / barWidth;
    videoRef.current.currentTime = clickPercentage * videoRef.current.duration;
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const toggleMute = () => {
    if (volume > 0) {
      videoRef.current.volume = 0;
      setVolume(0);
    } else {
      videoRef.current.volume = 1;
      setVolume(1);
    }
  };

  const handleFullScreen = () => {
    const container = videoRef.current.parentElement;
    if (!document.fullscreenElement) {
      container.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="video-wrapper">
      <video
        className="dtube-video-player"
        src={video_src}
        ref={videoRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetaData}
        onClick={togglePlay}
        onEnded={() => setIsPlaying(false)}
      />
      <div className="video-overlay-header">
        <div className="overlay-info">
          <h3 className="overlay-title">{video_title}</h3>
          <p className="overlay-creator">{creator_name}</p>
        </div>
      </div>

      <div className="custom-controls-container">
        <div className="progress-bar-bg" onClick={handleProgressClick}>
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="controls-row">
          <button className="play-pause-btn" onClick={togglePlay}>
            <span className="material-symbols-rounded">
              {isPlaying ? "pause" : "play_arrow"}
            </span>
          </button>

          <div className="volume-container">
            <button className="volume-btn" onClick={toggleMute}>
              <span className="material-symbols-rounded">
                {volume == 0
                  ? "volume_off"
                  : volume < 0.5
                    ? "volume_down"
                    : "volume_up"}
              </span>
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="volume-slider"
            />
          </div>
          <div className="time-display">
            {currentTime} / {duration}
          </div>

          <div className="settings-container">
            <button
              className="settings-btn"
              onClick={() => setSettingsOpen(!settingsOpen)}
            >
              <span className="material-symbols-rounded">settings</span>
            </button>

            {settingsOpen && (
              <div className="settings-dropdown">
                <div className="dropdown-section">
                  <p>Speed</p>
                  <select
                    value={speed}
                    onChange={(e) => {
                      const newSpeed = parseFloat(e.target.value);
                      videoRef.current.playbackRate = newSpeed;
                      setSpeed(newSpeed);
                    }}
                  >
                    <option value="0.5">0.5x</option>
                    <option value="1">1x</option>
                    <option value="1.5">1.5x</option>
                    <option value="2">2x</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          <div style={{ flexGrow: 1 }}></div>

          <button className="fullscreen-btn" onClick={handleFullScreen}>
            <span className="material-symbols-rounded">fullscreen</span>
          </button>
        </div>
      </div>
    </div>
  );
};
