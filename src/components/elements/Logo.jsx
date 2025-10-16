import React from "react";
import { IoIosVideocam } from "react-icons/io";
import { NavLink } from "react-router-dom";

function Logo({ size = "30" }) {
  return (
    <>
      <NavLink to={"/"} className="flex gap-2 items-center">
        <IoIosVideocam size={size} color="#A855F7" />
        <span className="font-bold text-white">STREAMIFY</span>
      </NavLink>
    </>
  );
}

export default Logo;
