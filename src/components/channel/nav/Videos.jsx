import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideosByUser } from "../../../store/slices/videoSlice.js";
import { Container, VideoCard } from "../../../components/index.js";

function Videos() {
  const { username } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideosByUser(username));
  }, [dispatch, username]);
  // userVideos data from store
  const videos = useSelector((state) => state.video?.userVideos?.docs);
  return (
    <div className="mt-4">
      <Container>
        {videos && videos.length > 0 ? (
          videos.map((video) => {
            const {
              thumbnail,
              title,
              description,
              views,
              createdAt,
              updatedAt,
              duration,
              isPublished,
              likesCount,
              commentsCount,
              _id,
            } = video || {};
            return (
              <VideoCard
                key={_id}
                // avatar={avatar?.url}
                duration={duration}
                title={title}
                thumbnail={thumbnail?.url}
                createdAt={createdAt}
                views={views}
                // channelName={username}
                videoId={_id}
              />
            );
          })
        ) : (
          <p className="text-white">No videos found.</p>
        )}
      </Container>
    </div>
  );
}

export default Videos;
