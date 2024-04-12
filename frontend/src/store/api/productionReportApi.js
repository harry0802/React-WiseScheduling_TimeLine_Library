import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { API_BASE } from "./apiConfig";

const productionReportApi = createApi({
  reducerPath: "productionReportApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
  }),
  tagTypes: ["productionReport"],
  endpoints(build) {
    return {
      getProductionReport: build.query({
        query(arg) {
          const {
            machineSN,
            start_planOnMachineDate,
            end_planOnMachineDate,
            status,
            expiry,
            workOrderSN,
            productName,
            motherOnly,
            productionSchedule_ids,
          } = arg;
          return {
            url: "productionReport/",
            params: {
              machineSN: machineSN,
              start_planOnMachineDate: start_planOnMachineDate,
              end_planOnMachineDate: end_planOnMachineDate,
              status: status,
              expiry: expiry,
              workOrderSN: workOrderSN,
              productName: productName,
              motherOnly: motherOnly,
              productionSchedule_ids: productionSchedule_ids,
            },
          };
        },
        transformResponse(baseQueryReturnValue, meta, arg) {
          return baseQueryReturnValue.data;
        },
        keepUnusedDataFor: 60 * 30, // set cache time to half hour if the query paramaters are the same
        providesTags: [{ type: "productionReport" }],
      }),
      addMotherLots: build.mutation({
        query(data) {
          return {
            url: "productionReport/motherLot",
            method: "post",
            body: data,
          };
        },
        invalidatesTags: [{ type: "productionReport" }],
      }),
      addChildLots: build.mutation({
        query(data) {
          return {
            url: "productionReport/childLot",
            method: "post",
            body: data,
          };
        },
        invalidatesTags: [{ type: "productionReport" }],
      }),
      updateMotherLots: build.mutation({
        query(data) {
          return {
            url: "productionReport/motherLot",
            method: "put",
            body: data,
          };
        },
        invalidatesTags: [{ type: "productionReport" }],
      }),
      delProductionReport: build.mutation({
        query(ids) {
          return {
            url: `productionReport/${ids}`,
            method: "delete",
          };
        },
        providesTags: [{ type: "productionReport" }],
      }),
      pauseStaus: build.mutation({
        query(ids) {
          return {
            url: `productionReport/${ids}`,
            method: "put",
            body: { status: "暫停生產" },
          };
        },
        invalidatesTags: (result, error, ids) => [
          { type: "productionReport", id: ids.status },
        ],
      }),
      actionStaus: build.mutation({
        query(ids) {
          return {
            url: `productionReport/${ids}`,
            method: "put",
            body: { status: "On-going" },
          };
        },
        invalidatesTags: (result, error, ids) => [
          { type: "productionReport", id: ids.status },
        ],
      }),
      cancelStaus: build.mutation({
        query(ids) {
          return {
            url: `productionReport/${ids}`,
            method: "put",
            body: { status: "取消生產" },
          };
        },
        invalidatesTags: (result, error, ids) => [
          { type: "productionReport", id: ids.status },
        ],
      }),
      updateProductionReport: build.mutation({
        query(pack) {
          return {
            url: `productionReport/${pack.id}`,
            method: "put",
            body: pack.data,
          };
        },
        invalidatesTags: (result, error) => [{ type: "productionReport" }],
      }),
    };
  },
});

export const {
  useGetProductionReportQuery,
  useAddMotherLotsMutation,
  useAddChildLotsMutation,
  useUpdateMotherLotsMutation,
  useDelProductionReportMutation,
  usePauseStausMutation,
  useCancelStausMutation,
  useActionStausMutation,
  useUpdateProductionReportMutation,
} = productionReportApi;

export default productionReportApi;
