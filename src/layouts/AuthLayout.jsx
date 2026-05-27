import React from "react";
import Logo from "../components/Logo/Logo";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="bg-white h-screen overflow-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
        <div className="p-5 h-full flex flex-col gap-5">
          <div className="mx-auto">
            <Logo size={"w-25"}></Logo>
          </div>
          <div className="flex items-center justify-center h-full">
            <div>
              <Outlet></Outlet>
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          <div className="bg-lime-50 h-full flex items-center justify-center">
            <div className="w-70">
              <img
                src="/images/authImage.webp"
                alt="authimage"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
