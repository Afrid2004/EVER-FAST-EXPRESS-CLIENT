import React from "react";
import LogoWhite from "../../../components/Logo/LogoWhite";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { MdMail } from "react-icons/md";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div>
      <div className="container">
        <div className="bg-gray-900 p-10 md:p-20 pb-0 md:pb-5 mb-5 rounded-2xl">
          <div className="flex items-center justify-center flex-col gap-9">
            <div className="w-full lg:max-w-3xl flex items-center gap-5 flex-col justify-center">
              <div className="opacity-80">
                <LogoWhite></LogoWhite>
              </div>
              <p className="text-gray-400 text-center">
                Enjoy fast, reliable parcel delivery with real-time tracking and
                zero hassle. From personal packages to business shipments — we
                deliver on time, every time.
              </p>
            </div>
            <div className="border-t border-b border-gray-700/80 py-5 w-full">
              <div className="flex flex-col lg:flex-row lg:items-center gap-2 justify-between">
                <a href="tel:+8801345802911">
                  <div className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-200">
                    <FaPhone />
                    <p>+880 1345-802911</p>
                  </div>
                </a>
                <a href="mailto:mdfaisalafrid@gmail.com">
                  <div className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-200">
                    <MdMail />
                    <p>mdfaisalafrid@gmail.com</p>
                  </div>
                </a>
                <a href="https://maps.app.goo.gl/yLq4cZyjzpr39G9M8">
                  <div className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-200">
                    <FaLocationDot />
                    <p>Merul Badda, Gulshan, Dhaka-1212</p>
                  </div>
                </a>
              </div>
            </div>
            <div>
              <h3 className="uppercase text-9xl md:text-8xl lg:text-[150px] leading-none font-black text-center gradient-dark-text select-none">
                Ever Fast
              </h3>
            </div>
            <div className="py-4 w-full">
              <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-2">
                <div className="text-center lg:text-left">
                  <p className="text-sm uppercase text-gray-400">
                    Copyright &copy; {year} Ever Fast Express | All Rights
                    Reserved
                  </p>
                </div>
                <div>
                  <p className="flex items-center gap-2 text-gray-400 text-sm uppercase">
                    Developed by{" "}
                    <a
                      className="text-gray-300"
                      href="https://faisalafrid.vercel.app/"
                      target="_blank"
                    >
                      MD Faisal Yousuf Afrid
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
