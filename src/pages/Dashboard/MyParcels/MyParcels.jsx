import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxios from "../../../Hooks/AxiosHook";
import { Link } from "react-router";
import { FiEdit, FiEye, FiTrash } from "react-icons/fi";
import Swal from "sweetalert2";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const {
    data: parcels = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["myparcels", user?.uid],
    queryFn: async () => {
      const res = await axiosInstance.get(`/parcels?uid=${user?.uid}`);
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
        axiosInstance.delete(`/parcels/${id}`).then((res) => {
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
                <th>Payment</th>
                <th>Delivery Status</th>
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
                    <td>
                      {parcel.paymentStatus === "paid" ? (
                        <span className="text-lime-500">Paid</span>
                      ) : (
                        <Link to={`/dashboard/payment/${parcel._id}`}>
                          <button className="btn btn-sm bg-lime-400 hover:bg-lime-500 duration-150">
                            Pay
                          </button>
                        </Link>
                      )}
                    </td>
                    <td></td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="tooltip" data-tip="View Parcel">
                          <Link
                            className="btn btn-square hover:bg-lime-400 duration-150 rounded-lg"
                            to={`/parcel/view/${parcel._id}`}
                          >
                            <FiEye size={18} />
                          </Link>
                        </div>
                        <div className="tooltip" data-tip="Edit Parcel">
                          <Link
                            className="btn btn-square hover:bg-gray-800 hover:text-white duration-150 rounded-lg"
                            to={`/parcel/edit/${parcel._id}`}
                          >
                            <FiEdit size={18} />
                          </Link>
                        </div>
                        <div className="tooltip" data-tip="Delete Parcel">
                          <button
                            onClick={() => handleParcelDelete(parcel._id)}
                            className="btn btn-square hover:bg-red-400 duration-150 rounded-lg"
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
