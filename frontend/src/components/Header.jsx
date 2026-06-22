import { useState } from "react"
import SearchBar from "./SearchBar"

export default function Header() {

    const [profileOpen, setProfileOpen] = useState(false)

    return (
        <header className="header">
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
                        U
                    </button>

                    {profileOpen && (
                        <div className="profile-dropdown">
                            <a href="#" className="dropdown-item">
                                <span className="material-symbols-rounded">account_circle</span>
                                Your Channel
                            </a>
                            <a href="#" className="dropdown-item">
                                <span className="material-symbols-rounded">settings</span>
                                Settings
                            </a>
                            <hr className="dropdown-divider" />
                            <a href="#" className="dropdown-item">
                                <span className="material-symbols-rounded">logout</span>
                                Sign Out
                            </a>
                        </div>
                    )}
                </div>

            </div>

        </header>
    )
}