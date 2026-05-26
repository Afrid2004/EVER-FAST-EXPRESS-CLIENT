import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div>
      <div className="container">
        <div className="w-full h-screen bg-gray-100 flex items-center justify-center">
          <div className="flex justify-center items-center gap-5">
            <div className="flex items-center justify-center flex-col gap-5">
              <div className="w-60">
                <embed className="w-full" src="/images/error.svg" alt="error" />
              </div>
              <div className="flex flex-col items-center justify-center gap-5">
                <h4 className="text-center text-2xl text-gray-800 font-extrabold">
                  Page Not Found.
                </h4>
                <p className="text-gray-500 mb-4 text-center">
                  The page you are looking for does not exist or may have been
                  moved.
                </p>
                <div>
                  <Link
                    to="/"
                    className="px-8 flex items-center gap-2 py-2 bg-lime-400 border border-lime-500/50 hover:bg-lime-500 duration-150 rounded-4xl"
                  >
                    <FaArrowLeft></FaArrowLeft>
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
