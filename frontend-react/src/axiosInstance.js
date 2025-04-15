import axios from "axios";
const baseURL = import.meta.env.VITE_BACKEND_BASE_API;
const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

//Reques interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    const access = localStorage.getItem("access");
    if (access) {
      config.headers["Authorization"] = `Bearer ${access}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

//Response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  //handle failed responses.
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest.retry) {
      originalRequest.retry = true;
      const refresh = localStorage.getItem("refresh");
      try {
        const response = await axiosInstance.post("token/refresh/", {
          refresh: refresh,
        });
        localStorage.setItem("access", response.data.access);
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${response.data.access}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
