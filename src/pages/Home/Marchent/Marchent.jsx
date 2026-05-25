import React from "react";
import { Link } from "react-router";

const Marchent = () => {
  return (
    <div className="py-7  overflow-hidden">
      <div className="p-10 lg:p-20 rounded-2xl bg-gray-900">
        <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-5">
          <div className="lg:w-7/12">
            <div className="flex flex-col gap-7 flex-wrap">
              <h2 className="text-4xl lg:text-[40px] font-extrabold text-white">
                Merchant and Customer Satisfaction is Our First Priority
              </h2>
              <p className="text-gray-600 wrap-break-word">
                We offer the lowest delivery charge with the highest value along
                with 100% safety of your product. Pathao courier delivers your
                parcels in every corner of Bangladesh right on time.
              </p>
              <div className="flex items-center gap-5 flex-wrap">
                <Link className="bg-lime-400 text-center w-full lg:w-fit border border-lime-500/50 hover:bg-lime-500 duration-75 rounded-4xl px-8 py-4 text-lg">
                  Become a Merchant
                </Link>
                <Link className="border w-full lg:w-fit text-center border-lime-400 hover:bg-lime-400 duration-75 rounded-4xl px-8 py-4 text-lg text-lime-400 hover:text-gray-800">
                  Earn with Everfast Express
                </Link>
              </div>
            </div>
          </div>
          <div className="lg:w-5/12">
            <div className="flex items-center justify-center">
              <div className="w-50 h-50 md:w-60 md:h-60 bounce-animate">
                <img
                  src="/images/shop (1).png"
                  alt="Marchant"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marchent;
