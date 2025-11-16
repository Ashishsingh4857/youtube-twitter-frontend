import React, { useState, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useSelector } from "react-redux";
import { FiCamera, FiEdit2, FiTrash2 } from "react-icons/fi";
import { Input, Button } from "../../index.js";
import { BsQuestionCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import {
  updateAvatar,
  updateUserDetails,
  updateCoverImg,
} from "../../../store/slices/authSlice.js";
import useDiscardChanges from "../../../hooks/useDiscardChanges.js";
import useFileSizeCheck from "../../../hooks/useFileSizeCheck.js";
import useFileTypeCheck from "../../../hooks/useFileTypeCheck.js";
import { useNavigate } from "react-router-dom";
import ProfileCustomizationSkeleton from "../../../skeleton/ProfileCustomizationSkeleton.jsx";

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // toggle sidebar
  const { isActive } = useSelector((state) => state.global.sidebar);
  // logged in user
  const { loading, userData } = useSelector((state) => state.auth);
  const { avatar, coverPhoto, email, fullName, username } = userData || {};

  const methods = useForm({
    defaultValues: {
      email,
      fullName,
      username,
    },
  });

  const { handleSubmit, setValue, reset, getValues } = methods;

  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [selectedCoverPhoto, setSelectedCoverPhoto] = useState(null);
  const [selectedFields, setSelectedFields] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(false);
  const [selectedFullName, setSelectedFullName] = useState(false);
  const [selectedUsername, setSelectedUsername] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [coverPhotoPreview, setCoverPhotoPreview] = useState(null);
  //validation errors
  const [error, setError] = useState(null);

  const avatarRef = useRef(null);
  const coverPhotoRef = useRef(null);

  const { handleDiscardChanges } = useDiscardChanges(getValues, reset, {
    avatarPreview,
    coverPhotoPreview,
    setAvatarPreview,
    setCoverPhotoPreview,
    selectedAvatar,
    setSelectedAvatar,
    selectedCoverPhoto,
    setSelectedCoverPhoto,
  });
  // checkering the uploading file size
  const avatarMaxSize = 4; // 4 MB
  const coverPhotoMaxSize = 6; // 6 MB

  const {
    isSizeExceeded: isAvatarSizeExceeded,
    errorMessage: avatarErrorMessage,
  } = useFileSizeCheck(avatarMaxSize, selectedAvatar);
  const {
    isSizeExceeded: isCoverPhotoSizeExceeded,
    errorMessage: coverPhotoErrorMessage,
  } = useFileSizeCheck(coverPhotoMaxSize, selectedCoverPhoto);

  // checkering the uploading file type
  const acceptedAvatarTypes = ["image/jpeg", "image/png", "image/webp"];
  const acceptedCoverPhotoTypes = ["image/jpeg", "image/png"];

  const {
    isFileTypeValid: isAvatarTypeValid,
    errorMessage: avatarTypeErrorMessage,
  } = useFileTypeCheck(acceptedAvatarTypes, selectedAvatar);
  const {
    isFileTypeValid: isCoverPhotoTypeValid,
    errorMessage: coverPhotoTypeErrorMessage,
  } = useFileTypeCheck(acceptedCoverPhotoTypes, selectedCoverPhoto);

  // submit the from
  const onSubmit = async (data) => {
    if (
      !selectedEmail &&
      !selectedFullName &&
      !selectedUsername &&
      !selectedAvatar &&
      !selectedCoverPhoto
    ) {
      setError("Please select at least one field to update");
      return;
    }

    try {
      if (selectedAvatar) {
        const avatarFormData = new FormData();
        avatarFormData.append("avatar", selectedAvatar);
        await dispatch(updateAvatar(avatarFormData));
      }

      if (selectedCoverPhoto) {
        const coverPhotoFormData = new FormData();
        coverPhotoFormData.append("coverImage", selectedCoverPhoto);
        await dispatch(updateCoverImg(coverPhotoFormData));
      }

      if (selectedEmail || selectedFullName || selectedUsername) {
        const userData = {};
        if (selectedEmail) userData.email = data.email;
        if (selectedFullName) userData.fullName = data.fullName;
        if (selectedUsername) userData.username = data.username;
        await dispatch(updateUserDetails(userData));
      }
      // Save changes...
      navigate(`/channel/${username}`);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setSelectedAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
    setValue("avatar", file);
  };

  const handleCoverPhotoChange = (e) => {
    const file = e.target.files[0];
    setSelectedCoverPhoto(file);
    setCoverPhotoPreview(URL.createObjectURL(file));
    setValue("coverPhoto", file);
  };

  //handle  select field to update
  const handleFieldChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedFields(selectedOptions);
    setSelectedEmail(selectedOptions.includes("email"));
    setSelectedFullName(selectedOptions.includes("fullName"));
    setSelectedUsername(selectedOptions.includes("username"));
    setError(null);
  };
  // handle the loading
  if (loading) {
    return (
      <div className="loading-container">
        <ProfileCustomizationSkeleton />
      </div>
    );
  }
  return (
    <FormProvider {...methods}>
      <div
        className={`bg-gray-900 p-8 min-h-screen max-w-screen h-full text-white${
          isActive ? "ml-64" : "ml-16"
        }`}
      >
        <form onSubmit={handleSubmit(onSubmit)} id="ProfileCustomizationForm">
          {/* edit cover image */}
          <div className="my-6">
            <p className="text-gray-500 mb-2">
              For the best results on all devices, use an image that’s at least
              2048 x 1152 pixels and 6MB or less.
            </p>
            <div className="relative w-full h-48 bg-gray-800 rounded-md shadow-lg border-4 border-white">
              {selectedCoverPhoto ? (
                <img
                  src={coverPhotoPreview}
                  alt="Cover Photo"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <img
                  src={coverPhoto?.url || coverPhoto}
                  alt="Cover Photo"
                  className="w-full h-full object-cover rounded-md"
                />
              )}
              <label className="absolute inset-0 cursor-pointer">
                <input
                  type="file"
                  ref={coverPhotoRef}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleCoverPhotoChange}
                />
                <FiCamera
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-gray-900 rounded-full p-2"
                  size={40}
                />
              </label>
            </div>

            {/* edit avatar section*/}
            <div className="relative w-32 h-32 -mt-16 ml-4 bg-gray-800 rounded-full shadow-lg border-4 border-white">
              {selectedAvatar ? (
                <img
                  src={avatarPreview}
                  alt="Avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <img
                  src={avatar?.url || avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              )}
              <label className="absolute inset-0 cursor-pointer">
                <input
                  type="file"
                  ref={avatarRef}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleAvatarChange}
                />
                <FiCamera
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-gray-900 rounded-full p-2"
                  size={40}
                />
              </label>
            </div>
            <p className="text-gray-500 my-4">
              It’s recommended to use a avatar picture that’s at least 98 x 98
              pixels and 4MB or less. Use a PNG or GIF (no animations) file.
              Make sure your picture follows the YouTube Community Guidelines.
            </p>
            {/* file size validation error */}
            {isAvatarSizeExceeded && (
              <p className="text-red-500 mb-2">{avatarErrorMessage}</p>
            )}
            {isCoverPhotoSizeExceeded && (
              <p className="text-red-500 mb-2">{coverPhotoErrorMessage}</p>
            )}
            {/* file type validation error */}
            {!isAvatarTypeValid && (
              <p className="text-red-500 mb-4">{avatarTypeErrorMessage}</p>
            )}
            {!isCoverPhotoTypeValid && (
              <p className="text-red-500 mb-4">{coverPhotoTypeErrorMessage}</p>
            )}
          </div>

          {/* select field to update */}
          <div className="w-full">
            <div className="mb-4">
              <label className="block text-xl text-white font-medium mb-4 ">
                Select fields to update
              </label>
              <select
                multiple
                value={selectedFields}
                onChange={handleFieldChange}
                className="w-full p-2 bg-gray-800 rounded-md shadow-lg"
              >
                <option
                  className="p-4 border rounded-md mb-2 text-white "
                  value="email"
                >
                  Email
                </option>
                <option
                  className="p-4 border rounded-md mb-2 text-white "
                  value="fullName"
                >
                  Full Name
                </option>
                <option
                  className="p-4 border rounded-md text-white "
                  value="username"
                >
                  Username
                </option>
              </select>
            </div>
          </div>

          {/* input field */}
          {selectedEmail && (
            <>
              <p className="flex text-gray-500 mb-2">
                Choose a email Changes made to your name and picture are visible
                only STREAMIFY and not other Google services. You can change
                your name twice in 14 days. <BsQuestionCircle size={20} />
              </p>
              <div className="p-4 border rounded-md mb-4">
                <label className="block text-sm font-medium mb-2 text-white ">
                  Email
                </label>
                <Input
                  type="email"
                  {...methods.register("email")}
                  className="w-full p-2 bg-gray-800 rounded-md shadow-lg"
                />
              </div>
            </>
          )}

          {selectedFullName && (
            <>
              <p className="flex text-gray-500 mb-2">
                Choose a channel name that represents you and your content.
                Changes made to your name and picture are visible only STREAMIFY
                and not other Google services. You can change your name twice in
                14 days. <BsQuestionCircle size={20} />
              </p>
              <div className="my-4 p-4 border rounded-md">
                <label className="block text-sm font-medium mb-2 text-white ">
                  Full Name
                </label>
                <Input
                  type="text"
                  {...methods.register("fullName")}
                  className="w-full p-2 bg-gray-800 rounded-md shadow-lg"
                />
              </div>
            </>
          )}

          {selectedUsername && (
            <>
              <p className="flex text-gray-500 mb-2">
                Choose your unique username by adding letters and numbers. You
                can change your handle back within 14 days. Handles can be
                changed twice every 14 days. <BsQuestionCircle size={20} />
              </p>
              <div className="mb-4 p-4 border rounded-md">
                <label className="block text-sm font-medium mb-2 text-white ">
                  Username
                </label>
                <Input
                  type="text"
                  {...methods.register("username")}
                  className="w-full p-2 bg-gray-800 rounded-md shadow-lg"
                />
              </div>
            </>
          )}

          {/* validation errors */}
          {error && <p className="text-red-500 mb-4">{error}</p>}
        </form>
        <div className="flex items-center">
          <Button
            type="submit"
            form="ProfileCustomizationForm"
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg ${
              isAvatarSizeExceeded ||
              isCoverPhotoSizeExceeded ||
              !isAvatarTypeValid ||
              !isCoverPhotoTypeValid ||
              loading
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={
              loading ||
              isAvatarSizeExceeded ||
              isCoverPhotoSizeExceeded ||
              !isAvatarTypeValid ||
              !isCoverPhotoTypeValid
            }
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
          <Button
            type="button"
            onClick={handleDiscardChanges}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg ml-4"
          >
            Discard Changes
          </Button>
        </div>
      </div>
    </FormProvider>
  );
};
export default EditProfile;
