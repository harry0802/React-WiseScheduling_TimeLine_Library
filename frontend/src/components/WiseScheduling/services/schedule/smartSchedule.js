import { API_BASE } from "../../../../store/api/apiConfig";
import apiSlice from "../apiSlice";

export const smartScheduleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSmartSchedule: builder.query({
      query: ({ productionArea, startTime, endTime }) => ({
        url: `${API_BASE}/smartSchedule/`, // Updated URL to include trailing slash
        method: "GET",
        params: { productionArea, startTime, endTime }, // Updated params
      }),
      providesTags: ["SmartSchedule"],
    }),

    changeWorkOrder: builder.mutation({
      query: (payload) => ({
        url: `${API_BASE}/smartSchedule/changeWorkOrder`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["SmartSchedule"],
    }),
  }),
});

export const { useGetSmartScheduleQuery, useChangeWorkOrderMutation } =
  smartScheduleApi;
