import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
        return config;
      },
    );
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        const status = err.status;
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
