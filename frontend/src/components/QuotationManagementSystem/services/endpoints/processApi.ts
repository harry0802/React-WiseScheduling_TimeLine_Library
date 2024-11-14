import apiSlice from "../apiSlice";
import { ProcessRequest } from "../type";

// 製程 API
export const processApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProcess: builder.mutation<
      void,
      { quotationId: number; process: ProcessRequest }
    >({
      query: ({ quotationId, process }) => ({
        url: `salesQuotation/${quotationId}/process/`,
        method: "POST",
        body: process,
      }),
      invalidatesTags: (result, error, { quotationId }) => [
        { type: "Quotation", id: quotationId },
      ],
    }),
    updateProcess: builder.mutation<
      void,
      { quotationId: number; process: ProcessRequest }
    >({
      query: ({ quotationId, process }) => ({
        url: `salesQuotation/${quotationId}/process/`,
        method: "PUT",
        body: process,
      }),
      invalidatesTags: (result, error, { quotationId }) => [
        { type: "Quotation", id: quotationId },
      ],
    }),
    deleteProcess: builder.mutation<
      void,
      { quotationId: number; processId: number }
    >({
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
