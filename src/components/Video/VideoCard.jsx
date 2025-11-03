import React, { useId } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClockCircle } from "react-icons/ai";

function VideoCard({
  thumbnail,
  duration,
  title,
  views = 0,
  avatar,
  channelName,
  createdAt,
  videoId,
}) {
  return (
    <div className="w-full  p-2">
      <div className="group  bg-gray-800 rounded-lg overflow-hidden transition duration-300 transform hover:scale-105">
        <Link to={`/videos/${videoId}`}>
          <div className="relative">
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-40 object-cover "
            />
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-1 py-0.5 rounded">
              {duration}
            </div>
          </div>
        </Link>
        <div className="p-2 flex">
          <img
            src={avatar}
            alt={channelName}
            className="w-8 h-8 rounded-full mr-2"
          />
          <div>
            <h2 className="text-sm font-medium text-white">{title}</h2>
            <div className="flex items-center text-xs text-gray-400">
              <span>{channelName}</span>
            </div>
            <div className="flex items-center text-xs text-gray-400">
              <span>{views} views</span>
              <AiOutlineClockCircle className="mx-1" />
              <span>{createdAt}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
