import VideoSidebar from "../../components/VideoSidebar/VideoSidebar"
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer"
import CommentSection from "../../components/CommentSection/CommentSection"

import './VideoPlayer.css'

export default function VideoPlayerPage() {
    return (
        <div className="video-page-layout">
            <div className="primary-column">
                <VideoPlayer />
                <CommentSection />
            </div>
            
            <div className="secondary-column">
                <VideoSidebar />
            </div>
        </div>
    )
}