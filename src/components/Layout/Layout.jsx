import React from "react";
import Navbar from "../Header/Navbar.jsx";
import Sidebar from "../Header/Sidebar.jsx";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function Layout() {
  //toggle sidebar
  const { isOpen } = useSelector((state) => state.global.sidebar);

  return (
    <>
      <Navbar />
      <div className="flex pt-[56px] min-h-screen bg-gray-950">
        <Sidebar />
        {/* content shifts according to sidebar width */}
        <div
          className={`flex-1 transition-all duration-300 ease-in-out ${isOpen ? "md:ml-60" : "md:ml-[72px]"}`}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;
