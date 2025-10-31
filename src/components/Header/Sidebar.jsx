import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome, AiOutlineHistory } from "react-icons/ai";
import { GrMultimedia } from "react-icons/gr";
import { FaUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { RiPlayList2Fill } from "react-icons/ri";
import { GoVideo } from "react-icons/go";
import { BiLike } from "react-icons/bi";
import { SiYoutubeshorts } from "react-icons/si";
import { RxAvatar } from "react-icons/rx";
import { GoChevronRight } from "react-icons/go";
import { MdMenuOpen } from "react-icons/md";
import { Logo } from "../index.js";
import { toggleSidebar } from "../../store/slices/globalSlice.js";

const Sidebar = () => {
  //toggle sidebar
  const { isOpen } = useSelector((state) => state.global.sidebar);
  const dispatch = useDispatch();
  //user
  const { userData } = useSelector((state) => state.auth);

  return (
    <aside
      className={`${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-25 top-14"} fixed left-0 w-60 h-screen p-4 bg-gray-900 border-r border-gray-800 overflow-y-auto transition-transform duration-300  z-10`}
    >
      {/* logo section-----> */}
      {isOpen ? (
        <section className="flex items-center">
          {isOpen ? (
            <>
              <MdMenuOpen
                className="text-2xl mr-4 cursor-pointer text-gray-400 hover:text-white transition-colors"
                onClick={() => dispatch(toggleSidebar())}
              />
            </>
          ) : (
            <>
              <AiOutlineMenu
                className="text-2xl mr-4 cursor-pointer text-gray-400 hover:text-white transition-colors"
                onClick={() => dispatch(toggleSidebar())}
              />
            </>
          )}
          <Logo className="hidden sm:block" />
        </section>
      ) : (
        ""
      )}
      {/* top section */}
      <section>
        <ul className={`${isOpen ? "space-y-1" : "space-y-4"}`}>
          <li>
            <Link
              to="/"
              className={`${isOpen ? "flex items-center space-x-3" : "flex flex-col items-center"} p-3 rounded-lg hover:bg-gray-700 text-white`}
            >
              <AiOutlineHome className="text-xl" />
              <span
                className={`${isOpen ? "text-sm font-light capitalize sm:text-base" : "text-xs font-small mt-2 capitalize sm:text-sm"}`}
              >
                Home
              </span>
            </Link>
          </li>
          <li>
            <Link
              to=""
              className={`${isOpen ? "flex items-center space-x-3" : "flex flex-col items-center"} p-3 rounded-lg hover:bg-gray-700 text-white`}
            >
              <SiYoutubeshorts className="text-xl" />
              <span
                className={`${isOpen ? "text-sm font-light capitalize sm:text-base" : "text-xs font-small mt-2 capitalize sm:text-sm"}`}
              >
                Shorts
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/subscriptions"
              className={`${isOpen ? "flex items-center space-x-3" : "flex flex-col items-center"} p-3 rounded-lg hover:bg-gray-700 text-white`}
            >
              <GrMultimedia className="text-xl mr-3" />
              <span
                className={`${isOpen ? "text-sm font-light capitalize sm:text-base" : "text-xs font-small mt-2 capitalize sm:text-sm"}`}
              >
                Subscriptions
              </span>
            </Link>
          </li>
        </ul>
      </section>
      {/* toggle if true  --------->*/}
      {isOpen ? (
        <>
          {/* border */}
          <div className="w-full border-b border-gray-700 mt-2"></div>
          {/* you section */}
          <section>
            <Link to={`/users/c/${userData?.username}`}>
              <div className="flex items-center p-2 ">
                <h2 className="text-sm font-medium text-gray-400  mr-3 capitalize sm:text-base">
                  You
                </h2>
                <GoChevronRight className=" text-gray-400 font-bold" />
              </div>
            </Link>
            <ul className={`${isOpen ? "space-y-1" : "space-y-4"}`}>
              <li>
                <Link
                  to="/history"
                  className={`${isOpen ? "flex items-center space-x-3" : "flex flex-col items-center"} p-3 rounded-lg hover:bg-gray-700 text-white`}
                >
                  <AiOutlineHistory className="text-xl mr-3" />
                  <span className="text-sm font-light capitalize sm:text-base">
                    History
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/playlist"
                  className={`${isOpen ? "flex items-center space-x-3" : "flex flex-col items-center"} p-3 rounded-lg hover:bg-gray-700 text-white`}
                >
                  <RiPlayList2Fill className="text-xl" />
                  <span className="text-sm font-light capitalize sm:text-base">
                    Playlists
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/Liked-videos"
                  className={`${isOpen ? "flex items-center space-x-3" : "flex flex-col items-center"} p-3 rounded-lg hover:bg-gray-700 text-white`}
                >
                  <BiLike className="text-xl" />
                  <span className="text-sm font-light capitalize sm:text-base">
                    Liked videos
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className={`${isOpen ? "flex items-center space-x-3" : "flex flex-col items-center"} p-3 rounded-lg hover:bg-gray-700 text-white`}
                >
                  <GoVideo className="text-xl" />
                  <span className="text-sm font-light capitalize sm:text-base">
                    Your videos
                  </span>
                </Link>
              </li>
            </ul>
          </section>
          {/* border */}
          <div className="w-full border-b border-gray-700 mt-2"></div>
          {/* subscriptions section */}
          <section>
            <div className="flex p-3 items-center">
              <h2 className="text-sm font-medium text-gray-400  mr-3 capitalize sm:text-base">
                Subscriptions
              </h2>
              <GoChevronRight className=" text-gray-400 font-bold" />
            </div>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/channel/1"
                  className="flex items-center p-2 rounded-lg hover:bg-gray-700 text-white"
                >
                  <FaUserCircle className="text-xl mr-2" />
                  {isOpen && (
                    <span className="text-sm font-light capitalize sm:text-base">
                      Channel 1
                    </span>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  to="/channel"
                  className="flex items-center p-2 rounded-lg hover:bg-gray-700 text-white"
                >
                  <FaUserCircle className="text-xl mr-2" />
                  {isOpen && (
                    <span className="text-sm font-light capitalize sm:text-base">
                      Channel 2
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </section>
        </>
      ) : (
        <>
          <div className="mt-3">
            <li>
              <Link
                to={`/users/c/${userData?.username}`}
                className={`${isOpen ? "flex items-center space-x-3" : "flex flex-col items-center"} p-3 rounded-lg hover:bg-gray-700 text-white`}
              >
                <RxAvatar className="text-xl" />
                <span className="text-sm font-light capitalize sm:text-base">
                  You
                </span>
              </Link>
            </li>
          </div>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
