import "./VideoSidebar.css";
import formatTimeAgo from "../../FormatTimeAgo";
import { VideoCardSidebar } from "../VideoCard/VideoCard";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function VideoSidebar() {
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
        toast.error("Error fetching videos. Please try again.");
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
    <div className="video-side-bar">
      {videoList.map((video) => (
        <VideoCardSidebar
          key={video._id}
          videoId={video._id}
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
