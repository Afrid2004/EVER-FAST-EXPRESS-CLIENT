import React from "react";

const LoadingSpin = ({ color = "dark" }) => {
  return (
    <div
      className={`w-4 h-4 border-2 ${color === "dark" ? "border-gray-800 border-t-gray-800/30 border-r-gray-800/30" : "border-white border-t-white/30 border-r-white/30"} rounded-full animate-spin`}
    ></div>
  );
};

export default LoadingSpin;
