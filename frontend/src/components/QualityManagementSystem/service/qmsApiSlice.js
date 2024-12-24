import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE } from "../../../store/api/apiConfig";

const qmsApiSlice = createApi({
  reducerPath: "qmsApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE }),
  endpoints: () => ({}),
  tagTypes: ["InspectionType", "QualityInspection"],
});

export default qmsApiSlice;
