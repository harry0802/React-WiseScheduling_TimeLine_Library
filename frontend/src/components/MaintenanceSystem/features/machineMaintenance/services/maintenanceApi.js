import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE } from "../../../../../store/api/apiConfig";
import {
  transformFromApi,
  transformApiToForm,
} from "../../../utils/dataTransformers";

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
      transformResponse: (response) => {
        return {
          table: transformFromApi(response),
          forms: {
            inspector: transformApiToForm(response, "inspector"),
            reinspector: transformApiToForm(response, "reinspector"),
            approver: transformApiToForm(response, "approver"),
          },
        };
      },
      providesTags: ["WeeklyMaintenance"], // 提供標籤
    }),

    // 更新保養記錄
    updateMaintenance: builder.mutation({
      query: (data) => ({
        url: `maintenance/machine/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["WeeklyMaintenance"], // 使相關查詢失效
    }),
  }),
});

export const { useGetWeeklyMaintenanceQuery, useUpdateMaintenanceMutation } =
  maintenanceApi;

export default maintenanceApi;
