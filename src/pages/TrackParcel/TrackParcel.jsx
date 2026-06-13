import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  MdOutlineAssignmentTurnedIn,
  MdOutlinePendingActions,
  MdOutlineTrackChanges,
} from "react-icons/md";
import { LuUserRoundCheck } from "react-icons/lu";
import { HiOutlineTruck } from "react-icons/hi2";
import { FaRegHourglass } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import useAxios from "../../Hooks/AxiosHook";
import { FiChevronDown, FiClock, FiInfo } from "react-icons/fi";
import LoadingTable from "../../components/Loadings/LoadingTable";
import LoadingSpin from "../../components/Loadings/LoadingSpin";
import { useSearchParams } from "react-router";

const TrackParcel = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryTrackId = searchParams.get("trackingid");
  const [trackingId, setTrackingId] = useState(queryTrackId || "");
  const axiosInstance = useAxios();
  const {
    data: trackings = [],
    isFetched,
    isLoading,
  } = useQuery({
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
    const value = e.target.trackingId.value.trim();
    if (!value) return alert("Please enter tracking id");
    setTrackingId(value);
    setSearchParams({ trackingid: value });
  };

  const filterStatus = (status) => {
    return trackings.find((data) => data.status == status);
  };

  return (
    <div className="p-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl">
      <div className="w-full max-w-xl mx-auto">
        <h1 className="text-3xl text-center text-gray-800 dark:text-white font-extrabold mb-7">
          Track Parcel
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex bg-gray-200/70 h-11 rounded-sm overflow-hidden">
            <input
              type="text"
              name="trackingId"
              id="trackingId"
              placeholder="Enter Tracking Id"
              defaultValue={trackingId}
              className="outline-none w-full px-3 h-full"
            />
            <button
              type="submit"
              className="h-full flex items-center justify-center bg-lime-400 hover:bg-lime-500 px-3 text-gray-800 dark:text-white gap-1 cursor-pointer shrink-0"
            >
              Track{" "}
              {isLoading ? (
                <LoadingSpin></LoadingSpin>
              ) : (
                <MdOutlineTrackChanges size={18} className="shrink-0" />
              )}
            </button>
          </div>
        </form>
      </div>

      <div>
        {isLoading ? (
          <LoadingTable></LoadingTable>
        ) : trackings.length > 0 ? (
          <div className="mt-5 md:mt-15">
            <div className="max-w-2xl mx-auto">
              <div className="grid-cols-5 hidden md:grid">
                <div>
                  <div className="flex items-center justify-center">
                    <div
                      className={`w-15 h-15 border-2 ${filterStatus("pending-pickup") ? "border-lime-500/30 bg-lime-400/20" : "border-gray-400"} rounded-full flex items-center justify-center shrink-0 ms-9 me-1`}
                    >
                      <FaRegHourglass
                        className={
                          filterStatus("pending-pickup")
                            ? "text-lime-500"
                            : "text-gray-500"
                        }
                        size={20}
                      />
                    </div>
                    <div
                      className={`h-1 w-full ${filterStatus("pending-pickup") ? "bg-lime-500" : "bg-gray-300"}`}
                    ></div>
                  </div>
                  <div className="flex items-center justify-center flex-col mt-1">
                    <FiChevronDown className="text-gray-500" size={18} />
                    <div
                      className={`w-full text-center text-sm uppercase ${filterStatus("pending-pickup") ? "text-lime-500" : "text-gray-500"}`}
                    >
                      Pending Pickup
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-center">
                    <div
                      className={`h-1 w-full ${filterStatus("pending-pickup") ? "bg-lime-500" : "bg-gray-300"}`}
                    ></div>
                    <div
                      className={`w-15 h-15 border-2 ${filterStatus("rider-assigned") ? "border-lime-500/30 bg-lime-400/20" : "border-gray-400"} rounded-full flex items-center justify-center shrink-0 mx-1`}
                    >
                      <MdOutlineAssignmentTurnedIn
                        className={
                          filterStatus("rider-assigned")
                            ? "text-lime-500"
                            : "text-gray-500"
                        }
                        size={25}
                      />
                    </div>
                    <div
                      className={`h-1 w-full ${filterStatus("rider-assigned") ? "bg-lime-500" : "bg-gray-300"}`}
                    ></div>
                  </div>
                  <div className="flex items-center justify-center flex-col mt-1">
                    <FiChevronDown className="text-gray-500" size={18} />
                    <div
                      className={`w-full text-center text-sm uppercase ${filterStatus("rider-assigned") ? "text-lime-500" : "text-gray-500"}`}
                    >
                      Rider Assigned
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-center">
                    <div
                      className={`h-1 w-full ${filterStatus("rider-assigned") ? "bg-lime-500" : "bg-gray-300"}`}
                    ></div>
                    <div
                      className={`w-15 h-15 border-2 ${filterStatus("rider-accepted") ? "border-lime-500/30 bg-lime-400/20" : "border-gray-400"} rounded-full flex items-center justify-center shrink-0 mx-1`}
                    >
                      <LuUserRoundCheck
                        className={
                          filterStatus("rider-accepted")
                            ? "text-lime-500"
                            : "text-gray-500"
                        }
                        size={24}
                      />
                    </div>
                    <div
                      className={`h-1 w-full ${filterStatus("rider-accepted") ? "bg-lime-500" : "bg-gray-300"}`}
                    ></div>
                  </div>
                  <div className="flex items-center justify-center flex-col mt-1">
                    <FiChevronDown className="text-gray-500" size={18} />
                    <div
                      className={`w-full text-center text-sm uppercase ${filterStatus("rider-accepted") ? "text-lime-500" : "text-gray-500"}`}
                    >
                      Rider Accepted
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-center">
                    <div
                      className={`h-1 w-full ${filterStatus("rider-accepted") ? "bg-lime-500" : "bg-gray-300"}`}
                    ></div>
                    <div
                      className={`w-15 h-15 border-2 ${filterStatus("picked-up") ? "border-lime-500/30 bg-lime-400/20" : "border-gray-400"} rounded-full flex items-center justify-center shrink-0 mx-1`}
                    >
                      <HiOutlineTruck
                        className={
                          filterStatus("picked-up")
                            ? "text-lime-500"
                            : "text-gray-500"
                        }
                        size={26}
                      />
                    </div>
                    <div
                      className={`h-1 w-full ${filterStatus("picked-up") ? "bg-lime-500" : "bg-gray-300"}`}
                    ></div>
                  </div>
                  <div className="flex items-center justify-center flex-col mt-1">
                    <FiChevronDown className="text-gray-500" size={18} />
                    <div
                      className={`w-full text-center text-sm uppercase ${filterStatus("picked-up") ? "text-lime-500" : "text-gray-500"}`}
                    >
                      Picked Up
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-center">
                    <div
                      className={`h-1 w-full ${filterStatus("picked-up") ? "bg-lime-500" : "bg-gray-300"}`}
                    ></div>
                    <div
                      className={`w-15 h-15 border-2 ${filterStatus("delivered") ? "border-lime-500/30 bg-lime-400/20" : "border-gray-400"} rounded-full flex items-center justify-center shrink-0 ms-1 me-9`}
                    >
                      <IoMdCheckmark
                        className={
                          filterStatus("delivered")
                            ? "text-lime-500"
                            : "text-gray-500"
                        }
                        size={25}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-center flex-col mt-1">
                    <FiChevronDown className="text-gray-500" size={18} />
                    <div
                      className={`w-full text-center text-sm uppercase ${filterStatus("delivered") ? "text-lime-500" : "text-gray-500"}`}
                    >
                      Delivered
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 content-center">
                {trackings.map((tracking, index) => {
                  const status = tracking.status.split("-").join(" ");
                  return (
                    <div key={tracking._id} className="h-full">
                      <div className="p-5 border border-gray-200 dark:border-gray-800 rounded-2xl h-full">
                        <div className="border-b-2 border-dashed border-gray-300 pb-2 mb-5">
                          <h3 className="uppercase font-bold text-gray-600">
                            {status}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 bg-lime-100 p-3 border border-lime-200 rounded-xl mb-3">
                          <FiInfo className="shrink-0" />
                          <p className="text-sm">{tracking.details}</p>
                        </div>
                        <div className="flex items-center gap-2 bg-lime-100 p-3 border border-lime-200 rounded-xl">
                          <FiClock className="shrink-0" />
                          <p className="text-sm">
                            {new Date(tracking.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          isFetched && (
            <div
              role="alert"
              className="alert alert-warning mt-5 max-w-xl mx-auto alert-soft border border-amber-200"
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
