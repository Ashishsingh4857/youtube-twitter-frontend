import React from "react";
const SubscriptionSkeleton = () => (
  <div className="flex items-center justify-between p-4 animate-pulse">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-gray-700" />
      <div className="space-y-2">
        <div className="h-4 w-40 bg-gray-700 rounded" />
        <div className="h-3 w-24 bg-gray-700 rounded" />
      </div>
    </div>
    <div className="h-9 w-24 bg-gray-700 rounded-full" />
  </div>
);
export default SubscriptionSkeleton;
