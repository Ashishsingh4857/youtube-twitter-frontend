import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { StudioNavbar, StudioSidebar } from "../index.js";

function StudioLayout() {
  // toggle sidebar
  const { isActive } = useSelector((state) => state.global.sidebar);

  return (
    <div className="flex flex-col h-screen  text-white overflow-hidden">
      <StudioNavbar />
      <div className="flex flex-1 overflow-hidden pt-14">
        <StudioSidebar
          className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] z-10 bg-gray-900 border-r  shadow-md border-gray-500 transition-all duration-300 ${isActive ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0 md:w-16"}`}
        />
        <main
          className={`flex-1 min-w-0 overflow-y-auto overflow-x-clip ease-in-out transition-[margin] duration-300 bg-gray-900 ${isActive ? "md:ml-64" : "md:ml-16"}`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default StudioLayout;
