import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/AxiosSecure";
import LoadingTable from "../../../components/Loadings/LoadingTable";
import Avatar from "../../../components/Avatar/Avatar";
import { LuShieldBan, LuShieldCheck } from "react-icons/lu";
import Swal from "sweetalert2";
import { FiSearch } from "react-icons/fi";
import LoadingSpin from "../../../components/Loadings/LoadingSpin";
import { IoChevronDown } from "react-icons/io5";

const ManageUsers = () => {
  const { user } = useAuth();
  const axiosSecureInstance = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("createdAt");
  const [order, setOrder] = useState("asc");
  const [limit, setLimit] = useState(5);

  const handleChange = (e) => {
    const searchValue = e.target.value.trim();
    setSearch(searchValue);
  };

  const handleSort = (e) => {
    const sortedValue = e.target.value.split("-");
    setSort(sortedValue[0]);
    setOrder(sortedValue[1]);
  };

  const handleSeeMore = () => {
    setLimit((prev) => prev + 5);
  };

  const {
    data: users = { result: [], totalUser: 0 },
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", search, sort, order, limit],
    queryFn: async () => {
      const res = await axiosSecureInstance.get(
        `/users?search=${search}&limit=${limit}&sort=${sort}&order=${order}`,
      );
      return res.data;
    },
  });

  const handleUserManage = (user, isAdmin) => {
    Swal.fire({
      title: `Confirm ${isAdmin ? "Admin" : "Remove Admin"}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7ccf00",
      cancelButtonColor: "#1e2939",
      confirmButtonText: "Yes, Confirm!",
    }).then((result) => {
      if (result.isConfirmed) {
        const manageuser = { isAdmin: isAdmin };
        axiosSecureInstance
          .patch(`/users/${user._id}/role`, manageuser)
          .then((res) => {
            if (res.data?.modifiedCount) {
              refetch();
              Swal.fire({
                title: "Updated!",
                text: `User role has been set to ${isAdmin ? "Admin" : "Remove Admin"}.`,
                icon: "success",
              });
            }
          });
      }
    });
  };

  const handleMakeAdmin = (user) => {
    const isAdmin = true;
    handleUserManage(user, isAdmin);
  };
  const handleRemoveAdmin = (user) => {
    const isAdmin = false;
    handleUserManage(user, isAdmin);
  };

  return (
    <div className="p-5 lg:p-10 bg-white border border-gray-200 rounded-2xl">
      <h1 className="text-3xl text-gray-800 font-extrabold mb-5">
        Manage Users
      </h1>

      <div className="mb-3">
        <div className="flex items-center flex-wrap md:flex-nowrap justify-between gap-5">
          <div>
            <p>
              Total user: <strong>{users.totalUser}</strong>
            </p>
          </div>
          <div className="w-full max-w-sm">
            <div className="flex w-full border border-gray-300/70 h-10 rounded-sm overflow-hidden">
              <input
                type="text"
                name="search"
                onChange={handleChange}
                id="search"
                value={search}
                placeholder="User name or email"
                className="outline-none w-full px-2.5 h-full"
              />
              <button className="h-full flex items-center justify-center bg-gray-200 px-2.5">
                <FiSearch className="w-5 shrink-0 text-gray-700" />
              </button>
            </div>
          </div>
          <div>
            <select
              id="sort"
              name="sort"
              onChange={handleSort}
              className="select w-full outline-none"
            >
              <option selected value="createdAt-asc">
                Sort by: Oldest first
              </option>
              <option value="createdAt-desc">Sort by: Newest first</option>
              <option value="displayName-asc">Sort by: Name A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <LoadingTable></LoadingTable>
      ) : users.result.length > 0 ? (
        <div className="overflow-x-auto relative">
          <table className="table table-zebra border border-gray-200/80">
            {/* head */}
            <thead>
              <tr>
                <th>Sl.</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>User Role</th>
                <th>Admin Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.result.map((user, i) => {
                const userName = user?.displayName || "User";
                const [first = "", second = ""] = userName.split(" ");
                return (
                  <tr key={user._id}>
                    <td>{i + 1}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 flex items-center justify-center rounded-full overflow-hidden cursor-pointer shrink-0">
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
                        <p>{user.displayName}</p>
                      </div>
                    </td>
                    <td>{user.email ? user.email : "NULL"}</td>
                    <td>{user.isAdmin ? "ADMIN" : user.role.toUpperCase()}</td>
                    <td>
                      {" "}
                      {user.isAdmin === true ? (
                        <button
                          onClick={() => handleRemoveAdmin(user)}
                          className="flex items-center gap-1 bg-red-400/50 hover:bg-red-400 duration-150 rounded-lg py-1 px-2 cursor-pointer"
                        >
                          <LuShieldBan size={16} />
                          Remove Admin
                        </button>
                      ) : (
                        <button
                          onClick={() => handleMakeAdmin(user)}
                          className="flex items-center gap-1 bg-lime-400/50 hover:bg-lime-400 duration-150 rounded-lg py-1 px-2 cursor-pointer"
                        >
                          <LuShieldCheck size={16} />
                          Make Admin
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {users.totalUser > limit && (
            <div className="w-full h-30 absolute left-0 bottom-0 flex items-end justify-center bg-linear-to-b from-transparent to-white to-90%">
              <button
                onClick={handleSeeMore}
                className="px-4 py-2 bg-lime-400 hover:bg-lime-500 duration-150 rounded-4xl mb-3 text-gray-800 text-sm cursor-pointer flex items-center gap-2"
              >
                See more <IoChevronDown />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div
          role="alert"
          className="alert alert-warning alert-soft border border-amber-200"
        >
          <span>No user data found!</span>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
