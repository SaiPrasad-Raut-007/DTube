import { useState, useRef, useEffect } from 'react';
import { ChannelVideoCard } from "../VideoCard/VideoCard";
import './VideoGrid.css';

export default function VideoGrid({ title, description, is_playlist = false, video_list = [] }) {
    const trackRef = useRef(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(true);

    const handleScroll = () => {
        if (trackRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
            setShowLeft(scrollLeft > 0);
            setShowRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 2);
        }
    };

    useEffect(() => {
        handleScroll();
        window.addEventListener('resize', handleScroll);
        return () => window.removeEventListener('resize', handleScroll);
    }, [video_list]);

    const scrollLeft = () => {
        if (trackRef.current) {
            trackRef.current.scrollBy({ left: -600, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (trackRef.current) {
            trackRef.current.scrollBy({ left: 600, behavior: 'smooth' });
        }
    };

    if (!video_list || video_list.length === 0) return null;

    return(
        <div className="video-grid-section">
            <div className="video-grid-header">
                <h2 className="video-grid-title">{title}</h2>
                {is_playlist && description && (
                    <p className="video-grid-description">{description}</p>
                )}
            </div>

            <div className="video-grid-container">
                {showLeft && (
                    <button className="slider-button left-slider-button" onClick={scrollLeft}>
                        <span className="material-symbols-rounded">chevron_left</span>
                    </button>
                )}
                
                <div className="video-grid-track" ref={trackRef} onScroll={handleScroll}>
                    {video_list.map((video) => (
                        <div key={video.id} className="video-card-wrapper">
                            <ChannelVideoCard {...video} />
                        </div>
                    ))}
                </div>

                {showRight && (
                    <button className="slider-button right-slider-button" onClick={scrollRight}>
                        <span className="material-symbols-rounded">chevron_right</span>
                    </button>
                )}
            </div>
        </div>
    );
}