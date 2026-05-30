import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { Outlet, useNavigate } from "react-router";
import { NavLink } from "react-router";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import { useLogout } from "../Hooks/useLogout";

const DashboardLayout = () => {
  const logout = useLogout();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-white border-b border-gray-200">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4">Dashboard</div>
        </nav>
        {/* Page content here */}
        <div className="container py-3">
          <Outlet></Outlet>
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-white border-e border-gray-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow dashboard-link flex flex-col gap-2">
            <li>
              <NavLink
                to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right py-3"
                data-tip="Home"
              >
                <img
                  src="/images/home.png"
                  className="w-4 shrink-0"
                  alt="home"
                />
                <span className="is-drawer-close:hidden">Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right py-3"
                data-tip="Dashboard"
                end
              >
                <img
                  src="/images/dashboard.png"
                  className="w-4 shrink-0"
                  alt="home"
                />
                <span className="is-drawer-close:hidden">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/my-parcels"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right py-3"
                data-tip="Dashboard"
                end
              >
                <img
                  src="/images/parcel.png"
                  className="w-4 shrink-0"
                  alt="home"
                />
                <span className="is-drawer-close:hidden">My Parcels</span>
              </NavLink>
            </li>
            <li>
              <button
                onClick={logout}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right py-3"
                data-tip="Logout"
              >
                <img
                  src="/images/logout.png"
                  className="w-4 shrink-0"
                  alt="home"
                />
                <span className="is-drawer-close:hidden">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
