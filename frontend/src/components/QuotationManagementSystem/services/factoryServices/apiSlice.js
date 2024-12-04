/*
services/
├── api/
│   ├── apiSlice.js
│   └── endpoints/
│       ├── quotationApi.js
│       ├── processApi.js
│       └── shippingApi.js
*/
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE } from "../../../../store/api/apiConfig";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE }),
  tagTypes: ["Quotation", "Process", "Shipping"],
  endpoints: () => ({}),
});
