import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../store/slices/globalSlice.js";
import { Container, VideoCard } from "../components/index.js";
import VideoCardSkeleton from "../skeleton/VideoCardSkeleton.jsx";
import { getAllVideos } from "../store/slices/videoSlice.js";

const Homepage = () => {
  // toggle sidebar
  const { isOpen } = useSelector((state) => state.global.sidebar);
  const dispatch = useDispatch();
  //taking videos from store
  const videos = useSelector((state) => state.video?.videos?.docs);
  const loading = useSelector((state) => state.video?.loading);
  const [isLoading, setIsLoading] = useState(false);
  console.log(videos);

  useEffect(() => {
    dispatch(getAllVideos({ page: 1, limit: 10 }));
  }, [dispatch]);

  //loading state
  useEffect(() => {
    if (loading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loading]);

  return (
    <main
      className={`p-4 h-full w-full bg-gray-900 mt-14 overflow-y-auto-auto ${
        isOpen ? "ml-60 md:ml-25" : "ml-0 md:ml-25"
      }`}
      onClick={isOpen ? () => dispatch(toggleSidebar()) : null}
    >
      {/* section Recommended---> */}
      <section>
        <h1 className="text-2xl font-bold text-white mb-4">Recommended</h1>
        <Container>
          {isLoading
            ? Array(10)
                .fill()
                .map((_, index) => <VideoCardSkeleton key={index} />)
            : videos?.map((video) => (
                <VideoCard
                  key={video._id}
                  avatar={video.ownerDetails?.avatar?.url}
                  duration={video.duration}
                  title={video.title}
                  thumbnail={video.thumbnail?.url}
                  createdAt={video.createdAt}
                  views={video.views}
                  channelName={video.ownerDetails.username}
                  videoId={video._id}
                />
              ))}
        </Container>
      </section>
    </main>
  );
};

export default Homepage;
