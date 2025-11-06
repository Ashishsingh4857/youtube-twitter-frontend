import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineClockCircle } from "react-icons/ai";

function VideoList({
  thumbnail,
  duration,
  title,
  views = 0,
  channelName,
  createdAt,
  videoId,
}) {
  return (
    <>
      <div
        key={videoId}
        className="flex flex-col md:flex-row items-center cursor-pointer "
      >
        <div className="md:w-42 relative">
          <img
            alt="Video Thumbnail"
            className="object-cover rounded-lg "
            src={thumbnail}
          />
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-1 py-0.5 rounded">
            {duration}
          </div>
        </div>
        <div className=" md:ml-2 w-full md:w-67 p-2 overflow-hidden ">
          <h3 className="mb-1 text-sm font-bold text-white">{title}</h3>
          <p className=" text-gray-400 text-xs">{channelName}</p>
          <span className="mb-2 text-gray-400 text-xs">{views} views</span>
          <div className="flex">
            <AiOutlineClockCircle className="mr-1 text-gray-400" />
            <span className="text-gray-400 text-xs">{createdAt}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoList;
