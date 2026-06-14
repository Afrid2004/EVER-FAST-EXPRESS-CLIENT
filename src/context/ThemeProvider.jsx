import { createContext, useContext, useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../Hooks/AxiosHook";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const [theme, setTheme] = useState("light");

  const { data: themeData, isLoading: themeLoading } = useQuery({
    queryKey: ["themes", user?.uid],
    enabled: !!user?.uid,
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/${user.uid}/theme`);
      return res.data.theme || "light";
    },
  });

  useEffect(() => {
    if (themeData) {
      applyTheme(themeData);
    }
  }, [themeData]);

  const applyTheme = (themeValue) => {
    const root = document.body;
    if (themeValue === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    applyTheme(newTheme);
    const themeInfo = { theme: newTheme };
    await axiosInstance.patch(`/users/${user.uid}/theme`, themeInfo);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeLoading }}>
      {children}
    </ThemeContext.Provider>
  );
};
