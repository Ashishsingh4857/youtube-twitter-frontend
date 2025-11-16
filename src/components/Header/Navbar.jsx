import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../../store/slices/authSlice.js";
import { AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";
import { Logo, Input, Button, DropdownMenu } from "../index.js";
import { useForm } from "react-hook-form";
import {
  toggleSidebar,
  setIsProfileDropdownOpen,
} from "../../store/slices/globalSlice.js";
import { MdMenuOpen } from "react-icons/md";
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
import ClickAwayListener from "react-click-away-listener";

const Navbar = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const { register, handleSubmit } = useForm();
  const [showSearch, setShowSearch] = useState(false);
  // toggle
  const { sidebar, navbar } = useSelector((state) => state.global);
  const navigate = useNavigate();

  //logged the user
  const handleLogout = () => {
    dispatch(userLogout());
  };

  //search
  const onSubmit = async (data) => {
    console.log("Searching for:", data.searchQuery);
  };

  // avatar dropdown icons and options
  const profileOptions = [
    { text: "Sign out", onClick: handleLogout },
    {
      text: "Creator Studio",
      onClick: () => navigate(`/studio/${userData.username}`),
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

  return (
    <nav className="w-full h-14 p-3 flex justify-between items-center bg-gray-900 border-b border-gray-800 shadow-md fixed top-0 z-10">
      <div className="flex items-center">
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
      <div>
        {userData ? (
          <div className="relative">
            <img
              src={userData.avatar?.url}
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
    </nav>
  );
};

export default Navbar;
