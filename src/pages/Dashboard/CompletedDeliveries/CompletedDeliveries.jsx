import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/AxiosSecure";
import LoadingTable from "../../../components/Loadings/LoadingTable";

const CompletedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecureInstance = useAxiosSecure();
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["completed-deliveries", user?.uid],
    queryFn: async () => {
      const res = await axiosSecureInstance.get(
        `/parcels/completed?deliveryStatus=delivered&rideruid=${user?.uid}`,
      );
      return res.data;
    },
  });

  const Payout = (parcel) => {
    if (parcel.senderdistrict === parcel.receiverdistrict) {
      return parcel.cost * 0.6;
    } else {
      return parcel.cost * 0.8;
    }
  };

  console.log(parcels);
  return (
    <div className="p-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl">
      <h1 className="text-3xl text-gray-800 dark:text-white font-extrabold mb-5">
        Completed Deliveries
      </h1>

      {isLoading ? (
        <LoadingTable></LoadingTable>
      ) : parcels.length > 0 ? (
        <div className="overflow-x-auto">
          <span className="mb-3 block">
            Total Delivered Parcels: <strong>{parcels.length}</strong>
          </span>
          <table className="table table-zebra border border-gray-200 dark:border-gray-800/80">
            {/* head */}
            <thead>
              <tr>
                <th>Sl.</th>
                <th>Parcel Info</th>
                <th>Pickup & Receiver District</th>
                <th>Delivery Time</th>
                <th>Cost</th>
                <th>Payout</th>
                <th>Action</th>
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
                    <td>
                      <p>Sender: {parcel.senderdistrict}</p>
                      <p>Receiver: {parcel.receiverdistrict}</p>
                    </td>
                    <td>{new Date(parcel.deliveredAt).toLocaleString()}</td>
                    <td>{parcel.cost} TK</td>
                    <td>{Payout(parcel)} TK</td>
                    <td>
                      <button className="flex items-center gap-1 bg-lime-400/70 hover:bg-lime-400 duration-150 text-sm rounded-lg py-1 px-2 cursor-pointer">
                        Cash Out
                      </button>
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

export default CompletedDeliveries;
