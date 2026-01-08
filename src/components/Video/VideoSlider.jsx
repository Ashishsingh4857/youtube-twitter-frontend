import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { VideoCard } from "../index.js";

function VideoSlider({ videos, title, videoCardClassName, buttonClassName }) {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [visibleVideos, setVisibleVideos] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleVideos(1);
      } else if (window.innerWidth < 768) {
        setVisibleVideos(2);
      } else if (window.innerWidth < 1024) {
        setVisibleVideos(3);
      } else {
        setVisibleVideos(4);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePrevClick = () => {
    if (currentVideo > 0) {
      setCurrentVideo(currentVideo - 1);
    }
  };

  const handleNextClick = () => {
    if (currentVideo < videos.length - visibleVideos) {
      setCurrentVideo(currentVideo + 1);
    }
  };

  return (
    <div className="relative">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentVideo * (100 / visibleVideos)}%)`,
          }}
        >
          {videos.map((video, index) => (
            <div
              key={video?._id}
              className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 ${videoCardClassName}`}
            >
              <VideoCard
                key={video?._id}
                // avatar={avatar?.url}
                duration={video?.duration}
                title={video?.title}
                thumbnail={video?.thumbnail?.url}
                createdAt={video?.createdAt}
                views={video?.views}
                videoId={video?._id}
              />
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={handlePrevClick}
        className={`absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-2 rounded-full ${buttonClassName} ${currentVideo === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <FiChevronLeft size={24} />
      </button>
      <button
        type="button"
        onClick={handleNextClick}
        className={`absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-2 rounded-full ${buttonClassName} ${currentVideo === videos.length - visibleVideos ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <FiChevronRight size={24} />
      </button>
    </div>
  );
}

export default VideoSlider;
