import apiSlice from "../qmsApiSlice";

export const inspectionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInspectionTypes: builder.query({
      query: () => "option/inspectionType",
      providesTags: ["InspectionType"],
    }),
    addQualityInspection: builder.mutation({
      query: (inspections) => ({
        url: "qualityInspection/",
        method: "POST",
        body: inspections,
      }),
      invalidatesTags: ["QualityInspection"],
    }),
    updateQualityInspection: builder.mutation({
      query: (inspections) => ({
        url: "qualityInspection/",
        method: "PUT",
        body: inspections,
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

    getInspections: builder.query({
      query: (type) => `qualityInspection/${type.toLowerCase()}_inspections`,
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
  useGetInspectionsQuery,
} = inspectionApi;
