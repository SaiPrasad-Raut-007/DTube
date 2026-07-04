import formatTimeAgo from "../../FormatTimeAgo";
import "./PlaylistDetails.css";
import { PlaylistVideoCard } from "../../components/VideoCard/VideoCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PlaylistPage() {
  const { id } = useParams();

  const [playlistInfo, setPlaylistInfo] = useState(null);
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await fetch(`/api/playlists/playlist-info/${id}`);
        if (response.ok) {
          const data = await response.json();

          setPlaylistInfo(data);

          setVideos(data.videos || []);
        }
      } catch (error) {
        console.error("Network error fetching playlist: ", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchLikedVideos = async () => {
      try {
        const response = await fetch("/api/user/liked", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("dtube_token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setVideos(data);
        }

        setPlaylistInfo({
          name: "Liked Videos",
          creator: {
            username: "You",
          },
          createdAt: null,
        });
      } catch (error) {
        console.error("Network error fetching liked videos: ", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchWatchVideos = async () => {
      try {
        const response = await fetch("/api/user/watched", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("dtube_token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setVideos(data);
        }

        setPlaylistInfo({
          name: "Watch History",
          creator: {
            username: "You",
          },
          createdAt: null,
        });
      } catch (error) {
        console.error("Network error fetching watch videos: ", error);
      } finally {
        setLoading(false);
      }
    };

    if (id === "liked") {
      fetchLikedVideos();
    } else if (id === "watched") {
      fetchWatchVideos();
    } else {
      fetchPlaylist();
    }
  }, [id]);

  if (loading) {
    return <div className="loading-spinner">Loading playlist...</div>;
  }

  if (!playlistInfo) {
    return <div className="error-message">Playlist not found.</div>;
  }

  return <PlaylistDetails playlistInfo={playlistInfo} videos={videos} />;
}

function PlaylistDetails({ playlistInfo, videos }) {
  const playlistThumbnail =
    playlistInfo?.thumbnail ||
    (videos && videos.length > 0
      ? videos[0].thumbnail
      : "https://via.placeholder.com/640x360.png?text=Empty+Playlist");

  return (
    <div className="playlist-details-page">
      <div className="playlist-left-column">
        <div className="playlist-info-card">
          <img
            className="playlist-main-thumbnail"
            src={playlistThumbnail}
            alt={playlistInfo?.name || playlistInfo?.title}
          />

          <h1 className="playlist-main-title">
            {playlistInfo?.name || playlistInfo?.title}
          </h1>

          <h3 className="playlist-creator-name">
            {playlistInfo?.creator?.username || "Unknown Creator"}
          </h3>

          <div className="playlist-stats">
            <span>{videos?.length || 0} videos</span>
            <span>
              {playlistInfo.createdAt && formatTimeAgo(playlistInfo.createdAt)}
            </span>
          </div>

          <div className="playlist-action-buttons">
            <button className="play-all-btn">
              <span className="material-symbols-rounded">play_arrow</span> Play
              all
            </button>
            <button className="shuffle-btn">
              <span className="material-symbols-rounded">shuffle</span>
            </button>
          </div>
        </div>
      </div>

      <div className="playlist-right-column">
        {videos &&
          videos.map((video, index) => (
            <PlaylistVideoCard
              key={video._id}
              index={index + 1}

              videoId={video._id}
              channelId={video.creator._id}
              thumbnail_img={video.thumbnail}
              video_title={video.title}
              content_creator={video.creator?.username || "Unknown"}
              video_length={video.duration}
              views={`${video.view_count || 0} views`}
              created_at={formatTimeAgo(video.createdAt)}
            />
          ))}
      </div>
    </div>
  );
}
