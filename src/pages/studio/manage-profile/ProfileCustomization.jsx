import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { FiCamera, FiEdit2, FiTrash2 } from "react-icons/fi";
import { Input, Button } from "../../../components/index.js";
import { BsQuestionCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import {
  updateAvatar,
  updateUserDetails,
  updateCoverImg,
} from "../../../store/slices/authSlice.js";

const ProfileCustomization = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // toggle sidebar
  const { isActive } = useSelector((state) => state.global.sidebar);
  // logged in user
  const { userData } = useSelector((state) => state.auth);
  const { avatar, coverPhoto, email, fullName, username } = userData || {};

  // form input state handling
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [selectedCoverPhoto, setSelectedCoverPhoto] = useState(null);
  const [selectedFields, setSelectedFields] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(false);
  const [selectedFullName, setSelectedFullName] = useState(false);
  const [selectedUsername, setSelectedUsername] = useState(false);
  //validation errors
  const [error, setError] = useState(null);

  //image preview
  useEffect(() => {
    return () => {
      if (selectedAvatar) URL.revokeObjectURL(selectedAvatar);
      if (selectedCoverPhoto) URL.revokeObjectURL(selectedCoverPhoto);
    };
  }, [selectedAvatar, selectedCoverPhoto]);

  // handle form submission
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
      const formData = new FormData();
      if (selectedAvatar) {
        formData.append("avatar", selectedAvatar);
        await dispatch(updateAvatar(formData));
      }

      if (selectedCoverPhoto) {
        formData.append("coverImage", selectedCoverPhoto);
        await dispatch(updateCoverImg(formData));
      }
      if (selectedEmail || selectedFullName || selectedUsername) {
        const userData = {};
        if (selectedEmail) userData.email = data.email;
        if (selectedFullName) userData.fullName = data.fullName;
        if (selectedUsername) userData.username = data.username;

        await dispatch(updateUserDetails(userData));
      }
    } catch (error) {
      setError(error.message);
    }
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

  // check the file size
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setSelectedAvatar(file);
  };
  // check the file size
  const handleCoverPhotoChange = (e) => {
    const file = e.target.files[0];
    setSelectedCoverPhoto(file);
  };

  return (
    <div
      className={`bg-gray-900 w-full max-w-screen h-full text-white p-6 mt-16  ${
        isActive ? "ml-64" : "ml-16"
      }`}
    >
      <h1 className="text-2xl font-bold mb-4">Profile Customization</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* edit cover image */}
        <div className="mb-4">
          <p className="text-gray-500 mb-2">
            For the best results on all devices, use an image that’s at least
            2048 x 1152 pixels and 6MB or less.{" "}
          </p>
          <div className="relative w-full h-48 bg-gray-800 rounded-md shadow-lg border-4 border-white">
            {selectedCoverPhoto ? (
              <img
                src={URL.createObjectURL(selectedCoverPhoto)}
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
                {...register("coverPhoto")}
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
                src={URL.createObjectURL(selectedAvatar)}
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
                {...register("avatar")}
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleAvatarChange}
              />
              <FiCamera
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-gray-900 rounded-full p-2"
                size={40}
              />
            </label>
          </div>
          <p className="text-gray-500">
            It’s recommended to use a avatar picture that’s at least 98 x 98
            pixels and 4MB or less. Use a PNG or GIF (no animations) file. Make
            sure your picture follows the YouTube Community Guidelines.
          </p>
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
              <option className="p-4 border rounded-md mb-2" value="email">
                Email
              </option>
              <option className="p-4 border rounded-md mb-2" value="fullName">
                Full Name
              </option>
              <option className="p-4 border rounded-md" value="username">
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
              only STREAMIFY and not other Google services. You can change your
              name twice in 14 days.
              <BsQuestionCircle size={20} />
            </p>
            <div className="p-4 border rounded-md mb-4">
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                {...register("email")}
                className="w-full p-2 bg-gray-800 rounded-md shadow-lg"
                defaultValue={email}
              />
              {errors.email && (
                <span className="text-red-500">Email is required</span>
              )}
            </div>
          </>
        )}
        {selectedFullName && (
          <>
            <p className="flex text-gray-500 mb-2">
              Choose a channel name that represents you and your content.
              Changes made to your name and picture are visible only STREAMIFY
              and not other Google services. You can change your name twice in
              14 days.
              <BsQuestionCircle size={20} />
            </p>
            <div className="my-4 p-4 border rounded-md">
              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <Input
                type="text"
                {...register("fullName")}
                className="w-full p-2 bg-gray-800 rounded-md shadow-lg"
                defaultValue={fullName}
              />
              {errors.fullName && (
                <span className="text-red-500">Full Name is required</span>
              )}
            </div>
          </>
        )}
        {selectedUsername && (
          <>
            <p className="flex text-gray-500 mb-2">
              Choose your unique username by adding letters and numbers. You can
              change your handle back within 14 days. Handles can be changed
              twice every 14 days.
              <BsQuestionCircle size={20} />
            </p>
            <div className="mb-4 p-4 border rounded-md">
              <label className="block text-sm font-medium mb-2">Username</label>
              <Input
                type="text"
                {...register("username")}
                className="w-full p-2 bg-gray-800 rounded-md shadow-lg"
                defaultValue={username}
              />
              {errors.username && (
                <span className="text-red-500">Username is required</span>
              )}
            </div>
          </>
        )}
        {/* validation errors */}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <Button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg"
        >
          Save Changes
        </Button>
      </form>
    </div>
  );
};
export default ProfileCustomization;
