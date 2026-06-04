import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/AxiosSecure";
import LoadingTable from "../../../components/Loadings/LoadingTable";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import { TbHandFinger } from "react-icons/tb";

const AssignRiders = () => {
  const { user } = useAuth();
  const modalRef = useRef(null);
  const axiosSecureInstance = useAxiosSecure();
  const [selectedParcel, setSelectedParcel] = useState();
  //load pendig-pickup parcels
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["assigned-riders", user?.uid],
    queryFn: async () => {
      const res = await axiosSecureInstance.get(
        "/parcels?deliveryStatus=pending-pickup",
      );
      return res.data;
    },
  });

  // load riders who are avialable
  const { data: riders = [], isLoading: riderLoading } = useQuery({
    queryKey: ["riders", selectedParcel?.senderdistrict, "available"],
    // enabled used for only enable based on selectedparcel state
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecureInstance.get(
        `/riders?status=approved&workStatus=available&district=${selectedParcel?.senderdistrict}`,
      );
      console.log(res.data);
      return res.data;
    },
  });
  const handleAssignRiderModal = (parcel) => {
    modalRef.current.showModal();
    setSelectedParcel(parcel);
  };

  // const assignRiders = () => {

  // }
  return (
    <div className="p-10 bg-white border border-gray-200 rounded-2xl">
      <h1 className="text-3xl text-gray-800 font-extrabold mb-5">
        Assign Riders
      </h1>

      {isLoading ? (
        <LoadingTable rows={5}></LoadingTable>
      ) : parcels.length > 0 ? (
        <div className="overflow-x-auto">
          <span className="mb-3 block">
            Total Pending Pickup: <strong>{parcels.length}</strong>
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
                <th>Created At</th>
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
                    </td>
                    <td>{parcel.cost} TK</td>
                    <td>{parcel.senderdistrict}</td>
                    <td>{parcel.receiverdistrict}</td>
                    <td>{new Date(parcel.createdAt).toLocaleString()}</td>
                    <td>
                      <button
                        onClick={() => handleAssignRiderModal(parcel)}
                        className="flex items-center gap-1 bg-lime-400/70 hover:bg-lime-400 duration-150 rounded-lg py-1 px-2 cursor-pointer"
                      >
                        Show Rider
                        <MdOutlineAddLocationAlt />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* Open the modal */}
          <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-5">Available Riders</h3>
              {riderLoading ? (
                <LoadingTable></LoadingTable>
              ) : riders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="table table-zebra border border-gray-200/80">
                    <thead>
                      <tr>
                        <th>Sl.</th>
                        <th>Rider Name</th>
                        <th>Rider Phone</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {riders.map((rider, index) => {
                        return (
                          <tr key={rider._id}>
                            <td>{index + 1}</td>
                            <td>{rider.name}</td>
                            <td>{rider.phone}</td>
                            <td>
                              <button
                                onClick={() => handleAssignRiderModal(parcel)}
                                className="flex items-center gap-1 bg-lime-400/70 hover:bg-lime-400 duration-150 rounded-lg py-1 px-2 cursor-pointer shrink-0"
                              >
                                Assign Rider
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
                  <span>No available Rider found! Please try again later.</span>
                </div>
              )}

              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      ) : (
        <div
          role="alert"
          className="alert alert-warning alert-soft border border-amber-200"
        >
          <span>No Pending Pickup found!</span>
        </div>
      )}
    </div>
  );
};

export default AssignRiders;
