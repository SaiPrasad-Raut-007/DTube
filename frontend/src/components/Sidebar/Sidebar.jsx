import { useState } from "react";
import './Sidebar.css';

export default function Sidebar({sidebarActive}) {
    return sidebarActive ? <ExpandedSidebar /> : <CollapsedSidebar />
}

const ExpandedSidebar = () => {
    const subscriptionList = ["Mr.Beast", "ConnorDawg", "IronMouse", "ZanosVulture"];

    const [youOpen, setYouOpen] = useState(true);
    const [subsOpen, setSubsOpen] = useState(true);

    return (
        <div className="side-bar">
            <h2 className="side-bar-button">
                <span className="material-symbols-rounded">home</span>
                Home
            </h2>
            <h2 className="side-bar-button">
                <span className="material-symbols-rounded">explore</span>
                Library
            </h2>
            <h2 className="side-bar-button">
                <span className="material-symbols-rounded">subscriptions</span>
                Subscriptions
            </h2>

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
                        <a href="#">
                            <span className="material-symbols-rounded">account_circle</span>
                            Your Channel
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span className="material-symbols-rounded">playlist_play</span>
                            Playlist
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span className="material-symbols-rounded">thumb_up</span>
                            Liked videos
                        </a>
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
                            <a href="#">
                                <div className="sub-avatar">{element[0]}</div>
                                {element}
                            </a>
                        </li>
                    ))}
                </ul>
            )}

            <hr className="side-bar-divider" />

            <h2 className="side-bar-button">
                <span className="material-symbols-rounded">settings</span>
                Settings
            </h2>

        </div>
    )
}

const CollapsedSidebar = () => {
    return (
        <div className="collapsed-side-bar">
            <div className="collapsed-side-bar-button">
                <span className="material-symbols-rounded">home</span>
                <span className="collapsed-label">Home</span>
            </div>
            
            <div className="collapsed-side-bar-button">
                <span className="material-symbols-rounded">explore</span>
                <span className="collapsed-label">Library</span>
            </div>
            
            <div className="collapsed-side-bar-button">
                <span className="material-symbols-rounded">subscriptions</span>
                <span className="collapsed-label">Subscriptions</span>
            </div>
            
            <div className="collapsed-side-bar-button">
                <span className="material-symbols-rounded">account_circle</span>
                <span className="collapsed-label">You</span>
            </div>
        </div>
    );
}