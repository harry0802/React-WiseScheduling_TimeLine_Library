import { API_BASE } from "../../../../store/api/apiConfig";
import apiSlice from "../apiSlice";

export const smartScheduleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSmartSchedule: builder.query({
      query: ({ productionArea, startTime, endTime }) => ({
        url: `smartSchedule/`,
        method: "GET",
        params: { productionArea, startTime, endTime },
      }),
      providesTags: ["schedule"],
    }),

    changeWorkOrder: builder.mutation({
      query: (payload) => {
        // 🔄 強制統一轉換格式 - 只保留核心欄位
        const transformedPayload = {
          productionScheduleId: payload.productionScheduleId,
          newStartDate: payload.planOnMachineDate,
          machineSN: payload.machineSN,
        };

        return {
          url: `smartSchedule/changeWorkOrder`,
          method: "PUT",
          body: transformedPayload,
        };
      },
      invalidatesTags: ["schedule"],
    }),
  }),
});

export const { useGetSmartScheduleQuery, useChangeWorkOrderMutation } =
  smartScheduleApi;
