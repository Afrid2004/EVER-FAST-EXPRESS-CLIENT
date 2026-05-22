import React from "react";
import Logo from "../../../components/Logo/Logo";
import { Link, NavLink } from "react-router";
import { FaArrowRight } from "react-icons/fa";

const Navbar = () => {
  const MenusStyle = ({ isActive }) =>
    isActive ? "active-link" : "text-secondary";
  const Menus = (
    <>
      <NavLink to="/services" className={MenusStyle}>
        Services
      </NavLink>
      <NavLink to="/coverage" className={MenusStyle}>
        Coverage
      </NavLink>
      <NavLink to="/about-us" className={MenusStyle}>
        About Us
      </NavLink>
      <NavLink to="/pricing" className={MenusStyle}>
        Pricing
      </NavLink>
      <NavLink to="/blog" className={MenusStyle}>
        Blog
      </NavLink>
      <NavLink to="/contact" className={MenusStyle}>
        Contact
      </NavLink>
    </>
  );
  return (
    <div>
      <div className="container">
        <div className="bg-white rounded-2xl px-8 py-5 border border-gray-200 mt-5">
          <div className="flex items-center justify-between">
            <Logo></Logo>
            {/* Desktop Menus */}
            <div>
              <div className="flex items-center gap-9">{Menus}</div>
            </div>

            {/* Auth Menus */}
            <div>
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="bg-gray-100 font-medium border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-200 duration-75"
                >
                  Login
                </Link>
                <Link to="/signup" className="flex items-center">
                  <div className="bg-lime-400 font-medium border border-lime-500 px-4 py-2 rounded-xl hover:bg-lime-500 duration-75 text-dark">
                    Signup
                  </div>
                  <div className="w-10 h-10 bg-dark rounded-full flex items-center justify-center text-lime-300 hover:text-lime-400 -rotate-45">
                    <FaArrowRight />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
