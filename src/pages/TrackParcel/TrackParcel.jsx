import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { MdOutlineTrackChanges } from "react-icons/md";
import useAxios from "../../Hooks/AxiosHook";

const TrackParcel = () => {
  const [trackingId, setTrackingId] = useState(false);
  const axiosInstance = useAxios();
  const { data: trackings = [], isFetched } = useQuery({
    queryKey: ["tracing-parcels", trackingId],
    enabled: !!trackingId,
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/trackings?trackingid=${trackingId}`,
      );
      return res.data;
    },
  });
  console.log(trackings);
  const handleSubmit = (e) => {
    e.preventDefault();
    setTrackingId(e.target.trackingId.value.trim());
  };

  return (
    <div className="p-10 bg-white border border-gray-200 rounded-2xl">
      <div className="w-full max-w-sm mx-auto">
        <h1 className="text-3xl text-center text-gray-800 font-extrabold mb-5">
          Track Parcel
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex bg-gray-200/70 h-11 rounded-sm overflow-hidden">
            <input
              type="text"
              name="trackingId"
              id="trackingId"
              placeholder="Enter Tracking Id"
              className="outline-none w-full px-3 h-full"
            />
            <button
              type="submit"
              className="h-full flex items-center justify-center bg-lime-400 hover:bg-lime-500 px-3 text-gray-800 gap-1 cursor-pointer shrink-0"
            >
              Track <MdOutlineTrackChanges size={18} className="shrink-0" />
            </button>
          </div>
        </form>
      </div>

      <div>
        {trackings.length > 0 ? (
          <div>
            <ul className="timeline">
              <li>
                <div className="timeline-start timeline-box">
                  First Macintosh computer
                </div>
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="text-primary h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <hr className="bg-primary" />
              </li>
              <li>
                <hr className="bg-primary" />
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="text-primary h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="timeline-end timeline-box">iMac</div>
                <hr className="bg-primary" />
              </li>
              <li>
                <hr className="bg-primary" />
                <div className="timeline-start timeline-box">iPod</div>
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="text-primary h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <hr />
              </li>
              <li>
                <hr />
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="timeline-end timeline-box">iPhone</div>
                <hr />
              </li>
              <li>
                <hr />
                <div className="timeline-start timeline-box">Apple Watch</div>
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </li>
            </ul>
          </div>
        ) : (
          isFetched && (
            <div
              role="alert"
              className="alert alert-warning alert-soft border border-amber-200"
            >
              <span>No record found!</span>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TrackParcel;
