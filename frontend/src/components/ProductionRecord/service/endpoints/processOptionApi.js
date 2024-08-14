// src/api/endpoints/processOptionApi.js

import apiSlice from "../producRecordApiSlice";

export const processOptionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint for fetching process options
    getProcessOptions: builder.query({
      query: (id) => ({
        url: id ? `processOption/?id=${id}` : "processOption/",
      }),
      providesTags: ["ProcessOption"], // Caching tag to optimize performance
    }),

    // Endpoint for creating a new process option
    createProcessOption: builder.mutation({
      query: (processOption) => ({
        url: "processOption/",
        method: "POST",
        body: processOption,
      }),
      invalidatesTags: ["ProcessOption"], // Invalidate the 'ProcessOption' cache after mutation
    }),

    // Endpoint for updating an existing process option
    updateProcessOption: builder.mutation({
      query: (processOption) => ({
        url: "processOption/",
        method: "PUT",
        body: processOption,
      }),
      invalidatesTags: ["ProcessOption"], // Invalidate the 'ProcessOption' cache after mutation
    }),

    // Endpoint for deleting a process option
    deleteProcessOption: builder.mutation({
      query: (id) => ({
        url: `processOption/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ProcessOption"], // Invalidate the 'ProcessOption' cache after deletion
    }),
  }),
});

// Export hooks for interacting with the endpoints
export const {
  useGetProcessOptionsQuery,
  useCreateProcessOptionMutation,
  useUpdateProcessOptionMutation,
  useDeleteProcessOptionMutation,
} = processOptionApi;

// Additional methods for easier data manipulation

export const useProcessOptionActions = () => {
  const [createProcessOption, { isLoading: isCreating, error: createError }] =
    useCreateProcessOptionMutation();

  const [updateProcessOption, { isLoading: isUpdating, error: updateError }] =
    useUpdateProcessOptionMutation();

  const [deleteProcessOption, { isLoading: isDeleting, error: deleteError }] =
    useDeleteProcessOptionMutation();

  const handleCreate = async (newProcessOption) => {
    try {
      const response = await createProcessOption(newProcessOption).unwrap();
      return response;
    } catch (err) {
      console.error("Failed to create process option:", err);
      throw err;
    }
  };

  const handleUpdate = async (updatedProcessOption) => {
    try {
      const response = await updateProcessOption(updatedProcessOption).unwrap();
      return response;
    } catch (err) {
      console.error("Failed to update process option:", err);
      throw err;
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteProcessOption(id).unwrap();
      return response;
    } catch (err) {
      console.error("Failed to delete process option:", err);
      throw err;
    }
  };

  return {
    handleCreate,
    handleUpdate,
    handleDelete,
    isCreating,
    isUpdating,
    isDeleting,
    createError,
    updateError,
    deleteError,
  };
};
