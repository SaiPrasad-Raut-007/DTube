import ChannelHeader from "../../components/ChannelHeader/ChannelHeader"
import ChannelNavigationBar from "../../components/ChannelNavigationBar/ChannelNavigationBar"
import { FeaturedVideoCard } from "../../components/VideoCard/VideoCard"
import VideoGrid from "../../components/VideoGrid/VideoGrid";
import ChannelContent from "../../components/ChannelContent/ChannelContent";

import { useState } from "react";

export default function ChannelPage() {
    const [activeTab, setActiveTab] = useState('Home');

    return(
        <div className="channel-page">
            <ChannelHeader />
            <ChannelNavigationBar 
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            <ChannelContent activeTab={activeTab} />
        </div>
    )
}