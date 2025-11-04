import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVideoById } from "../store/slices/videoSlice.js";

function VideoDetail() {
  const { isOpen } = useSelector((state) => state.global.sidebar);
  const dispatch = useDispatch();
  const { videoId } = useParams();
  const video = useSelector((state) => state.video?.video); //single video doc
  console.log(video);

  useEffect(() => {
    if (videoId) {
      dispatch(getVideoById({ videoId }));
    }
  }, [dispatch, videoId]);

  return (
    <>
      <div
        className={`p-4 h-full w-full bg-gray-900 mt-14 overflow-y-auto-auto ${
          isOpen ? "ml-60 md:ml-25" : "ml-0 md:ml-25"
        }`}
      >
        Video Details
      </div>
    </>
  );
}

export default VideoDetail;
