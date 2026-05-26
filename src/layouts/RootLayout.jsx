import React from "react";
import { Outlet, useNavigation } from "react-router";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";
import LoadingPage from "../components/Loadings/LoadingPage";

const RootLayout = () => {
  const navigateState = useNavigation();
  console.log(navigateState);
  return (
    <>
      <Navbar></Navbar>
      <div className="container py-5">
        {navigateState.state === "loading" && <LoadingPage></LoadingPage>}
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </>
  );
};

export default RootLayout;
