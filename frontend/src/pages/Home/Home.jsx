import { useState } from "react";
import { VideoCard } from "../../components/VideoCard/VideoCard";
import "./Home.css";
import { useEffect } from "react";
import formatTimeAgo from "../../FormatTimeAgo";

export default function HomePage() {
  const [videoList, setVideoList] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("/api/videos/all-videos", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setVideoList(data);
        } else {
          console.error("Failed to fetch videos");
        }
      } catch (error) {
        console.error("Network error fetching videos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return <div className="loading-spinner">Loading DTube...</div>;
  }

  if (!videoList || videoList.video_length === 0) {
    return <div className="no-videos">No videos found.</div>;
  }

  return (
    <div className="video-grid">
      {videoList.map((video) => (
        <VideoCard
          key={video._id}
          videoId={video._id}
          channelId={video.creator._id}
          thumbnail_img={video.thumbnail}
          video_title={video.title}
          content_creator={video.creator?.username || "Unknown"}
          video_length={video.duration}
          views={`${video.view_count} views`}
          created_at={formatTimeAgo(video.createdAt)}
          creator_profile_pic={
            video.creator?.user_pfp || "https://ui-avatars.com/api/?name=User"
          }
        />
      ))}
    </div>
  );
}
