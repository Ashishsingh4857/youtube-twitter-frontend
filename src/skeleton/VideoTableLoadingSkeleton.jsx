import React from "react";

const VideoTableLoadingSkeleton = () => {
  return (
    <div className="overflow-x-auto min-h-screen">
      <table className="w-full text-left text-white">
        <thead>
          <tr className="border-b border-gray-700 h-12">
            <th className="px-4 py-2 text-sm font-medium flex-1">Title</th>
            <th className="px-4 py-2 text-sm font-medium">Actions</th>
            <th className="px-4 py-2 text-sm font-medium">Visibility</th>
            <th className="px-4 py-2 text-sm font-medium">Restrictions</th>
            <th className="px-4 py-2 text-sm font-medium">Date</th>
            <th className="px-4 py-2 text-sm font-medium">Views</th>
            <th className="px-4 py-2 text-sm font-medium">Comments</th>
            <th className="px-4 py-2 text-sm font-medium">Likes</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map((item) => (
            <tr key={item} className="border-b border-gray-700 h-21">
              <td className="px-4 py-2 text-sm flex flex-col md:flex-row items-center min-w-60">
                <div className="w-30 h-15 bg-gray-700 rounded-md mr-2 animate-pulse"></div>
                <div className="flex flex-col">
                  <div className="w-40 h-4 bg-gray-700 rounded-md animate-pulse"></div>
                  <div className="w-20 h-4 bg-gray-700 rounded-md animate-pulse mt-2"></div>
                </div>
              </td>
              <td className="px-4 py-2 text-sm">
                <div className="w-10 h-10 bg-gray-700 rounded-md animate-pulse"></div>
              </td>
              <td className="px-4 py-2 text-sm">
                <div className="w-20 h-4 bg-gray-700 rounded-md animate-pulse"></div>
              </td>
              <td className="px-4 py-2 text-sm">
                <div className="w-20 h-4 bg-gray-700 rounded-md animate-pulse"></div>
              </td>
              <td className="px-4 py-2 text-sm">
                <div className="w-20px h-4 bg-gray-700 rounded-md animate-pulse"></div>
              </td>
              <td className="px-4 py-2 text-sm">
                <div className="w-10 h-4 bg-gray-700 rounded-md animate-pulse"></div>
              </td>
              <td className="px-4 py-2 text-sm">
                <div className="w-10 h-4 bg-gray-700 rounded-md animate-pulse"></div>
              </td>
              <td className="px-4 py-2 text-sm">
                <div className="w-10 h-4 bg-gray-700 rounded-md animate-pulse"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VideoTableLoadingSkeleton;
