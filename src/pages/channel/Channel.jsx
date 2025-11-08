import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { userChannelProfile } from "../../store/slices/userSlice.js";
const UserChannelProfile = () => {
  const dispatch = useDispatch();
  const { username } = useParams();

  const [isOwnProfile, setIsOwnProfile] = useState(false); // toggle subscribe btn
  const [activeTab, setActiveTab] = useState("home");

  //toggle sidebar
  const { isOpen } = useSelector((state) => state.global.sidebar);
  const channel = useSelector((state) => state.user?.profileData);
  const { userData } = useSelector((state) => state.auth); //logged in user
  useEffect(() => {
    dispatch(userChannelProfile(username));
  }, [dispatch, username]);
  const { avatar, coverImage, fullName, isSubscribed, subscribersCount } =
    channel || {};

  //show the subscribe button only if logged in  user is not equal to userprofile user
  const compareUser = () => {
    if (userData) {
      setIsOwnProfile(username === userData.username);
    }
  };
  useEffect(() => {
    compareUser();
  }, [username, userData]);

  return (
    <div
      className={`p-2 md:p-4 lg:p-6 h-full w-full bg-gray-900 mt-14 overflow-y-auto ${
        isOpen ? "ml-60 md:ml-25" : "ml-0 md:ml-25"
      }`}
    >
      <div className="h-30 md:h-48 bg-gray-200 mx-4 md:mx-8 lg:mx-16">
        <img
          src={coverImage?.url || coverImage}
          alt="Cover Photo"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container  md:mx-auto p-4">
        <div className="flex flex-row items-center space-x-4  flex-wrap justify-center sm:justify-between">
          <img
            src={avatar?.url || avatar}
            alt={fullName}
            className="w-30 h-30 md:w-40 md:h-40 rounded-full object-cover -mt-8 md:-mt-10 border-4 border-white"
          />
          <div className="mt-4 md:mt-0 flex-grow">
            <h1 className="text-xl md:text-2xl font-bold text-white">
              {fullName}
            </h1>
            <div className="flex flex-col  md:flex-row">
              <p className="text-sm font-bold text-gray-500">{username}</p>
              <p className="text-sm text-gray-500 md:ml-2">
                {subscribersCount} subscribers
              </p>
              <p className="text-sm text-gray-500 md:ml-2">100 video</p>
            </div>
          </div>
          {/* show the subscribe button only if logged in  user is not equal to userprofile user */}
          {!isOwnProfile && (
            <button className=" px-2 py-2 text-xs md:text-sm lg:text-base md:px-4 md:py-2 bg-[#A855F7] text-white rounded-full hover:bg-[#a955f7c4]">
              {isSubscribed ? "subscribed" : "Subscribe"}
            </button>
          )}
        </div>
        <div className="flex space-x-4 mt-4 border-b border-gray-200 ">
          <button
            onClick={() => setActiveTab("home")}
            className={`px-4 py-2 text-gray-500 ${
              activeTab === "home"
                ? "border-b-2 border-[#A855F7] text-white"
                : ""
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab("videos")}
            className={`px-4 py-2 text-gray-500 ${
              activeTab === "videos"
                ? "border-b-2 border-[#A855F7] text-white"
                : ""
            }`}
          >
            Videos
          </button>
          <button
            onClick={() => setActiveTab("playlists")}
            className={`px-4 py-2 text-gray-500 ${
              activeTab === "playlists"
                ? "border-b-2 border-[#A855F7] text-white"
                : ""
            }`}
          >
            Playlists
          </button>
        </div>
        {activeTab === "home" && (
          <div className="mt-4">
            <h2 className="text-lg font-bold text-gray-800">Home</h2>
            {/* <!-- Home content --> */}
          </div>
        )}
        {activeTab === "videos" && (
          <div className="mt-4">
            <h2 className="text-lg font-bold text-gray-800">Videos</h2>
            {/* <!-- Video list content  --> */}
            <h3 className="text-gray-800">
              owner wise videos filter functionality coming soon..
            </h3>
          </div>
        )}
        {activeTab === "playlists" && (
          <div className="mt-4">
            <h2 className="text-lg font-bold text-gray-800">Playlists</h2>
            {/* <!-- Playlist content */}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserChannelProfile;
