// services/api/endpoints/quotationApi.ts
import apiSlice from "../apiSlice";
import {
  QuotationResponse,
  CreateQuotationRequest,
  UpdateQuotationRequest,
} from "../type";

// 報價 API
export const quotationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuotations: builder.query<{ data: QuotationResponse[] }, void>({
      query: () => "salesQuotation/products/",
      providesTags: ["Quotation"],
    }),
    getQuotationById: builder.query<{ data: QuotationResponse }, number>({
      query: (id) => `salesQuotation/${id}`,
      providesTags: (result, error, id) => [{ type: "Quotation", id }],
    }),
    createQuotation: builder.mutation<
      QuotationResponse,
      CreateQuotationRequest
    >({
      query: (body) => ({
        url: "salesQuotation/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Quotation"],
    }),
    updateQuotation: builder.mutation<
      QuotationResponse,
      UpdateQuotationRequest
    >({
      query: ({ id, ...body }) => ({
        url: `salesQuotation/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Quotation", id }],
    }),
    deleteQuotation: builder.mutation<void, number>({
      query: (id) => ({
        url: `salesQuotation/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Quotation"],
    }),
  }),
});

export const {
  useGetQuotationsQuery,
  useGetQuotationByIdQuery,
  useCreateQuotationMutation,
  useUpdateQuotationMutation,
  useDeleteQuotationMutation,
} = quotationApi;
