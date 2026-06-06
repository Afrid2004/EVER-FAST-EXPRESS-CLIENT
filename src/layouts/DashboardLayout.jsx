import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { Outlet, useNavigate } from "react-router";
import { NavLink } from "react-router";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import { useLogout } from "../Hooks/useLogout";
import useRole from "../Hooks/useRole";

const DashboardLayout = () => {
  const { userRole } = useRole();
  const { user } = useAuth();
  const userName = user?.displayName || "User";
  const [first = "", second = ""] = userName.split(" ");
  const logout = useLogout();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-white border-b border-gray-200">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
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
            </div>

            <div>
              <div className="flex items-center gap-2 bg-gray-200/50 border border-gray-200 py-2 px-3 rounded-lg">
                <div className="w-7 h-7 flex items-center justify-center rounded-full overflow-hidden cursor-pointer">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-full"
                    />
                  ) : (
                    <h5 className="text-white bg-gray-800 w-full h-full flex items-center justify-center">
                      {first ? first[0] : ""}
                      {second ? second[0] : ""}
                    </h5>
                  )}
                </div>
                <div className="text-xs">
                  <p className="font-bold">{user.displayName}</p>
                  <p>{userRole.toUpperCase()}</p>
                </div>
              </div>
            </div>
          </div>
        </nav>
        {/* Page content here */}
        <div className="p-3">
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
                data-tip="My Parcels"
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
              <NavLink
                to="/dashboard/payment-history"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right py-3"
                data-tip="Payment History"
                end
              >
                <img
                  src="/images/payment_history.png"
                  className="w-4 shrink-0"
                  alt="home"
                />
                <span className="is-drawer-close:hidden">Payment History</span>
              </NavLink>
            </li>
            {userRole === "rider" && (
              <li>
                <NavLink
                  to="/dashboard/assigned-parcels"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right py-3"
                  data-tip="Assigned Parcels"
                  end
                >
                  <img
                    src="/images/assigned.png"
                    className="w-4 shrink-0"
                    alt="home"
                  />
                  <span className="is-drawer-close:hidden">
                    Assigned Parcels
                  </span>
                </NavLink>
              </li>
            )}
            {userRole === "admin" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/assign-riders"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right py-3"
                    data-tip="Assign Riders"
                    end
                  >
                    <img
                      src="/images/assign.png"
                      className="w-4 shrink-0"
                      alt="home"
                    />
                    <span className="is-drawer-close:hidden">
                      Assign Riders
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/pending-riders"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right py-3"
                    data-tip="Pending Riders"
                    end
                  >
                    <img
                      src="/images/pendingrider.png"
                      className="w-4 shrink-0"
                      alt="home"
                    />
                    <span className="is-drawer-close:hidden">
                      Pending Riders
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manage-users"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right py-3"
                    data-tip="Manage Users"
                    end
                  >
                    <img
                      src="/images/manageuser.png"
                      className="w-4 shrink-0"
                      alt="home"
                    />
                    <span className="is-drawer-close:hidden">Manage Users</span>
                  </NavLink>
                </li>
              </>
            )}
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
