import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome, AiOutlineHistory } from "react-icons/ai";
import { GrMultimedia } from "react-icons/gr";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RiPlayList2Fill } from "react-icons/ri";
import { GoVideo } from "react-icons/go";
import { BiLike } from "react-icons/bi";
import { SiYoutubeshorts } from "react-icons/si";
import { RxAvatar } from "react-icons/rx";
import { GoChevronRight } from "react-icons/go";

const Sidebar = () => {
  //toggle sidebar
  const { isOpen } = useSelector((state) => state.global.sidebar);

  //user
  const { userData } = useSelector((state) => state.auth);

  return (
    <aside
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-20"
      } fixed  top-14 left-0 w-60 h-screen p-4 bg-gray-900 border-r border-gray-800 overflow-y-auto transition-transform duration-300 z-10`}
    >
      {/* top */}
      <div>
        <ul className={`${isOpen ? "space-y-1" : "space-y-4"}`}>
          <li>
            <Link
              to="/"
              className={`${isOpen ? "flex items-center space-x-3" : "flex flex-col items-center"} p-3 rounded-lg hover:bg-gray-700 text-white`}
            >
              <AiOutlineHome className="text-xl" />
              <span
                className={
                  isOpen ? "text-sm font-light" : "text-xs font-small mt-2"
                }
              >
                Home
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="https://www.youtube.com/shorts/"
              className={`${isOpen ? "flex items-center space-x-3" : "flex flex-col items-center"} p-3 rounded-lg hover:bg-gray-700 text-white`}
            >
              <SiYoutubeshorts className="text-xl" />
              <span
                className={
                  isOpen ? "text-sm font-light" : "text-xs font-small mt-2"
                }
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
                className={
                  isOpen ? "text-sm font-light" : "text-xs font-small mt-2"
                }
              >
                Subscriptions
              </span>
            </Link>
          </li>
        </ul>
      </div>
      {/* mid */}
      {isOpen ? (
        <>
          <div className="mt-8">
            <div className="flex p-3">
              <h2 className="text-sm font-medium text-gray-400 mb-2 mr-3">
                You
              </h2>
              <GoChevronRight className=" text-gray-400" />
            </div>
            <ul className={`${isOpen ? "space-y-1" : "space-y-4"}`}>
              <li>
                <Link
                  to="/history"
                  className={`${isOpen ? "flex items-center space-x-3" : "flex flex-col items-center"} p-3 rounded-lg hover:bg-gray-700 text-white`}
                >
                  <AiOutlineHistory className="text-xl mr-3" />
                  <span className="text-sm font-light">History</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/playlist"
                  className={`${isOpen ? "flex items-center space-x-3" : "flex flex-col items-center"} p-3 rounded-lg hover:bg-gray-700 text-white`}
                >
                  <RiPlayList2Fill className="text-xl" />
                  <span className="text-sm font-light">Playlists</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/Liked-videos"
                  className={`${isOpen ? "flex items-center space-x-3" : "flex flex-col items-center"} p-3 rounded-lg hover:bg-gray-700 text-white`}
                >
                  <BiLike className="text-xl" />
                  <span className="text-sm font-light">Liked videos</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className={`${isOpen ? "flex items-center space-x-3" : "flex flex-col items-center"} p-3 rounded-lg hover:bg-gray-700 text-white`}
                >
                  <GoVideo className="text-xl" />
                  <span className="text-sm font-light">Your videos</span>
                </Link>
              </li>
            </ul>
          </div>
          {/* subscriptions section */}
          <div className="mt-8">
            <div className="flex p-3">
              <h2 className="text-sm font-medium text-gray-400 mb-2 mr-3">
                SUBSCRIPTIONS
              </h2>
              <GoChevronRight className=" text-gray-400" />
            </div>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/channel/1"
                  className="flex items-center p-2 rounded-lg hover:bg-gray-700 text-white"
                >
                  <FaUserCircle className="text-xl mr-2" />
                  {isOpen && (
                    <span className="text-sm font-light">Channel 1</span>
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
                    <span className="text-sm font-light">Channel 2</span>
                  )}
                </Link>
              </li>
            </ul>
          </div>
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

                <span className="text-sm font-light">You</span>
              </Link>
            </li>
          </div>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
