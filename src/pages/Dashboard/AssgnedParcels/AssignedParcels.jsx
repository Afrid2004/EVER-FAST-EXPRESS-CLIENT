import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/AxiosSecure";
import LoadingTable from "../../../components/Loadings/LoadingTable";
import Swal from "sweetalert2";

const AssignedParcels = () => {
  const { user } = useAuth();
  const axiosSecureInstance = useAxiosSecure();
  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["assigned-parcels", user?.uid],
    queryFn: async () => {
      const res = await axiosSecureInstance.get(
        `/parcels/rider?uid=${user?.uid}&deliveryStatus=rider-assigned`,
      );
      return res.data;
    },
  });

  const handleParcel = (parcel, response) => {
    Swal.fire({
      title: `Confirm ${response} this parcel?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7ccf00",
      cancelButtonColor: "#1e2939",
      confirmButtonText: "Yes, Confirm!",
    }).then((result) => {
      if (result.isConfirmed) {
        const acceptInfo = {
          response: response,
          riderid: parcel.riderid,
        };
        axiosSecureInstance
          .patch(`/parcels/${parcel._id}/rider`, acceptInfo)
          .then((res) => {
            if (res.data?.modifiedCount) {
              refetch();
              Swal.fire({
                title: `${response}`,
                icon: "success",
              });
            }
          });
      }
    });
  };

  const handleAccept = (parcel) => {
    handleParcel(parcel, "accepted");
  };
  const handleReject = (parcel) => {
    handleParcel(parcel, "rejected");
  };
  const handlePickedUp = (parcel) => {
    handleParcel(parcel, "pickedup");
  };
  const handleDeliverd = (parcel) => {
    handleParcel(parcel, "completed");
  };
  return (
    <div className="p-10 bg-white border border-gray-200 rounded-2xl">
      <h1 className="text-3xl text-gray-800 font-extrabold mb-5">
        Assigned Parcels
      </h1>

      {isLoading ? (
        <LoadingTable></LoadingTable>
      ) : parcels.length > 0 ? (
        <div className="overflow-x-auto">
          <span className="mb-3 block">
            Total Assigned Parcels: <strong>{parcels.length}</strong>
          </span>
          <table className="table table-zebra border border-gray-200/80">
            {/* head */}
            <thead>
              <tr>
                <th>Sl.</th>
                <th>Parcel Info</th>
                <th>Cost</th>
                <th>Pickup District</th>
                <th>Receiver District</th>
                <th>Response</th>
                <th>Mark Status</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, index) => {
                return (
                  <tr key={parcel._id}>
                    <td>{index + 1}</td>
                    <td>
                      {parcel.parcelname}{" "}
                      <span className="text-xm bg-lime-400/70 rounded-sm px-1">
                        {parcel.parcelweight}KG
                      </span>
                      <p>Sender Name: {parcel.sendername}</p>
                    </td>
                    <td>{parcel.cost} TK</td>
                    <td>
                      <p>{parcel.senderdistrict}</p>
                      <p>Phone: {parcel.senderphone}</p>
                    </td>
                    <td>
                      <p>{parcel.receiverdistrict}</p>
                      <p>Phone: {parcel.receiverphone}</p>
                    </td>
                    <td>
                      {parcel.deliveryStatus === "rider-assigned" ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleAccept(parcel)}
                            className="flex items-center gap-1 bg-lime-400/70 hover:bg-lime-400 duration-150 rounded-lg py-1 px-2 cursor-pointer"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleReject(parcel)}
                            className="flex items-center gap-1 bg-red-400/70 hover:bg-red-400 duration-150 rounded-lg py-1 px-2 cursor-pointer"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-lime-500 font-bold">
                          Accepted
                        </span>
                      )}
                    </td>
                    <td>
                      {parcel.deliveryStatus === "rider-accepted" ? (
                        <button
                          onClick={() => handlePickedUp(parcel)}
                          className="flex items-center gap-1 bg-amber-400/70 hover:bg-amber-400 duration-150 text-sm rounded-lg py-1 px-2 cursor-pointer"
                        >
                          Pick Up
                        </button>
                      ) : parcel.deliveryStatus === "picked-up" ? (
                        <button
                          onClick={() => handleDeliverd(parcel)}
                          className="flex items-center gap-1 bg-lime-400/70 hover:bg-lime-400 text-sm duration-150 rounded-lg py-1 px-2 cursor-pointer"
                        >
                          Deliver
                        </button>
                      ) : (
                        <span>No data</span>
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
          <span>No Assigned Parcels found!</span>
        </div>
      )}
    </div>
  );
};

export default AssignedParcels;
