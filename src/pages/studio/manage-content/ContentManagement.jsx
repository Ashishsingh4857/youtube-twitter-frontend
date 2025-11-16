import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const ContentManagement = () => {
  return (
    <div className="bg-gray-900">
      <div>
        <h1 className="text-2xl font-bold  pb-9 pt-6 pl-8 text-white ">
          Channel Content
        </h1>
      </div>
      <nav className="px-8 h-12 mb-4 border-b border-b-gray-500 flex justify-between">
        <ul className="flex items-center ">
          <li className="mr-3  cursor-pointer">
            <NavLink
              to="videos"
              className={({ isActive }) =>
                `text-sm font-normal lg:text-lg pb-3 ${
                  isActive
                    ? "border-b-2 border-[#A855F7] text-white"
                    : "text-gray-500"
                }`
              }
            >
              Videos
            </NavLink>
          </li>
          <li className="cursor-pointer mr-3">
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
          </li>
          <li className="cursor-pointer mr-3">
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
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default ContentManagement;
