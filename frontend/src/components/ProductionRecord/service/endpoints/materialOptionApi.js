// src/api/endpoints/materialOptionApi.js
import apiSlice from "../producRecordApiSlice";

export const materialOptionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint for fetching material options
    getMaterialOptions: builder.query({
      query: (id) => ({
        url: id ? `materialOption/?id=${id}` : "materialOption/",
      }),
      providesTags: ["MaterialOption"], // Caching tag to optimize performance
    }),

    // Endpoint for fetching material CheckIsDeletable by material ID
    getMaterialCheckIsDeletableById: builder.query({
      query: (id) => ({
        url: `materialOption/checkIsDeletable/${id}`,
      }),
      providesTags: ["MaterialOption"], // Caching tag to optimize performance
    }),

    // Endpoint for creating a new material option
    createMaterialOption: builder.mutation({
      query: (materialOption) => ({
        url: "materialOption/",
        method: "POST",
        body: materialOption,
      }),
      invalidatesTags: ["MaterialOption"], // Invalidate the 'MaterialOption' cache after mutation
    }),

    // Endpoint for updating an existing material option
    updateMaterialOption: builder.mutation({
      query: (materialOption) => ({
        url: "materialOption/",
        method: "PUT",
        body: materialOption,
      }),
      invalidatesTags: ["MaterialOption"], // Invalidate the 'MaterialOption' cache after mutation
    }),

    // Endpoint for deleting a material option
    deleteMaterialOption: builder.mutation({
      query: (id) => ({
        url: `materialOption/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MaterialOption"], // Invalidate the 'MaterialOption' cache after deletion
    }),
  }),
});

export const {
  useGetMaterialOptionsQuery,
  useGetMaterialCheckIsDeletableByIdQuery,
  useCreateMaterialOptionMutation,
  useUpdateMaterialOptionMutation,
  useDeleteMaterialOptionMutation,
} = materialOptionApi;

export const useMaterialOptionActions = () => {
  const [createMaterialOption, { isLoading: isCreating, error: createError }] =
    useCreateMaterialOptionMutation();

  const [updateMaterialOption, { isLoading: isUpdating, error: updateError }] =
    useUpdateMaterialOptionMutation();

  const [deleteMaterialOption, { isLoading: isDeleting, error: deleteError }] =
    useDeleteMaterialOptionMutation();

  const handleCreate = async (newMaterialOption) => {
    try {
      const response = await createMaterialOption(newMaterialOption).unwrap();
      return response;
    } catch (err) {
      console.error("💣 Failed to create material option:", err);
      throw err;
    }
  };

  const handleUpdate = async (updatedMaterialOption) => {
    try {
      const response = await updateMaterialOption(
        updatedMaterialOption
      ).unwrap();

      console.log("🔥🔥🔥", updatedMaterialOption);

      return response;
    } catch (err) {
      console.error("💣 Failed to update material option:", err);
      throw err;
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteMaterialOption(id).unwrap();
      return response;
    } catch (err) {
      console.error("💣 Failed to delete material option:", err);
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
