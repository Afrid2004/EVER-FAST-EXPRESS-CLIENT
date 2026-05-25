import React from "react";
import { worksData } from "../../../../public/Data/Data";

const HowItWorks = () => {
  return (
    <div className="py-13">
      <div className="mb-7">
        <h3 className="text-gray-900 font-extrabold text-3xl">How it Works</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {worksData.map((data, index) => {
          return (
            <div key={index} className="hover:-translate-y-2 duration-150">
              <div className="bg-white border h-full border-gray-200 rounded-2xl p-8">
                <div className="flex flex-col gap-4">
                  <div className="w-14 h-14">
                    <img
                      src={data.icon}
                      className="w-full h-full"
                      alt={data.title}
                    />
                  </div>
                  <div>
                    <h5 className="text-xl text-gray-800 font-bold mb-3">
                      {data.title}
                    </h5>
                    <p className="text-gray-500">{data.desc}</p>
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

export default HowItWorks;
