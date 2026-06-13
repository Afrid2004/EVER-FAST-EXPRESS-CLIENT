import { createContext, useContext, useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/AxiosSecure";
import useAuth from "../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { user } = useAuth();
  const axiosSecureInstance = useAxiosSecure();
  const [theme, setTheme] = useState("light");

  const { data: themeData } = useQuery({
    queryKey: ["themes", user?.uid], // theme এর বদলে user?.uid
    enabled: !!user?.uid, // user না থাকলে fetch করবে না
    queryFn: async () => {
      const res = await axiosSecureInstance.get(`/users/${user.uid}/theme`);
      return res.data.theme || "light"; // ← return করতে হবে
    },
  });

  // themeData আসলে apply করুন
  useEffect(() => {
    if (themeData) {
      setTheme(themeData);
      applyTheme(themeData);
    }
  }, [themeData]);

  const applyTheme = (themeValue) => {
    const root = document.documentElement;
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
    await axiosSecureInstance.patch(`/users/${user.uid}/theme`, themeInfo);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
