import axios, { AxiosInstance } from "axios";
import { getToken } from "./token";

const BASE_URL: string = "http://192.168.1.121:8000/api/v1";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
