import React, { useState } from "react";
import Logo from "../../../components/Logo/Logo";
import { Link, NavLink } from "react-router";
import { FaArrowRight } from "react-icons/fa";
import { IoClose, IoMenu } from "react-icons/io5";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const Menus = (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/services">Services</NavLink>
      <NavLink to="/services">Covarage</NavLink>
      <NavLink to="/about-us">About Us</NavLink>
      <NavLink to="/pricing">Pricing</NavLink>
      <NavLink to="/blog">Blog</NavLink>
      <NavLink to="/contact">Contact</NavLink>
    </>
  );

  const AuthMenus = (
    <>
      <Link
        to="/login"
        className="bg-gray-100 font-medium border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-200 duration-75"
      >
        Login
      </Link>
      <Link to="/signup" className="flex items-center">
        <div className="bg-gray-900 text-white lg:text-gray-900 lg:bg-lime-400 font-medium border border-gray-900 lg:border-lime-500/50 px-4 py-2 rounded-xl hover:bg-gray-800 lg:hover:bg-lime-500 duration-75 grow lg:grow-0">
          Signup
        </div>
        <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white lg:text-lime-300 hover:bg-gray-800 -rotate-45">
          <FaArrowRight />
        </div>
      </Link>
    </>
  );

  const Modal = (
    <div
      onClick={handleMenuOpen}
      className={`fixed top-0 left-0 w-full h-full bg-gray-950/50 z-10 duration-150 ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`absolute bg-white duration-300 w-full max-w-sm h-full right-0 top-0 p-4 overflow-auto ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
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
          <div className="flex flex-col gap-3 mobile-menu text-gray-600 mb-3">
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
        <div className="bg-white rounded-2xl px-8 py-5 border border-gray-200 mt-5">
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
