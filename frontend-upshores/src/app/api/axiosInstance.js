import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const setupAxiosInterceptors = (navigate) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (originalRequest.url.includes("/auth/refresh")) {
        return Promise.reject(error);
      }

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        n;
        const refreshToken = localStorage.getItem("refreshToken");

        try {
          const { data } = await axios.post(
            `${import.meta.env.VITE_APP_BASE_URL}/auth/refresh`,
            { token: refreshToken }
          );
          const { accessToken: newAccessToken } = data;

          localStorage.setItem("accessToken", newAccessToken);

          axiosInstance.defaults.headers[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return axiosInstance(originalRequest);
        } catch (err) {
          toast.error(
            "Refresh token expired or invalid, redirecting to login."
          );
          console.error(
            "Refresh token expired or invalid, redirecting to login."
          );
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          navigate("/login");

          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );
};

export default axiosInstance;
