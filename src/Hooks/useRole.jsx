import React from "react";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./AxiosSecure";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecureInstance = useAxiosSecure();
  const { isLoading: roleLoading, data: userRole = "user" } = useQuery({
    queryKey: ["user-role", user?.uid],
    queryFn: async () => {
      const res = await axiosSecureInstance.get(`/users/${user?.uid}/role`);
      return res.data?.role || "user";
    },
  });
  return { roleLoading, userRole };
};

export default useRole;
