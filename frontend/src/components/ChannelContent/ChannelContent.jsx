import { ChannelVideoCard, FeaturedVideoCard } from "../VideoCard/VideoCard";
import VideoGrid from "../VideoGrid/VideoGrid";
import { PlaylistCard } from "../PlaylistCard/PlaylistCard";
import "./ChannelContent.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import formatTimeAgo from "../../FormatTimeAgo";

export default function ChannelContent({ activeTab, channel_id }) {
  const [allVideosList, setAllVideosList] = useState([]);
  const [allPlaylists, setAllPlaylists] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [videoRes, playlistRes] = await Promise.all([
          fetch(`/api/videos/channel-videos/${channel_id}`),
          fetch(`/api/playlists/channel-playlists/${channel_id}`),
        ]);

        if (videoRes.ok) {
          const data = await videoRes.json();
          setAllVideosList(data);
        } else {
          console.error("Failed to fetch channel videos");
        }

        if (playlistRes.ok) {
          const data = await playlistRes.json();
          setAllPlaylists(Array.isArray(data) ? data : data.allPlaylists || []);
        }
      } catch (error) {
        console.error("Network error fetching channel videos:", error);
        toast.error(
          "Network error fetching channel videos. Please reload the page.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (channel_id) {
      fetchData();
    }
  }, [channel_id]);

  const ContentPages = {
    Home: ChannelHome,
    Videos: ChannelVideos,
    Playlists: ChannelPlaylists,
  };

  const ActiveComponent = ContentPages[activeTab];

  if (!ActiveComponent) {
    return <div className="error-page">Page not found</div>;
  }

  if (loading) {
    return <div className="loading-spinner">Loading channel content...</div>;
  }

  return (
    <div className="channel-content-wrapper">
      <ActiveComponent
        channel_id={channel_id}
        allVideosList={allVideosList}
        allPlaylists={allPlaylists}
      />
    </div>
  );
}

const ChannelHome = ({ allVideosList, allPlaylists }) => {
  if (!allVideosList || allVideosList.length === 0) {
    return <div className="no-videos">This channel has no content yet.</div>;
  }

  const featuredVideo = allVideosList.reduce((mostViewed, currentVideo) => {
    const currentViews = currentVideo.view_count || 0;
    const mostViews = mostViewed.view_count || 0;
    return currentViews > mostViews ? currentVideo : mostViewed;
  });

  return (
    <div className="channel-home">
      <FeaturedVideoCard
        videoId={featuredVideo._id}
        thumbnail_img={featuredVideo.thumbnail}
        video_title={featuredVideo.title}
        video_length={featuredVideo.duration}
        views={`${featuredVideo.view_count} views`}
        created_at={formatTimeAgo(featuredVideo.createdAt)}
        video_description={featuredVideo.description}
      />
      <VideoGrid
        key={"all-videos-playlist"}
        title={"All Videos"}
        video_list={allVideosList}
      />
      {allPlaylists && allPlaylists.length > 0 && (
        <div className="channel-playlists-section">
          {allPlaylists.map((playlist) =>
            playlist.videos && playlist.videos.length > 0 ? (
              <VideoGrid
                key={playlist._id}
                playlistId={playlist._id}
                title={playlist.name}
                video_list={playlist.videos}
              />
            ) : null,
          )}
        </div>
      )}
    </div>
  );
};

const ChannelVideos = ({ allVideosList }) => {
  return (
    <div className="videos-collection">
      {allVideosList.map((video) => (
        <ChannelVideoCard
          key={video._id}
          videoId={video._id}
          thumbnail_img={video.thumbnail}
          video_title={video.title}
          video_length={video.duration}
          views={`${video.view_count} views`}
          created_at={formatTimeAgo(video.createdAt)}
        />
      ))}
    </div>
  );
};

const ChannelPlaylists = ({ allPlaylists }) => {
  if (!allPlaylists || allPlaylists.length === 0) {
    return (
      <div className="no-playlists">This channel has no playlists yet.</div>
    );
  }

  return (
    <div className="playlist-collection">
      {allPlaylists.map((playlist) => {
        const playlistThumbnail =
          playlist.videos && playlist.videos.length > 0
            ? playlist.videos[0].thumbnail
            : "https://via.placeholder.com/640x360.png?text=Empty+Playlist";

        return (
          <div key={playlist._id} className="playlist-card-wrapper">
            <PlaylistCard
              playlistId={playlist._id}
              channel_name={playlist.creator?.username || "Unknown Channel"}
              channel_pic={playlist.creator?.user_pfp || ""}
              playlist_name={playlist.name}

              thumbnail={playlistThumbnail}
              video_count={playlist.videos?.length || 0}
            />
          </div>
        );
      })}
    </div>
  );
};
