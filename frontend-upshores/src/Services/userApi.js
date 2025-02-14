import { apiSlice } from "../app/api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateUserProfile: builder.mutation({
      query: (body) => {
        return {
          url: `/users/${body?.userId}`,
          method: "PATCH",
          data: body,
        };
      },
      invalidatesTags: ["UserProfile"],
    }),
  }),
});

export const { useUpdateUserProfileMutation } = userApi;
