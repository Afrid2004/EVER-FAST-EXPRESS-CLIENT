import React from "react";

const LoadingDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Top Name Skeleton */}
      <div className="space-y-2">
        <div className="skeleton h-6 w-40"></div>
        <div className="skeleton h-4 w-64"></div>
      </div>

      {/* 4 Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="skeleton h-28 rounded-xl"></div>
        <div className="skeleton h-28 rounded-xl"></div>
        <div className="skeleton h-28 rounded-xl"></div>
        <div className="skeleton h-28 rounded-xl"></div>
      </div>
    </div>
  );
};

export default LoadingDashboard;
