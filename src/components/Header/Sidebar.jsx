import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineHistory,
  AiOutlineSetting,
  AiOutlineMessage,
} from "react-icons/ai";
import { GrMultimedia } from "react-icons/gr";
import { FaUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { RiPlayList2Fill } from "react-icons/ri";
import { GoVideo } from "react-icons/go";
import { BiLike } from "react-icons/bi";
import { SiYoutubeshorts } from "react-icons/si";
import { RxAvatar } from "react-icons/rx";
import { GoChevronRight } from "react-icons/go";
import ClickAwayListener from "react-click-away-listener";
import { setSidebarOpen } from "../../store/slices/globalSlice";

const Sidebar = ({ className }) => {
  const dispatch = useDispatch();
  //toggle sidebar
  const { isOpen } = useSelector((state) => state.global.sidebar);
  //user
  const { userData } = useSelector((state) => state.auth);

  //list bottom items
  const bottomItems = [
    {
      name: "Settings",
      icon: <AiOutlineSetting size={20} />,
      path: `/settings`,
    },
    {
      name: "Send feedback",
      icon: <AiOutlineMessage size={20} />,
      path: `/feedback`,
    },
  ];

  const linkBase =
    "p-2.5 rounded-lg text-white transition-all duration-200 flex items-center overflow-hidden";
  const labelOpen = "text-sm font-normal capitalize truncate whitespace-nowrap";
  const labelClosed =
    "text-[9px] font-normal capitalize whitespace-nowrap overflow-hidden text-center leading-tight max-w-full";

  return (
    <ClickAwayListener onClickAway={() => dispatch(setSidebarOpen(false))}>
      <aside
        className={`text-white p-3 flex flex-col justify-between border-r border-gray-500 bg-gray-900 fixed left-0 top-[56px] h-[calc(100%-56px)] overflow-y-auto overflow-x-hidden z-10 transition-all duration-300 ease-in-out ${isOpen ? "translate-x-0 w-60" : "-translate-x-full md:translate-x-0 md:w-[72px]"} ${className || ""}`}
      >
        <div className="w-full">
          {/* top section */}
          <section>
            <ul className="space-y-1 w-full">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${linkBase} ${isOpen ? "space-x-3" : "flex-col justify-center gap-1 text-center"} ${isActive ? "bg-gray-800" : "hover:bg-gray-800"}`
                  }
                >
                  <AiOutlineHome size={20} className="shrink-0" />
                  <span className={isOpen ? labelOpen : labelClosed}>Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to=""
                  className={({ isActive }) =>
                    `${linkBase} ${isOpen ? "space-x-3" : "flex-col justify-center gap-1 text-center"} ${isActive ? "bg-gray-800" : "hover:bg-gray-800"}`
                  }
                >
                  <SiYoutubeshorts size={20} className="shrink-0" />
                  <span className={isOpen ? labelOpen : labelClosed}>
                    Shorts
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/subscriptions"
                  className={({ isActive }) =>
                    `${linkBase} ${isOpen ? "space-x-3" : "flex-col justify-center gap-1 text-center"} ${isActive ? "bg-gray-800" : "hover:bg-gray-800"}`
                  }
                >
                  <GrMultimedia size={20} className="shrink-0" />
                  <span className={isOpen ? labelOpen : labelClosed}>
                    Subscriptions
                  </span>
                </NavLink>
              </li>
            </ul>
          </section>
          {/* toggle if true --------->*/}
          {isOpen ? (
            <>
              {/* border */}
              <div className="w-full border-b border-gray-700 my-2"></div>
              {/* you section */}
              <section>
                <Link to={`/users/c/${userData?.username}`}>
                  <div className="flex items-center p-2">
                    <h2 className="text-sm font-medium text-gray-400 mr-2 capitalize">
                      You
                    </h2>
                    <GoChevronRight className="text-gray-400" />
                  </div>
                </Link>
                <ul className="space-y-1">
                  <li>
                    <NavLink
                      to="/history"
                      className={({ isActive }) =>
                        `${linkBase} space-x-3 ${isActive ? "bg-gray-800" : "hover:bg-gray-800"}`
                      }
                    >
                      <span className="shrink-0">
                        <AiOutlineHistory size={20} />
                      </span>
                      <span className={labelOpen}>History</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/playlist"
                      className={({ isActive }) =>
                        `${linkBase} space-x-3 ${isActive ? "bg-gray-800" : "hover:bg-gray-800"}`
                      }
                    >
                      <span className="shrink-0">
                        <RiPlayList2Fill size={20} />
                      </span>
                      <span className={labelOpen}>Playlists</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/Liked-videos"
                      className={({ isActive }) =>
                        `${linkBase} space-x-3 ${isActive ? "bg-gray-800" : "hover:bg-gray-800"}`
                      }
                    >
                      <span className="shrink-0">
                        <BiLike size={20} />
                      </span>
                      <span className={labelOpen}>Liked videos</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        `${linkBase} space-x-3 ${isActive ? "bg-gray-800" : "hover:bg-gray-800"}`
                      }
                    >
                      <span className="shrink-0">
                        <GoVideo size={20} />
                      </span>
                      <span className={labelOpen}>Your videos</span>
                    </NavLink>
                  </li>
                </ul>
              </section>
              {/* border */}
              <div className="w-full border-b border-gray-700 my-2"></div>
              {/* subscriptions section */}
              <section>
                <div className="flex p-2 items-center">
                  <h2 className="text-sm font-medium text-gray-400 mr-2 capitalize truncate">
                    Subscriptions
                  </h2>
                  <GoChevronRight className="text-gray-400 shrink-0" />
                </div>
                <ul className="space-y-1">
                  <li>
                    <NavLink
                      to="/channel/1"
                      className={({ isActive }) =>
                        `${linkBase} space-x-3 ${isActive ? "bg-gray-700" : "hover:bg-gray-600"}`
                      }
                    >
                      <FaUserCircle size={20} className="shrink-0" />
                      <span className={labelOpen}>Channel 1</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/channel"
                      className={({ isActive }) =>
                        `${linkBase} space-x-3 ${isActive ? "bg-gray-700" : "hover:bg-gray-600"}`
                      }
                    >
                      <FaUserCircle size={20} className="shrink-0" />
                      <span className={labelOpen}>Channel 2</span>
                    </NavLink>
                  </li>
                </ul>
              </section>
            </>
          ) : (
            <>
              <div className="mt-2 w-full">
                <NavLink
                  to={`/users/c/${userData?.username}`}
                  className={({ isActive }) =>
                    `${linkBase} flex-col justify-center gap-1 text-center ${isActive ? "bg-gray-800" : "hover:bg-gray-800"}`
                  }
                >
                  <RxAvatar size={20} className="shrink-0" />
                  <span className={labelClosed}>You</span>
                </NavLink>
              </div>
            </>
          )}
        </div>
        {/* bottom settings section */}
        <ul className="mt-4 space-y-1 border-t border-gray-700 pt-2 w-full">
          {bottomItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `${linkBase} ${isOpen ? "space-x-3" : "flex-col justify-center gap-1 text-center"} ${isActive ? "bg-gray-700" : "hover:bg-gray-600"}`
                }
              >
                <span className="shrink-0">{item.icon}</span>
                <span className={isOpen ? labelOpen : labelClosed}>
                  {isOpen ? item.name : item.name.split(" ")[0]}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>
    </ClickAwayListener>
  );
};

export default Sidebar;
