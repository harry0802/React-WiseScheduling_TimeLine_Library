import { transformResponse } from "../../../utility/commonUtils";
import apiSlice from "../apiSlice";

export const quotationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 取得報價單列表
    getQuotations: builder.query({
      query: () => "salesQuotation/products/",
      providesTags: ["Quotation"],
    }),
    // 取得單一報價單
    getQuotationById: builder.query({
      query: (id) => `salesQuotation/${id}`,
      providesTags: (result, error, id) => [{ type: "Quotation", id }],
      transformResponse: (response, meta, arg) => {
        // 強制每次都轉換
        return transformResponse({
          ...response,
          _timestamp: Date.now(), // 加入時間戳確保每次都不同
        });
      },
    }),
    // 新增報價單
    // 需要帶入 iso 時間  "createDate": "2024-11-08T00:00:00.000+08:00"
    createQuotation: builder.mutation({
      query: (body) => ({
        url: "salesQuotation/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Quotation"],
    }),
    // 更新報價單
    updateQuotation: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `salesQuotation/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Quotation", id }],
    }),
    // 刪除報價單
    deleteQuotation: builder.mutation({
      query: (id) => ({
        url: `salesQuotation/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Quotation"],
    }),
  }),
});

export const {
  useGetQuotationsQuery,
  useGetQuotationByIdQuery,
  useCreateQuotationMutation,
  useUpdateQuotationMutation,
  useDeleteQuotationMutation,
} = quotationApi;
