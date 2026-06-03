import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/AxiosSecure";
import LoadingTable from "../../../components/Loadings/LoadingTable";
import Avatar from "../../../components/Avatar/Avatar";
import { LuShieldBan, LuShieldCheck } from "react-icons/lu";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const { user } = useAuth();

  const axiosSecureInstance = useAxiosSecure();
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", user?.uid],
    queryFn: async () => {
      const res = await axiosSecureInstance.get("/users");
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
    <div className="p-10 bg-white border border-gray-200 rounded-2xl">
      <h1 className="text-3xl text-gray-800 font-extrabold mb-5">
        Manage Users
      </h1>

      {isLoading ? (
        <LoadingTable></LoadingTable>
      ) : users.length > 0 ? (
        <div className="overflow-x-auto">
          <span className="mb-3 block">
            Total user: <strong>{users.length}</strong>
          </span>
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
              {users.map((user, i) => {
                const userName = user?.displayName || "User";
                const [first = "", second = ""] = userName.split(" ");
                return (
                  <tr key={user._id}>
                    <td>{i + 1}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 flex items-center justify-center rounded-full overflow-hidden cursor-pointer">
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
        </div>
      ) : (
        <div
          role="alert"
          className="alert alert-warning alert-soft border border-amber-200"
        >
          <span>No parcel data found!</span>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
