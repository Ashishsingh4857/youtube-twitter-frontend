import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsQuestionCircle } from "react-icons/bs";
import { HiOutlinePlus } from "react-icons/hi";
import { MdMenuOpen } from "react-icons/md";
import { Logo, Input, Button, DropdownMenu } from "../index.js";
import { useSelector, useDispatch } from "react-redux";
import ClickAwayListener from "react-click-away-listener";
import { userLogout } from "../../store/slices/authSlice.js";
import { useNavigate } from "react-router-dom";
// icons
import {
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlineLogout,
  AiOutlineVideoCamera,
  AiOutlineCreditCard,
} from "react-icons/ai";
import { FaRegMoon } from "react-icons/fa";
import { PiVideoDuotone } from "react-icons/pi";
import { IoCreateOutline } from "react-icons/io5";
import {
  toggleSidebar,
  setIsProfileDropdownOpen,
} from "../../store/slices/globalSlice.js";
import { UploadVideoPopup } from "../index.js";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //toggle search for small screen
  const [showSearch, setShowSearch] = useState(false);
  // upload video popup
  const [isUploadVideoPopupOpen, setIsUploadVideoPopupOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  // create button dropdown toggle
  const [isCreateDropdownOpen, setIsCreateDropdownOpen] = useState(false);

  // toggle
  const { sidebar, navbar } = useSelector((state) => state.global);

  //fetching logged in user data from store
  const { userData } = useSelector((state) => state.auth);

  //logged the user
  const handleLogout = () => {
    dispatch(userLogout());
  };

  //search
  const onSubmit = (data) => {
    console.log("Searching for:", data.searchQuery);
    reset();
  };

  // fallback avatar image
  const DEFAULT_AVATAR_URL =
    "https://res.cloudinary.com/ashishsingh4857/image/upload/v1762338092/rhg4ffc6zlc7txxofok2.jpg";

  // avatar dropdown icons and options
  const profileOptions = [
    { text: "Sign out", onClick: handleLogout },
    {
      text: "Creator Studio",
      onClick: () => navigate(`/studio/${userData?.username}/dashboard`),
    },
    { text: "Google Account" },
    { text: "Switch account" },
    { text: "Appearance: Dark" },
    { text: "Purchases and memberships" },
  ];
  const icons = {
    "Google Account": <AiOutlineUser size={18} />,
    "Switch account": <AiOutlineSetting size={18} />,
    "Sign out": <AiOutlineLogout size={18} />,
    "Creator Studio": <AiOutlineVideoCamera size={18} />,
    "Appearance: Dark": <FaRegMoon size={18} />,
    "Purchases and memberships": <AiOutlineCreditCard size={18} />,
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
        {sidebar.isOpen ? (
          <>
            <MdMenuOpen
              className="text-2xl mr-4 cursor-pointer text-gray-400 hover:text-white transition-colors"
              onClick={() => dispatch(toggleSidebar())}
            />
          </>
        ) : (
          <>
            <AiOutlineMenu
              className="text-2xl mr-4 cursor-pointer text-gray-400 hover:text-white transition-colors"
              onClick={() => dispatch(toggleSidebar())}
            />
          </>
        )}
        <Logo className="hidden sm:block" />
      </div>

      {/* search bar for big screen devices*/}
      <div className="flex-grow flex justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`flex items-center ${showSearch ? "w-full" : "hidden"} sm:w-1/2 sm:flex`}
        >
          <Input
            type="search"
            {...register("searchQuery")}
            placeholder="Search"
            className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <Button
            type="submit"
            className="p-2 border border-gray-600 rounded-lg bg-gray-700 hover:bg-gray-600 text-white ml-2"
          >
            <AiOutlineSearch className="text-xl" />
          </Button>
        </form>
        <button
          className={`sm:hidden ${showSearch ? "hidden" : "block"}`}
          onClick={() => setShowSearch(true)}
        >
          <AiOutlineSearch className="text-2xl text-gray-400 hover:text-white transition-colors" />
        </button>
      </div>

      {/* search bar for small screen devices*/}
      <ClickAwayListener onClickAway={() => setShowSearch(false)}>
        <div className="lg:hidden ">
          {showSearch && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="absolute top-14 left-0 right-0 bg-gray-900 p-4 lg:hidden"
            >
              <Input
                type="text"
                placeholder="Search"
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
            className="text-sm flex items-center p-2 rounded-full bg-gray-700 hover:bg-gray-600 cursor-pointer capitalize"
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
        <div>
          {userData ? (
            <div className="relative">
              <img
                src={userData.avatar?.url || DEFAULT_AVATAR_URL}
                alt="avatar"
                className="w-8 h-8 rounded-full sm:block cursor-pointer"
                onClick={() =>
                  dispatch(
                    setIsProfileDropdownOpen(!navbar.isProfileDropdownOpen)
                  )
                }
              />
              {navbar.isProfileDropdownOpen && (
                <ClickAwayListener
                  onClickAway={() => dispatch(setIsProfileDropdownOpen(false))}
                >
                  <div onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu
                      options={profileOptions}
                      icons={icons}
                      setIsActive={(value) =>
                        dispatch(setIsProfileDropdownOpen(value))
                      }
                      avatar={userData.avatar?.url}
                      username={userData.username}
                      fullName={userData.fullName}
                    />
                  </div>
                </ClickAwayListener>
              )}
            </div>
          ) : (
            <button
              className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white border border-white rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => navigate("/login")}
            >
              <AiOutlineUser className="mr-2" />
              Sign in
            </button>
          )}
        </div>
      </div>
      {/* Modal */}
      <UploadVideoPopup
        isOpen={isUploadVideoPopupOpen}
        onClose={() => setIsUploadVideoPopupOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
