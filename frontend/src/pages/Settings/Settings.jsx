import { useState, useEffect } from 'react';
import './Settings.css';
import toast from 'react-hot-toast';

export default function SettingsPage() {
    const [profileData, setProfileData] = useState({
        username: '',
        user_handle: '',
        user_pfp: '',
        user_bio: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
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
                    setProfileData(data);
                } else {
                    console.error("Failed to fetch profile");
                }

            } catch (error) {
                console.error("Network error fetching profile: ", error);
            }
        };

        fetchProfile();
    }, []);

    const [preferences, setPreferences] = useState({
        autoplay: true,
        highQuality: false,
        privateSubs: true,
        pauseHistory: false
    });

    const handleInputChange = (e) => {
        // setProfileData({ ...profileData, [e.target.name]: e.target.value });
        const { name , value } = e.target;
        let updatedData = { ...profileData, [name]: value };
        
        if (name === "username" && profileData.user_pfp?.includes("ui-avatars.com")) {
            const formattedName = value.split(" ").join("+");
            updatedData.user_pfp = `https://ui-avatars.com/api/?name=${formattedName}&background=30A645&color=000&size=256`;
        }

        setProfileData(updatedData);
    };

    const togglePreference = (key) => {
        setPreferences({ ...preferences, [key]: !preferences[key] });
    };

    const handleAvatarChange = () => {
        const newPicURL = window.prompt("Enter the URL of your new profile picture: ");

        if (newPicURL) {
            setProfileData({ ...profileData, user_pfp: newPicURL });
        }
    }

    const handleSave = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("dtube_token");

        try {  

            const response = await fetch("/api/user/profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(profileData),
            })

            const data = await response.json();

            if (!response.ok) {
                console.error("Backend rejected the request", data.error);
                toast.error(data.error);
            } else {
                console.log("Settings Saved!", { profileData, preferences });
                toast.success("Settings Saved!");
            }

        } catch (error) {
            console.error("Network or server connection failed: ", error)
            toast.error("Network error. Please try again.")
        }

    };

    return (
        <div className="settings-page">
            <div className="settings-header">
                <h1 className="settings-title">Settings</h1>
                <p className="settings-subtitle">Manage your account preferences and channel details.</p>
            </div>

            <form className="settings-content" onSubmit={handleSave}>
                
                <div className="settings-card">
                    <h2 className="card-title">Channel Profile</h2>
                    <hr className="card-divider" />
                    
                    <div className="profile-edit-section">
                        <img 
                            src={profileData?.user_pfp || "https://ui-avatars.com/api/?name=User&background=30A645&color=fff"} 
                            alt="Profile" 
                            className="settings-profile-pic" 
                        />
                        <button type="button" className="change-pic-btn" onClick={() => handleAvatarChange()}>Change Avatar</button>
                    </div>

                    <div className="input-group">
                        <label>Channel Name</label>
                        <input 
                            type="text" 
                            name="username"
                            value={profileData.username} 
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="input-group">
                        <label>Handle</label>
                        <input 
                            type="text" 
                            name="user_handle"
                            value={profileData.user_handle} 
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="input-group">
                        <label>Bio / Description</label>
                        <textarea 
                            name="user_bio"
                            rows="4" 
                            value={profileData.user_bio}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                </div>

                <div className="settings-card">
                    <h2 className="card-title">Playback & Preferences</h2>
                    <hr className="card-divider" />

                    <div className="toggle-row">
                        <div className="toggle-info">
                            <h4>Autoplay next video</h4>
                            <p>When you finish a video, another plays automatically.</p>
                        </div>
                        <button 
                            type="button" 
                            className={`custom-toggle ${preferences.autoplay ? 'active' : ''}`}
                            onClick={() => togglePreference('autoplay')}
                        >
                            <div className="toggle-knob"></div>
                        </button>
                    </div>

                    <div className="toggle-row">
                        <div className="toggle-info">
                            <h4>Always play in HD</h4>
                            <p>Default to the highest video quality available.</p>
                        </div>
                        <button 
                            type="button" 
                            className={`custom-toggle ${preferences.highQuality ? 'active' : ''}`}
                            onClick={() => togglePreference('highQuality')}
                        >
                            <div className="toggle-knob"></div>
                        </button>
                    </div>
                </div>

                <div className="settings-card">
                    <h2 className="card-title">Privacy</h2>
                    <hr className="card-divider" />

                    <div className="toggle-row">
                        <div className="toggle-info">
                            <h4>Keep all my subscriptions private</h4>
                            <p>Your subscriptions won't be visible to others.</p>
                        </div>
                        <button 
                            type="button" 
                            className={`custom-toggle ${preferences.privateSubs ? 'active' : ''}`}
                            onClick={() => togglePreference('privateSubs')}
                        >
                            <div className="toggle-knob"></div>
                        </button>
                    </div>

                    <div className="toggle-row">
                        <div className="toggle-info">
                            <h4>Pause watch history</h4>
                            <p>Stop tracking the videos you watch across all devices.</p>
                        </div>
                        <button 
                            type="button" 
                            className={`custom-toggle ${preferences.pauseHistory ? 'active' : ''}`}
                            onClick={() => togglePreference('pauseHistory')}
                        >
                            <div className="toggle-knob"></div>
                        </button>
                    </div>
                </div>

                <div className="settings-actions">
                    <button type="button" className="cancel-btn">Cancel</button>
                    <button type="submit" className="save-btn">Save Changes</button>
                </div>

            </form>
        </div>
    );
}