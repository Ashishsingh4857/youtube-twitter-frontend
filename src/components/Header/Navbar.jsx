import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../../store/slices/authSlice.js";
import { AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";
import { Logo, Input, Button } from "../index.js";
import { useForm } from "react-hook-form";

const Navbar = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const { register, handleSubmit } = useForm();
  const [showSearch, setShowSearch] = useState(false);

  //logged the user
  const handleLogout = () => {
    dispatch(userLogout());
  };

  //search
  const onSubmit = async (data) => {
    console.log("Searching for:", data.searchQuery);
  };

  return (
    <nav className="w-full h-14 p-3 flex justify-between items-center bg-gray-900 border-b border-gray-800 shadow-md fixed top-0 z-10">
      <div className="flex items-center">
        <AiOutlineMenu className="text-2xl mr-4 cursor-pointer text-gray-400 hover:text-white transition-colors" />
        <Logo className="hidden sm:block" />
      </div>
      <div className="flex-grow flex justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`flex items-center ${
            showSearch ? "w-full" : "hidden"
          } sm:w-1/2 sm:flex`}
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
      <div className="flex items-center">
        {userData ? (
          <div className="flex items-center">
            <img
              src={userData.avatar?.url}
              alt="avatar"
              className="w-8 h-8 rounded-full  sm:block"
            />
            <span className="ml-4 text-sm italic font-medium text-white hidden sm:block">
              {userData.fullName}
            </span>
            <Button
              onClick={handleLogout}
              className="ml-4 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              <span className="relative px-5 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                logout
              </span>
            </Button>
          </div>
        ) : (
          <Link to="/login">
            <Button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span className="relative px-5 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                sign in
              </span>
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
