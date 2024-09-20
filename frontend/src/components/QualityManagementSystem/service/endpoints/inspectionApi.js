import apiSlice from "../qmsApiSlice";

export const inspectionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInspectionTypes: builder.query({
      query: () => "option/inspectionType",
      providesTags: ["InspectionType"],
    }),
    addQualityInspection: builder.mutation({
      query: (body) => ({
        url: "qualityInspection",
        method: "POST",
        body,
      }),
      invalidatesTags: ["QualityInspection"],
    }),
    updateQualityInspection: builder.mutation({
      query: (body) => ({
        url: "qualityInspection",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["QualityInspection"],
    }),
    getFirstInspections: builder.query({
      query: () => "qualityInspection/first_inspections",
      providesTags: ["QualityInspection"],
    }),
    getInProcessInspections: builder.query({
      query: () => "qualityInspection/in_process_inspections",
      providesTags: ["QualityInspection"],
    }),
  }),
});

export const {
  useGetInspectionTypesQuery,
  useAddQualityInspectionMutation,
  useUpdateQualityInspectionMutation,
  useGetFirstInspectionsQuery,
  useGetInProcessInspectionsQuery,
} = inspectionApi;
