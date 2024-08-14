import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE } from "../../../store/api/apiConfig";

/*
ProductionRecord/
│
├── service/
│   ├── apiSlice.js             // Centralized API configuration using Redux Toolkit Query.
│   └── endpoints/              // API services by feature.
│       ├── productApi.js       // Product API: Fetch, update product records.
│       ├── processApi.js       // Process API: Fetch, create, update, delete processes and associated materials.
│       ├── materialApi.js      // Material API: Fetch materials by product, categorized, and by ID; update materials.
│       ├── processOptionApi.js // Process Option API: Fetch, create, update, delete process options.
│       └── materialOptionApi.js// Material Option API: Fetch, create, update, delete material options.
│
*/
// Create a centralized API slice using createApi
// This slice will be extended in other files for specific endpoints
const apiSlice = createApi({
  // Base query with the API base URL
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE }),
  endpoints: () => ({}),
  // Define tags for caching and invalidation
  tagTypes: [
    "Product",
    "Process",
    "Material",
    "Option",
    "MaterialOption",
    "ProcessOption",
  ],
});

export default apiSlice;
