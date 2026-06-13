import React, { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/AxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../Loadings/LoadingPage";
import useTheme from "../../Hooks/useTheme";

const ThemeToggle = () => {
  const { user, loading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  if (loading || theme === null) {
    return <LoadingPage></LoadingPage>;
  }

  return (
    <div>
      <div
        onClick={toggleTheme}
        className={`cursor-pointer relative w-18 h-8 border border-gray-300/70 rounded-4xl ${theme === "dark" ? "bg-gray-500 hover:bg-gray-800/80" : "bg-gray-200/50 hover:bg-gray-200"}`}
      >
        <div
          className={`w-8 h-full shadow-xl flex items-center justify-center rounded-full transition-all absolute duration-150 border top-0 ${theme === "dark" ? "translate-x-11 bg-gray-800 border-gray-900 text-white" : "translate-x-0 bg-white dark:bg-gray-900 border-gray-300/70 text-gray-800 dark:text-white"}`}
        >
          {theme === "dark" ? <FiMoon /> : <FiSun />}
        </div>
      </div>
    </div>
  );
};

export default ThemeToggle;
