import './SearchResult.css';
import { SearchVideoCard } from "../../components/VideoCard/VideoCard";
import { HorizontalChannelCard } from "../../components/ChannelCard/ChannelCard";

const channel_list = [
    {
        id: "ch-search-1",
        channel_name: "Code with Sai",
        channel_pic: "https://picsum.photos/seed/sai1/100/100",
        subs_count: "1.05M subscribers"
    }
];

const video_list = [
    {
        id: "vid-search-1",
        thumbnail_img: "https://picsum.photos/seed/search1/320/180",
        video_title: "Building a YouTube Clone in React (Full Course)",
        content_creator: "Code with Sai",
        video_length: "45:20",
        views: "1.2M views",
        created_at: "1 month ago",
        creator_profile_pic: "https://picsum.photos/seed/sai1/36/36"
    },
    {
        id: "vid-search-2",
        thumbnail_img: "https://picsum.photos/seed/search2/320/180",
        video_title: "React State Management Masterclass",
        content_creator: "React Ninja",
        video_length: "22:15",
        views: "450K views",
        created_at: "2 weeks ago",
        creator_profile_pic: "https://picsum.photos/seed/face3/36/36"
    },
    {
        id: "vid-search-3",
        thumbnail_img: "https://picsum.photos/seed/search3/320/180",
        video_title: "10 CSS Tricks You Need to Know",
        content_creator: "Kevin Powell",
        video_length: "15:45",
        views: "890K views",
        created_at: "4 days ago",
        creator_profile_pic: "https://picsum.photos/seed/kevin/36/36"
    },
    {
        id: "vid-search-1",
        thumbnail_img: "https://picsum.photos/seed/search1/320/180",
        video_title: "Building a YouTube Clone in React (Full Course)",
        content_creator: "Code with Sai",
        video_length: "45:20",
        views: "1.2M views",
        created_at: "1 month ago",
        creator_profile_pic: "https://picsum.photos/seed/sai1/36/36"
    },
    {
        id: "vid-search-2",
        thumbnail_img: "https://picsum.photos/seed/search2/320/180",
        video_title: "React State Management Masterclass",
        content_creator: "React Ninja",
        video_length: "22:15",
        views: "450K views",
        created_at: "2 weeks ago",
        creator_profile_pic: "https://picsum.photos/seed/face3/36/36"
    },
    {
        id: "vid-search-3",
        thumbnail_img: "https://picsum.photos/seed/search3/320/180",
        video_title: "10 CSS Tricks You Need to Know",
        content_creator: "Kevin Powell",
        video_length: "15:45",
        views: "890K views",
        created_at: "4 days ago",
        creator_profile_pic: "https://picsum.photos/seed/kevin/36/36"
    },
    {
        id: "vid-search-1",
        thumbnail_img: "https://picsum.photos/seed/search1/320/180",
        video_title: "Building a YouTube Clone in React (Full Course)",
        content_creator: "Code with Sai",
        video_length: "45:20",
        views: "1.2M views",
        created_at: "1 month ago",
        creator_profile_pic: "https://picsum.photos/seed/sai1/36/36"
    },
    {
        id: "vid-search-2",
        thumbnail_img: "https://picsum.photos/seed/search2/320/180",
        video_title: "React State Management Masterclass",
        content_creator: "React Ninja",
        video_length: "22:15",
        views: "450K views",
        created_at: "2 weeks ago",
        creator_profile_pic: "https://picsum.photos/seed/face3/36/36"
    },
    {
        id: "vid-search-3",
        thumbnail_img: "https://picsum.photos/seed/search3/320/180",
        video_title: "10 CSS Tricks You Need to Know",
        content_creator: "Kevin Powell",
        video_length: "15:45",
        views: "890K views",
        created_at: "4 days ago",
        creator_profile_pic: "https://picsum.photos/seed/kevin/36/36"
    },
    {
        id: "vid-search-1",
        thumbnail_img: "https://picsum.photos/seed/search1/320/180",
        video_title: "Building a YouTube Clone in React (Full Course)",
        content_creator: "Code with Sai",
        video_length: "45:20",
        views: "1.2M views",
        created_at: "1 month ago",
        creator_profile_pic: "https://picsum.photos/seed/sai1/36/36"
    },
    {
        id: "vid-search-2",
        thumbnail_img: "https://picsum.photos/seed/search2/320/180",
        video_title: "React State Management Masterclass",
        content_creator: "React Ninja",
        video_length: "22:15",
        views: "450K views",
        created_at: "2 weeks ago",
        creator_profile_pic: "https://picsum.photos/seed/face3/36/36"
    },
    {
        id: "vid-search-3",
        thumbnail_img: "https://picsum.photos/seed/search3/320/180",
        video_title: "10 CSS Tricks You Need to Know",
        content_creator: "Kevin Powell",
        video_length: "15:45",
        views: "890K views",
        created_at: "4 days ago",
        creator_profile_pic: "https://picsum.photos/seed/kevin/36/36"
    },
];

export default function SearchResultPage() {
    return(
        <div className="search-result-page">
            {channel_list.map((channel) => (
                <div key={channel.id} className="search-card-wrapper">
                    <HorizontalChannelCard {...channel} />
                </div>
            ))}

            {video_list.map((video) => (
                <div key={video.id} className="search-card-wrapper">
                    <SearchVideoCard {...video} />
                </div>
            ))}
        </div>
    );
}