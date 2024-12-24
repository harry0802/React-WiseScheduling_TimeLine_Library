import apiSlice from "../apiSlice";

// 製程 API
export const processApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProcess: builder.mutation({
      query: ({ quotationId, process }) => ({
        url: `salesQuotation/${quotationId}/process/`,
        method: "POST",
        body: process,
      }),
      invalidatesTags: (result, error, { quotationId }) => [
        { type: "Quotation", id: quotationId },
      ],
    }),
    updateProcess: builder.mutation({
      query: ({ quotationId, process }) => ({
        url: `salesQuotation/${quotationId}/process/`,
        method: "PUT",
        body: process,
      }),
      invalidatesTags: (result, error, { quotationId }) => [
        { type: "Quotation", id: quotationId },
      ],
    }),
    deleteProcess: builder.mutation({
      query: ({ quotationId, processId }) => ({
        url: `salesQuotation/${quotationId}/process/${processId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { quotationId }) => [
        { type: "Quotation", id: quotationId },
      ],
    }),
  }),
});

export const {
  useCreateProcessMutation,
  useUpdateProcessMutation,
  useDeleteProcessMutation,
} = processApi;
