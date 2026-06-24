import { useState } from 'react';
import './Settings.css';

export default function SettingsPage() {
    const [profileData, setProfileData] = useState({
        channelName: 'Code with Sai',
        handle: '@CodeWithSai',
        bio: 'Building fully functional clones of popular websites using React, CSS Grid, and Flexbox. Subscribe for weekly tutorials!'
    });

    const [preferences, setPreferences] = useState({
        autoplay: true,
        highQuality: false,
        privateSubs: true,
        pauseHistory: false
    });

    const handleInputChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const togglePreference = (key) => {
        setPreferences({ ...preferences, [key]: !preferences[key] });
    };

    const handleSave = (e) => {
        e.preventDefault();
        console.log("Settings Saved!", { profileData, preferences });
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
                            src="https://picsum.photos/seed/sai1/120/120" 
                            alt="Profile" 
                            className="settings-profile-pic" 
                        />
                        <button type="button" className="change-pic-btn">Change Avatar</button>
                    </div>

                    <div className="input-group">
                        <label>Channel Name</label>
                        <input 
                            type="text" 
                            name="channelName"
                            value={profileData.channelName} 
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="input-group">
                        <label>Handle</label>
                        <input 
                            type="text" 
                            name="handle"
                            value={profileData.handle} 
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="input-group">
                        <label>Bio / Description</label>
                        <textarea 
                            name="bio"
                            rows="4" 
                            value={profileData.bio}
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