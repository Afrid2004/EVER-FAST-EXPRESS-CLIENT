import React, { useState } from "react";
import { aboutData, statsData } from "../../../public/Data/Data";
import { data } from "react-router";
import { MdCheckCircleOutline } from "react-icons/md";

const AboutUs = () => {
  const [active, setActive] = useState(0);
  const handleTab = (index) => {
    setActive(index);
  };
  return (
    <div className="bg-white p-8 lg:p-10 rounded-2xl border border-gray-200">
      <div className="flex flex-col gap-9 lg:gap-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div>
            <div className="mb-5">
              <h1 className="text-gray-800 font-extrabold text-5xl mb-5">
                About Us
              </h1>
              <p className="text-gray-500 w-full max-w-xl">
                Enjoy fast, reliable parcel delivery with real-time tracking and
                zero hassle. From personal packages to business shipments — we
                deliver on time, every time.
              </p>
            </div>
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {statsData.map((data, index) => {
                  return (
                    <div key={index}>
                      <div className="border hover:-translate-y-2 duration-150 bg-white border-gray-200 rounded-2xl border-b-3 p-5">
                        <h2 className="text-4xl font-extrabold text-gray-800 mb-3">
                          {data.title}
                        </h2>
                        <div className="flex items-center gap-1 text-lime-500 ">
                          <MdCheckCircleOutline className="shrink-0"></MdCheckCircleOutline>
                          <p className="font-bold">{data.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-7">
                <div className="w-full h-30 sm:h-40 lg:h-50 overflow-hidden rounded-2xl">
                  <img
                    src="/images/story.webp"
                    className="w-full object-cover duration-200 h-full hover:scale-110"
                    alt="Story"
                  />
                </div>
              </div>
              <div className="col-span-5">
                <div className="w-full h-30 sm:h-40 lg:h-50 overflow-hidden rounded-2xl">
                  <img
                    src="/images/mission.webp"
                    className="w-full object-cover duration-200 h-full hover:scale-110"
                    alt="Story"
                  />
                </div>
              </div>
              <div className="col-span-5">
                <div className="w-full h-30 sm:h-40 lg:h-50 overflow-hidden rounded-2xl">
                  <img
                    src="/images/success.webp"
                    className="w-full object-cover duration-200 h-full hover:scale-110"
                    alt="Story"
                  />
                </div>
              </div>
              <div className="col-span-7">
                <div className="w-full h-30 sm:h-40 lg:h-50 overflow-hidden rounded-2xl">
                  <img
                    src="/images/teamwork.webp"
                    className="w-full object-cover duration-200 h-full hover:scale-110"
                    alt="Story"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 w-full"></div>
        <div>
          <div>
            {/* tab topper */}
            <div className="flex items-center flex-wrap gap-7">
              {aboutData.map((data, index) => {
                const isActive = active === index;
                return (
                  <div
                    className="cursor-pointer"
                    onClick={() => handleTab(index)}
                    key={index}
                  >
                    <p
                      className={`border-b-2 font-medium duration-150
                        ${
                          isActive
                            ? "text-lime-500 border-lime-500"
                            : "text-gray-800 border-gray-200"
                        }
                      `}
                    >
                      {data.title.toLocaleUpperCase()}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* tab body */}
            <div className="mt-6 overflow-hidden pb-3">
              <div
                key={active}
                className="animate-fadeIn bg-lime-50 border border-lime-400 p-5 sm:p-7 rounded-2xl"
              >
                <div className="flex flex-col lg:flex-row items-start gap-5">
                  <div>
                    <h3 className="text-3xl font-extrabold text-gray-800 mb-5">
                      {aboutData[active].title.toUpperCase()}
                    </h3>
                    <p className="leading-7 text-gray-700">
                      {aboutData[active].desc}
                    </p>
                  </div>
                  <div className="aspect-4/3 rounded-2xl overflow-hidden bg-white border border-lime-500 p-3">
                    <img
                      className="w-full h-full rounded-xl hover:scale-110 duration-200"
                      src={aboutData[active].image}
                      alt={aboutData[active].title}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
