import { useEffect, useState } from "react";
import { VideoCard } from "../../components/VideoCard/VideoCard";
import { ChannelCard } from "../../components/ChannelCard/ChannelCard";
import "./Subscription.css";
import toast from "react-hot-toast";
import formatTimeAgo from "../../FormatTimeAgo";

export default function SubscriptionContainerPage() {
  const [videos, setVideos] = useState([]);
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptionsData = async () => {
      try {
        const token = localStorage.getItem("dtube_token");
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const [videosRes, channelsRes] = await Promise.all([
          fetch("/api/videos/subscriptions", { headers: headers }),
          fetch("/api/user/subscriptions", { headers: headers }),
        ]);

        if (videosRes.ok && channelsRes.ok) {
          const videosData = await videosRes.json();
          const channelsData = await channelsRes.json();

          setVideos(videosData);
          setChannels(channelsData);
        } else {
          console.error("Failed to fetch subscription data");
        }
      } catch (error) {
        console.error("Network error fetching subscriptions", error);
        toast.error("Failed to fetch subscriptions. Try refreshing the page.");
      } finally {
        setLoading(false);
      }
    };
    fetchSubscriptionsData();
  }, []);

  if (loading) {
    return <div className="loading-spinner">Loading your subscriptions...</div>;
  }

  return <SubscriptionsContainer videos={videos} channels={channels} />;
}

function SubscriptionsContainer({ videos = [], channels = [] }) {
  const [view, setView] = useState("videos");

  return (
    <div className="subscriptions-layout">
      <div className="subscriptions-header">
        <h2 className="subscriptions-title">
          {view === "videos" ? "Latest" : "All Subscriptions"}
        </h2>
        <button
          className="all-subs-btn"
          onClick={() => setView(view === "videos" ? "channels" : "videos")}
        >
          {view === "videos" ? "All subscriptions" : "Back to latest"}
        </button>
      </div>

      {view === "videos" ? (
        <SubscriptionsPage videos={videos} />
      ) : (
        <SubscribedChannelsPage channels={channels} />
      )}
    </div>
  );
}

const SubscriptionsPage = ({ videos }) => {
  return (
    <div className="subs-content-container">
      <h3 className="subs-subtitle">Most relevant</h3>
      <div className="subs-video-grid">
        {videos.map((video) => (
          <VideoCard
            key={video._id}
            videoId={video._id}
            channelId={video.creator._id}
            thumbnail_img={video.thumbnail}
            video_title={video.title}
            content_creator={video.creator.username}
            creator_profile_pic={video.creator.user_pfp}
            video_length={video.duration}
            views={`${video.view_count} views`}
            created_at={formatTimeAgo(video.createdAt)}
          />
        ))}
      </div>
    </div>
  );
};

const SubscribedChannelsPage = ({ channels }) => {
  return (
    <div className="subs-content-container">
      <div className="subs-channel-grid">
        {channels.map((channel) => (
          <ChannelCard
            key={channel._id}
            channelId={channel._id}
            channel_name={channel.username}
            channel_pic={channel.user_pfp}
            subs_count={`${channel.subscribers?.length || 0} Subscribers`}
          />
        ))}
      </div>
    </div>
  );
};
