import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideosByUser } from "../../../store/slices/videoSlice.js";
import { VideoSlider } from "../../../components/index.js";

function Featured() {
  const { username } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideosByUser(username));
  }, [dispatch, username]);
  // userVideos data from store
  const videos = useSelector((state) => state.video?.userVideos?.docs);

  return (
    <div>
      <div className="py-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold  pb-9 pt-6 pl-8 text-white">
          Popular videos
        </h2>
        <VideoSlider videos={videos} />
      </div>
    </div>
  );
}

export default Featured;
