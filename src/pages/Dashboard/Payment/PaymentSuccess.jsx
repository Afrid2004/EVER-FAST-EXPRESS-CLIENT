import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";

const PaymentSuccess = () => {
  return (
    <div className="p-10 bg-white border border-gray-200 rounded-2xl">
      <div className="flex items-center justify-center py-10">
        <div>
          <div class="relative flex items-center justify-center mb-10">
            <div class="absolute animate-ping  w-20 h-20 rounded-full bg-lime-400 opacity-75"></div>
            <div class="relative w-20">
              <img src="/images/success.png" alt="success" className="w-full" />
            </div>
          </div>
          <h1 className="text-3xl text-gray-800 font-extrabold mb-3">
            Payment Successful
          </h1>
          <p className="text-center text-gray-500 mb-7">
            Thank you for your payment.
          </p>
          <div>
            <Link
              to="/dashboard"
              className="px-8 flex items-center justify-center gap-2 py-2 bg-lime-400 border border-lime-500/50 hover:bg-lime-500 w-fit duration-150 rounded-4xl mx-auto"
            >
              <FaArrowLeft></FaArrowLeft>
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
