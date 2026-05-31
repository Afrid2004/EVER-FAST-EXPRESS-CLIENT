import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/AxiosSecure";
import { Link } from "react-router";
import { FiEdit, FiEye, FiTrash } from "react-icons/fi";
import Swal from "sweetalert2";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecureInstance = useAxiosSecure();
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
      cost: parcel.cost,
      senderuid: parcel.senderuid,
      senderemail: parcel.senderemail,
      parcelname: parcel.parcelname,
      parcelId: parcel._id,
    };
    const res = await axiosSecureInstance.post(
      "/create-checkout-session",
      paymentInfo,
    );
    console.log(res);
    window.location.href = res.data.url;
  };
  return (
    <div className="p-10 bg-white border border-gray-200 rounded-2xl">
      <h1 className="text-3xl text-gray-800 font-extrabold mb-5">
        Manage Parcel
      </h1>

      {parcels.length > 0 ? (
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
                {/* <th>Delivery Status</th> */}
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
                      {parcel.paymentstatus === "paid" ? (
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
                      <div className="flex items-center gap-2">
                        <div className="tooltip" data-tip="View Parcel">
                          <Link
                            className="btn btn-square bg-lime-400/50 hover:bg-lime-400 duration-150 rounded-lg"
                            to={`/parcel/view/${parcel._id}`}
                          >
                            <FiEye size={18} />
                          </Link>
                        </div>
                        <div className="tooltip" data-tip="Edit Parcel">
                          <Link
                            className="btn btn-square bg-amber-300/50 hover:bg-amber-300 duration-150 rounded-lg"
                            to={`/parcel/edit/${parcel._id}`}
                          >
                            <FiEdit size={18} />
                          </Link>
                        </div>
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
