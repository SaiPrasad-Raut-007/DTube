import "./VideoCard.css";
import "./VIdeoCardSidebar.css";
import "./FeaturedVideoCard.css";
import "./ChannelVideoCard.css";
import "./SearchVideoCard.css";
import "./PlaylistVideoCard.css";
import "./VideoOptionsMenu.css";

import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

export const VideoCard = ({
  videoId,
  channelId,
  thumbnail_img,
  video_title,
  content_creator,
  video_length,
  views,
  created_at,
  creator_profile_pic,
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/watch/${videoId}`);
      }}
      className="video-card"
    >
      <div className="thumbnail-container">
        <img className="thumbnail-img" src={thumbnail_img} alt={video_title} />
        <p className="thumbnail-video-length">{video_length}</p>
      </div>

      <div className="video-details-container">
        <div
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/channel/${channelId}`);
          }}
        >
          <img
            className="creator-profile-pic"
            src={creator_profile_pic}
            alt={content_creator}
          />
        </div>
        <div className="video-info">
          <h4 className="video-card-title">{video_title}</h4>
          <div
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/channel/${channelId}`);
            }}
            className="video-card-content-creator"
          >
            {content_creator}
          </div>
          <p className="video-card-views-created-at">
            {views} • {created_at}
          </p>
        </div>
        <VideoOptionsMenu videoId={videoId} />
      </div>
    </div>
  );
};

export const VideoCardSidebar = ({
  videoId,
  channelId,
  thumbnail_img,
  video_title,
  content_creator,
  video_length,
  views,
  created_at,
  creator_profile_pic,
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/watch/${videoId}`)}
      className="video-card-sidebar"
    >
      <div className="thumbnail-container">
        <img className="thumbnail-img" src={thumbnail_img} alt={video_title} />
        <p className="thumbnail-video-length">{video_length}</p>
      </div>

      <div className="video-details-container">
        <img
          className="creator-profile-pic"
          src={creator_profile_pic}
          alt={content_creator}
        />

        <div className="video-info">
          <h4 className="video-card-title">{video_title}</h4>
          <div
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/channel/${channelId}`);
            }}
            className="video-card-content-creator"
          >
            {content_creator}
          </div>
          <p className="video-card-views-created-at">
            {views} • {created_at}
          </p>
        </div>
        <VideoOptionsMenu videoId={videoId} />
      </div>
    </div>
  );
};

export const FeaturedVideoCard = ({
  videoId,
  thumbnail_img,
  video_title,
  video_length,
  views,
  created_at,
  video_description,
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/watch/${videoId}`)}
      className="featured-video-card"
    >
      <div className="featured-thumbnail-container">
        <img
          className="featured-thumbnail"
          src={thumbnail_img}
          alt={video_title}
        />
        <p className="featured-video-length">{video_length}</p>
      </div>

      <div className="featured-info">
        <div>
          <h3 className="featured-title">{video_title}</h3>
          <p className="featured-stats">
            {views} • {created_at}
          </p>
          <p className="featured-description">{video_description}</p>
        </div>
      </div>
      <VideoOptionsMenu videoId={videoId} />
    </div>
  );
};

export const ChannelVideoCard = ({
  videoId,
  thumbnail_img,
  video_title,
  video_length,
  views,
  created_at,
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/watch/${videoId}`)}
      className="channel-video-card"
    >
      <div className="channel-thumbnail-container">
        <img
          className="channel-thumbnail"
          src={thumbnail_img}
          alt={video_title}
        />
        <p className="channel-video-length">{video_length}</p>
      </div>

      <div className="channel-info">
        <div>
          <h4 className="channel-title">{video_title}</h4>
          <p className="channel-stats">
            {views} • {created_at}
          </p>
        </div>
        <VideoOptionsMenu videoId={videoId} />
      </div>
    </div>
  );
};

export const SearchVideoCard = ({
  videoId,
  channelId,
  thumbnail_img,
  video_title,
  video_length,
  views,
  created_at,
  content_creator,
  creator_profile_pic,
  video_description = "In this video, we cover everything you need to know to master this topic from scratch. Subscribe for more weekly tutorials!",
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/watch/${videoId}`)}
      className="search-video-card"
    >
      <div className="search-thumbnail-container">
        <img
          className="search-thumbnail"
          src={thumbnail_img}
          alt={video_title}
        />
        <span className="search-video-length">{video_length}</span>
      </div>

      <div className="search-video-details">
        <div>
          <h3 className="search-video-title">{video_title}</h3>
          <p className="search-video-stats">
            {views} • {created_at}
          </p>

          <div
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/channel/${channelId}`);
            }}
            className="search-video-creator"
          >
            <img
              className="search-creator-pic"
              src={creator_profile_pic}
              alt={content_creator}
            />
            <span className="search-creator-name">{content_creator}</span>
          </div>

          <p className="search-video-description">{video_description}</p>
        </div>
      </div>
      <VideoOptionsMenu videoId={videoId} />
    </div>
  );
};

export const PlaylistVideoCard = ({
  videoId,
  channelId,
  index,
  thumbnail_img,
  video_title,
  content_creator,
  video_length,
  views,
  created_at,
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/watch/${videoId}`);
      }}
      className="playlist-video-card"
    >
      <div className="playlist-video-index">{index}</div>

      <div className="playlist-video-thumbnail-container">
        <img
          className="playlist-video-thumbnail"
          src={thumbnail_img}
          alt={video_title}
        />
        <span className="playlist-video-length">{video_length}</span>
      </div>

      <div className="playlist-video-details">
        <h3 className="playlist-video-title">{video_title}</h3>
        <p className="playlist-video-subtitle">
          <div
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/channel/${channelId}`);
            }}
            className="video-content-creator-name"
          >
            {content_creator}
          </div>{" "}
          • {views} • {created_at}
        </p>
      </div>

      <VideoOptionsMenu videoId={videoId} />
    </div>
  );
};

export const VideoOptionsMenu = ({ videoId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const fetchAdminStatus = async () => {
      const token = localStorage.getItem("dtube_token");
      if (token) {
        try {
          const res = await fetch("/api/user/profile", {
            headers: { authorization: `Bearer ${token}` },
          });
          if (res.ok) {
            const data = await res.json();
            setIsAdmin(data.role === "Admin");
          }
        } catch (error) {
          console.error("Error fetching role:", error);
        }
      }
    };
    fetchAdminStatus();

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (
      !window.confirm(
        "Are you sure you want to delete this video? This action cannot be undone.",
      )
    )
      return;

    const token = localStorage.getItem("dtube_token");
    try {
      const res = await fetch(`/api/admin/delete-video/${videoId}`, {
        method: "DELETE",
        headers: { authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        toast.success("Video deleted successfully");
        window.location.reload();
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Failed to delete video");
      }
    } catch (error) {
      toast.error("Server error while deleting video: ", error);
    }
  };

  if (!isAdmin) return null;

  return (
    <div
      className="video-options-wrapper"
      ref={menuRef}
      onClick={(e) => e.stopPropagation()}
    >
      <button className="options-icon-btn" onClick={() => setIsOpen(!isOpen)}>
        <span className="material-symbols-rounded">more_vert</span>
      </button>

      {isOpen && (
        <div className="options-dropdown">
          <button onClick={handleDelete} className="dropdown-delete-btn">
            <span className="material-symbols-rounded">delete</span>
            Delete Video
          </button>
        </div>
      )}
    </div>
  );
};
