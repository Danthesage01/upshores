import { apiSlice } from "../app/api/apiSlice";

export const talentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadTalentsFromExcel: builder.mutation({
      query: (body) => {
        return {
          url: `/talents`,
          method: "POST",
          data: body,
        };
      },
      invalidatesTags: ["Talents"],
    }),

    getTalents: builder.query({
      query: () => {
        return {
          url: `/talents`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        };
      },
      providesTags: ["Talents"],
    }),
  }),
});

export const { useGetTalentsQuery, useUploadTalentsFromExcelMutation } =
  talentApi;
