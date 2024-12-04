import { apiSlice } from "../apiSlice";

export const processApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    syncProcess: builder.mutation({
      query: ({ quotationId, productSN }) => ({
        url: `/factoryQuotation/${quotationId}/syncProcess/${productSN}`,
        method: "GET",
      }),
      invalidatesTags: ["Process", "Quotation"],
    }),
    updateProcess: builder.mutation({
      query: ({ quotationId, data }) => ({
        url: `/factoryQuotation/${quotationId}/process`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Process"],
    }),
  }),
});

export const { useSyncProcessMutation, useUpdateProcessMutation } = processApi;
