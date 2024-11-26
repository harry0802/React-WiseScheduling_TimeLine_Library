import apiSlice from "../apiSlice";

export const optionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMaterialUnits: builder.query({
      query: () => "option/materialUnit",
      providesTags: ["Option"],
    }),
    getPackagingUnits: builder.query({
      query: () => "option/packagingUnit",
      providesTags: ["Option"],
    }),
  }),
});

export const { useGetMaterialUnitsQuery, useGetPackagingUnitsQuery } =
  optionApi;
