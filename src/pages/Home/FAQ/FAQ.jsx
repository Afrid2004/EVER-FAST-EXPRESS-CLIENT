import React, { useState } from "react";
import { faqData } from "../../../../public/Data/Data";
import { IoIosArrowDown } from "react-icons/io";

const FAQ = () => {
  const [active, setIsActive] = useState(0);
  const [countFaq, setCountFaq] = useState(
    faqData.length > 5 ? 5 : faqData.length,
  );

  const handleAccordion = (index) => {
    setIsActive(active === index ? null : index);
  };
  const handleIncresefaq = () => {
    setCountFaq((prev) => Math.min(prev + 5, faqData.length));
  };
  const handleDecresefaq = () => {
    setCountFaq((prev) => prev - 5);
  };
  return (
    <div className="py-5">
      <div className="container">
        <div className="mb-8 flex flex-col gap-4 justify-center items-center">
          <h3 className="text-gray-800 font-extrabold text-3xl text-center">
            Frequently Asked Question (FAQ)
          </h3>
          <p className="text-gray-500 w-full max-w-3xl text-center">
            Enhance posture, mobility, and well-being effortlessly with Posture
            Pro. Achieve proper alignment, reduce pain, and strengthen your body
            with ease!
          </p>
        </div>

        <div className="w-full max-w-3xl mx-auto">
          <div className="flex flex-col gap-3 transition-all duration-500 ease-in-out">
            {faqData.slice(0, countFaq).map((data, index) => {
              const isOpen = active === index;
              return (
                <div key={index}>
                  <div
                    onClick={() => handleAccordion(index)}
                    className={`cursor-pointer hover:border-lime-500 duration-150 p-6 border border-gray-200 rounded-2xl ${isOpen ? "border-lime-500 bg-lime-50" : "bg-white"}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h2
                        className={`text-[16px] md:text-lg font-bold ${isOpen ? "text-lime-500" : "text-gray-800"}`}
                      >
                        {data.question}
                      </h2>
                      <div className="shrink-0">
                        <IoIosArrowDown
                          className={`w-5 h-5 duration-150 transition-all ${isOpen ? "rotate-180 text-lime-500" : "rotate-0 text-gray-800"}`}
                        ></IoIosArrowDown>
                      </div>
                    </div>
                    <div
                      className={
                        isOpen
                          ? "border-t border-lime-500/30 mt-4 pt-4 max-h-100 opacity-100 pointer-events-all duration-150 transition-all"
                          : "max-h-0 opacity-0 pointer-events-none duration-150 transition-all"
                      }
                    >
                      <p className="text-gray-500">{data.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            {faqData.length > 5 && (
              <>
                {faqData.length > countFaq ? (
                  <button
                    onClick={handleIncresefaq}
                    className="bg-lime-400 w-fit mx-auto px-4 py-2 rounded-4xl hover:bg-lime-500 duration-150 cursor-pointer"
                  >
                    See More FAQ’s
                  </button>
                ) : (
                  <button
                    onClick={handleDecresefaq}
                    className="bg-gray-800 text-white px-4 py-2 rounded-4xl hover:bg-gray-900 w-fit mx-auto duration-150 cursor-pointer"
                  >
                    See Less FAQ’s
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
