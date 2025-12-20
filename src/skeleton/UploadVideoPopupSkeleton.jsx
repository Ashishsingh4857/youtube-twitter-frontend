import React from "react";

const UploadVideoPopupSkeleton = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6 md:p-8">
    <div className="relative w-full max-w-2xl bg-gray-900 rounded-xl p-4 sm:p-6 md:p-8 shadow-xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="h-6 w-1/2 bg-gray-700 rounded animate-pulse" />
        <div className="h-6 w-6 bg-gray-700 rounded animate-pulse" />
      </div>

      {/* Dropzone */}
      <div className="border-2 border-dashed border-gray-600 p-6 sm:p-8 md:p-12 text-center cursor-pointer hover:border-purple-500">
        <div className="h-4 w-1/2 mx-auto bg-gray-700 rounded animate-pulse" />
      </div>

      {/* Form */}
      <div className="mt-6 space-y-2 sm:space-y-3 md:space-y-4">
        <div>
          <div className="h-4 w-1/4 bg-gray-700 rounded animate-pulse" />
          <div className="h-8 w-full bg-gray-700 rounded animate-pulse mt-1" />
        </div>
        <div>
          <div className="h-4 w-1/4 bg-gray-700 rounded animate-pulse" />
          <div className="h-16 w-full bg-gray-700 rounded animate-pulse mt-1" />
        </div>
        <div>
          <div className="h-4 w-1/4 bg-gray-700 rounded animate-pulse" />
          <div className="h-8 w-full bg-gray-700 rounded animate-pulse mt-1" />
        </div>
        <div>
          <div className="h-4 w-1/4 bg-gray-700 rounded animate-pulse" />
          <div className="h-8 w-full bg-gray-700 rounded animate-pulse mt-1" />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-2 sm:space-x-3 md:space-x-4 mt-6">
        <div className="h-8 w-1/4 bg-gray-700 rounded animate-pulse" />
        <div className="h-8 w-1/4 bg-gray-700 rounded animate-pulse" />
      </div>
    </div>
  </div>
);

export default UploadVideoPopupSkeleton;
