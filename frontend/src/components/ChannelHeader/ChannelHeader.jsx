import './ChannelHeader.css';

export default function ChannelHeader() {
    const banner_img = "https://picsum.photos/seed/banner/1280/200";
    const profile_img = "https://picsum.photos/seed/face1/160/160";
    const channel_name = "Code with Sai";
    const channel_handle = "@CodeWithSai";
    const channel_subs = "1.05M subscribers";
    const channel_videos_count = "240 videos";
    const channel_description = "In this channel, we build fully functional clones of popular websites using React, CSS Grid, and Flexbox. Subscribe for weekly tutorials!";

    return(
        <div className="channel-header-container">
            <img className="channel-banner" src={banner_img} alt="Channel Banner" />
            
            <div className="channel-main-info">
                <img className="channel-profile-pic" src={profile_img} alt={channel_name} />
                
                <div className="channel-text-details">
                    <h1 className="channel-name">{channel_name}</h1>
                    <p className="channel-stats">
                        {channel_handle} • {channel_subs} • {channel_videos_count}
                    </p>
                    
                    <div className="channel-description-wrapper">
                        <p className="channel-description-text">{channel_description}</p>
                        <button className="more-button">...more</button>
                    </div>
                    
                    <button className="channel-subscribe-btn">Subscribe</button>
                </div>
            </div>
        </div>
    );
}