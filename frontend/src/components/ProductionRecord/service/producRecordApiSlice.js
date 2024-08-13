import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE } from "../../../store/api/apiConfig";

/*
ProductionRecord/
│
├── api/
│   ├── apiSlice.js              // Centralized API slice configuration using Redux Toolkit Query.
│   └── endpoints/               // Directory for API services, organized by feature.
│       ├── productApi.js        // Handles API interactions related to product records.
│       │                        // API Routes:
│       │                        //   - GET /api/product/ (getProductsWithPagination): Fetch products with pagination and filters.
│       │                        //   - PUT /api/product/ (updateProducts): Update product records.
│       │
│       ├── processApi.js        // Handles API interactions related to manufacturing processes.
│       │                        // API Routes:
│       │                        //   - GET /api/process/ (getProcessesAndMaterials): Fetch processes and associated materials by product ID and process category.
│       │                        //   - GET /api/process/singleProcess/{id} (getSingleProcessAndMaterials): Fetch a single process and its materials.
│       │                        //   - POST /api/process/ (createSingleProcessAndMaterials): Create a new process with associated molds and materials.
│       │                        //   - PUT /api/process/ (updateSingleProcessAndMaterials): Update an existing process and its associated data.
│       │                        //   - DELETE /api/process/{id} (deleteProcess): Delete a process and associated molds.
│       │
│       ├── materialApi.js       // Handles API interactions related to materials.
│       │                        // API Routes:
│       │                        //   - GET /api/material/?productSN= (getMaterialsByProductSN): Fetch materials associated with a specific product by serial number.
│       │                        //   - GET /api/material/ (getMaterials): Fetch all materials.
│       │                        //   - GET /api/material/?id= (getMaterialById): Fetch a material by its ID.
│       │                        //   - GET /api/material/?categorized=true (getCategorizedMaterials): Fetch all categorized materials.
│       │                        //   - PUT /api/material/ (updateMaterials): Update material records.
│       │
│       └── optionApi.js         // Handles API interactions related to various options.
│                                // API Routes:
│                                //   - GET /api/option/{name} (getOption): Fetch option data by name and optional ID.
│                                //   - POST /api/option/{name} (createOption): Create a new option record.
│                                //   - PUT /api/option/{name} (updateOption): Update an existing option record.
│
*/
// Create a centralized API slice using createApi
// This slice will be extended in other files for specific endpoints
const apiSlice = createApi({
  // Base query with the API base URL
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE }),
  endpoints: () => ({}),
  // Define tags for caching and invalidation
  tagTypes: ["Product", "Process", "Material", "Option"],
});

export default apiSlice;
