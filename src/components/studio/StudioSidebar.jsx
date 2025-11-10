import React from "react";
import {
  AiOutlineDashboard,
  AiOutlineVideoCamera,
  AiOutlineBarChart,
  AiOutlineUsergroupAdd,
  AiOutlineFileText,
  AiOutlineCopyright,
  AiOutlineDollar,
  AiOutlineEdit,
  AiOutlineAudio,
  AiOutlineSetting,
  AiOutlineMessage,
} from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const StudioSidebar = () => {
  //toggle sidebar
  const { isActive } = useSelector((state) => state.global.sidebar);
  //fetching logged in user data from store
  const { userData } = useSelector((state) => state.auth);
  const { avatar, username, fullName } = userData || {};
  // fallback avatar image
  const DEFAULT_AVATAR_URL =
    "https://res.cloudinary.com/ashishsingh4857/image/upload/v1762338092/rhg4ffc6zlc7txxofok2.jpg";

  // menu list
  const menuItems = [
    {
      name: "Dashboard",
      icon: <AiOutlineDashboard size={25} />,
      path: "/studio/dashboard",
    },
    {
      name: "Content",
      icon: <AiOutlineVideoCamera size={25} />,
      path: "/studio/content",
    },
    {
      name: "Analytics",
      icon: <AiOutlineBarChart size={25} />,
      path: "/studio/analytics",
    },
    {
      name: "Community",
      icon: <AiOutlineUsergroupAdd size={25} />,
      path: "/studio/community",
    },
    {
      name: "Subtitles",
      icon: <AiOutlineFileText size={25} />,
      path: "/studio/subtitles",
    },
    {
      name: "Content detection",
      icon: <AiOutlineCopyright size={25} />,
      path: "/studio/content-detection",
    },
    {
      name: "Earn",
      icon: <AiOutlineDollar size={25} />,
      path: "/studio/earn",
    },
    {
      name: "Customization",
      icon: <AiOutlineEdit size={25} />,
      path: "/studio/customization",
    },
    {
      name: "Audio library",
      icon: <AiOutlineAudio size={25} />,
      path: "/studio/audio-library",
    },
  ];

  //list bottom items
  const bottomItems = [
    {
      name: "Settings",
      icon: <AiOutlineSetting size={25} />,
      path: "/studio/settings",
    },
    {
      name: "Send feedback",
      icon: <AiOutlineMessage size={25} />,
      path: "/studio/feedback",
    },
  ];

  return (
    <aside
      className={`bg-gray-900 text-white h-screen p-4 flex flex-col justify-between fixed top-16 left-0 ${isActive ? "w-64" : "w-18"}`}
    >
      <div>
        <div className="mb-4">
          <img
            src={avatar?.url || avatar || DEFAULT_AVATAR_URL}
            className="w-28 rounded-full mx-auto"
          />
          {isActive && (
            <div>
              <p className="text-center mt-2">Your channel</p>
              <p className="text-center text-sm text-gray-500">
                {" "}
                {fullName && fullName}{" "}
              </p>
            </div>
          )}
        </div>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="p-2 rounded-md">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center ${isActive ? "bg-gray-800" : "hover:bg-gray-800"}`
                }
              >
                <span className="mr-2">{item.icon}</span>
                {isActive && <span>{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <ul>
        {bottomItems.map((item, index) => (
          <li key={index} className="p-2 rounded-md">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center ${isActive ? "bg-gray-700" : "hover:bg-gray-600"}`
              }
            >
              <span className={"mr-2"}>{item.icon}</span>
              {isActive && <span>{item.name}</span>}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default StudioSidebar;
