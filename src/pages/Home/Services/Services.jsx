import React from "react";
import { servicesData } from "../../../Data/Data";

const Services = () => {
  return (
    <div className="py-20 px-15 bg-gray-900 rounded-2xl">
      <div className="mb-8 flex flex-col gap-4 justify-center items-center">
        <h3 className="text-white font-extrabold text-3xl">Our Services</h3>
        <p className="text-gray-400 w-full max-w-3xl text-center">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {servicesData.map((data, index) => {
          return (
            <div key={index}>
              <div className="bg-white hover:bg-lime-300 duration-200 h-full rounded-2xl p-8">
                <div className="flex flex-col gap-4 items-center">
                  <div className="w-14 h-14">
                    <img
                      src={data.icon}
                      className="w-full h-full"
                      alt={data.title}
                    />
                  </div>
                  <div className="text-center">
                    <h5 className="text-xl text-gray-800 font-bold mb-3">
                      {data.title}
                    </h5>
                    <p className="text-gray-500 line-clamp-3">{data.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
