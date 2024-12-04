import apiSlice from "../apiSlice";

export const customerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query({
      query: () => "customer/list",
      providesTags: ["Customer"],
    }),
  }),
});

export const { useGetCustomersQuery } = customerApi;
