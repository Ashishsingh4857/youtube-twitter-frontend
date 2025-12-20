import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { publishAvideo } from "../../../store/slices/videoSlice.js";
import Dropzone from "react-dropzone";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BsRocketFill } from "react-icons/bs";
import RocketVideoUploadAnimation from "../../../skeleton/RocketVideoUploadAnimation.jsx";

function UploadVideoPopup({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // Access the uploading and error states from the video slice
  // const { uploading } = useSelector((state) => state.video.status);
  const uploading = true;
  const { userData } = useSelector((state) => state.auth);

  // File selected
  const onDrop = (acceptedFiles) => {
    const selected = acceptedFiles[0];
    if (!selected) return;

    // Basic validation (type, size)
    setFile(selected);
    setValue("videoFile", selected);

    // Generate thumbnail preview
    const url = URL.createObjectURL(selected);
    setPreview(url);
  };

  // Form submit → dispatch upload action
  const onSubmit = async (data) => {
    if (!file) return;
    await dispatch(publishAvideo({ ...data, videoFile: [file] }));
    navigate(`/studio/${userData?.username}/content/videos`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6 md:p-8">
      <div className="relative w-full max-w-2xl bg-gray-900 rounded-xl p-4 sm:p-6 md:p-8 shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-white">
            Upload Video
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <IoMdClose size={20} sm={24} />
          </button>
        </div>

        {/* Render the RocketUpload component when uploading is true */}
        {uploading ? (
          <RocketVideoUploadAnimation onClose={onClose} />
        ) : (
          <>
            {/* Dropzone */}
            <Dropzone onDrop={onDrop} accept="video/*" multiple={false}>
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps()}
                  className="border-2 border-dashed border-gray-600 p-6 sm:p-8 md:p-12 text-center cursor-pointer hover:border-purple-500"
                >
                  <input {...getInputProps()} />
                  {file ? (
                    <p className="text-white text-sm sm:text-base">
                      {file.name}
                    </p>
                  ) : (
                    <p className="text-white text-sm sm:text-base">
                      Drag & drop a video, or click to select
                    </p>
                  )}
                </div>
              )}
            </Dropzone>

            {preview && (
              <div className="mt-4">
                <video
                  src={preview}
                  controls
                  className="w-full max-h-20 sm:max-h-30 md:max-h-40"
                />
              </div>
            )}

            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-6 space-y-2 sm:space-y-3 md:space-y-4"
            >
              <div>
                <label className="block text-xs sm:text-sm text-gray-300">
                  Title
                </label>
                <input
                  {...register("title", { required: "Title is required" })}
                  className="w-full p-2 bg-gray-800 text-white rounded text-sm sm:text-base"
                />
                {errors.title && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-gray-300">
                  Description
                </label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className="w-full p-2 bg-gray-800 text-white rounded text-sm sm:text-base"
                  rows={3}
                  sm={4}
                  md={5}
                />
                {errors.description && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-gray-300">
                  Thumbnail
                </label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("thumbnail", {
                    required: "Thumbnail is required",
                  })}
                  className="w-full p-2 bg-gray-800 text-white rounded text-sm sm:text-base"
                />
                {errors.thumbnail && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.thumbnail.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-gray-300">
                  Visibility
                </label>
                <select
                  {...register("visibility", {
                    required: "Visibility is required",
                  })}
                  className="w-full p-2 bg-gray-800 text-white rounded text-sm sm:text-base"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
                {errors.visibility && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.visibility.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end space-x-2 sm:space-x-3 md:space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!file || uploading}
                  className="px-3 py-1 sm:px-4 sm:py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 text-sm sm:text-base"
                >
                  {uploading ? "Uploading..." : "Publish"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default UploadVideoPopup;
