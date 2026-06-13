import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/AxiosSecure";
import { IoMdCheckmark } from "react-icons/io";
import { FaRegHourglass } from "react-icons/fa";
import { MdOutlineAssignmentTurnedIn } from "react-icons/md";
import { LuUserRoundCheck } from "react-icons/lu";
import { HiOutlineTruck } from "react-icons/hi2";
import DeliveryStatusChart from "../Charts/DeliveryStatusChart";
import LoadingDashboard from "../../../components/Loadings/LoadingDashboard";

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const axiosSecureInstance = useAxiosSecure();
  const greetings = () => {
    const hours = new Date().getHours();
    if (hours < 12) {
      return "Good Morning";
    }
    if (hours < 18) {
      return "Good Afternoon";
    }
    return "Good Evening";
  };
  const [firstName, lastName = ""] = user?.displayName?.split(" ") || "";
  const name = firstName + " " + lastName;

  const { data: deliveryStats = [], isLoading } = useQuery({
    queryKey: ["delivery-stats", user?.uid],
    queryFn: async () => {
      const res = await axiosSecureInstance.get(
        "/parcels/stats/delivery-status",
      );
      return res.data;
    },
  });

  const genrateIcon = (stats) => {
    let icon;
    switch (stats) {
      case "delivered":
        icon = <IoMdCheckmark size={25}></IoMdCheckmark>;
        break;
      case "pending-pickup":
        icon = <FaRegHourglass size={22}></FaRegHourglass>;
        break;
      case "rider-assigned":
        icon = (
          <MdOutlineAssignmentTurnedIn size={25}></MdOutlineAssignmentTurnedIn>
        );
        break;
      case "rider-accepted":
        icon = <LuUserRoundCheck size={25}></LuUserRoundCheck>;
        break;
      default:
        icon = <HiOutlineTruck size={25}></HiOutlineTruck>;
        break;
    }

    return icon;
  };

  return (
    <div className="p-5 lg:p-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl">
      {isLoading ? (
        <LoadingDashboard></LoadingDashboard>
      ) : (
        <div>
          <h1 className="text-3xl text-gray-800 dark:text-white font-extrabold mb-7">
            {greetings()}, {name}
          </h1>

          <div className="mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {deliveryStats.map((stats, index) => {
                const icon = genrateIcon(stats.status);
                const dstats = stats.status.split("-").join(" ").toUpperCase();
                const number =
                  stats.count < 10 ? `0${stats.count}` : stats.count;
                return (
                  <div key={index}>
                    <div className="border border-gray-300/70 rounded-2xl p-5">
                      <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 bg-lime-400 border border-lime-500/80 rounded-full flex items-center justify-center shrink-0 text-gray-800 dark:text-white">
                          {icon}
                        </div>
                        <div>
                          <p className="mb-1 text-gray-500">{dstats}</p>
                          <h2 className="font-bold text-gray-800 dark:text-white text-4xl">
                            {number}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <DeliveryStatusChart data={deliveryStats}></DeliveryStatusChart>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
