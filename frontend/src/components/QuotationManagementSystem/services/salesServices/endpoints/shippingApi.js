import apiSlice from "../apiSlice";

// 運費 API
export const shippingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateShipping: builder.mutation({
      query: ({ quotationId, shipping }) => ({
        url: `salesQuotation/${quotationId}/shipping/`,
        method: "PUT",
        body: shipping,
      }),
      invalidatesTags: (result, _error, { quotationId }) => [
        { type: "Quotation", id: quotationId },
      ],
    }),
  }),
});

export const { useUpdateShippingMutation } = shippingApi;
