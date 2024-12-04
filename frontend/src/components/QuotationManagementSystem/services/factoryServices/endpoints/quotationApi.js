import { apiSlice } from "../apiSlice";

export const quotationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ! 這邊後端將會編寫新的 API 來取代
    getQuotations: builder.query({
      query: () => "/product",
      providesTags: ["Quotation"],
    }),
    getQuotationById: builder.query({
      query: (id) => `/factoryQuotation/${id}`,
      providesTags: ["Quotation"],
    }),
    createQuotation: builder.mutation({
      query: (body) => ({
        url: "/factoryQuotation",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Quotation"],
    }),
    updateQuotation: builder.mutation({
      query: ({ id, data }) => ({
        url: `/factoryQuotation/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Quotation"],
    }),
    deleteQuotation: builder.mutation({
      query: (id) => ({
        url: `/factoryQuotation/${id}`,
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
