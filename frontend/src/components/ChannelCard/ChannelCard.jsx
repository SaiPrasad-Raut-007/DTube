import "./ChannelCard.css";
import { useNavigate } from "react-router-dom";
import SubscribeButton from "../SubscribeButton/SubscribeButton";

export const ChannelCard = ({
  channelId,
  channel_name,
  channel_pic,
  subs_count,
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/channel/${channelId}`)}
      className="channel-card"
    >
      <img className="channel-card-pic" src={channel_pic} alt={channel_name} />
      <h4 className="channel-card-name">{channel_name}</h4>
      <p className="channel-card-subs">{subs_count}</p>

      <SubscribeButton channel={channelId} />
    </div>
  );
};

export const HorizontalChannelCard = ({
  channelId,
  channel_name,
  channel_pic,
  subs_count,
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/channel/${channelId}`)}
      className="horizontal-channel-card"
    >
      <img className="channel-card-pic" src={channel_pic} alt={channel_name} />
      <div className="channel-card-info">
        <h4 className="channel-card-name">{channel_name}</h4>
        <p className="channel-card-subs">{subs_count} subscribers</p>
      </div>

      <SubscribeButton channel={channelId} />
    </div>
  );
};
