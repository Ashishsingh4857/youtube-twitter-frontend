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

const StudioNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //toggle  search for small screen
  const [showSearch, setShowSearch] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  // profile dropdown menu toggle
  const [isStudioProfileDropdownOpen, setIsStudioProfileDropdownOpen] =
    useState(false);

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

  return (
    <nav className="bg-gray-900 w-full text-white py-3 pr-6 pl-4 flex items-center justify-between shadow-md z-10 fixed top-0">
      <div className="flex items-center">
        {/* sidebar toggle button */}
        <Button className="mr-4 bg-gray-700 p-2 rounded-full hover:bg-gray-600 cursor-pointer">
          <FiMenu size={20} />
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
        {/* upload videos*/}
        <Button className="text-sm  flex items-center md:p-2 rounded-full  hover:bg-gray-600">
          <HiOutlinePlus size={20} /> Create
        </Button>
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
    </nav>
  );
};

export default StudioNavbar;
