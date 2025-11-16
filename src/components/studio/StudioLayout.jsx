import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { StudioNavbar, StudioSidebar } from "../index.js";

function StudioLayout() {
  // toggle sidebar
  const { isActive } = useSelector((state) => state.global.sidebar);

  return (
    <div className="flex flex-col h-screen">
      <StudioNavbar />
      <div className="flex flex-1 overflow-hidden pt-14">
        <StudioSidebar
          className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] z-10 bg-white dark:bg-gray-900 shadow-md transition-all duration-300 ${isActive ? "w-64" : "w-16"}`}
        />
        <main
          className={`flex-1  overflow-y-auto ${isActive ? "ml-64" : "ml-16"} transition-all duration-300`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default StudioLayout;
