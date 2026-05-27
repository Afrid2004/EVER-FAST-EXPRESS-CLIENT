import React from "react";
import useAuth from "../Hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  return <div>PrivateRoute</div>;
};

export default PrivateRoute;
