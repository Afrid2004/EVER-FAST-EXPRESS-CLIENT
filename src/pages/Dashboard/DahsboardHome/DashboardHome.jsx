import React from "react";
import useRole from "../../../Hooks/useRole";
import useAuth from "../../../Hooks/useAuth";
import LoadingPage from "../../../components/Loadings/LoadingPage";
import AdminDashboard from "./AdminDashboard";
import RiderDashboard from "./RiderDashboard";
import UserDahsboard from "./UserDahsboard";
import MyParcels from "../MyParcels/MyParcels";

const DashboardHome = () => {
  const { user, loading } = useAuth();
  const { userRole, roleLoading } = useRole();
  if (loading || roleLoading) {
    return <LoadingPage></LoadingPage>;
  }
  if (userRole === "admin") {
    return <AdminDashboard></AdminDashboard>;
  } else if (userRole === "rider") {
    // return <RiderDashboard></RiderDashboard>;
    return <MyParcels></MyParcels>;
  } else {
    // return <UserDahsboard></UserDahsboard>;
    return <MyParcels></MyParcels>;
  }
};

export default DashboardHome;
