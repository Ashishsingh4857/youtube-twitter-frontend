import React from "react";
function VideoCardSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="group relative bg-gray-800 rounded-lg overflow-hidden">
        <div className="w-full h-40 bg-gray-700"></div>
        <div className="p-2 flex">
          <div className="w-8 h-8 rounded-full bg-gray-700 mr-2"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-700 rounded w-1/2 mb-1"></div>
            <div className="h-3 bg-gray-700 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCardSkeleton;
