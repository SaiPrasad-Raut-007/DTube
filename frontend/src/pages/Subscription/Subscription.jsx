import { useState } from 'react';
import { VideoCard } from '../../components/VideoCard/VideoCard';
import { ChannelCard } from '../../components/ChannelCard/ChannelCard';
import './Subscription.css';

const DUMMY_VIDEOS = [
    {
        id: "sub-vid-01",
        thumbnail_img: "https://picsum.photos/seed/sub1/320/180",
        video_title: "I Auctioned Off My Most Prized Possessions",
        content_creator: "ConnorDawg",
        video_length: "56:31",
        views: "188K views",
        created_at: "2 days ago",
        creator_profile_pic: "https://picsum.photos/seed/connor/36/36"
    },
    {
        id: "sub-vid-02",
        thumbnail_img: "https://picsum.photos/seed/sub2/320/180",
        video_title: "If You Build It, I'll Buy It!",
        content_creator: "MrBeast Gaming",
        video_length: "24:14",
        views: "29M views",
        created_at: "3 days ago",
        creator_profile_pic: "https://picsum.photos/seed/beast/36/36"
    },
    {
        id: "sub-vid-03",
        thumbnail_img: "https://picsum.photos/seed/sub3/320/180",
        video_title: "PUERTO RICO IRL WITH IRONMOUSE",
        content_creator: "IronMouse",
        video_length: "1:11:46",
        views: "327K views",
        created_at: "21 hours ago",
        creator_profile_pic: "https://picsum.photos/seed/mouse/36/36"
    },
    {
        id: "sub-vid-04",
        thumbnail_img: "https://picsum.photos/seed/sub4/320/180",
        video_title: "Midjourney thinks it can eliminate 30% of developers",
        content_creator: "Fireship",
        video_length: "8:24",
        views: "240K views",
        created_at: "15 hours ago",
        creator_profile_pic: "https://picsum.photos/seed/fireship/36/36"
    },
    {
        id: "sub-vid-05",
        thumbnail_img: "https://picsum.photos/seed/sub5/320/180",
        video_title: "You WON'T BELIEVE WHAT HAPPENS in Chapter 1186",
        content_creator: "ZanosVulture",
        video_length: "12:05",
        views: "48K views",
        created_at: "14 hours ago",
        creator_profile_pic: "https://picsum.photos/seed/zanos/36/36"
    },
    {
        id: "sub-vid-06",
        thumbnail_img: "https://picsum.photos/seed/sub6/320/180",
        video_title: "Building a YouTube Clone in React",
        content_creator: "Code with Sai",
        video_length: "45:20",
        views: "1.2M views",
        created_at: "1 month ago",
        creator_profile_pic: "https://picsum.photos/seed/sai1/36/36"
    },
    {
        id: "sub-vid-07",
        thumbnail_img: "https://picsum.photos/seed/sub7/320/180",
        video_title: "10 CSS Tricks You Need to Know",
        content_creator: "Kevin Powell",
        video_length: "15:45",
        views: "890K views",
        created_at: "4 days ago",
        creator_profile_pic: "https://picsum.photos/seed/kevin/36/36"
    },
    {
        id: "sub-vid-08",
        thumbnail_img: "https://picsum.photos/seed/sub8/320/180",
        video_title: "My Editor Sent Me A Weird Box...",
        content_creator: "ConnorDawg",
        video_length: "21:30",
        views: "250K views",
        created_at: "4 days ago",
        creator_profile_pic: "https://picsum.photos/seed/connor/36/36"
    }
];

const DUMMY_CHANNELS = [
    {
        id: "ch-01",
        channel_name: "Code with Sai",
        channel_pic: "https://picsum.photos/seed/sai1/100/100",
        subs_count: "1.05M subscribers"
    },
    {
        id: "ch-02",
        channel_name: "ConnorDawg",
        channel_pic: "https://picsum.photos/seed/connor/100/100",
        subs_count: "3.2M subscribers"
    },
    {
        id: "ch-03",
        channel_name: "IronMouse",
        channel_pic: "https://picsum.photos/seed/mouse/100/100",
        subs_count: "1.8M subscribers"
    },
    {
        id: "ch-04",
        channel_name: "MrBeast Gaming",
        channel_pic: "https://picsum.photos/seed/beast/100/100",
        subs_count: "45M subscribers"
    },
    {
        id: "ch-05",
        channel_name: "Fireship",
        channel_pic: "https://picsum.photos/seed/fireship/100/100",
        subs_count: "3.1M subscribers"
    },
    {
        id: "ch-06",
        channel_name: "ZanosVulture",
        channel_pic: "https://picsum.photos/seed/zanos/100/100",
        subs_count: "890K subscribers"
    },
    {
        id: "ch-07",
        channel_name: "Kevin Powell",
        channel_pic: "https://picsum.photos/seed/kevin/100/100",
        subs_count: "950K subscribers"
    },
    {
        id: "ch-08",
        channel_name: "Web Dev Simplified",
        channel_pic: "https://picsum.photos/seed/wds/100/100",
        subs_count: "1.5M subscribers"
    }
];

export default function SubscriptionContainerPage() {
    return <SubscriptionsContainer videos={DUMMY_VIDEOS} channels={DUMMY_CHANNELS} />
}

function SubscriptionsContainer({ videos = [], channels = [] }) {
    const [view, setView] = useState('videos'); 

    return (
        <div className="subscriptions-layout">
            <div className="subscriptions-header">
                <h2 className="subscriptions-title">
                    {view === 'videos' ? 'Latest' : 'All Subscriptions'}
                </h2>
                <button 
                    className="all-subs-btn"
                    onClick={() => setView(view === 'videos' ? 'channels' : 'videos')}
                >
                    {view === 'videos' ? 'All subscriptions' : 'Back to latest'}
                </button>
            </div>
            
            {view === 'videos' ? (
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
                        key={video.id} 
                        {...video} 
                    />
                ))}
            </div>
        </div>
    );
}

const SubscribedChannelsPage = ({ channels }) => {
    return (
        <div className="subs-content-container">
            <div className="subs-channel-grid">
                {channels.map((channel) => (
                    <ChannelCard 
                        key={channel.id} 
                        {...channel} 
                    />
                ))}
            </div>
        </div>
    );
}