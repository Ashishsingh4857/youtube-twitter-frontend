import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsQuestionCircle } from "react-icons/bs";
import { HiOutlinePlus } from "react-icons/hi";
import { FiMenu } from "react-icons/fi";
import { Logo, Input, Button, DropdownMenu } from "../index.js";
import { useSelector, useDispatch } from "react-redux";
import ClickAwayListener from "react-click-away-listener";
import { userLogout } from "../../store/slices/authSlice.js";
import { useNavigate } from "react-router-dom";
// icons
import { AiOutlineSetting, AiOutlineLogout } from "react-icons/ai";
import { FaRegMoon } from "react-icons/fa";
import { PiVideoDuotone } from "react-icons/pi";
import { IoCreateOutline } from "react-icons/io5";
import { toggleStudioSidebar } from "../../store/slices/globalSlice.js";
import { UploadVideoPopup } from "../index.js";

const StudioNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //toggle  search for small screen
  const [showSearch, setShowSearch] = useState(false);
  // upload video popup
  const [isUploadVideoPopupOpen, setIsUploadVideoPopupOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  // profile dropdown menu toggle
  const [isStudioProfileDropdownOpen, setIsStudioProfileDropdownOpen] =
    useState(false);
  // create button dropdown toggle
  const [isCreateDropdownOpen, setIsCreateDropdownOpen] = useState(false);

  // toggle sidebar
  const { isActive } = useSelector((state) => state.global.sidebar);
  // search handler
  const onSubmit = (data) => {
    console.log("Searching for:", data.searchQuery);
    reset();
  };

  //fetching logged in user data from store
  const { userData } = useSelector((state) => state.auth);
  const { avatar, username, fullName } = userData || {};

  // fallback avatar image
  const DEFAULT_AVATAR_URL =
    "https://res.cloudinary.com/ashishsingh4857/image/upload/v1762338092/rhg4ffc6zlc7txxofok2.jpg";

  // avatar dropdown menu  options and icons
  const profileOptions = [
    { text: "Sign out", onClick: () => dispatch(userLogout()) },
    { text: "Main-Menu", onClick: () => navigate("/") },
    { text: "Appearance: Dark" },
    { text: "Switch account" },
  ];

  const icons = {
    "Sign out": <AiOutlineLogout size={18} />,
    "Main-Menu": <PiVideoDuotone size={18} />,
    "Appearance: Dark": <FaRegMoon size={18} />,
    "Switch account": <AiOutlineSetting size={18} />,
  };

  // create button dropdown menu options and icons
  const createOptions = [
    {
      text: "Upload Video",
      onClick: () => setIsUploadVideoPopupOpen(true),
    },
    { text: "Create Post", onClick: () => navigate("/create-post") },
  ];

  const createIcons = {
    "Upload Video": <PiVideoDuotone size={18} />,
    "Create Post": <IoCreateOutline size={18} />,
  };

  return (
    <nav className="bg-gray-900 w-full text-white py-3 pr-6 pl-4 flex items-center justify-between shadow-md z-10 fixed top-0">
      <div className="flex items-center">
        {/* sidebar toggle button */}
        <Button className="mr-4 bg-gray-700 p-2 rounded-full hover:bg-gray-600 cursor-pointer">
          <FiMenu
            size={20}
            onClick={() => dispatch(toggleStudioSidebar(!isActive))}
          />
        </Button>
        <div className="flex items-center">
          <Logo text={false} />
          <span className="text-lg md:text-xl font-bold">Studio</span>
        </div>
      </div>

      {/* search bar for big screen devices*/}
      <div className={`hidden lg:flex items-center flex-1 max-w-md mx-4`}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex items-center"
        >
          <Input
            type="text"
            placeholder="Search across your channel"
            {...register("searchQuery")}
            className="w-full bg-gray-800 text-white p-2 rounded-full focus:outline-none focus:bg-gray-700 focus:border-[#A855F7]"
          />
        </form>
      </div>

      {/* search bar for small screen devices*/}
      <ClickAwayListener onClickAway={() => setShowSearch(false)}>
        <div className="lg:hidden ">
          {!showSearch && (
            <button onClick={() => setShowSearch(true)}>
              <AiOutlineSearch size={24} />
            </button>
          )}
          {showSearch && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="absolute top-14 left-0 right-0 bg-gray-900 p-4 lg:hidden"
            >
              <Input
                type="text"
                placeholder="Search across your channel"
                {...register("searchQuery")}
                className="w-full bg-gray-800 text-white p-2 rounded-full focus:outline-none focus:bg-gray-700 focus:border-[#A855F7]"
              />
            </form>
          )}
        </div>
      </ClickAwayListener>

      <div className="flex items-center space-x-4">
        <button className="hidden md:block">
          <BsQuestionCircle size={20} />
        </button>
        <button>
          <IoMdNotificationsOutline size={20} />
        </button>
        {/* create button dropdown */}
        <div className="relative">
          <Button
            className="text-sm flex items-center md:p-2 rounded-full hover:bg-gray-600"
            onClick={() => setIsCreateDropdownOpen(!isCreateDropdownOpen)}
          >
            <HiOutlinePlus size={20} />
            Create
          </Button>
          {isCreateDropdownOpen && (
            <ClickAwayListener
              onClickAway={() => setIsCreateDropdownOpen(false)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-10"
              >
                <DropdownMenu
                  options={createOptions}
                  icons={createIcons}
                  setIsActive={setIsCreateDropdownOpen}
                />
              </div>
            </ClickAwayListener>
          )}
        </div>
        {/* avatar and avatar dropdown */}
        {userData && (
          <div className="relative">
            <img
              src={avatar?.url || avatar || DEFAULT_AVATAR_URL}
              alt="avatar"
              className="w-8 h-8 rounded-full sm:block cursor-pointer"
              onClick={() =>
                setIsStudioProfileDropdownOpen(!isStudioProfileDropdownOpen)
              }
            />
            {isStudioProfileDropdownOpen && (
              <ClickAwayListener
                onClickAway={() =>
                  setIsStudioProfileDropdownOpen(!isStudioProfileDropdownOpen)
                }
              >
                <div onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu
                    options={profileOptions}
                    icons={icons}
                    avatar={userData.avatar?.url}
                    username={userData.username}
                    fullName={userData.fullName}
                    setIsActive={setIsStudioProfileDropdownOpen}
                  />
                </div>
              </ClickAwayListener>
            )}
          </div>
        )}
      </div>
      {/* Modal */}
      <UploadVideoPopup
        isOpen={isUploadVideoPopupOpen}
        onClose={() => setIsUploadVideoPopupOpen(false)}
      />
    </nav>
  );
};

export default StudioNavbar;
