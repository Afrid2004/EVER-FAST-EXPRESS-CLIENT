import React from "react";
import useAuth from "../Hooks/useAuth";
import LoadingPage from "../components/Loadings/LoadingPage";
import { Navigate, useLocation } from "react-router";

const AuthRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <LoadingPage />;
  }
  //check user loggged in with google
  const isGoogleUser = user?.providerData?.some(
    (p) => p.providerId === "google.com",
  );
  if (user && (user.emailVerified || isGoogleUser)) {
    return (
      <Navigate to={location.state?.from?.pathname || "/"} replace></Navigate>
    );
  }
  return children;
};

export default AuthRoute;
