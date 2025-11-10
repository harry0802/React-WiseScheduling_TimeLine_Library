import apiSlice from "../apiSlice";
import { USE_MOCK_API, delay } from "../mockData/useMockApi";
import { generateAreaMachineStatus } from "../mockData/machineStatusMockData";

/**
 * @file machineApi.js
 * @description 機台資料 API - 提供機台基本資訊查詢功能
 * @version 1.0.0
 */

export const machineApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @function getMachines
     * @description 獲取所有機台的基本資訊（不含狀態）
     * @returns {Object} { data: Array<Machine> }
     *
     * @example
     * const { data, isLoading, isSuccess } = useGetMachinesQuery();
     *
     * @responseFormat
     * {
     *   data: [
     *     {
     *       id: 101,
     *       machineSN: "A1",
     *       productionArea: "A",
     *       singleOrDoubleColor: "雙"
     *     },
     *     ...
     *   ]
     * }
     */
    getMachines: builder.query({
      async queryFn() {
        if (USE_MOCK_API) {
          await delay();

          // 從所有區域的機台狀態數據中提取機台基本資訊
          const areas = ['A', 'B', 'C', 'D'];
          const allMachines = areas.flatMap(area => {
            const areaData = generateAreaMachineStatus(area);
            return areaData.map(status => status.machine);
          });

          console.log(`[Mock API] 獲取機台列表:`, allMachines.length, '台機器');
          console.log(`[Mock API] 機台資料前3筆:`, allMachines.slice(0, 3));
          console.log(`[Mock API] 返回結構:`, { data: allMachines });
          return { data: allMachines };
        }

        // 真實 API
        try {
          const baseUrl = apiSlice.reducerPath ? '' : '/api';
          const response = await fetch(`${baseUrl}/api/machines/`);
          const result = await response.json();

          return { data: result.data || result };
        } catch (error) {
          return { error: { status: "FETCH_ERROR", error: error.message } };
        }
      },
      providesTags: ["Machine"],
    }),

    /**
     * @function getMachinesByArea
     * @description 根據生產區域獲取機台列表
     * @param {string} productionArea - 生產區域代碼 (A, B, C, D)
     * @returns {Object} { data: Array<Machine> }
     *
     * @example
     * const { data } = useGetMachinesByAreaQuery("A");
     */
    getMachinesByArea: builder.query({
      async queryFn(productionArea) {
        if (USE_MOCK_API) {
          await delay();

          const areaData = generateAreaMachineStatus(productionArea);
          const machines = areaData.map(status => status.machine);

          console.log(`[Mock API] 獲取區域 ${productionArea} 的機台:`, machines.length, '台機器');
          return { data: machines };
        }

        // 真實 API
        try {
          const baseUrl = apiSlice.reducerPath ? '' : '/api';
          const response = await fetch(`${baseUrl}/api/machines/?productionArea=${productionArea}`);
          const result = await response.json();

          return { data: result.data || result };
        } catch (error) {
          return { error: { status: "FETCH_ERROR", error: error.message } };
        }
      },
      providesTags: (result, error, productionArea) => [
        { type: "Machine", id: productionArea }
      ],
    }),
  }),
});

export const {
  useGetMachinesQuery,
  useGetMachinesByAreaQuery,
} = machineApi;
