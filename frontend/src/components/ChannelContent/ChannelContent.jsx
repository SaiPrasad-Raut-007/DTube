import { FeaturedVideoCard } from "../VideoCard/VideoCard"
import VideoGrid from "../VideoGrid/VideoGrid"
import Post from "../Post/Post";
import { PlaylistCard } from "../PlaylistCard/PlaylistCard";
import { VideoCard } from "../VideoCard/VideoCard"; 
import { ChannelCard } from "../ChannelCard/ChannelCard";
import './ChannelContent.css'

const FEATURED_VIDEO_DATA = {
    thumbnail_img: "https://picsum.photos/seed/featuredvid/1280/720",
    video_title: "I Built a Full-Stack YouTube Clone (React & Node.js)",
    video_length: "45:20",
    views: "1.2M views",
    created_at: "1 month ago",
    video_description: "Welcome to the channel! In this massive masterclass, we build a complete YouTube clone from scratch. We cover React fundamentals, CSS Grid, Flexbox layout techniques, state management, and how to structure a large-scale frontend application. If you want to master web development, you are in the right place!"
};

const all_videos_list = [
    { id: "all-1", thumbnail_img: "https://picsum.photos/seed/all1/320/180", video_title: "How to fetch data in React", video_length: "12:05", views: "15K views", created_at: "2 days ago" },
    { id: "all-2", thumbnail_img: "https://picsum.photos/seed/all2/320/180", video_title: "Next.js 14 App Router Crash Course", video_length: "45:20", views: "34K views", created_at: "5 days ago" },
    { id: "all-3", thumbnail_img: "https://picsum.photos/seed/all3/320/180", video_title: "Stop using margins. Use gap instead.", video_length: "8:10", views: "89K views", created_at: "1 week ago" },
    { id: "all-4", thumbnail_img: "https://picsum.photos/seed/all4/320/180", video_title: "React State Management in 2026", video_length: "22:15", views: "45K views", created_at: "2 weeks ago" },
    { id: "all-5", thumbnail_img: "https://picsum.photos/seed/all5/320/180", video_title: "My custom VS Code setup", video_length: "14:30", views: "120K views", created_at: "3 weeks ago" },
    { id: "all-6", thumbnail_img: "https://picsum.photos/seed/all6/320/180", video_title: "Building a Portfolio with Tailwind", video_length: "1:15:00", views: "56K views", created_at: "1 month ago" }
];

const popular_videos_list = [
    { id: "pop-1", thumbnail_img: "https://picsum.photos/seed/pop1/320/180", video_title: "Learn React in 10 Minutes", video_length: "10:15", views: "3.2M views", created_at: "2 years ago" },
    { id: "pop-2", thumbnail_img: "https://picsum.photos/seed/pop2/320/180", video_title: "10 CSS Tricks Every Developer Needs", video_length: "15:45", views: "2.1M views", created_at: "1 year ago" },
    { id: "pop-3", thumbnail_img: "https://picsum.photos/seed/pop3/320/180", video_title: "Full-Stack E-commerce Build", video_length: "4:30:00", views: "1.8M views", created_at: "8 months ago" },
    { id: "pop-4", thumbnail_img: "https://picsum.photos/seed/pop4/320/180", video_title: "Why I switched from VS Code to Neovim", video_length: "20:00", views: "1.5M views", created_at: "1 year ago" },
    { id: "pop-5", thumbnail_img: "https://picsum.photos/seed/pop5/320/180", video_title: "Understand Async/Await in JavaScript", video_length: "12:30", views: "1.1M views", created_at: "3 years ago" },
    { id: "pop-6", thumbnail_img: "https://picsum.photos/seed/pop6/320/180", video_title: "HTML & CSS Full Course", video_length: "2:45:00", views: "900K views", created_at: "4 years ago" }
];

const playlist_1 = [
    { id: "pl1-1", thumbnail_img: "https://picsum.photos/seed/pl1a/320/180", video_title: "React Hooks: useState Explained", video_length: "8:20", views: "45K views", created_at: "6 months ago" },
    { id: "pl1-2", thumbnail_img: "https://picsum.photos/seed/pl1b/320/180", video_title: "React Hooks: useEffect Explained", video_length: "14:10", views: "52K views", created_at: "6 months ago" },
    { id: "pl1-3", thumbnail_img: "https://picsum.photos/seed/pl1c/320/180", video_title: "React Hooks: useContext Explained", video_length: "11:45", views: "38K views", created_at: "5 months ago" },
    { id: "pl1-4", thumbnail_img: "https://picsum.photos/seed/pl1d/320/180", video_title: "React Hooks: useRef Explained", video_length: "9:30", views: "41K views", created_at: "5 months ago" },
    { id: "pl1-5", thumbnail_img: "https://picsum.photos/seed/pl1e/320/180", video_title: "React Hooks: useMemo & useCallback", video_length: "18:00", views: "60K views", created_at: "4 months ago" }
];

const playlist_2 = [
    { id: "pl2-1", thumbnail_img: "https://picsum.photos/seed/pl2a/320/180", video_title: "CSS Grid Fundamentals", video_length: "22:10", views: "150K views", created_at: "1 year ago" },
    { id: "pl2-2", thumbnail_img: "https://picsum.photos/seed/pl2b/320/180", video_title: "Advanced CSS Grid Layouts", video_length: "28:45", views: "85K views", created_at: "1 year ago" },
    { id: "pl2-3", thumbnail_img: "https://picsum.photos/seed/pl2c/320/180", video_title: "CSS Flexbox in 15 Minutes", video_length: "15:00", views: "200K views", created_at: "11 months ago" },
    { id: "pl2-4", thumbnail_img: "https://picsum.photos/seed/pl2d/320/180", video_title: "Grid vs Flexbox: When to use which?", video_length: "12:20", views: "95K views", created_at: "10 months ago" },
    { id: "pl3-1", thumbnail_img: "https://picsum.photos/seed/pl3a/320/180", video_title: "Node.js API Setup from Scratch", video_length: "35:00", views: "75K views", created_at: "8 months ago" },
    { id: "pl3-2", thumbnail_img: "https://picsum.photos/seed/pl3b/320/180", video_title: "Connecting MongoDB to Node.js", video_length: "24:15", views: "62K views", created_at: "8 months ago" },
    { id: "pl3-3", thumbnail_img: "https://picsum.photos/seed/pl3c/320/180", video_title: "JWT Authentication in Express", video_length: "42:30", views: "88K views", created_at: "7 months ago" },
    { id: "pl3-4", thumbnail_img: "https://picsum.photos/seed/pl3d/320/180", video_title: "Handling File Uploads in Node", video_length: "29:45", views: "45K views", created_at: "7 months ago" },
    { id: "pl2-5", thumbnail_img: "https://picsum.photos/seed/pl2e/320/180", video_title: "Responsive Design without Media Queries", video_length: "16:40", views: "110K views", created_at: "9 months ago" }
];

const DUMMY_VIDEOS = [
    {
        id: "vid-01",
        thumbnail_img: "https://picsum.photos/seed/1/320/180",
        video_title: "Building a YouTube Clone in React",
        content_creator: "Code with Sai",
        video_length: "14:20",
        views: "24K views",
        created_at: "3 days ago",
        creator_profile_pic: "https://picsum.photos/seed/face1/36/36"
    },
    {
        id: "vid-02",
        thumbnail_img: "https://picsum.photos/seed/2/320/180",
        video_title: "10 CSS Tricks You Need to Know",
        content_creator: "Frontend Master",
        video_length: "8:05",
        views: "1.2M views",
        created_at: "1 year ago",
        creator_profile_pic: "https://picsum.photos/seed/face2/36/36"
    },
    {
        id: "vid-03",
        thumbnail_img: "https://picsum.photos/seed/3/320/180",
        video_title: "Understanding React UseEffect once and for all",
        content_creator: "React Ninja",
        video_length: "22:15",
        views: "450K views",
        created_at: "2 weeks ago",
        creator_profile_pic: "https://picsum.photos/seed/face3/36/36"
    },
    {
        id: "vid-04",
        thumbnail_img: "https://picsum.photos/seed/4/320/180",
        video_title: "I spent 100 days coding in the woods",
        content_creator: "Dev Vlogs",
        video_length: "1:45:00",
        views: "2.1M views",
        created_at: "1 month ago",
        creator_profile_pic: "https://picsum.photos/seed/face4/36/36"
    },
    {
        id: "vid-05",
        thumbnail_img: "https://picsum.photos/seed/5/320/180",
        video_title: "Top 5 VS Code Extensions for 2026",
        content_creator: "Techie Tools",
        video_length: "11:30",
        views: "89K views",
        created_at: "5 days ago",
        creator_profile_pic: "https://picsum.photos/seed/face5/36/36"
    },
    {
        id: "vid-06",
        thumbnail_img: "https://picsum.photos/seed/6/320/180",
        video_title: "My Desk Setup Tour! (Software Engineer)",
        content_creator: "Code with Sai",
        video_length: "18:45",
        views: "15K views",
        created_at: "10 hours ago",
        creator_profile_pic: "https://picsum.photos/seed/face1/36/36"
    },
    {
        id: "vid-07",
        thumbnail_img: "https://picsum.photos/seed/7/320/180",
        video_title: "Why I stopped using Redux",
        content_creator: "State Management Guru",
        video_length: "9:12",
        views: "320K views",
        created_at: "6 months ago",
        creator_profile_pic: "https://picsum.photos/seed/face7/36/36"
    },
    {
        id: "vid-08",
        thumbnail_img: "https://picsum.photos/seed/8/320/180",
        video_title: "Let's build a REST API with Node.js",
        content_creator: "Backend Bros",
        video_length: "45:20",
        views: "112K views",
        created_at: "2 months ago",
        creator_profile_pic: "https://picsum.photos/seed/face8/36/36"
    },
    {
        id: "vid-09",
        thumbnail_img: "https://picsum.photos/seed/9/320/180",
        video_title: "Design Systems Explained for Beginners",
        content_creator: "UI/UX Daily",
        video_length: "15:00",
        views: "54K views",
        created_at: "4 days ago",
        creator_profile_pic: "https://picsum.photos/seed/face9/36/36"
    },
    {
        id: "vid-10",
        thumbnail_img: "https://picsum.photos/seed/10/320/180",
        video_title: "Learn TypeScript in 50 Minutes",
        content_creator: "Frontend Master",
        video_length: "51:05",
        views: "800K views",
        created_at: "11 months ago",
        creator_profile_pic: "https://picsum.photos/seed/face2/36/36"
    },
    {
        id: "vid-11",
        thumbnail_img: "https://picsum.photos/seed/11/320/180",
        video_title: "Day in the life of a Junior Developer",
        content_creator: "Junior Dev Life",
        video_length: "12:34",
        views: "1.5M views",
        created_at: "2 years ago",
        creator_profile_pic: "https://picsum.photos/seed/face11/36/36"
    },
    {
        id: "vid-12",
        thumbnail_img: "https://picsum.photos/seed/12/320/180",
        video_title: "Next.js App Router Crash Course",
        content_creator: "React Ninja",
        video_length: "1:20:15",
        views: "210K views",
        created_at: "3 weeks ago",
        creator_profile_pic: "https://picsum.photos/seed/face3/36/36"
    }
];

const DUMMY_POSTS = [
    {
        id: "p1",
        creator_name: "Code with Sai",
        creator_pic: "https://picsum.photos/seed/face1/160/160",
        created_at: "5 days ago",
        message: "Taking a quick break from coding today to get some fresh air. The setup for the next React project is looking absolutely incredible. Stay tuned! 💻🚀",
        post_imgs: [
            "https://picsum.photos/seed/post1a/800/500",
            "https://picsum.photos/seed/post1b/800/500"
        ],
        likes: "11K",
        comments_count: "342"
    },
    {
        id: "p2",
        creator_name: "Code with Sai",
        creator_pic: "https://picsum.photos/seed/face1/160/160",
        created_at: "2 weeks ago",
        message: "I appreciate all the kind words on the latest video! It took over 40 hours to edit, so seeing it help so many of you figure out CSS Grid makes it all worth it.",
        post_imgs: [],
        likes: "24K",
        comments_count: "1.2K"
    }
];

const DUMMY_PLAYLISTS = [
    {
        id: "pl1",
        type: "playlist",
        channel_name: "Code with Sai",
        channel_pic: "https://picsum.photos/seed/sai1/40/40",
        playlist_name: "React Mastery: From Zero to Hero",
        thumbnail: "https://picsum.photos/seed/reactpl/320/180",
        video_count: "24"
    },
    {
        id: "pl3",
        type: "playlist",
        channel_name: "Code with Sai",
        channel_pic: "https://picsum.photos/seed/sai1/40/40",
        playlist_name: "Advanced CSS Layouts & Animations",
        thumbnail: "https://picsum.photos/seed/cssanim/320/180",
        video_count: "12"
    },
    {
        id: "pl5",
        type: "playlist",
        channel_name: "Code with Sai",
        channel_pic: "https://picsum.photos/seed/sai1/40/40",
        playlist_name: "Full-Stack Node.js Projects",
        thumbnail: "https://picsum.photos/seed/nodepl/320/180",
        video_count: "8"
    },
    {
        id: "pl6",
        type: "playlist",
        channel_name: "Code with Sai",
        channel_pic: "https://picsum.photos/seed/sai1/40/40",
        playlist_name: "Next.js 14 App Router Builds",
        thumbnail: "https://picsum.photos/seed/nextjs/320/180",
        video_count: "15"
    }
];

const DUMMY_CHANNELS = [
    {
        id: "ch1",
        channel_name: "Code with Sai",
        channel_pic: "https://picsum.photos/seed/sai1/100/100",
        subs_count: "1.05M subscribers"
    },
    {
        id: "ch2",
        channel_name: "Fireship",
        channel_pic: "https://picsum.photos/seed/fireship/100/100",
        subs_count: "3.2M subscribers"
    },
    {
        id: "ch3",
        channel_name: "Kevin Powell",
        channel_pic: "https://picsum.photos/seed/kevin/100/100",
        subs_count: "950K subscribers"
    },
    {
        id: "ch4",
        channel_name: "Web Dev Simplified",
        channel_pic: "https://picsum.photos/seed/wds/100/100",
        subs_count: "1.5M subscribers"
    },
    {
        id: "ch5",
        channel_name: "Traversy Media",
        channel_pic: "https://picsum.photos/seed/traversy/100/100",
        subs_count: "2.1M subscribers"
    },
    {
        id: "ch6",
        channel_name: "DesignCourse",
        channel_pic: "https://picsum.photos/seed/design/100/100",
        subs_count: "980K subscribers"
    }
];

export default function ChannelContent({ activeTab }) {
    const ContentPages = {
        'Home': ChannelHome,
        'Videos': ChannelVideos, 
        'Playlists': ChannelPlaylists, 
        'Posts': ChannelPosts, 
        'Channels': OtherChannels
    }

    const ActiveComponent = ContentPages[activeTab];

    if (!ActiveComponent) {
        return <div>Page not found</div>;
    }

    return (
        <div className="channel-content-wrapper">
            <ActiveComponent />
        </div>
    );
}

const ChannelHome = () => {
    return(
        <div className="channel-home">
            <FeaturedVideoCard {...FEATURED_VIDEO_DATA} />
            <VideoGrid 
                title={"For You"}
                video_list={all_videos_list}
                />
            <VideoGrid 
                title={"Playlist 1"}
                description={"Learn everything from Hooks to advanced Next.js routing in this comprehensive playlist."}
                is_playlist={true} 
                video_list={playlist_1} 
            />
            <VideoGrid 
                title={"Popular Uploads"}
                is_playlist={false} 
                video_list={popular_videos_list} 
            />
            <VideoGrid 
                title={"Playlist 2"}
                is_playlist={true} 
                video_list={playlist_2} 
            />
        </div>
    )
}

const ChannelVideos = () => {
    return(
        <div className="videos-collection">
            {DUMMY_VIDEOS.map((video) => (
                <VideoCard 
                    key={video.id} 
                    thumbnail_img={video.thumbnail_img}
                    video_title={video.video_title}
                    video_length={video.video_length}
                    views={video.views}
                    created_at={video.created_at}
                />
            ))}
        </div>
    )
}

const ChannelPlaylists = () => {
    return(
        <div className="playlist-collection">
            {DUMMY_PLAYLISTS.map((item) => (
                <div key={item.id} className="playlist-card-wrapper">
                    <PlaylistCard {...item} />
                </div>
            ))}
        </div>
    )
}

const ChannelPosts = () => {
    return(
        <div className="post-collection">
            {DUMMY_POSTS.map((post) => (
                <Post 
                    key={post.id}
                    creator_name={post.creator_name}
                    creator_pic={post.creator_pic}
                    created_at={post.created_at}
                    message={post.message}
                    post_imgs={post.post_imgs} 
                    likes={post.likes}
                    comments_count={post.comments_count}
                />
            ))}
        </div>
    )
}

const OtherChannels = () => {
    return(
        <div className="channels-collection">
            {DUMMY_CHANNELS.map((item) => (
                <div key={item.id} className="channel-card-wrapper">
                    <ChannelCard {...item} />
                </div>
            ))}
        </div>
    )
}