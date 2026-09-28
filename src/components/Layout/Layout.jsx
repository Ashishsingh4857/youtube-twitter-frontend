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
      <div className="flex pt-[56px] min-h-screen  text-white">
        <Sidebar
          className={
            isOpen
              ? "translate-x-0 w-64"
              : "-translate-x-full md:translate-x-0 md:w-16"
          }
        />
        {/* content shifts according to sidebar width */}
        <div
          className={`flex-1 min-w-0 w-full overflow-x-clip transition-all duration-300 ${isOpen ? "md:ml-60" : "md:ml-[72px]"}`}
        >
          <main className="min-h-[calc(100vh-56px)] bg-gray-900 ">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default Layout;
