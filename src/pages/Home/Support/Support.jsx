import React from "react";
import { supportData } from "../../../../public/Data/Data";
import { data } from "react-router";

const Support = () => {
  return (
    <div className="py-13 border-t-2 border-b-2 border-dashed border-gray-300">
      <div className="flex flex-col gap-5">
        {supportData.map((data, index) => {
          return (
            <div
              key={index}
              className="p-10 rounded-2xl border border-gray-200 bg-white"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-10">
                <div className="border-b-2 md:border-b-0 md:border-e-2 border-dashed border-gray-300 pb-5 md:pb-0 md:pe-10">
                  <div className="w-25 h-25">
                    <img src={data.image} alt={data.title} className="w-full" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-extrabold mb-4">{data.title}</h3>
                  <p className="text-gray-500">{data.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Support;
