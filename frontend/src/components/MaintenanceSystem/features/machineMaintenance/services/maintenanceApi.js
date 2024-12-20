import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE } from "../../../../../store/api/apiConfig";
import { transformFromApi, transformToApi } from "../utils/dataTransformers";

const maintenanceApi = createApi({
  reducerPath: "maintenanceApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE }),
  tagTypes: ["Maintenance"],
  endpoints: (builder) => ({
    // 獲取機台週保養記錄
    getWeeklyMaintenance: builder.query({
      query: ({ machineId, year, week }) => ({
        url: "maintenance/machine",
        params: { machineId, year, week },
      }),
      transformResponse: transformFromApi,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    }),

    // 更新保養記錄
    updateMaintenance: builder.mutation({
      query: ({ id, data }) => ({
        url: `maintenance/machine/${id}`,
        method: "PUT",
        body: transformToApi(data),
      }),
      invalidatesTags: ["Maintenance"],
    }),
  }),
});

export const { useGetWeeklyMaintenanceQuery, useUpdateMaintenanceMutation } =
  maintenanceApi;

export default maintenanceApi;
