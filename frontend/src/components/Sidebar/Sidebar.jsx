import { useEffect, useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

export default function Sidebar({ sidebarActive }) {
  return sidebarActive ? <ExpandedSidebar /> : <CollapsedSidebar />;
}

const ExpandedSidebar = () => {
  const [channels, setChannels] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("dtube_token");
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const [subsRes, profileRes] = await Promise.all([
          fetch("/api/user/subscriptions", { headers: headers }),
          fetch("/api/user/profile", { headers: headers }),
        ]);

        if (subsRes.ok) {
          const data = await subsRes.json();
          setChannels(data);
        } else {
          console.error("Failed to fetch subscription data");
        }

        if (profileRes.ok) {
          const data = await profileRes.json();
          setUserData(data);
        } else {
          console.error("Failed to fetch user profile data");
        }
      } catch (error) {
        console.error("Network error fetch data", error);
      }
    };
    fetchData();
  }, []);

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
      <Link to="/trending" className="side-bar-button">
        <span className="material-symbols-rounded">trending_up</span>
        Trending
      </Link>

      <hr className="side-bar-divider" />

      <h2 className="side-bar-heading" onClick={() => setYouOpen(!youOpen)}>
        You
        <span
          className="material-symbols-rounded"
          style={{
            transform: youOpen ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          }}
        >
          chevron_right
        </span>
      </h2>
      {youOpen && (
        <ul>
          <li>
            <Link to={`/channel/${userData?._id}`}>
              <span className="material-symbols-rounded">account_circle</span>
              Your Channel
            </Link>
          </li>
          <li>
            <Link to={`/playlist/liked`}>
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
          style={{
            transform: subsOpen ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          }}
        >
          chevron_right
        </span>
      </h2>
      {subsOpen && (
        <ul>
          {channels.map((channel) => (
            <li key={channel._id}>
              <Link to={`/channel/${channel._id}`}>
                <div className="sub-avatar">
                  {channel.user_pfp ? (
                    <img
                      src={channel.user_pfp}
                      alt={channel.username}
                      className="sub-avatar-img"
                    />
                  ) : (
                    channel.username[0].toUpperCase()
                  )}
                </div>
                {channel.username}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <hr className="side-bar-divider" />

      <Link to="/settings" className="side-bar-button">
        <span className="material-symbols-rounded">settings</span>
        Settings
      </Link>
    </div>
  );
};

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
};
