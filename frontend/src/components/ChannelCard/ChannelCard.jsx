import { useState } from 'react';
import './ChannelCard.css';
import { Link } from 'react-router-dom';

export const ChannelCard = ({ channel_name, channel_pic, subs_count }) => {
    const [isSubscribed, setIsSubscribed] = useState(true); 

    const handleSubscribeClick = (e) => {
        e.stopPropagation(); 
        setIsSubscribed(!isSubscribed);
    };

    return (
        <Link to="/channel" className="channel-card">
            <img className="channel-card-pic" src={channel_pic} alt={channel_name} />
            <h4 className="channel-card-name">{channel_name}</h4>
            <p className="channel-card-subs">{subs_count}</p>
            
            <button 
                className={`channel-card-subscribe-btn ${isSubscribed ? 'subscribed' : ''}`}
                onClick={handleSubscribeClick}
            >
                {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </button>
        </Link>
    );
}

export const HorizontalChannelCard = ({ channel_name, channel_pic, subs_count }) => {
    const [isSubscribed, setIsSubscribed] = useState(true);

    const handleSubscribeClick = (e) => {
        e.stopPropagation();
        setIsSubscribed(!isSubscribed);
    };

    return(
        <Link to="/channel" className="horizontal-channel-card">
            <img className="channel-card-pic" src={channel_pic} alt={channel_name} />
            <h4 className="channel-card-name">{channel_name}</h4>
            <p className="channel-card-subs">{subs_count}</p>
            
            <button 
                className={`channel-card-subscribe-btn ${isSubscribed ? 'subscribed' : ''}`}
                onClick={handleSubscribeClick}
            >
                {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </button>
        </Link>
    )
}