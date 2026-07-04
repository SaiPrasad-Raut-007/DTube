import VideoSidebar from "../../components/VideoSidebar/VideoSidebar";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import CommentSection from "../../components/CommentSection/CommentSection";
import { useEffect, useState } from "react";

import "./VideoPlayer.css";
import { useParams } from "react-router-dom";

export default function VideoPlayerPage() {
  const { id } = useParams();
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("dtube_token");
        const [videoRes, userRes, likedRes] = await Promise.all([
          fetch(`/api/videos/fetch/${id}`),
          fetch("/api/user/profile", {
            headers: { authorization: `Bearer ${token}` },
          }),
          fetch("/api/user/liked", {
            headers: { authorization: `Bearer ${token}` },
          }),
        ]);

        if (videoRes.ok) {
          const data = await videoRes.json();
          setVideoData(data);
          setLikeCount(data.like_count);
        }
        if (userRes.ok) setUserData(await userRes.json());
        if (likedRes.ok) {
          const likedVideos = await likedRes.json();
          setIsLiked(
            likedVideos.some((v) => v._id.toString() === id.toString()),
          );
        }
      } catch (error) {
        console.error("Error fetch data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleLike = async () => {
    const token = localStorage.getItem("dtube_token");
    try {
      const response = await fetch(`/api/videos/like/${id}`, {
        method: "POST",
        headers: { authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setIsLiked(data.isLiked);
        setLikeCount(data.like_count);
      }
    } catch (error) {
      console.error("Failed to update like:", error);
    }
  };

  if (loading) return <div className="loading">Loading video...</div>;
  if (!videoData) return <div className="error">Video not found.</div>;

  return (
    <div className="video-page-layout">
      <div className="primary-column">
        <VideoPlayer
          videoData={videoData}
          isLiked={isLiked}
          likeCount={likeCount}
          onLike={handleLike}
        />
        <CommentSection userData={userData} videoId={id} />
      </div>

      <div className="secondary-column">
        <VideoSidebar />
      </div>
    </div>
  );
}
