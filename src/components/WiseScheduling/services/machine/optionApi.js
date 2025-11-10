import apiSlice from "../apiSlice";

export const optionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 獲取機台狀態選項
    getMachineStatusOptions: builder.query({
      query: () => "option/machineStatus",
      providesTags: ["Option"],
    }),
  }),
});

export const { useGetMachineStatusOptionsQuery } = optionApi;
