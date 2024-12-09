import factoryQuotationApiSlice from "../apiSlice";

export const processApi = factoryQuotationApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateProcess: builder.mutation({
      query: ({ quotationId, data }) => ({
        url: `/factoryQuotation/${quotationId}/process/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Process"],
    }),
  }),
});

export const { useUpdateProcessMutation } = processApi;
