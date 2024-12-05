import { apiSlice } from "../apiSlice";

export const shippingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateShipping: builder.mutation({
      query: ({ quotationId, data }) => ({
        url: `/factoryQuotation/${quotationId}/shipping`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Shipping"],
    }),
  }),
});

export const { useUpdateShippingMutation } = shippingApi;
