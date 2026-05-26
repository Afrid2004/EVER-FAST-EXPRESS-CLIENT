import React from "react";

const LoadingPage = () => {
  return (
    <div className="w-full h-screen bg-gray-100 fixed top-0 z-30">
      <div className="flex items-center justify-center h-full">
        <div>
          <div className="w-50">
            <embed className="w-full" src="/images/truckloading.svg" />
          </div>
          <p className="text-center">Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
