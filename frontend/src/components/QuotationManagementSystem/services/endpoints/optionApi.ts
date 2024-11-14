import apiSlice from "../apiSlice";
import { MaterialUnit, PackagingUnit } from "../type";

export const optionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMaterialUnits: builder.query<{ data: MaterialUnit[] }, void>({
      query: () => "option/materialUnit",
      providesTags: ["Option"],
    }),
    getPackagingUnits: builder.query<{ data: PackagingUnit[] }, void>({
      query: () => "option/packagingUnit",
      providesTags: ["Option"],
    }),
  }),
});

export const { useGetMaterialUnitsQuery, useGetPackagingUnitsQuery } =
  optionApi;
