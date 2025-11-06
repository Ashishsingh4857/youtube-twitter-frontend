import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVideoById } from "../store/slices/videoSlice.js";
import { Button, Navbar, Sidebar, VideoPlayer } from "../components/index.js";
import { SlLike, SlDislike } from "react-icons/sl";
import { RiShareForwardLine } from "react-icons/ri";

function VideoDetail() {
  // toggle sidebar
  const { isOpen } = useSelector((state) => state.global.sidebar);
  // toggle description
  const [showFullDescription, setShowFullDescription] = useState(false);
  // toggle subscribe button
  const [isSubscribed, setIsSubscribed] = useState(false);
  // toggle likes
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isShared, setIsShared] = useState(false);

  const dispatch = useDispatch();
  const { videoId } = useParams();
  const { video } = useSelector((state) => state.video);

  useEffect(() => {
    if (videoId) {
      dispatch(getVideoById({ videoId }));
    }
  }, [dispatch, videoId]);

  if (!video || video.length === 0) return <div>Loading...</div>;

  const [videoData] = video;

  const { title, views, createdAt, description, owner, videoFile, thumbnail } =
    videoData;

  const truncatedDescription = description.substring(0, 50) + "...";

  return (
    <>
      <Navbar />
      {isOpen ? <Sidebar /> : null}
      <div className="w-full h-full bg-[#0f172a] p-6 mt-14 flex flex-col md:flex-row">
        {videoData && (
          <div className="flex-1 h-full md:pr-4">
            {/* video player */}
            <VideoPlayer
              videoFile={videoFile?.url}
              thumbnail={thumbnail?.url}
            />
            {/* title section */}
            <div className="pt-4 px-3 pb-1">
              <h1 className="text-xl text-white font-bold">{title}</h1>
              <p className="text-gray-400 text-xs mt-1">
                {views} views • {createdAt}
              </p>
              {showFullDescription ? (
                <p className="mt-2 text-gray-300 text-xs transition-all duration-300 ease-in-out">
                  {description}
                </p>
              ) : (
                <p className="mt-2 text-gray-300 text-xs">
                  {truncatedDescription}
                  <button
                    className="text-xs text-gray-500 hover:text-gray-700 transition-colors duration-200"
                    onClick={() => setShowFullDescription(!showFullDescription)}
                  >
                    More
                  </button>
                </p>
              )}
              {showFullDescription && (
                <button
                  className="text-xs text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  onClick={() => setShowFullDescription(!showFullDescription)}
                >
                  Show Less
                </button>
              )}
            </div>
            {/* channel details section */}
            <div className="lg:flex lg:justify-between ">
              <div className="flex flex-wrap justify-between py-2 px-4">
                <div className="flex flex-wrap items-center">
                  <img
                    src={owner?.avatar?.url}
                    alt="Channel Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="ml-4 text-white text-sm">
                    {owner?.username}
                  </span>
                  <span className="ml-2 text-xs text-gray-400">
                    {owner?.subscribersCount} Subscribers
                  </span>
                </div>
                <div className="lg:ml-4">
                  <Button
                    onClick={() => setIsSubscribed(!isSubscribed)}
                    className="w-22 h-8 md:w-24 md:h-9 text-center bg-gray-500 hover:bg-gray-700 rounded-full text-white text-xs md:text-sm transition-colors duration-200"
                  >
                    {isSubscribed ? "Subscribed" : "Subscribe"}
                  </Button>
                </div>
              </div>
              {/* channel likes section */}
              <div className="flex flex-wrap items-center py-2 px-4 gap-2">
                <div className="h-9 p-2 w-30 rounded-full bg-gray-700 flex items-center justify-between">
                  <button
                    className={`flex items-center justify-center h-6 w-6 rounded-full transition-all duration-200 ease-in-out ${
                      isLiked
                        ? "bg-white text-black scale-105"
                        : "bg-gray-700 text-white hover:bg-gray-600"
                    }`}
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <SlLike size={"text-xs"} />
                  </button>
                  <span className="text-white text-xs px-2">600k</span>
                  <button
                    className={`flex items-center justify-center h-6 w-6 rounded-full transition-all duration-200 ease-in-out ${
                      isDisliked
                        ? "bg-white text-black scale-105"
                        : "bg-gray-700 text-white hover:bg-gray-600"
                    }`}
                    onClick={() => setIsDisliked(!isDisliked)}
                  >
                    <SlDislike size={"text-xs"} />
                  </button>
                </div>
                <div className="h-9 p-2 w-20 rounded-full bg-gray-700 flex items-center ">
                  <button
                    className={`flex items-center h-6 rounded-full transition-all duration-200 ease-in-out ${
                      isShared
                        ? "bg-gray-700 text-white scale-105"
                        : "bg-gray-700 text-white hover:bg-gray-600"
                    }`}
                    onClick={() => setIsShared(!isShared)}
                  >
                    <RiShareForwardLine size={"text-xs"} />
                    <span className="text-white text-xs px-2">share</span>{" "}
                  </button>
                </div>
              </div>
            </div>
            {/* comments */}
          </div>
        )}
        {/* video List */}
        <div className="w-full md:w-[400px] h-full mt-4 md:mt-0"> </div>
      </div>
    </>
  );
}

export default VideoDetail;
