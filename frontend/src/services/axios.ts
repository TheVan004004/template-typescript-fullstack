import axios from "axios";

export const axiosInstance = axios.create({
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log("before send req");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (response) => {
    console.log("before get response");
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  }
);
