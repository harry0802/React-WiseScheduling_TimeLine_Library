import apiSlice from "../apiSlice";
import { getStatusCode } from "../../configs/constants/fieldNames";
import { USE_MOCK_API, delay } from "../mockData/useMockApi";
import { generateAreaMachineStatus } from "../mockData/machineStatusMockData";

// Mock 資料儲存（用於 CRUD 操作）
let mockDataStore = {
  A: generateAreaMachineStatus("A"),
  B: generateAreaMachineStatus("B"),
  C: generateAreaMachineStatus("C"),
  D: generateAreaMachineStatus("D"),
};

export const machineStatusApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 獲取某一區全部機台，以及機台狀態
    getMachineStatus: builder.query({
      queryFn: async (productionArea) => {
        // 如果啟用 Mock API
        if (USE_MOCK_API) {
          await delay();
          const data = mockDataStore[productionArea] || [];
          return { data };
        }

        // 使用真實 API（保留原有邏輯）
        return { error: { status: "CUSTOM_ERROR", error: "請設定真實 API" } };
      },
      query: (productionArea) =>
        `machineStatus/?productionArea=${productionArea}`,
      providesTags: ["MachineStatus"],
      transformResponse: (response) => {
        if (USE_MOCK_API) return response;

        const data = response.data;
        // 在 API 層統一將中文狀態轉換為英文狀態碼
        return data.map(machine => ({
          ...machine,
          status: getStatusCode(machine.status) // 中文狀態 → 英文狀態碼
        }));
      },
    }),

    /**
     * @function createMachineStatus
     * @description 新增單一機台的狀態。
     * @param {object} statusData - 包含機台狀態資訊的物件。
     * @param {number} statusData.machineId - 機台ID。
     * @param {string} statusData.planStartDate - 計劃開始日期 (ISO 8601 格式)。
     * @param {string} statusData.planEndDate - 計劃結束日期 (ISO 8601 格式)。
     * @param {string} statusData.actualStartDate - 實際開始日期 (ISO 8601 格式)。
     * @param {string} statusData.status - 機台狀態。
     * @param {string} statusData.reason - 停機原因。
     * @param {string} statusData.product - 產品名稱。
     * @returns {object} - 包含新增狀態的 API 回應。
     * @example
     * // 基礎使用示例
     * const [createMachineStatus] = useCreateMachineStatusMutation();
     * createMachineStatus({
     *   machineId: 1,
     *   planStartDate: "2025-02-25T00:00:00.000+08:00",
     *   planEndDate: "2025-02-25T00:00:00.000+08:00",
     *   actualStartDate: "2025-02-25T00:00:00.000+08:00",
     *   status: "運行中",
     *   reason: "",
     *   product: "產品A"
     * });
     */
    createMachineStatus: builder.mutation({
      queryFn: async (fullApiData) => {
        if (USE_MOCK_API) {
          await delay();
          // 模擬新增資料
          const newStatus = {
            ...fullApiData,
            machineStatusId: fullApiData.machineStatusId || Date.now(),
          };
          const area = fullApiData.machine?.productionArea || "A";
          mockDataStore[area] = mockDataStore[area].map((m) =>
            m.machineId === fullApiData.machineId ? { ...m, ...newStatus } : m
          );
          return { data: newStatus };
        }
        return { error: { status: "CUSTOM_ERROR", error: "請設定真實 API" } };
      },
      query: (fullApiData) => {
        // 直接過濾成需要的格式
        const filteredData = {
          id: fullApiData.machineStatusId ?? fullApiData.id, // 使用 machineStatusId 作為 id
          machineId: fullApiData.machineId,
          planStartDate: fullApiData.planStartDate,
          planEndDate: fullApiData.planEndDate,
          actualStartDate: fullApiData.actualStartDate,
          actualEndDate: fullApiData.actualEndDate,
          status: fullApiData.status,
          reason: fullApiData?.machineStatusReason ?? fullApiData.reason,
          product: fullApiData?.machineStatusProduct ?? fullApiData.product,
        };
        // 過濾掉 null 值
        const cleanData = Object.fromEntries(
          Object.entries(filteredData).filter(([_, value]) => value != null)
        );
        return {
          url: "machineStatus/",
          method: "POST",
          body: cleanData,
        };
      },
      invalidatesTags: ["MachineStatus", "schedule"],
    }),

    // 修改單一機台的狀態
    /*
  {
  "id": 1,
  "planStartDate": "2025-02-25T00:00:00.000+08:00",
  "planEndDate": "2025-02-25T00:00:00.000+08:00",
  "actualStartDate": "2025-02-25T00:00:00.000+08:00",
  "actualEndDate": "2025-02-25T00:00:00.000+08:00",
  "status": "status",
  "reason": "停機原因",
  "product": "產品名稱"
}
  */
    updateMachineStatus: builder.mutation({
      queryFn: async (fullApiData) => {
        if (USE_MOCK_API) {
          await delay();
          // 模擬更新資料
          const area = fullApiData.machine?.productionArea || "A";
          mockDataStore[area] = mockDataStore[area].map((m) =>
            m.machineId === fullApiData.machineId
              ? { ...m, ...fullApiData }
              : m
          );
          return { data: fullApiData };
        }
        return { error: { status: "CUSTOM_ERROR", error: "請設定真實 API" } };
      },
      query: (fullApiData) => {
        // 過濾成需要的格式
        const filteredData = {
          id: fullApiData.machineStatusId ?? fullApiData.id, // 使用 machineStatusId 作為 id
          machineId: fullApiData.machineId,
          planStartDate: fullApiData.planStartDate,
          planEndDate: fullApiData.planEndDate,
          actualStartDate: fullApiData.actualStartDate,
          actualEndDate: fullApiData.actualEndDate ?? null,
          status: fullApiData.status,
          reason: fullApiData?.machineStatusReason ?? fullApiData.reason,
          product: fullApiData?.machineStatusProduct ?? fullApiData.product,
        };
        // 過濾掉 null 值
        const cleanData = Object.fromEntries(
          Object.entries(filteredData).filter(([_, value]) => value != null)
        );

        return {
          url: "machineStatus/",
          method: "PUT",
          body: cleanData,
        };
      },
      invalidatesTags: ["MachineStatus", "schedule"],
    }),

    // 刪除單一機台的狀態
    // machineStatusId
    deleteMachineStatus: builder.mutation({
      queryFn: async (id) => {
        if (USE_MOCK_API) {
          await delay();
          // 模擬刪除資料（將狀態重置為 IDLE）
          Object.keys(mockDataStore).forEach((area) => {
            mockDataStore[area] = mockDataStore[area].map((m) =>
              m.machineStatusId === id
                ? { ...m, status: "IDLE", machineStatusProduct: null, machineStatusReason: null }
                : m
            );
          });
          return { data: { success: true } };
        }
        return { error: { status: "CUSTOM_ERROR", error: "請設定真實 API" } };
      },
      query: (id) => ({
        url: `machineStatus/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MachineStatus", "schedule"],
    }),
  }),
});

export const {
  useGetMachineStatusQuery,
  useCreateMachineStatusMutation,
  useUpdateMachineStatusMutation,
  useDeleteMachineStatusMutation,
} = machineStatusApi;
