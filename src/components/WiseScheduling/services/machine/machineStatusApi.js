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
      async queryFn(productionArea) {
        // 如果啟用 Mock API
        if (USE_MOCK_API) {
          await delay();
          const data = mockDataStore[productionArea] || [];
          console.log(`[Mock API] 獲取區域 ${productionArea} 的機台狀態:`, data.length, '台機器');
          return { data };
        }

        // 如果沒有啟用 Mock，則使用真實 API
        // 這裡需要手動調用 fetch
        try {
          const baseUrl = apiSlice.reducerPath ? '' : '/api';
          const response = await fetch(`${baseUrl}/api/machineStatus/?productionArea=${productionArea}`);
          const result = await response.json();
          const data = result.data;

          // 在 API 層統一將中文狀態轉換為英文狀態碼
          return {
            data: data.map(machine => ({
              ...machine,
              status: getStatusCode(machine.status)
            }))
          };
        } catch (error) {
          return { error: { status: "FETCH_ERROR", error: error.message } };
        }
      },
      providesTags: ["MachineStatus"],
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
      async queryFn(fullApiData) {
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
          console.log('[Mock API] 新增機台狀態:', newStatus);
          return { data: newStatus };
        }

        // 真實 API
        try {
          const filteredData = {
            id: fullApiData.machineStatusId ?? fullApiData.id,
            machineId: fullApiData.machineId,
            planStartDate: fullApiData.planStartDate,
            planEndDate: fullApiData.planEndDate,
            actualStartDate: fullApiData.actualStartDate,
            actualEndDate: fullApiData.actualEndDate,
            status: fullApiData.status,
            reason: fullApiData?.machineStatusReason ?? fullApiData.reason,
            product: fullApiData?.machineStatusProduct ?? fullApiData.product,
          };
          const cleanData = Object.fromEntries(
            Object.entries(filteredData).filter(([_, value]) => value != null)
          );

          const response = await fetch('/api/machineStatus/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cleanData),
          });
          const result = await response.json();
          return { data: result };
        } catch (error) {
          return { error: { status: "FETCH_ERROR", error: error.message } };
        }
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
      async queryFn(fullApiData) {
        if (USE_MOCK_API) {
          await delay();
          // 模擬更新資料
          const area = fullApiData.machine?.productionArea || "A";
          mockDataStore[area] = mockDataStore[area].map((m) =>
            m.machineId === fullApiData.machineId
              ? { ...m, ...fullApiData }
              : m
          );
          console.log('[Mock API] 更新機台狀態:', fullApiData);
          return { data: fullApiData };
        }

        // 真實 API
        try {
          const filteredData = {
            id: fullApiData.machineStatusId ?? fullApiData.id,
            machineId: fullApiData.machineId,
            planStartDate: fullApiData.planStartDate,
            planEndDate: fullApiData.planEndDate,
            actualStartDate: fullApiData.actualStartDate,
            actualEndDate: fullApiData.actualEndDate ?? null,
            status: fullApiData.status,
            reason: fullApiData?.machineStatusReason ?? fullApiData.reason,
            product: fullApiData?.machineStatusProduct ?? fullApiData.product,
          };
          const cleanData = Object.fromEntries(
            Object.entries(filteredData).filter(([_, value]) => value != null)
          );

          const response = await fetch('/api/machineStatus/', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cleanData),
          });
          const result = await response.json();
          return { data: result };
        } catch (error) {
          return { error: { status: "FETCH_ERROR", error: error.message } };
        }
      },
      invalidatesTags: ["MachineStatus", "schedule"],
    }),

    // 刪除單一機台的狀態
    // machineStatusId
    deleteMachineStatus: builder.mutation({
      async queryFn(id) {
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
          console.log('[Mock API] 刪除機台狀態 ID:', id);
          return { data: { success: true } };
        }

        // 真實 API
        try {
          const response = await fetch(`/api/machineStatus/${id}`, {
            method: 'DELETE',
          });
          const result = await response.json();
          return { data: result };
        } catch (error) {
          return { error: { status: "FETCH_ERROR", error: error.message } };
        }
      },
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
