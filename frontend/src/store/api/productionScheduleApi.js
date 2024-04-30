import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API_BASE } from "./apiConfig";
import { WORKORDER_STATUS } from "../../config/enum";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { TZ } from "../../config/config";
dayjs.extend(utc);
dayjs.extend(timezone);

const productionScheduleApi = createApi({
  reducerPath: "productionScheduleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
  }),
  tagTypes: ["productionSchedule"],
  endpoints(build) {
    return {
      getProductionSchedule: build.query({
        query(arg) {
          const {
            size,
            page,
            start_planOnMachineDate,
            end_planOnMachineDate,
            status,
            expiry,
            workOrderSN,
            productName,
          } = arg;
          return {
            url: "productionSchedule/",
            params: {
              size: size,
              page: page,
              start_planOnMachineDate: start_planOnMachineDate,
              end_planOnMachineDate: end_planOnMachineDate,
              status: status,
              expiry: expiry,
              workOrderSN: workOrderSN,
              productName: productName,
            },
          };
        },
        transformResponse(baseQueryReturnValue, meta, arg) {
          return baseQueryReturnValue;
        },

        providesTags: [{ type: "productionSchedule" }],
      }),
      getProductionScheduleByMachines: build.query({
        query(arg) {
          const { machineSNs, status } = arg;
          return {
            url: "productionSchedule/",
            params: {
              machineSNs: machineSNs,
              status: status,
            },
          };
        },
        transformResponse(baseQueryReturnValue, meta, arg) {
          return baseQueryReturnValue.data;
        },

        providesTags: [{ type: "productionSchedule" }],
      }),
      getMachines: build.query({
        query: () => `/productionSchedule/machineSN`,

        transformResponse(baseQueryReturnValue, meta, arg) {
          return baseQueryReturnValue.data;
        },
        providesTags: [{ type: "productionSchedule" }],
      }),
      addProductionSchedule: build.mutation({
        query(data) {
          return {
            url: "productionSchedule/",
            method: "post",
            body: data,
          };
        },
        invalidatesTags: [{ type: "productionSchedule" }],
      }),
      addProductionSchedules: build.mutation({
        query(data) {
          return {
            url: "productionSchedule/createProductionSchedules",
            method: "post",
            body: data,
          };
        },
        invalidatesTags: [{ type: "productionSchedules" }],
      }),
      delProductionSchedule: build.mutation({
        query(ids) {
          return {
            url: `productionSchedule/${ids}`,
            method: "delete",
          };
        },
        providesTags: [{ type: "productionSchedule" }],
      }),
      pauseStaus: build.mutation({
        query(ids) {
          return {
            url: `productionSchedule/${ids}`,
            method: "put",
            body: { status: WORKORDER_STATUS.PAUSE },
          };
        },
        invalidatesTags: (result, error, ids) => [
          { type: "productionSchedule", id: ids.status },
        ],
      }),
      actionStaus: build.mutation({
        query(ids) {
          return {
            url: `productionSchedule/${ids}`,
            method: "put",
            body: {
              status: WORKORDER_STATUS.ON_GOING,
            },
          };
        },
        invalidatesTags: (result, error, ids) => [
          { type: "productionSchedule", id: ids.status },
        ],
      }),
      doneStaus: build.mutation({
        query(ids) {
          return {
            url: `productionSchedule/${ids}`,
            method: "put",
            body: {
              status: WORKORDER_STATUS.DONE,
              actualFinishDate: dayjs.tz(new Date(), TZ).format(),
            },
          };
        },
        invalidatesTags: (result, error, ids) => [
          { type: "productionSchedule", id: ids.status },
        ],
      }),
      cancelStaus: build.mutation({
        query(ids) {
          return {
            url: `productionSchedule/${ids}`,
            method: "put",
            body: { status: WORKORDER_STATUS.CANCEL },
          };
        },
        invalidatesTags: (result, error, ids) => [
          { type: "productionSchedule", id: ids.status },
        ],
      }),
      updateProductionSchedule: build.mutation({
        query(pack) {
          return {
            url: `productionSchedule/${pack.id}`,
            method: "put",
            body: pack.data,
          };
        },
        invalidatesTags: (result, error) => [{ type: "productionSchedule" }],
      }),
      updateProductionSchedules: build.mutation({
        query(pack) {
          return {
            url: `productionSchedule/${pack.ids}`,
            method: "put",
            body: pack.data,
          };
        },
        invalidatesTags: (result, error) => [{ type: "productionSchedule" }],
      }),
    };
  },
});

export const {
  useGetProductionScheduleQuery,
  useGetProductionScheduleByMachinesQuery,
  useGetMachinesQuery,
  useAddProductionScheduleMutation,
  useAddProductionSchedulesMutation,
  useDelProductionScheduleMutation,
  usePauseStausMutation,
  useCancelStausMutation,
  useActionStausMutation,
  useDoneStausMutation,
  useUpdateProductionScheduleMutation,
  useUpdateProductionSchedulesMutation,
} = productionScheduleApi;

export default productionScheduleApi;
