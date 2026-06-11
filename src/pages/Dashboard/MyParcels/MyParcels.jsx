import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/AxiosSecure";
import { Link } from "react-router";
import { FiEdit, FiEye, FiTrash } from "react-icons/fi";
import Swal from "sweetalert2";
import LoadingTable from "../../../components/Loadings/LoadingTable";
import { MdOutlineTrackChanges } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecureInstance = useAxiosSecure();
  const [modal, setModal] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const {
    data: parcels = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["myparcels", user?.uid],
    queryFn: async () => {
      const res = await axiosSecureInstance.get(`/parcels?uid=${user?.uid}`);
      return res.data;
    },
  });

  const handleParcelDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7ccf00",
      cancelButtonColor: "#1e2939",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecureInstance.delete(`/parcels/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your parcel request has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handlePayment = async (parcel) => {
    const paymentInfo = {
      parcelId: parcel._id,
    };
    const res = await axiosSecureInstance.post(
      "/create-checkout-session",
      paymentInfo,
    );
    console.log(res);
    window.location.href = res.data.url;
  };

  const toggleModal = selectedParcel && (
    <div
      className={`duration-150 ${modal ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
    >
      <div
        onClick={() => setModal(!modal)}
        className="fixed top-0 left-0 w-full h-full bg-black/30 flex items-center justify-center z-20 py-10 px-3"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-sm lg:max-w-2xl bg-white rounded-xl p-5 h-full  overflow-y-auto lg:h-fit"
        >
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-xl font-bold text-gray-800">Parcel Details</h1>
            <div
              onClick={() => setModal(!modal)}
              className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-300 text-2xl cursor-pointer hover:bg-gray-200 duration-75 text-gray-600"
            >
              <IoClose />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 mt-3 gap-3">
            <div className="flex flex-col gap-2">
              <div className="border border-gray-300/70 rounded-lg p-3 bg-gray-100">
                <p>
                  <strong>Id:</strong> {selectedParcel._id}
                </p>
              </div>
              <div className="border border-gray-300/70 rounded-lg p-3 bg-gray-100">
                <p>
                  <strong>Type:</strong> {selectedParcel.type.toUpperCase()}
                </p>
              </div>
              <div className="border border-gray-300/70 rounded-lg p-3 bg-gray-100">
                <p>
                  <strong>Name:</strong> {selectedParcel.parcelname} -{" "}
                  {selectedParcel.parcelweight} KG
                </p>
              </div>
              <div className="border border-gray-300/70 rounded-lg p-3 bg-gray-100">
                <p>
                  <strong>Sender:</strong> {selectedParcel.sendername}
                </p>
              </div>
              <div className="border border-gray-300/70 rounded-lg p-3 bg-gray-100">
                <p>
                  <strong>Sender Phone:</strong> {selectedParcel.senderphone}
                </p>
              </div>
              <div className="border border-gray-300/70 rounded-lg p-3 bg-gray-100">
                <p>
                  <strong>From:</strong> {selectedParcel.senderdistrict}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="border border-gray-300/70 rounded-lg p-3 bg-gray-100">
                <p>
                  <strong>Receiver Name:</strong> {selectedParcel.receivername}
                </p>
              </div>
              <div className="border border-gray-300/70 rounded-lg p-3 bg-gray-100">
                <p>
                  <strong>Receiver Phone:</strong>{" "}
                  {selectedParcel.receiverphone}
                </p>
              </div>
              <div className="border border-gray-300/70 rounded-lg p-3 bg-gray-100">
                <p>
                  <strong>Cost:</strong> {selectedParcel.cost} TK
                </p>
              </div>
              <div className="border border-gray-300/70 rounded-lg p-3 bg-gray-100">
                <p>
                  <strong>Created at:</strong>{" "}
                  {new Date(selectedParcel.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="border border-gray-300/70 rounded-lg p-3 bg-gray-100">
                <p>
                  <strong>Payment Status:</strong>{" "}
                  {selectedParcel.paymentStatus.toUpperCase()}
                </p>
              </div>
              <div className="border border-gray-300/70 rounded-lg p-3 bg-gray-100">
                <p>
                  <strong>To:</strong> {selectedParcel.receiverdistrict}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ViewDetilsModal = (parcel) => {
    setModal(!modal);
    setSelectedParcel(parcel);
  };

  return (
    <div className="p-5 lg:p-10 bg-white border border-gray-200 rounded-2xl">
      <h1 className="text-3xl text-gray-800 font-extrabold mb-5">
        Manage Parcel
      </h1>

      {isLoading ? (
        <LoadingTable></LoadingTable>
      ) : parcels.length > 0 ? (
        <div className="overflow-x-auto">
          <span className="mb-3 block">
            Total parcel: <strong>{parcels.length}</strong>
          </span>
          <table className="table table-zebra border border-gray-200/80">
            {/* head */}
            <thead>
              <tr>
                <th>Sl.</th>
                <th>Parcel Info</th>
                <th>Recipient Info</th>
                <th>Cost</th>
                <th>Payment</th>
                <th>Trackings</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, i) => {
                return (
                  <tr key={parcel._id}>
                    <th>{i + 1}</th>
                    <td>{parcel.parcelname}</td>
                    <td>
                      <div className="flex flex-col gap-3">
                        <p>Name: {parcel.receivername}</p>
                        <p>Address: {parcel.receiveraddress},</p>
                        <p>
                          Region: {parcel.receiverregion}, District:{" "}
                          {parcel.receiverdistrict}
                        </p>
                        <p>Phone: {parcel.receiverphone}</p>
                      </div>
                    </td>
                    <td>{parcel.cost} TK</td>
                    <td>
                      {parcel.paymentStatus === "paid" ? (
                        <span className="text-lime-500 font-bold text-[16px]">
                          Paid
                        </span>
                      ) : (
                        <button
                          onClick={() => handlePayment(parcel)}
                          className="btn btn-sm bg-lime-400 hover:bg-lime-500 duration-150"
                        >
                          Pay
                        </button>
                      )}
                    </td>
                    <td>
                      {parcel.deliveryStatus === "pending" ? (
                        parcel.deliveryStatus
                      ) : (
                        <>
                          <p className="mb-2">
                            {parcel.deliveryStatus.toUpperCase()}
                          </p>
                          <Link
                            className="flex items-center justify-center bg-lime-400 hover:bg-lime-500 px-3 py-1.5 rounded-sm text-gray-800 gap-1 cursor-pointer shrink-0 w-fit text-sm"
                            to={`/track-parcel?trackingid=${parcel.trackingId}`}
                          >
                            Track{" "}
                            <MdOutlineTrackChanges
                              size={18}
                              className="shrink-0"
                            />
                          </Link>
                        </>
                      )}
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="tooltip" data-tip="View Parcel">
                          <button
                            onClick={() => ViewDetilsModal(parcel)}
                            className="btn btn-square bg-lime-400/50 hover:bg-lime-400 duration-150 rounded-lg"
                          >
                            <FiEye size={18} />
                          </button>
                          {toggleModal}
                        </div>
                        {/* <div className="tooltip" data-tip="Edit Parcel">
                          <Link
                            className="btn btn-square bg-amber-300/50 hover:bg-amber-300 duration-150 rounded-lg"
                            to={`/parcel/edit/${parcel._id}`}
                          >
                            <FiEdit size={18} />
                          </Link>
                        </div> */}
                        <div className="tooltip" data-tip="Delete Parcel">
                          <button
                            onClick={() => handleParcelDelete(parcel._id)}
                            className="btn btn-square bg-red-400/40 hover:bg-red-400 duration-150 rounded-lg"
                            to={`/parcel/edit/${parcel._id}`}
                          >
                            <FiTrash size={18} />
                          </button>
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
          <span>No parcel data found!</span>
        </div>
      )}
    </div>
  );
};

export default MyParcels;
