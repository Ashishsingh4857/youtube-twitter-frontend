import React from "react";
import { Outlet } from "react-router-dom";
import { StudioNavbar, StudioSidebar } from "../index.js";

function StudioLayout() {
  return (
    <>
      <StudioNavbar />
      <StudioSidebar />
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default StudioLayout;
