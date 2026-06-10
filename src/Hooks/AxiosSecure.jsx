import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "https://ever-fast-express-backend-production.up.railway.app",
});

const useAxiosSecure = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
    );
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        const status = err.response?.status;
        if (status === 401 || status === 403) {
          navigate("/", { replace: true });
        }
      },
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, navigate]);
  return axiosSecure;
};

export default useAxiosSecure;
