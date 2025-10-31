import React from "react";
import Navbar from "../Header/Navbar.jsx";
import Sidebar from "../Header/Sidebar.jsx";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navbar />
      <div className="sm:flex flex-none">
        <Sidebar />
        <div className="sm:flex-1">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;
