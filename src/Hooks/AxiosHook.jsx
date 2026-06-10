import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ever-fast-express-backend-production.up.railway.app",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
