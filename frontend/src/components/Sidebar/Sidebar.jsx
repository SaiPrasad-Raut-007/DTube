import { useState } from "react";
import './Sidebar.css';
import { Link } from "react-router-dom";

export default function Sidebar({sidebarActive}) {
    return sidebarActive ? <ExpandedSidebar /> : <CollapsedSidebar />
}

const ExpandedSidebar = () => {
    const subscriptionList = ["Mr.Beast", "ConnorDawg", "IronMouse", "ZanosVulture"];

    const [youOpen, setYouOpen] = useState(true);
    const [subsOpen, setSubsOpen] = useState(true);

    return (
        <div className="side-bar">
            <Link to="/" className="side-bar-button">
                <span className="material-symbols-rounded">home</span>
                Home
            </Link>
            <Link to="/library" className="side-bar-button">
                <span className="material-symbols-rounded">explore</span>
                Library
            </Link>
            <Link to="/subscriptions" className="side-bar-button">
                <span className="material-symbols-rounded">subscriptions</span>
                Subscriptions
            </Link>

            <hr className="side-bar-divider" />

            <h2 className="side-bar-heading" onClick={() => setYouOpen(!youOpen)}>
                You
                <span
                    className="material-symbols-rounded"
                    style={{ transform: youOpen ? "rotate(90deg)" : "rotate(0deg)",
                             transition: "transform 0.2s" }}
                >
                    chevron_right
                </span>
            </h2>
            {youOpen && (
                <ul>
                    <li>
                        <Link to="/channel">
                            <span className="material-symbols-rounded">account_circle</span>
                            Your Channel
                        </Link>
                    </li>
                    <li>
                        <Link to="/library">
                            <span className="material-symbols-rounded">playlist_play</span>
                            Playlist
                        </Link>
                    </li>
                    <li>
                        <Link to="/playlist">
                            <span className="material-symbols-rounded">thumb_up</span>
                            Liked videos
                        </Link>
                    </li>
                </ul>
            )}

            <hr className="side-bar-divider" />

            <h2 className="side-bar-heading" onClick={() => setSubsOpen(!subsOpen)}>
                Subscriptions
                <span
                    className="material-symbols-rounded"
                    style={{ transform: subsOpen ? "rotate(90deg)" : "rotate(0deg)",
                             transition: "transform 0.2s" }}
                >
                    chevron_right
                </span>
            </h2>
            {subsOpen && (
                <ul>
                    {subscriptionList.map((element) => (
                        <li key={element}>
                            <Link to="/channel">
                                <div className="sub-avatar">{element[0]}</div>
                                {element}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}

            <hr className="side-bar-divider" />

            <Link to="settings" className="side-bar-button">
                <span className="material-symbols-rounded">settings</span>
                Settings
            </Link>
        </div>
    )
}

const CollapsedSidebar = () => {
    return (
        <div className="collapsed-side-bar">
            <Link to="/" className="collapsed-side-bar-button">
                <span className="material-symbols-rounded">home</span>
                <span className="collapsed-label">Home</span>
            </Link>
            
            <Link to="/library" className="collapsed-side-bar-button">
                <span className="material-symbols-rounded">explore</span>
                <span className="collapsed-label">Library</span>
            </Link>
            
            <Link to="/subscriptions" className="collapsed-side-bar-button">
                <span className="material-symbols-rounded">subscriptions</span>
                <span className="collapsed-label">Subscriptions</span>
            </Link>
            
            <Link to="/library" className="collapsed-side-bar-button"> 
            {/* Changes are required here */}
                <span className="material-symbols-rounded">account_circle</span>
                <span className="collapsed-label">You</span>
            </Link>
        </div>
    );
}