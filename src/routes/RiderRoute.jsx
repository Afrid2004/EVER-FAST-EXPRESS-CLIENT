import React from "react";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import LoadingPage from "../components/Loadings/LoadingPage";
import Forbidden from "../pages/Error/Forbidden";

const RiderRoute = ({ children }) => {
  const { loading } = useAuth();
  const { userRole, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <LoadingPage></LoadingPage>;
  }

  if (userRole !== "rider") {
    return <Forbidden></Forbidden>;
  }
  return children;
};

export default RiderRoute;
