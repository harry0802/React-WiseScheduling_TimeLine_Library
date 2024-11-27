// services/api/endpoints/machineApi.js
import apiSlice from "../apiSlice";

// 機台 API
export const machineApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMachines: builder.query({
      query: () => "machine/list",
      providesTags: ["Machine"],
    }),
    getMachineById: builder.query({
      query: (id) => `machine/?id=${id}`,
      providesTags: (result, error, id) => [{ type: "Machine", id }],
    }),
  }),
});

export const { useGetMachinesQuery, useGetMachineByIdQuery } = machineApi;
