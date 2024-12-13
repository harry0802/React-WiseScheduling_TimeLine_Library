import factoryQuotationApiSlice from "../apiSlice";

export const shippingApi = factoryQuotationApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateShipping: builder.mutation({
      query: ({ quotationId, ...body }) => ({
        url: `/factoryQuotation/${quotationId}/shipping/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Shipping"],
    }),
  }),
});

export const { useUpdateShippingMutation } = shippingApi;
