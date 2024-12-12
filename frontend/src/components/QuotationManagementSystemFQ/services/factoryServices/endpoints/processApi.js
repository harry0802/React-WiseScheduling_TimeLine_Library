import factoryQuotationApiSlice from "../apiSlice";

export const processApi = factoryQuotationApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateProcess: builder.mutation({
      query: ({ quotationId, data }) => ({
        url: `/factoryQuotation/${quotationId}/process/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { quotationId }) => [
        { type: "Process" },
        { type: "Quotation", id: quotationId },
      ],
    }),
    // 產品下拉選單的資料來源，只列出BOM表有製程的產品 (done)
    getProductList: builder.query({
      query: () => ({
        url: `/factoryQuotation/products/`,
        method: "GET",
      }),
    }),
  }),
});

export const { useUpdateProcessMutation, useGetProductListQuery } = processApi;
