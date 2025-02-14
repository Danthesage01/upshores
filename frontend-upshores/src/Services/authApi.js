import { apiSlice } from "../app/api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHome: builder.query({
      query: () => {
        return {
          url: "/",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        };
      },
    }),
    registerUser: builder.mutation({
      query: (body) => {
        return {
          url: "/auth/register",
          method: "POST",
          data: body,
        };
      },
    }),
    loginUser: builder.mutation({
      query: (body) => {
        return {
          url: "/auth/login",
          method: "POST",
          data: body,
        };
      },
    }),

    logoutUser: builder.mutation({
      query: () => {
        return {
          url: `/auth/logout`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        };
      },
      providesTags: ["User"],
    }),
    getCurrentUser: builder.query({
      query: () => {
        return {
          url: `/auth/current-user`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        };
      },
      providesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetHomeQuery,
  useGetCurrentUserQuery,
  useLogoutUserMutation,
} = authApi;
