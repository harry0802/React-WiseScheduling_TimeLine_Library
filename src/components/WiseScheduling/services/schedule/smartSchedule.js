import { API_BASE } from "../../../../store/api/apiConfig";
import apiSlice from "../apiSlice";
import { USE_MOCK_API, delay } from "../mockData/useMockApi";
import {
  generateScheduleByArea,
  filterSchedulesByTimeRange,
} from "../mockData/smartScheduleMockData";

// Mock 資料儲存（用於 CRUD 操作）
let mockScheduleStore = {
  A: generateScheduleByArea("A"),
  B: generateScheduleByArea("B"),
  C: generateScheduleByArea("C"),
  D: generateScheduleByArea("D"),
};

export const smartScheduleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSmartSchedule: builder.query({
      async queryFn({ productionArea, startTime, endTime }) {
        // 如果啟用 Mock API
        if (USE_MOCK_API) {
          await delay();

          let schedules = mockScheduleStore[productionArea] || [];

          // 如果有時間範圍，進行過濾
          if (startTime && endTime) {
            schedules = filterSchedulesByTimeRange(schedules, startTime, endTime);
          }

          console.log(
            `[Mock API] 獲取區域 ${productionArea} 的排程:`,
            schedules.length,
            "筆工單"
          );

          return { data: { data: schedules } };
        }

        // 真實 API
        try {
          const params = new URLSearchParams({
            productionArea,
            ...(startTime && { startTime }),
            ...(endTime && { endTime }),
          });

          const baseUrl = apiSlice.reducerPath ? "" : "/api";
          const response = await fetch(
            `${baseUrl}/api/smartSchedule/?${params.toString()}`
          );
          const result = await response.json();

          return { data: result };
        } catch (error) {
          return { error: { status: "FETCH_ERROR", error: error.message } };
        }
      },
      providesTags: ["schedule"],
    }),

    changeWorkOrder: builder.mutation({
      async queryFn(payload) {
        // 如果啟用 Mock API
        if (USE_MOCK_API) {
          await delay();

          const { productionScheduleId, planOnMachineDate, machineSN } = payload;

          // 在所有區域中尋找並更新工單
          let updated = false;
          Object.keys(mockScheduleStore).forEach((area) => {
            mockScheduleStore[area] = mockScheduleStore[area].map((schedule) => {
              if (schedule.productionScheduleId === productionScheduleId) {
                updated = true;
                return {
                  ...schedule,
                  planOnMachineDate: planOnMachineDate,
                  machineSN: machineSN,
                  updatedAt: new Date().toISOString(),
                };
              }
              return schedule;
            });
          });

          console.log(
            `[Mock API] 更新工單 ${productionScheduleId}:`,
            updated ? "成功" : "找不到工單"
          );

          return {
            data: {
              success: updated,
              message: updated ? "工單已更新" : "找不到工單",
            },
          };
        }

        // 真實 API
        try {
          const transformedPayload = {
            productionScheduleId: payload.productionScheduleId,
            newStartDate: payload.planOnMachineDate,
            machineSN: payload.machineSN,
          };

          const baseUrl = apiSlice.reducerPath ? "" : "/api";
          const response = await fetch(
            `${baseUrl}/api/smartSchedule/changeWorkOrder`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(transformedPayload),
            }
          );
          const result = await response.json();

          return { data: result };
        } catch (error) {
          return { error: { status: "FETCH_ERROR", error: error.message } };
        }
      },
      invalidatesTags: ["schedule"],
    }),
  }),
});

export const { useGetSmartScheduleQuery, useChangeWorkOrderMutation } =
  smartScheduleApi;
