import React from "react";

const VideoDetailSkeleton = () => {
  return (
    <div className="w-full h-full bg-[#0f172a] p-6 mt-14 flex flex-col md:flex-row">
      <div className="flex-1 h-full md:pr-4">
        <div className="aspect-video w-full h-full bg-gray-800 rounded-lg animate-pulse"></div>
        <div className="pt-4 px-3 pb-1">
          <h1 className="text-xl text-white font-bold">
            <div className="w-3/4 h-6 bg-gray-800 rounded animate-pulse"></div>
          </h1>
          <div className="text-gray-400 text-xs mt-1">
            <div className="w-1/2 h-4 bg-gray-800 rounded animate-pulse"></div>
          </div>
          <div className="mt-2 text-gray-300 text-xs">
            <div className="w-full h-4 bg-gray-800 rounded animate-pulse"></div>
            <div className="w-full h-4 bg-gray-800 rounded animate-pulse mt-2"></div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-[400px] h-full mt-4 md:mt-0">
        <h2 className="text-lg font-bold mb-4 md:mb-2 text-white">Up Next</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="w-full h-24 bg-gray-800 rounded-lg animate-pulse"
              ></div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default VideoDetailSkeleton;
