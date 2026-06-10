import React from "react";
import useRole from "../../../Hooks/useRole";
import useAuth from "../../../Hooks/useAuth";
import LoadingPage from "../../../components/Loadings/LoadingPage";
import AdminDashboard from "./AdminDashboard";
import RiderDashboard from "./RiderDashboard";
import UserDahsboard from "./UserDahsboard";

const DashboardHome = () => {
  const { user, loading } = useAuth();
  const { userRole, roleLoading } = useRole();
  if (loading || roleLoading) {
    return <LoadingPage></LoadingPage>;
  }
  if (userRole === "admin") {
    return <AdminDashboard></AdminDashboard>;
  } else if (userRole === "rider") {
    return <RiderDashboard></RiderDashboard>;
  } else {
    return <UserDahsboard></UserDahsboard>;
  }
};

export default DashboardHome;
