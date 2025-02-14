import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axiosInstance from "./axiosInstance"; // Import your configured Axios instance

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
      });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      console.log({
        status: err.response?.status,
        data: err.response?.data || err.message,
        headers: err.response?.headers,
        request: err.request,
      });
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["User", "Talents"],
  baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_APP_BASE_URL }),
  endpoints: (builder) => ({}),
});
