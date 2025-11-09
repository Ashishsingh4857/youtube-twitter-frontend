import React from "react";
import { IoIosVideocam } from "react-icons/io";
import { NavLink } from "react-router-dom";

function Logo({
  size = "30",
  text = "STREAMIFY",
  className,
  color = "#A855F7",
}) {
  return (
    <>
      <NavLink to={"/"} className="flex gap-2 items-center">
        <IoIosVideocam size={size} color={color} />
        <span className={`font-bold text-white ${className}`}>
          {text && text}
        </span>
      </NavLink>
    </>
  );
}

export default Logo;
