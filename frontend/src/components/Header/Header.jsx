import './Header.css';

import { useState, useEffect } from "react"
import SearchBar from "./SearchBar"
import logo from "../../assets/logo.png"
import { Link, useNavigate } from 'react-router-dom';

export default function Header({sidebarActive, setSidebarActive}) {

    const [profileOpen, setProfileOpen] = useState(false)
    const [userData, setUserData] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem("dtube_token");

            if (!token) return;
            try {
                const response = await fetch("/api/user/profile", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                } else {
                    console.error("Failed to fetch profile");
                }
            } catch (error) {
                console.error("Network error fetching profile: ", error);
            }
        };
        fetchUserProfile();
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem("dtube_token");
        localStorage.removeItem("dtube_user");

        setProfileOpen(false);

        navigate("/auth");
    }

    return (
        <header className="header">
            <div className="header-left">
                <button className='icon-button'>
                    <span className='material-symbols-rounded' onClick={() => setSidebarActive(!sidebarActive)}>menu</span>
                </button>
                <Link to="/" className="header-logo-link">
                    <img src={logo} alt="DTube" className="header-logo" />
                </Link>
            </div>
            <div className="header-center">
                <SearchBar />
            </div>

            <div className="header-right">

                <button className="icon-button">
                    <span className="material-symbols-rounded">video_call</span>
                </button>

                <button className="icon-button">
                    <span className="material-symbols-rounded">notifications</span>
                </button>

                <div className="profile-container">
                    <button
                        className="profile-avatar"
                        onClick={() => setProfileOpen(!profileOpen)}
                        style={{ padding: userData?.user_pfp ? 0 : '', overflow: 'hidden' }}
                    >
                        {userData?.user_pfp ? (
                            <img 
                                src={userData.user_pfp} 
                                alt="Profile" 
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                            />
                        ) : (
                            <span className="material-symbols-rounded">account_circle</span>
                        )}
                    </button>

                    {profileOpen && (
                        <div className="profile-dropdown">
                            <Link to="/channel" className="dropdown-item">
                                <span className="material-symbols-rounded">account_circle</span>
                                Your Channel
                            </Link>
                            <Link to="/settings" className="dropdown-item">
                                <span className="material-symbols-rounded">settings</span>
                                Settings
                            </Link>
                            <hr className="dropdown-divider" />
                            <button className="dropdown-item" onClick={handleSignOut}
                            style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', color: 'inherit' }}>
                                <span className="material-symbols-rounded">logout</span>
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>

            </div>

        </header>
    )
}