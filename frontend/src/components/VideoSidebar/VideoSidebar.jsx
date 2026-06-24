import './VideoSidebar.css'

import { VideoCardSidebar } from '../VideoCard/VideoCard';

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

export default function VideoSidebar() {
    return (
        <div className="video-side-bar">
            {DUMMY_VIDEOS.map((video) => (
                <VideoCardSidebar 
                    key={video.id} 
                    thumbnail_img={video.thumbnail_img}
                    video_title={video.video_title}
                    content_creator={video.content_creator}
                    video_length={video.video_length}
                    views={video.views}
                    created_at={video.created_at}
                    creator_profile_pic={video.creator_profile_pic}
                />
            ))}
        </div>
    )
}

