import apiSlice from "../apiSlice";
import { Customer } from "../type";

// 客戶 API
export const customerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query<Customer[], void>({
      query: () => "customer/list",
      providesTags: ["Customer"],
    }),
  }),
});

export const { useGetCustomersQuery } = customerApi;
