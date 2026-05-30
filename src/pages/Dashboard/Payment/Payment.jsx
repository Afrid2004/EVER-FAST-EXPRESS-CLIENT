import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxios from "../../../Hooks/AxiosHook";
import LoadingPage from "../../../components/Loadings/LoadingPage";
import { FiArrowRight } from "react-icons/fi";

const Payment = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const { data: parcel = [], isLoading } = useQuery({
    queryKey: ["parcel", id],
    queryFn: async () => {
      const result = await axiosInstance.get(`/parcels/${id}`);
      return result.data;
    },
  });

  const handlePayment = async () => {
    const paymentInfo = {
      cost: parcel.cost,
      senderemail: parcel.senderemail,
      parcelname: parcel.parcelname,
      parcelId: parcel._id,
    };
    const res = await axiosInstance.post(
      "/create-checkout-session",
      paymentInfo,
    );
    console.log(res);
    window.location.href = res.data.url;
  };
  return (
    <div className="bg-white p-10 border border-gray-200 rounded-2xl">
      <div className="flex items-center gap-5 justify-between">
        <div>
          <h1 className="text-3xl text-gray-800 font-extrabold mb-5">
            Payment Info
          </h1>
          <div className="mb-3">
            <p className="font-medium mb-3">Parcel Name: {parcel.parcelname}</p>
            <p className="font-medium mb-3">Receiver: {parcel.receivername}</p>
            <p className="font-medium">Cost: {parcel.cost}TK</p>
          </div>
          <div>
            <button
              onClick={handlePayment}
              className="btn bg-lime-400 hover:bg-lime-500 duration-150 w-sm"
            >
              Pay <FiArrowRight size={18} />
            </button>
          </div>
        </div>
        <div>
          <div>
            <div className="w-130">
              <img
                src="/images/cards.png"
                alt="payment cards"
                className="w-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
