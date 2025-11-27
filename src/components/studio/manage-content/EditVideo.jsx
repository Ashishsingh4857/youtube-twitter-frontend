import React, { useEffect } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { useParams } from "react-router-dom";
import { VideoPlayer, Button } from "../../index.js";
import { useSelector, useDispatch } from "react-redux";
import {
  getVideoById,
  updateAVideo,
} from "../../../store/slices/videoSlice.js";
import { useForm } from "react-hook-form";

const EditVideo = () => {
  const { videoId } = useParams();
  const dispatch = useDispatch();
  const { video } = useSelector((state) => state.video);
  const videoData = video?.[0];

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (videoId) {
      dispatch(getVideoById({ videoId }));
    }
  }, [dispatch, videoId]);

  useEffect(() => {
    if (videoData) {
      reset({
        title: videoData.title,
        description: videoData.description,
      });
    }
  }, [videoData, reset]);

  const onSubmit = async (data) => {
    await dispatch(updateAVideo({ videoId, data }));
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="flex justify-between mb-4 flex-wrap">
        <h1 className="text-2xl font-bold">Edit Video details</h1>
        <div className="mt-2 md:mt-0">
          <Button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-lg text-xs md:text-sm "
          >
            Discard Changes
          </Button>
          <Button
            form="EditVideoForm"
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-lg text-xs md:text-sm ml-4"
          >
            Save
          </Button>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} id="EditVideoForm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div>
            <div className="mb-4">
              <label className="block mb-1">Title (required)</label>
              <input
                type="text"
                {...register("title", { required: true })}
                className="w-full p-2 bg-gray-800 rounded "
                maxLength={100}
              />
              {errors.title && (
                <p className="text-red-500">Title is required</p>
              )}
              <div className="text-sm text-gray-500 text-right">
                {videoData?.title?.length}/100
              </div>
            </div>
            <div className="mb-4 ">
              <label className="block mb-1">Description</label>
              <textarea
                {...register("description")}
                className="w-full p-2 bg-gray-800 rounded "
                rows={6}
              />
            </div>
            {/* thumbnail */}
            <div className="mb-4">
              <label className="block mb-1">Thumbnail</label>
              <div className="space-x-4">
                <div className="relative inline-block">
                  <p className="text-sm text-gray-500 mb-2">
                    Set a thumbnail that stands out and draws viewers'
                    attention.
                  </p>
                  <input
                    type="file"
                    id="thumbnail"
                    {...register("thumbnail")}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <label htmlFor="thumbnail">
                    <div className="bg-gray-800 p-4 rounded cursor-pointer hover:bg-gray-700 flex flex-col items-center border">
                      <span>
                        <MdOutlineFileUpload size={30} />
                      </span>
                      <span>Upload file</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            {/* ... other fields ... */}
          </div>
          {/* Right Column */}
          <div>
            <div className="mb-4 bg-gray-800 rounded">
              <div className="aspect-video bg-black ">
                <video
                  src={videoData?.videoFile?.url}
                  poster={videoData?.thumbnail?.url}
                  controls={true}
                ></video>
              </div>
              <div className="p-2 border-t-2 ">
                <p className="text-xs">Video Link</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditVideo;
