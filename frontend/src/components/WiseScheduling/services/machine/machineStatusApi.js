import apiSlice from "../apiSlice";

export const machineStatusApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 獲取某一區全部機台，以及機台狀態
    getMachineStatus: builder.query({
      query: (productionArea) =>
        `machineStatus/?productionArea=${productionArea}`,
      providesTags: ["MachineStatus"],
      transformResponse: (response) => response.data,
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
      query: (fullApiData) => {
        // 直接過濾成需要的格式
        const filteredData = {
          machineId: fullApiData.machineId,
          planStartDate: fullApiData.planStartDate,
          planEndDate: fullApiData.planEndDate,
          status: fullApiData.status,
          reason: fullApiData.machineStatusReason,
          product: fullApiData.machineStatusProduct,
        };

        // 過濾掉 null 值
        const cleanData = Object.fromEntries(
          Object.entries(filteredData).filter(([_, value]) => value != null)
        );
        console.log("🚀 ~ cleanData:", cleanData);

        return {
          url: "machineStatus/",
          method: "POST",
          body: cleanData,
        };
      },
      invalidatesTags: ["MachineStatus"],
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
      query: (fullApiData) => {
        // 過濾成需要的格式
        const filteredData = {
          id: fullApiData.machineStatusId, // 使用 machineStatusId 作為 id
          machineId: fullApiData.machineId,
          planStartDate: fullApiData.planStartDate,
          planEndDate: fullApiData.planEndDate,
          status: fullApiData.status,
          reason: fullApiData?.machineStatusReason,
          product: fullApiData?.machineStatusProduct,
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
      invalidatesTags: ["MachineStatus"],
    }),

    // 刪除單一機台的狀態
    // machineStatusId
    deleteMachineStatus: builder.mutation({
      query: (id) => ({
        url: `machineStatus/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MachineStatus"],
    }),
  }),
});

export const {
  useGetMachineStatusQuery,
  useCreateMachineStatusMutation,
  useUpdateMachineStatusMutation,
  useDeleteMachineStatusMutation,
} = machineStatusApi;
