// src/services/productionCostApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE } from "../../../store/api/apiConfig";

export const productionCostApi = createApi({
  reducerPath: "productionCostApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE }),
  endpoints: (builder) => ({
    getProductionCosts: builder.query({
      query: ({
        dataType = "mother",
        page = 1,
        size = 10,
        sort = "productionReportId",
        productionScheduleId,
      }) => {
        const params = new URLSearchParams({
          dataType,
          page: String(page),
          size: String(size),
          sort,
          ...(productionScheduleId && {
            productionScheduleId: String(productionScheduleId),
          }),
        });

        return {
          url: `productionCost/?${params}`,
          method: "GET",
        };
      },
      // 💡 轉換回應格式以符合 DataGrid 需求
      transformResponse: (response) => ({
        rows: response.data,
        totalCount: response.meta.total_count,
        page: response.meta.page - 1, // API 是 1-based，DataGrid 是 0-based
      }),
    }),
  }),
});

export default productionCostApi;
export const { useGetProductionCostsQuery } = productionCostApi;
