import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideosByUser } from "../../../store/slices/videoSlice.js";
import { Container, VideoCard } from "../../../components/index.js";

function Featured() {
  const { username } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideosByUser(username));
  }, [dispatch, username]);
  // userVideos data from store
  const videos = useSelector((state) => state.video?.userVideos?.docs);
  console.log("Videos:", videos);

  return (
    <div>
      <div className="py-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold  pb-9 pt-6 pl-8 text-white">
          Popular videos
        </h2>
        <Container>
          {videos && videos.length > 0 ? (
            videos.map((video) => {
              const {
                thumbnail,
                title,
                views,
                createdAt,
                updatedAt,
                duration,
                _id,
              } = video || {};
              return (
                <VideoCard
                  key={_id}
                  duration={duration}
                  title={title}
                  thumbnail={thumbnail?.url}
                  createdAt={createdAt}
                  views={views}
                  videoId={_id}
                />
              );
            })
          ) : (
            <p>No videos found.</p>
          )}
        </Container>
      </div>
    </div>
  );
}

export default Featured;
