import React, { useState } from "react";
import Logo from "../../../components/Logo/Logo";
import { Link, NavLink, useNavigate } from "react-router";
import { FaArrowRight } from "react-icons/fa";
import { IoClose, IoMenu } from "react-icons/io5";
import useAuth from "../../../Hooks/useAuth";
import Avatar from "../../../components/Avatar/Avatar";
import { useLogout } from "../../../Hooks/useLogout";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();
  const handleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const Menus = (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/parcel">Send Parcel</NavLink>
      <NavLink to="/coverage">Coverage</NavLink>
      <NavLink to="/about-us">About Us</NavLink>
      <NavLink to="/rider">Become a Rider</NavLink>
      {/* <NavLink to="/pricing">Pricing</NavLink> */}
      {/* <NavLink to="/blog">Blog</NavLink> */}
      {/* <NavLink to="/contact">Contact</NavLink> */}
    </>
  );

  const AuthMenus = (
    <>
      {user ? (
        <div className="flex items-center gap-2">
          {/* auth desktop */}
          <div className="hidden lg:block dropdown dropdown-end">
            <div tabIndex={0} role="button">
              <div
                className="w-9 h-9 flex items-center justify-center rounded-full overflow-hidden cursor-pointer"
                title={user?.displayName}
              >
                <Avatar />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="dropdown-content menu border border-gray-200 dark:border-gray-800 flex flex-col gap-2 bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li>
                <Link
                  to="/dashboard"
                  className="bg-gray-100 text-sm  font-medium border border-gray-200 dark:border-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 duration-75"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/track-parcel"
                  className="bg-gray-100 text-sm  font-medium border border-gray-200 dark:border-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 duration-75"
                >
                  Track Parcel
                </Link>
              </li>

              <li>
                <button
                  onClick={logout}
                  className="bg-gray-100 text-sm  font-medium border border-gray-200 dark:border-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 duration-75"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>

          {/* auth mobile */}
          <div className="flex lg:hidden flex-col gap-3 mobile-menu auth text-gray-600 mb-3 w-full">
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/track-parcel">Track Parcel</NavLink>
            <button className="text-left" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      ) : (
        <>
          <Link
            to="/login"
            className="bg-gray-100 font-medium border border-gray-200 dark:border-gray-800 px-4 py-2 rounded-xl hover:bg-gray-200 duration-75"
          >
            Login
          </Link>
          <Link to="/register" className="flex items-center">
            <div className="bg-gray-900 text-white lg:text-gray-900 lg:bg-lime-400 font-medium border border-gray-900 lg:border-lime-500/50 px-4 py-2 rounded-xl hover:bg-gray-800 lg:hover:bg-lime-500 duration-75 grow lg:grow-0">
              Signup
            </div>
            <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white lg:text-lime-300 hover:bg-gray-800 -rotate-45">
              <FaArrowRight />
            </div>
          </Link>
        </>
      )}
    </>
  );

  const Modal = (
    <div
      onClick={handleMenuOpen}
      className={`fixed top-0 left-0 w-full h-full bg-gray-950/50 z-10 duration-150 ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`absolute bg-white dark:bg-gray-900 duration-300 w-full max-w-sm h-full right-0 top-0 p-4 overflow-auto ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="modal-topper border-b border-b-gray-300/80 pb-4 mb-4">
          <div>
            <div className="flex justify-between">
              <div>
                <Logo size="w-25"></Logo>
              </div>
              <div>
                <div
                  onClick={handleMenuOpen}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 text-2xl cursor-pointer hover:bg-gray-200 duration-75 text-gray-600"
                >
                  <IoClose />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile Menus */}
        <div>
          <div
            onClick={handleMenuOpen}
            className="flex flex-col gap-3 mobile-menu text-gray-600 mb-3"
          >
            {Menus}
          </div>
          <div className="flex flex-col gap-3">{AuthMenus}</div>
        </div>
      </div>
    </div>
  );
  return (
    <div className="sticky top-2 z-20">
      <div className="container">
        <div className="bg-white dark:bg-gray-900/70 backdrop-blur-3xl rounded-2xl px-8 py-5 border border-gray-200 dark:border-gray-800 mt-5">
          <div className="flex items-center justify-between">
            <Logo></Logo>
            {/* Desktop Menus */}
            <div className="hidden lg:block">
              <div className="flex items-center gap-6 desktop-menu text-gray-600">
                {Menus}
              </div>
            </div>

            {/* Auth Menus */}
            <div className="hidden lg:block">
              <div className="flex items-center gap-4">{AuthMenus}</div>
            </div>

            {/* mobile bar */}
            <div
              onClick={handleMenuOpen}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 text-2xl cursor-pointer hover:bg-gray-200 duration-75 text-gray-600 lg:hidden"
            >
              <IoMenu />
            </div>
          </div>
        </div>
        {Modal}
      </div>
    </div>
  );
};

export default Navbar;
