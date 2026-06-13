import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/AxiosSecure";
import { Link } from "react-router";
import { FiEdit, FiEye, FiTrash } from "react-icons/fi";
import Swal from "sweetalert2";
import LoadingTable from "../../../components/Loadings/LoadingTable";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecureInstance = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.uid],
    queryFn: async () => {
      const res = await axiosSecureInstance.get(`/payments?uid=${user?.uid}`);
      return res.data;
    },
  });

  return (
    <div className="p-5 lg:p-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl">
      <h1 className="text-3xl text-gray-800 dark:text-white font-extrabold mb-5">
        Payment History
      </h1>

      {isLoading ? (
        <LoadingTable rows={5}></LoadingTable>
      ) : payments.length > 0 ? (
        <div className="overflow-x-auto">
          <span className="mb-3 block">
            Total payments: <strong>{payments.length}</strong>
          </span>
          <table className="table table-zebra border border-gray-200 dark:border-gray-800/80">
            {/* head */}
            <thead>
              <tr>
                <th>Sl.</th>
                <th>Parcel Info</th>
                <th>Payment Time</th>
                <th>Tracking Id</th>
                <th>Transaction Id</th>
                <th>Payment Info</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, i) => {
                return (
                  <tr key={payment._id}>
                    <th>{i + 1}</th>
                    <td>{payment.parcelName}</td>
                    <td>{new Date(payment.paidAt).toLocaleString()}</td>
                    <td>{payment.trackingId}</td>
                    <td>{payment.transactionId}</td>
                    <td>
                      {payment.amount} {payment?.currency?.toUpperCase()} (
                      {payment.paymentStatus})
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="tooltip" data-tip="View Parcel">
                          <Link
                            className="btn btn-square bg-lime-400/40 hover:bg-lime-400 duration-150 rounded-lg"
                            to={`/parcel/view/`}
                          >
                            <FiEye size={18} />
                          </Link>
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
          <span>No payment history found!</span>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
