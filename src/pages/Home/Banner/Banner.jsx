import React from "react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Banner = () => {
  return (
    <div className="bg-white rounded-2xl p-10 border border-gray-200">
      <div>
        <div className="mb-5">
          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            navigation={{
              nextEl: ".next-btn",
              prevEl: ".prev-btn",
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            pagination={{ clickable: true, el: ".custom-pagination" }}
          >
            <SwiperSlide>
              <div>
                <div className="grid grid-cols-12 gap-5 items-center">
                  <div className="col-span-12 lg:col-span-7">
                    <div className="flex flex-col gap-7">
                      <h1 className="text-gray-800 text-[40px] lg:text-6xl font-extrabold lg:leading-20">
                        We Make Sure Your{" "}
                        <span className="text-lime-500">Parcel Arrives</span> On
                        Time – No Fuss.
                      </h1>
                      <p className="text-gray-500">
                        Enjoy fast, reliable parcel delivery with real-time
                        tracking and zero hassle. From personal packages to
                        business shipments — we deliver on time, every time.
                      </p>

                      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                        <Link to="/" className="flex items-center">
                          <div className="text-gray-800 bg-lime-400 font-medium text-lg border border-lime-500/50 px-4 py-2 rounded-4xl hover:bg-lime-500 duration-75 grow">
                            Track Your Parcel
                          </div>
                          <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white -rotate-45">
                            <FaArrowRight />
                          </div>
                        </Link>
                        <Link
                          to="/login"
                          className="bg-gray-100 text-lg font-medium border border-gray-300 px-4 py-2 rounded-xl hover:bg-gray-200 duration-75"
                        >
                          Be A Rider
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 lg:col-span-5">
                    <div className="flex items-center justify-center lg:justify-end">
                      <div className="flex items-center justify-center">
                        <img
                          src="/images/banner_image_1.png"
                          className="w-100"
                          alt="banner_1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <div className="grid grid-cols-12 gap-5 items-center">
                  <div className="col-span-12 lg:col-span-7">
                    <div className="flex flex-col gap-7">
                      <h1 className="text-gray-800 text-[40px] lg:text-6xl font-extrabold lg:leading-20">
                        <span className="text-lime-500">Fastest</span> Delivery
                        & <span className="text-lime-500">Easy</span> Pickup
                      </h1>
                      <p className="text-gray-500">
                        Enjoy fast, reliable parcel delivery with real-time
                        tracking and zero hassle. From personal packages to
                        business shipments — we deliver on time, every time.
                      </p>

                      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                        <Link to="/" className="flex items-center">
                          <div className="text-gray-800 bg-lime-400 font-medium text-lg border border-lime-500/50 px-4 py-2 rounded-4xl hover:bg-lime-500 duration-75 grow">
                            Track Your Parcel
                          </div>
                          <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white -rotate-45">
                            <FaArrowRight />
                          </div>
                        </Link>
                        <Link
                          to="/login"
                          className="bg-gray-100 text-lg font-medium border border-gray-300 px-4 py-2 rounded-xl hover:bg-gray-200 duration-75"
                        >
                          Be A Rider
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 lg:col-span-5">
                    <div className="flex items-center justify-center lg:justify-end">
                      <div className="flex items-center justify-center">
                        <img
                          src="/images/banner_image_2.png"
                          className="w-100"
                          alt="banner_1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <div className="grid grid-cols-12 gap-5 items-center">
                  <div className="col-span-12 lg:col-span-7">
                    <div className="flex flex-col gap-7">
                      <h1 className="text-gray-800 text-[40px] lg:text-6xl font-extrabold lg:leading-20">
                        Delivery in{" "}
                        <span className="text-lime-500">30 Minutes</span> at
                        your doorstep
                      </h1>
                      <p className="text-gray-500">
                        Enjoy fast, reliable parcel delivery with real-time
                        tracking and zero hassle. From personal packages to
                        business shipments — we deliver on time, every time.
                      </p>

                      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                        <Link to="/" className="flex items-center">
                          <div className="text-gray-800 bg-lime-400 font-medium text-lg border border-lime-500/50 px-4 py-2 rounded-4xl hover:bg-lime-500 duration-75 grow">
                            Track Your Parcel
                          </div>
                          <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white -rotate-45">
                            <FaArrowRight />
                          </div>
                        </Link>
                        <Link
                          to="/login"
                          className="bg-gray-100 text-lg font-medium border border-gray-300 px-4 py-2 rounded-xl hover:bg-gray-200 duration-75"
                        >
                          Be A Rider
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 lg:col-span-5">
                    <div className="flex items-center justify-center lg:justify-end">
                      <div className="flex items-center justify-center">
                        <img
                          src="/images/banner_image_3.png"
                          className="w-100"
                          alt="banner_1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        {/* custom pagination and prev and next btn */}
        <div>
          <div className="flex items-center justify-between gap-5 bg-white">
            <div className="flex items-center gap-3 bg-white rounded-4xl">
              <button className="prev-btn cursor-pointer w-10 h-10 bg-white flex items-center justify-center text-md border border-gray-300/80 rounded-full hover:bg-lime-400 active:bg-lime-500 duration-75 text-gray-700">
                <FaArrowLeft />
              </button>
              <button className="next-btn cursor-pointer w-10 h-10 bg-white flex items-center justify-center text-md border border-gray-300/80 rounded-full hover:bg-lime-400 active:bg-lime-500 duration-75 text-gray-700">
                <FaArrowRight />
              </button>
            </div>
            <div className="custom-pagination flex gap-3 w-fit justify-end"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
