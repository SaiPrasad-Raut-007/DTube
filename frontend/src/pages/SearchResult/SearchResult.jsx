import formatTimeAgo from "../../FormatTimeAgo";
import "./SearchResult.css";
import { SearchVideoCard } from "../../components/VideoCard/VideoCard";
import { HorizontalChannelCard } from "../../components/ChannelCard/ChannelCard";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function SearchResultPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [videos, setVideos] = useState([]);
  const [channel_list, setChannelList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/videos/search?q=${encodeURIComponent(query)}`,
        );
        if (response.ok) {
          const data = await response.json();
          setVideos(data.videos);
          setChannelList(data.channel_list);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  if (loading) return <div className="loading">Searching...</div>;

  return (
    <div className="search-result-page">
      {channel_list &&
        channel_list.length > 0 &&
        channel_list.map((channel) => (
          <div key={channel._id} className="search-card-wrapper">
            <HorizontalChannelCard
              channelId={channel._id}
              channel_name={channel.username}
              channel_pic={channel.user_pfp}
              subs_count={`${channel.subscribers?.length || 0} subscribers`}
            />
          </div>
        ))}

      {!videos || videos.length === 0 ? (
        <p className="no-results-msg">No videos found matching your search.</p>
      ) : (
        <div className="video-list">
          {videos.map((video) => (
            <div key={video._id} className="search-card-wrapper">
              <SearchVideoCard
                videoId={video._id}
                channelId={video.creator._id}
                thumbnail_img={video.thumbnail}
                video_title={video.title}
                video_description={video.description}
                content_creator={video.creator.username}
                video_length={video.duration}
                creator_profile_pic={video.creator.user_pfp}
                views={`${video.view_count} views`}
                created_at={formatTimeAgo(video.createdAt)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
