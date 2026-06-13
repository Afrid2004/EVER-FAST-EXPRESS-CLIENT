import React from "react";
import { Outlet, useNavigation } from "react-router";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";
import LoadingPage from "../components/Loadings/LoadingPage";
import { ThemeProvider } from "../context/ThemeProvider";

const RootLayout = () => {
  const navigateState = useNavigation();
  return (
    <>
      <ThemeProvider>
        <Navbar></Navbar>
        <div className="container py-5">
          {navigateState.state === "loading" && <LoadingPage></LoadingPage>}
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </ThemeProvider>
    </>
  );
};

export default RootLayout;
