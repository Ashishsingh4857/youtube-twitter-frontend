import React from "react";

const ProfileCustomizationSkeleton = () => {
  return (
    <div className="bg-gray-900 min-h-screen max-w-screen h-full text-white p-6 mt-16 ml-64">
      <div className="h-8 w-1/4 bg-gray-800 rounded-md mb-4"></div>

      {/* Cover Image Skeleton */}
      <div className="mb-4 animate-pulse">
        <div className="h-6 w-1/2 bg-gray-800 rounded-md mb-2"></div>
        <div className="relative w-full h-48 bg-gray-800 rounded-md shadow-lg border-4 border-gray-700">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-12 w-12 bg-gray-700 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Avatar Skeleton */}
      <div className="relative w-32 h-32 -mt-16 ml-4 bg-gray-800 rounded-full shadow-lg border-4 border-gray-700 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-12 w-12 bg-gray-700 rounded-full"></div>
        </div>
      </div>

      {/* Text Skeleton */}
      <div className="h-4 w-3/4 bg-gray-800 rounded-md mb-4 mt-4 animate-pulse"></div>
      <div className="h-4 w-1/2 bg-gray-800 rounded-md mb- animate-pulse"></div>

      {/* Select Field Skeleton */}
      <div className="w-full mb-4 animate-pulse">
        <div className="h-6 w-1/4 bg-gray-800 rounded-md mb-2"></div>
        <div className="h-12 w-full bg-gray-800 rounded-md shadow-lg"></div>
      </div>

      {/* Input Field Skeleton */}
      <div className="mb-4 animate-pulse">
        <div className="h-6 w-1/4 bg-gray-800 rounded-md mb-2"></div>
        <div className="h-12 w-full bg-gray-800 rounded-md shadow-lg"></div>
      </div>

      {/* Button Skeleton */}
      <div className="flex items-center animate-pulse">
        <div className="h-10 w-32 bg-gray-800 rounded-full shadow-lg mr-4"></div>
        <div className="h-10 w-32 bg-gray-800 rounded-full shadow-lg"></div>
      </div>
    </div>
  );
};

export default ProfileCustomizationSkeleton;
