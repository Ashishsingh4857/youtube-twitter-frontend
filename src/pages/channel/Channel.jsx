import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, NavLink, Outlet } from "react-router-dom";
import { userChannelProfile } from "../../store/slices/userSlice.js";
import { Button } from "../../components/index.js";

const UserChannelProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username } = useParams();
  //state to check if the logged in user is viewing their own profile
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  //toggle sidebar
  const { isOpen } = useSelector((state) => state.global.sidebar);
  const channel = useSelector((state) => state.user?.profileData);
  //logged in user
  const { userData } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(userChannelProfile(username));
  }, [dispatch, username]);

  const {
    avatar,
    coverImage,
    fullName,
    isSubscribed,
    subscribersCount,
    totalVideos,
  } = channel || {};

  //show the subscribe button only if logged in user is not equal to userprofile user
  const compareUser = () => {
    if (userData) {
      setIsOwnProfile(username === userData.username);
    }
  };

  useEffect(() => {
    compareUser();
  }, [username, userData]);

  // fallback url for avatar and coverImage
  const DEFAULT_AVATAR_URL =
    "https://res.cloudinary.com/ashishsingh4857/image/upload/v1762338092/rhg4ffc6zlc7txxofok2.jpg";
  const DEFAULT_COVER_IMAGE_URL =
    "https://res.cloudinary.com/ashishsingh4857/image/upload/v1762634381/synthwave-vaporwave-retrowave-cyber-background-600nw-1457569313_b3z64m.webp";

  //user account management buttons
  const buttons = [
    {
      label: isSubscribed ? "subscribed" : "Subscribe",
      className:
        "bg-[#A855F7] rounded-full px-2 py-2 text-xs md:text-sm lg:text-base md:px-4 md:py-2",
      onClick: () => console.log("Subscribe button clicked"),
      show: !isOwnProfile,
    },
    {
      label: "customize channel",
      className:
        "bg-gray-700 rounded-full px-2 py-2 text-xs md:text-sm lg:text-base md:px-4 md:py-2",
      onClick: () => navigate(`/studio/${username}/customization/profile`),
      show: isOwnProfile,
    },
    {
      label: "Manage videos",
      className:
        "bg-gray-700 rounded-full px-2 py-2 text-xs md:text-sm lg:text-base md:px-4 md:py-2",
      onClick: () => navigate(`/studio/${username}/content/videos`),
      show: isOwnProfile,
    },
  ];

  return (
    <div
      className={`p-2 md:p-4 lg:p-6 h-full min-h-screen bg-gray-900 mt-14 overflow-y-auto ${isOpen ? "ml-60 md:ml-25" : "ml-0 md:ml-25"}`}
    >
      <div className="h-30 md:h-48 bg-gray-200 mx-4 md:mx-8 lg:mx-16">
        <img
          src={coverImage?.url || coverImage || DEFAULT_COVER_IMAGE_URL}
          alt="Cover Photo"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container md:mx-auto p-4">
        <div className="flex flex-row items-center space-x-4 flex-wrap justify-center sm:justify-between">
          <img
            src={avatar?.url || avatar || DEFAULT_AVATAR_URL}
            alt={fullName}
            className="w-30 h-30 md:w-40 md:h-40 rounded-full object-cover -mt-8 md:-mt-10 border-4 border-white"
          />
          <div className="mt-4 md:mt-0 flex-grow">
            <h1 className="text-xl md:text-2xl font-bold text-white">
              {fullName}
            </h1>
            <div className="flex flex-col md:flex-row">
              <p className="text-sm font-bold text-gray-500">{username}</p>
              <p className="text-sm text-gray-500 md:ml-2">
                {subscribersCount} subscribers
              </p>
              <p className="text-sm text-gray-500 md:ml-2">
                videos {totalVideos ? totalVideos : 0}
              </p>
            </div>
          </div>
          {/* show the subscribe button only if logged in user is not equal to userprofile user */}
          <div className=" mt-4 sm:mt-0 flex space-x-4">
            {buttons.map(
              (button, index) =>
                button.show && (
                  <Button
                    key={index}
                    className={button.className}
                    onClick={button.onClick}
                  >
                    {button.label}
                  </Button>
                )
            )}
          </div>
        </div>
        <div className="flex space-x-4 mt-4 border-b border-gray-200 ">
          <NavLink
            to="featured"
            className={({ isActive }) =>
              `text-sm font-normal lg:text-lg pb-3  ${
                isActive
                  ? "border-b-2 border-[#A855F7] text-white"
                  : "text-gray-500"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="videos"
            className={({ isActive }) =>
              `text-sm font-normal lg:text-lg pb-3  ${
                isActive
                  ? "border-b-2 border-[#A855F7] text-white"
                  : "text-gray-500"
              }`
            }
          >
            Videos
          </NavLink>
          <NavLink
            to="playlist"
            className={({ isActive }) =>
              `text-sm font-normal lg:text-lg pb-3  ${
                isActive
                  ? "border-b-2 border-[#A855F7] text-white"
                  : "text-gray-500"
              }`
            }
          >
            Playlist
          </NavLink>
          <NavLink
            to="post"
            className={({ isActive }) =>
              `text-sm font-normal lg:text-lg pb-3  ${
                isActive
                  ? "border-b-2 border-[#A855F7] text-white"
                  : "text-gray-500"
              }`
            }
          >
            Post
          </NavLink>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default UserChannelProfile;
