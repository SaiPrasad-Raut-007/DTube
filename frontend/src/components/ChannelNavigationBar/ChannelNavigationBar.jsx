import './ChannelNavigationBar.css';

export default function ChannelNavigationBar({ activeTab, setActiveTab }) {
    const tabs = ['Home', 'Videos', 'Playlists', 'Posts', 'Channels'];

    return(
        <div className="channel-navigation-container">
            {tabs.map((tab) => (
                <button 
                    key={tab}
                    className={`channel-nav-button ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}