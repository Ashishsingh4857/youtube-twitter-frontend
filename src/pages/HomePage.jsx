import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../store/slices/globalSlice.js";
import { VideoCard } from "../components/index.js";

const Homepage = () => {
  // toggle sidebar
  const { isOpen } = useSelector((state) => state.global.sidebar);
  const dispatch = useDispatch();
  return (
    <main
      className={`p-4 h-full w-full bg-gray-900  mt-14 overflow-y-auto-auto ${isOpen ? "ml-60  md:ml-25" : "ml-0 md:ml-25"}`}
      onClick={isOpen ? () => dispatch(toggleSidebar()) : null}
    >
      {/* section Recommended---> */}
      <section>
        <h1 className="text-2xl font-bold text-white mb-4">Recommended</h1>
        <VideoCard />
      </section>
    </main>
  );
};

export default Homepage;
