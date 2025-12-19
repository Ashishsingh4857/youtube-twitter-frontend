import React, { useEffect, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { VideoPlayer, Button, DashboardDropdown } from "../../index.js";
import { useSelector, useDispatch } from "react-redux";
import {
  getVideoById,
  updateAVideo,
  togglePublishStatus,
} from "../../../store/slices/videoSlice.js";
import { useForm } from "react-hook-form";
import { RiGitRepositoryPrivateLine } from "react-icons/ri";
import { MdOutlinePublic } from "react-icons/md";
import useFileSizeCheck from "../../../hooks/useFileSizeCheck.js";
import useFileTypeCheck from "../../../hooks/useFileTypeCheck.js";
import useDiscardChanges from "../../../hooks/useDiscardChanges.js";

const EditVideo = () => {
  const { videoId } = useParams();
  const dispatch = useDispatch();
  const [VideoVisibilityDropdown, setVideoVisibilityDropdown] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const { video } = useSelector((state) => state.video);
  const videoData = video?.[0];

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    control,
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
      setThumbnailPreview(videoData.thumbnail.url);
    }
  }, [videoData, reset]);
  //form submit
  const onSubmit = async (data) => {
    await dispatch(updateAVideo({ videoId, data }));
  };

  const handleVisibilityChange = async () => {
    await dispatch(togglePublishStatus(videoId));
    setVideoVisibilityDropdown(null);
    await dispatch(getVideoById({ videoId }));
  };

  const { isSizeExceeded, errorMessage } = useFileSizeCheck(1, thumbnailFile);
  const { isFileTypeValid, errorMessage: typeErrorMessage } = useFileTypeCheck(
    ["image/jpeg", "image/png", "image/gif"],
    thumbnailFile
  );
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };
  const { handleDiscardChanges } = useDiscardChanges(getValues, reset, {
    thumbnailPreview,
    setThumbnailPreview,
  });

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="flex justify-between mb-4 flex-wrap">
        <h1 className="text-2xl font-bold">Edit Video details</h1>
        <div className="mt-2 md:mt-0">
          <Button
            type="button"
            onClick={handleDiscardChanges}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-lg text-xs md:text-sm "
          >
            Discard Changes
          </Button>
          <Button
            form="EditVideoForm"
            type="submit"
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-lg text-xs md:text-sm ml-4 ${!isFileTypeValid || isSizeExceeded ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={!isFileTypeValid || isSizeExceeded}
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
                    onChange={handleThumbnailChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <label htmlFor="thumbnail">
                    <div className="h-25 bg-gray-800 p-4 rounded cursor-pointer hover:bg-gray-700 flex flex-col items-center border ">
                      {thumbnailPreview && (
                        <img
                          src={thumbnailPreview}
                          alt="Thumbnail Preview"
                          className="max-h-20 object-cover rounded relative"
                        />
                      )}
                      <div className="flex flex-col items-center justify-center absolute">
                        <span>
                          <MdOutlineFileUpload size={30} />
                        </span>
                        <span>
                          {thumbnailPreview
                            ? "Change Thumbnail"
                            : "Upload file"}
                        </span>
                      </div>
                    </div>
                  </label>
                  {isSizeExceeded && (
                    <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                  )}
                  {typeErrorMessage && (
                    <p className="text-red-500 text-sm mt-2">
                      {typeErrorMessage}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* ... other fields ... */}
          </div>
          {/* Right Column */}
          <div>
            <div className="mb-4 bg-gray-800 rounded">
              {/* Aspect‑ratio container – forces 16:9 shape */}
              <div className="aspect-video bg-black w-full">
                <video
                  className="w-full h-full object-cover"
                  src={videoData?.videoFile?.url}
                  poster={thumbnailPreview || videoData?.thumbnail?.url}
                  controls
                />
              </div>
              <div className="p-2 border-t-2">
                <p className="text-xs">Video Link</p>
              </div>
            </div>
            {/*video visibility*/}
            <div className="relative">
              <label className="block mb-1">Visibility</label>
              <div
                className="flex items-center cursor-pointer w-full p-2 bg-gray-800 rounded"
                onClick={() =>
                  setVideoVisibilityDropdown(
                    VideoVisibilityDropdown === videoId ? null : videoId
                  )
                }
              >
                <span className="mr-2">
                  {videoData?.isPublished ? (
                    <MdOutlinePublic size={20} />
                  ) : (
                    <RiGitRepositoryPrivateLine size={20} />
                  )}
                </span>
                <span>{videoData?.isPublished ? "Public" : "Private"}</span>
                <FiChevronDown className="ml-2" />
              </div>
              {VideoVisibilityDropdown === videoId && (
                <DashboardDropdown
                  isOpen={true}
                  onClose={() => setVideoVisibilityDropdown(null)}
                  className="left-0"
                >
                  <ul>
                    {!videoData?.isPublished ? (
                      <li
                        className="px-2 py-2 hover:bg-[#A855F7] cursor-pointer"
                        onClick={handleVisibilityChange}
                      >
                        Public
                      </li>
                    ) : (
                      <li
                        className="px-2 py-2 hover:bg-[#A855F7] cursor-pointer"
                        onClick={handleVisibilityChange}
                      >
                        Private
                      </li>
                    )}
                  </ul>
                </DashboardDropdown>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditVideo;
