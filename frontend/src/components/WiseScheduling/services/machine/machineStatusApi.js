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

    // 新增單一機台的狀態
    createMachineStatus: builder.mutation({
      query: (statusData) => ({
        url: "machineStatus/",
        method: "POST",
        body: statusData,
      }),
      invalidatesTags: ["MachineStatus"],
    }),

    // 修改單一機台的狀態
    updateMachineStatus: builder.mutation({
      query: (statusData) => ({
        url: "machineStatus/",
        method: "PUT",
        body: statusData,
      }),
      invalidatesTags: ["MachineStatus"],
    }),

    // 刪除單一機台的狀態
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
