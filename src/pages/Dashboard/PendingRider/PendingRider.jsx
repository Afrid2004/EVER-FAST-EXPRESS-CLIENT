import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/AxiosSecure";
import { Link } from "react-router";
import { FiEdit, FiEye, FiTrash, FiUserCheck, FiUserX } from "react-icons/fi";
import Swal from "sweetalert2";
import LoadingTable from "../../../components/Loadings/LoadingTable";

const PendingRider = () => {
  const { user } = useAuth();
  const axiosSecureInstance = useAxiosSecure();

  const {
    data: riders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["payments", user?.uid],
    queryFn: async () => {
      const res = await axiosSecureInstance.get(`/riders?uid=${user?.uid}`);
      return res.data;
    },
  });

  const handleRiderStatus = (rider, status, workStatus) => {
    const updateInfo = {
      status: status,
      uid: rider.uid,
      workStatus: workStatus,
    };
    axiosSecureInstance
      .patch(`/riders/${rider._id}`, updateInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            title: "Success!",
            text: `Rider status has been set to ${status}`,
            icon: "success",
          });
          refetch();
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed to update Rider status!",
          });
        }
      });
  };

  const handleApprove = (rider) => {
    handleRiderStatus(rider, "approved", "available");
  };
  const handleReject = (rider) => {
    handleRiderStatus(rider, "rejected", "layoff");
  };
  return (
    <div className="p-10 bg-white border border-gray-200 rounded-2xl">
      <h1 className="text-3xl text-gray-800 font-extrabold mb-5">
        Pending Riders
      </h1>

      {isLoading ? (
        <LoadingTable rows={5}></LoadingTable>
      ) : riders.length > 0 ? (
        <div className="overflow-x-auto">
          <span className="mb-3 block">
            Total pendings: <strong>{riders.length}</strong>
          </span>
          <table className="table table-zebra border border-gray-200/80">
            {/* head */}
            <thead>
              <tr>
                <th>Sl.</th>
                <th>Rider Info</th>
                <th>License & NID</th>
                <th>Registration Number</th>
                <th>Region & District</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {riders.map((rider, i) => {
                return (
                  <tr key={rider._id}>
                    <th>{i + 1}</th>
                    <td>
                      <p className="mb-1">{rider.name}</p>
                      <p className="mb-1">Tel: {rider.phone}</p>
                    </td>
                    <td>
                      <p className="mb-1">License: {rider.license}</p>
                      <p>NID: {rider.nid}</p>
                    </td>
                    <td>{rider.registerednumber}</td>
                    <td>
                      <p className="mb-1">Region: {rider.riderregion}</p>
                      <p>District: {rider.riderdistrict}</p>
                    </td>
                    <td>
                      <div
                        className={`${rider.status === "pending" ? "bg-amber-400/20 text-amber-500" : rider.status === "approved" ? "bg-lime-400/20 text-lime-500" : "bg-red-400/20 text-red-500"} uppercase py-1 px-3 rounded-lg duration-150 text-center text-sm w-fit`}
                      >
                        {rider.status}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div
                          onClick={() => handleApprove(rider)}
                          className="tooltip"
                          data-tip="Approve Rider"
                        >
                          <div className="btn btn-square bg-lime-400/40  border-0 hover:bg-lime-400 duration-150 rounded-lg">
                            <FiUserCheck size={18} />
                          </div>
                        </div>
                        <div
                          onClick={() => handleReject(rider)}
                          className="tooltip"
                          data-tip="Reject Rider"
                        >
                          <div className="btn btn-square bg-red-400/40 border-0 hover:bg-red-400 duration-150 rounded-lg">
                            <FiUserX size={18} />
                          </div>
                        </div>
                        <div className="tooltip" data-tip="Delete">
                          <div className="btn btn-square bg-gray-400/40 hover:bg-gray-400 duration-150 rounded-lg">
                            <FiTrash size={18} />
                          </div>
                        </div>
                      </div>
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
          <span>No Pending Riders found!</span>
        </div>
      )}
    </div>
  );
};

export default PendingRider;
