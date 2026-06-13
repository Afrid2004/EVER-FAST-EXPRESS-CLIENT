import React from "react";
import MarqueeImport from "react-fast-marquee";
import { BrandsData } from "../../../../public/Data/Data";
const Marquee = MarqueeImport.default || MarqueeImport;

const Brands = () => {
  return (
    <div className="py-10">
      <div className="mb-10">
        <h3 className="text-gray-900 font-extrabold text-2xl text-center">
          We've helped thousands of sales teams
        </h3>
      </div>
      <div>
        <Marquee
          autoFill={true}
          gradient
          gradientColor="#f3f4f6"
          gradientWidth={120}
        >
          <div className="flex items-center gap-9 me-9">
            {BrandsData.map((brand, index) => {
              return (
                <div
                  key={index}
                  className="w-60 select-none bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-800"
                >
                  <img
                    src={brand.image}
                    alt={brand.title}
                    draggable={false}
                    className="w-full"
                  />
                </div>
              );
            })}
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default Brands;
