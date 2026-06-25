import './Header.css';

import { useState } from "react"
import SearchBar from "./SearchBar"
import logo from "../../assets/logo.png"
import { Link } from 'react-router-dom';

export default function Header({sidebarActive, setSidebarActive}) {

    const [profileOpen, setProfileOpen] = useState(false)

    return (
        <header className="header">
            <div className="header-left">
                <button className='icon-button'>
                    <span className='material-symbols-rounded' onClick={() => setSidebarActive(!sidebarActive)}>menu</span>
                </button>
                <a href="/" className="header-logo-link">
                    <img src={logo} alt="DTube" className="header-logo" />
                </a>
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
                    >
                        S
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
                            <Link className="dropdown-item">
                                <span className="material-symbols-rounded">logout</span>
                                Sign Out
                            </Link>
                        </div>
                    )}
                </div>

            </div>

        </header>
    )
}