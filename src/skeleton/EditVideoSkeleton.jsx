import React from "react";

const EditVideoSkeleton = () => (
  <div className="p-6 bg-gray-900 text-white min-h-screen animate-pulse">
    {/* Header */}
    <div className="flex justify-between mb-4 flex-wrap">
      <div className="h-8 bg-gray-800 rounded w-1/4" />
      <div className="mt-2 md:mt-0 flex space-x-4">
        <div className="h-10 bg-gray-800 rounded w-28" />
        <div className="h-10 bg-gray-800 rounded w-20" />
      </div>
    </div>

    {/* Form Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Column */}
      <div>
        <div className="mb-4">
          <div className="h-6 bg-gray-800 rounded w-1/3 mb-1" />
          <div className="h-10 bg-gray-800 rounded w-full" />
        </div>
        <div className="mb-4">
          <div className="h-6 bg-gray-800 rounded w-1/3 mb-1" />
          <div className="h-24 bg-gray-800 rounded w-full" />
        </div>
        <div className="mb-4">
          <div className="h-6 bg-gray-800 rounded w-1/3 mb-1" />
          <div className="h-20 bg-gray-800 rounded w-full" />
        </div>
      </div>

      {/* Right Column */}
      <div>
        <div className="mb-4 bg-gray-800 rounded">
          <div className="aspect-video bg-black w-full" />
          <div className="p-2 border-t-2">
            <div className="h-4 bg-gray-700 rounded w-1/4" />
          </div>
        </div>
        <div className="relative">
          <div className="h-6 bg-gray-800 rounded w-1/3 mb-1" />
          <div className="h-10 bg-gray-800 rounded w-full flex items-center">
            <div className="h-5 bg-gray-700 rounded-full w-5 mr-2" />
            <div className="h-5 bg-gray-700 rounded w-16" />
            <div className="ml-auto h-4 bg-gray-700 rounded w-4" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default EditVideoSkeleton;
