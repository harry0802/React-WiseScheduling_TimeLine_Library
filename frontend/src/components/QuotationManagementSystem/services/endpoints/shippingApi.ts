import apiSlice from "../apiSlice";
import { ShippingRequest } from "../type";

// 運費 API
export const shippingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateShipping: builder.mutation<
      void,
      { quotationId: number; shipping: ShippingRequest }
    >({
      query: ({ quotationId, shipping }) => ({
        url: `salesQuotation/${quotationId}/shipping/`,
        method: "PUT",
        body: shipping,
      }),
      invalidatesTags: (result, error, { quotationId }) => [
        { type: "Quotation", id: quotationId },
      ],
    }),
  }),
});

export const { useUpdateShippingMutation } = shippingApi;
