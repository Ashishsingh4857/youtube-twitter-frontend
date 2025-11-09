import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const DropdownMenu = ({
  options,
  icons,
  setIsActive,
  avatar,
  fullName,
  username,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // fallback avatar image
  const DEFAULT_AVATAR_URL =
    "https://res.cloudinary.com/ashishsingh4857/image/upload/v1762338092/rhg4ffc6zlc7txxofok2.jpg";
  return (
    <ul className="absolute right-0 mt-2 w-75 p-2  bg-gray-800 rounded-md shadow-lg z-10">
      {avatar ? (
        <li className="p-4 border-b border-gray-700">
          <div className="flex items-center">
            <img
              src={avatar?.url || avatar || DEFAULT_AVATAR_URL}
              alt="avatar"
              className="w-8 h-8 rounded-full mr-3"
            />
            <div>
              <p className="text-sm font-medium text-gray-400">{fullName}</p>
              <p className="text-xs text-gray-400">{username}</p>
            </div>
          </div>
          <p
            className="text-blue-400 mt-2 cursor-pointer"
            onClick={() => navigate(`/channel/${username}`)}
          >
            view your channel
          </p>
        </li>
      ) : null}
      {options.map((option, index) => (
        <li
          key={index}
          className="px-4 py-2 text-sm text-white hover:bg-gray-700 cursor-pointer flex items-center"
          onClick={(e) => {
            e.stopPropagation();
            if (option.onClick) {
              option.onClick();
            }
            setIsActive(false);
          }}
        >
          <span className="mr-2">{icons[option.text]}</span>
          {option.text}
        </li>
      ))}
    </ul>
  );
};

export default DropdownMenu;
