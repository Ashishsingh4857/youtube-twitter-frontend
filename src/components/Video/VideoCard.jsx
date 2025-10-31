import React, { useId } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClockCircle } from "react-icons/ai";

const dummyVideos = [
  {
    id: 1,
    title: "Video 1",
    thumbnail: "https://picsum.photos/200/300",
    views: 100,
    uploadedAt: "2 hours ago",
    channelName: "Channel 1",
  },
  {
    id: 2,
    title: "Video 2",
    thumbnail: "https://picsum.photos/200/301",
    views: 200,
    uploadedAt: "1 day ago",
    channelName: "Channel 2",
  },
  {
    id: 3,
    title: "Video 3",
    thumbnail: "https://picsum.photos/200/302",
    views: 300,
    uploadedAt: "3 days ago",
    channelName: "Channel 3",
  },
  {
    id: 4,
    title: "Video 4",
    thumbnail: "https://picsum.photos/200/303",
    views: 400,
    uploadedAt: "1 week ago",
    channelName: "Channel 4",
  },
  {
    id: 5,
    title: "Video 5",
    thumbnail: "https://picsum.photos/200/304",
    views: 500,
    uploadedAt: "2 weeks ago",
    channelName: "Channel 5",
  },
  {
    id: 6,
    title: "Video 6",
    thumbnail: "https://picsum.photos/200/305",
    views: 600,
    uploadedAt: "1 month ago",
    channelName: "Channel 6",
  },
  {
    id: 1,
    title: "Video 1",
    thumbnail: "https://picsum.photos/200/300",
    views: 100,
    uploadedAt: "2 hours ago",
    channelName: "Channel 1",
  },
  {
    id: 2,
    title: "Video 2",
    thumbnail: "https://picsum.photos/200/301",
    views: 200,
    uploadedAt: "1 day ago",
    channelName: "Channel 2",
  },
  {
    id: 3,
    title: "Video 3",
    thumbnail: "https://picsum.photos/200/302",
    views: 300,
    uploadedAt: "3 days ago",
    channelName: "Channel 3",
  },
  {
    id: 4,
    title: "Video 4",
    thumbnail: "https://picsum.photos/200/303",
    views: 400,
    uploadedAt: "1 week ago",
    channelName: "Channel 4",
  },
  {
    id: 5,
    title: "Video 5",
    thumbnail: "https://picsum.photos/200/304",
    views: 500,
    uploadedAt: "2 weeks ago",
    channelName: "Channel 5",
  },
  {
    id: 6,
    title: "Video 6",
    thumbnail: "https://picsum.photos/200/305",
    views: 600,
    uploadedAt: "1 month ago",
    channelName: "Channel 6",
  },
  {
    id: 1,
    title: "Video 1",
    thumbnail: "https://picsum.photos/200/300",
    views: 100,
    uploadedAt: "2 hours ago",
    channelName: "Channel 1",
  },
  {
    id: 2,
    title: "Video 2",
    thumbnail: "https://picsum.photos/200/301",
    views: 200,
    uploadedAt: "1 day ago",
    channelName: "Channel 2",
  },
  {
    id: 3,
    title: "Video 3",
    thumbnail: "https://picsum.photos/200/302",
    views: 300,
    uploadedAt: "3 days ago",
    channelName: "Channel 3",
  },
  {
    id: 4,
    title: "Video 4",
    thumbnail: "https://picsum.photos/200/303",
    views: 400,
    uploadedAt: "1 week ago",
    channelName: "Channel 4",
  },
  {
    id: 5,
    title: "Video 5",
    thumbnail: "https://picsum.photos/200/304",
    views: 500,
    uploadedAt: "2 weeks ago",
    channelName: "Channel 5",
  },
  {
    id: 6,
    title: "Video 6",
    thumbnail: "https://picsum.photos/200/305",
    views: 600,
    uploadedAt: "1 month ago",
    channelName: "Channel 6",
  },
];

function VideoCard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {dummyVideos.map((video) => (
        <div key={video.id} className="bg-gray-800 rounded-lg overflow-hidden ">
          <Link to={`/videos/${video.id}`}>
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-40 object-cover"
            />
          </Link>
          <div className="p-2">
            <h2 className="text-sm font-medium text-white ">{video.title}</h2>
            <div className="flex items-center text-xs text-gray-400">
              <span>{video.channelName}</span>
            </div>
            <div className="flex items-center text-xs text-gray-400">
              <span>{video.views} views</span>
              <AiOutlineClockCircle className="mx-1" />
              <span>{video.uploadedAt}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VideoCard;
