import { useEffect, useState } from "react";
import SubscribeButton from "../SubscribeButton/SubscribeButton";
import "./ChannelHeader.css";
import toast from "react-hot-toast";

export default function ChannelHeader({ channel_id }) {
  const [channelData, setChannelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [videoCount, setVideoCount] = useState(0);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isBanned, setIsBanned] = useState(false);

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const [channelRes, countRes] = await Promise.all([
          fetch(`/api/user/channel/${channel_id}`),
          fetch(`/api/videos/count/${channel_id}`),
        ]);

        if (channelRes.ok) {
          const data = await channelRes.json();
          setChannelData(data);
          setIsBanned(data.isBanned || false);
        }
        if (countRes.ok) {
          const data = await countRes.json();
          setVideoCount(data.count);
        }

        const token = localStorage.getItem("dtube_token");
        if (token) {
          const profileRes = await fetch("/api/user/profile", {
            headers: { authorization: `Bearer ${token}` },
          });
          if (profileRes.ok) {
            const data = await profileRes.json();
            setIsAdmin(data.role === "Admin");
          }
        }
      } catch (error) {
        console.error("Error fetching channel data:", error);
        toast.error("Error fetching channel data. Please reload the page.");
      } finally {
        setLoading(false);
      }
    };
    fetchChannel();
  }, [channel_id]);

  const handleBanChannel = async () => {
    const action = isBanned ? "unban" : "ban";

    if (
      !window.confirm(
        `Are you sure you want to ${action} ${channelData.username}?`,
      )
    )
      return;

    const token = localStorage.getItem("dtube_token");
    try {
      const res = await fetch(`/api/admin/ban/${channel_id}`, {
        method: "PUT",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        setIsBanned(!isBanned);
        toast.success(`Channel successfully ${action}ned.`);
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || `Failed to ${action} channel.`);
      }
    } catch (error) {
      console.error(`Error ${action}ning channel:`, error);
      toast.error(`Error ${action}ning the channel, Please try again.`);
    }
  };

  if (loading) return <div className="loading">Loading video...</div>;
  if (!channelData) return <div className="error">Channel not found.</div>;

  return (
    <div className="channel-header-container">
      <img
        className="channel-banner"
        src={channelData.user_banner}
        alt="Channel Banner"
      />

      <div className="channel-main-info">
        <img
          className="channel-profile-pic"
          src={channelData.user_pfp}
          alt={channelData.username}
        />

        <div className="channel-text-details">
          <h1 className="channel-name">{channelData.username}</h1>
          <p className="channel-stats">
            {channelData.user_handle} • {channelData.subscribers?.length || 0}{" "}
            Subscribers • {videoCount} videos
          </p>

          <div className="channel-description-wrapper">
            <p className="channel-description-text">{channelData.user_bio}</p>
            <button className="more-button">...more</button>
          </div>

          <div
            className="channel-actions"
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              marginTop: "12px",
            }}
          >
            <SubscribeButton channel={channelData._id} />

            {isAdmin && (
              <button
                onClick={handleBanChannel}
                style={{
                  backgroundColor: isBanned ? "#4CAF50" : "#cc0000",
                  color: "white",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: "18px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                {isBanned ? "Unban Channel" : "Ban Channel"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
