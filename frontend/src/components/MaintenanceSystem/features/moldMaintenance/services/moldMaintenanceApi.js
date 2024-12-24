import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE } from "../../../../../store/api/apiConfig";
import {
  transformApiToForm,
  transformFromApi,
} from "../../../utils/dataTransformers";
import { MAINTENANCE_ITEMS } from "../configs/maintenanceItems";

const moldMaintenanceApi = createApi({
  reducerPath: "moldMaintenanceApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE }),
  endpoints: (builder) => ({
    // 獲取模具SN
    getMoldSNs: builder.query({
      query: () => "maintenance/moldSNs",
      transformResponse: (response) => response.data,
      providesTags: ["MoldSNs"],
    }),

    // 獲取模具保養記錄
    getMoldMaintenance: builder.query({
      query: ({ moldSN, year, week }) => ({
        url: "maintenance/mold/",
        params: { moldSN, year, week },
      }),
      transformResponse: (response) => {
        if (response.data.length === 0) {
          return {
            table: [],
            forms: {},
          };
        }
        return {
          table: transformFromApi(response, MAINTENANCE_ITEMS),
          forms: {
            inspector: transformApiToForm(response, "inspector"),
            reinspector: transformApiToForm(response, "reinspector"),
            approver: transformApiToForm(response, "approver"),
          },
        };
      },
      providesTags: ["MoldMaintenance"],
    }),

    // 更新模具保養記錄
    updateMoldMaintenance: builder.mutation({
      query: (body) => ({
        url: "maintenance/mold/",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["MoldMaintenance"],
    }),
  }),
});

export const {
  useGetMoldSNsQuery,
  useGetMoldMaintenanceQuery,
  useUpdateMoldMaintenanceMutation,
} = moldMaintenanceApi;

export default moldMaintenanceApi;
