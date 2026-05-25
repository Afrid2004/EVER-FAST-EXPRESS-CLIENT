import React, { use } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FaArrowLeft, FaArrowRight, FaQuoteRight } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";

const Reviews = ({ reviewPromise }) => {
  const reviewData = use(reviewPromise);
  return (
    <div className="py-10">
      <div className="mb-8 flex flex-col gap-4 justify-center items-center">
        <h3 className="text-gray-800 font-extrabold text-3xl">
          What our customers are sayings
        </h3>
        <p className="text-gray-400 w-full max-w-3xl text-center">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>

      <div>
        <div className="mb-3">
          <div className="review-wrapper">
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              spaceBetween={20}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              loop={true}
              navigation={{
                nextEl: ".review-next",
                prevEl: ".review-prev",
              }}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 120,
                modifier: 2,
                scale: 0.9,
                slideShadows: false,
              }}
              pagination={{
                clickable: true,
                el: ".review-pagination",
                dynamicBullets: true,
                dynamicMainBullets: 1,
              }}
              modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
              className="reviewSwiper"
            >
              {reviewData.map((data) => {
                return (
                  <SwiperSlide key={data.id}>
                    <div className="bg-white border select-none border-gray-200 p-8 rounded-2xl">
                      <div className="flex flex-col gap-5">
                        <div className="border-b-2 border-dashed border-gray-300 pb-3">
                          <div className="text-lime-500 text-4xl mb-3">
                            <FaQuoteRight></FaQuoteRight>
                          </div>
                          <p className="text-gray-700">{data.review}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                            <img
                              src={data.image}
                              alt={data.user_name}
                              className="w-full"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-1">
                              <h4 className="text-lg font-extrabold text-gray-800">
                                {data.user_name}
                              </h4>
                              <MdVerifiedUser className="shrink-0 text-gray-700"></MdVerifiedUser>
                            </div>
                            <p className="text-gray-500 text-sm">
                              {data.profession}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>

        <div className="flex items-center gap-3 justify-center">
          <div className="review-prev w-10 h-10 bg-white flex items-center justify-center text-gray-700 border hover:border-gray-800 hover:bg-gray-800 hover:text-lime-400 active:bg-gray-950 border-gray-200 rounded-full cursor-pointer">
            <FaArrowLeft />
          </div>
          <div className="review-pagination"></div>
          <div className="review-next w-10 h-10 bg-white flex items-center justify-center text-gray-700 border hover:border-gray-800 hover:bg-gray-800 hover:text-lime-400 active:bg-gray-950 border-gray-200 rounded-full cursor-pointer">
            <FaArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
