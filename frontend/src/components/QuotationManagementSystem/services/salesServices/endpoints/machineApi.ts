// services/api/endpoints/machineApi.ts
import apiSlice from "../apiSlice";
import { Machine } from "../type";

// 機台 API
export const machineApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMachines: builder.query<Machine[], void>({
      query: () => "machine/list",
      providesTags: ["Machine"],
    }),
    getMachineById: builder.query<Machine, number>({
      query: (id) => `machine/?id=${id}`,
      providesTags: (result, error, id) => [{ type: "Machine", id }],
    }),
  }),
});

export const { useGetMachinesQuery, useGetMachineByIdQuery } = machineApi;
