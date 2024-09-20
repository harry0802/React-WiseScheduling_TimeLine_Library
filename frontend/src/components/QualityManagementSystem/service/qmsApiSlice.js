import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE } from "../../../store/api/apiConfig";

const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE }),
  endpoints: () => ({}),
  tagTypes: ["InspectionType", "QualityInspection"],
});

export default apiSlice;
