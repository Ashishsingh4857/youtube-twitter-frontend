import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsQuestionCircle } from "react-icons/bs";
import { HiOutlinePlus } from "react-icons/hi";
import { FiMenu } from "react-icons/fi";
import { Logo, Input, Button } from "../index.js";
import { useSelector } from "react-redux";

const StudioNavbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log("Searching for:", data.searchQuery);
    reset();
  };
  const { userData } = useSelector((state) => state.auth);
  const { avatar, username, fullName } = userData || {};
  console.log(userData);

  // fallback avatar image
  const DEFAULT_AVATAR_URL =
    "https://res.cloudinary.com/ashishsingh4857/image/upload/v1762338092/rhg4ffc6zlc7txxofok2.jpg";

  return (
    <nav className="bg-gray-900 text-white p-4 flex items-center justify-between shadow-md z-10">
      <div className="flex items-center">
        {/* sidebar toggle button */}
        <Button className="mr-4 bg-gray-700 p-2 rounded-full hover:bg-gray-600 cursor-pointer">
          <FiMenu size={20} />
        </Button>
        <div className="flex items-center">
          <Logo text="" />
          <span className="text-xl font-bold">Studio</span>
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
        <div className="lg:hidden">
          {!showSearch && (
            <button onClick={() => setShowSearch(true)}>
              <AiOutlineSearch size={24} />
            </button>
          )}
          {showSearch && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="absolute top-16 left-0 right-0 bg-gray-900 p-4 lg:hidden"
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
        <button>
          <BsQuestionCircle size={20} />
        </button>
        <button>
          <IoMdNotificationsOutline size={20} />
        </button>
        {/* upload videos*/}
        <button>
          <HiOutlinePlus size={20} /> Create
        </button>
        {/* avatar */}
        <img
          src={avatar?.url || avatar || DEFAULT_AVATAR_URL}
          alt="User Avatar"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </nav>
  );
};

export default StudioNavbar;
