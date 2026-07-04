import ChannelHeader from "../../components/ChannelHeader/ChannelHeader";
import ChannelNavigationBar from "../../components/ChannelNavigationBar/ChannelNavigationBar";
import ChannelContent from "../../components/ChannelContent/ChannelContent";

import { useState } from "react";
import { useParams } from "react-router-dom";

export default function ChannelPage() {
  const [activeTab, setActiveTab] = useState("Home");
  const { id } = useParams();

  return (
    <div className="channel-page">
      <ChannelHeader channel_id={id} />
      <ChannelNavigationBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <ChannelContent activeTab={activeTab} channel_id={id} />
    </div>
  );
}
