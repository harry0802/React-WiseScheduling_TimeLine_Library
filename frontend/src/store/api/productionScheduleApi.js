import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { API_BASE } from './apiConfig';


const productionScheduleApi = createApi({
    reducerPath: 'productionScheduleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE
    }),
    tagTypes: ['productionSchedule'],
    endpoints(build) {
        return {
            getProductionSchedule: build.query({
                query(arg) {
                    const { size, page, week_filter } = arg;
                    return {
                        url: 'productionSchedule',
                        params: { 'size': size, 'page': page, 'week_filter': week_filter }
                    };
                },
                transformResponse(baseQueryReturnValue, meta, arg) {
                    return baseQueryReturnValue;
                },

                providesTags: [{ type: 'productionSchedule' }]
            }),
            addProductionSchedule: build.mutation({
                query(data) {
                    return {
                        url: 'productionSchedule/',
                        method: 'post',
                        body: data
                    };
                },
                invalidatesTags: [{ type: 'productionSchedule' }]
            }),
            delProductionSchedule: build.mutation({
                query(ids) {
                    return {
                        url: `productionSchedule/${ids}`,
                        method: 'delete'
                    };
                }, providesTags: [{ type: 'productionSchedule' }]

            }),
            pauseStaus: build.mutation({
                query(ids) {
                    return {
                        url: `productionSchedule/${ids}`,
                        method: 'put',
                        body: { status: "暫停生產" }
                    };
                },
                invalidatesTags: ((result, error, ids) =>
                    [{ type: 'productionSchedule', id: ids.status }])
            }),
            actionStaus: build.mutation({
                query(ids) {
                    return {
                        url: `productionSchedule/${ids}`,
                        method: 'put',
                        body: { status: "On-going" }
                    };
                },
                invalidatesTags: ((result, error, ids) =>
                    [{ type: 'productionSchedule', id: ids.status }])
            }),
            cancelStaus: build.mutation({
                query(ids) {
                    return {
                        url: `productionSchedule/${ids}`,
                        method: 'put',
                        body: { status: "取消生產" }
                    };
                },
                invalidatesTags: ((result, error, ids) =>
                    [{ type: 'productionSchedule', id: ids.status }])
            }),
            updateProductionSchedule: build.mutation({
                query(pack) {
                    return {
                        url: `productionSchedule/${pack.id}`,
                        method: 'put',
                        body: pack.data
                    };
                },
                invalidatesTags: ((result, error) =>
                    [{ type: 'productionSchedule' }])
            }),



        };
    }
});

export const {
    useGetProductionScheduleQuery,
    useAddProductionScheduleMutation,
    useDelProductionScheduleMutation,
    usePauseStausMutation,
    useCancelStausMutation,
    useActionStausMutation,
    useUpdateProductionScheduleMutation
} = productionScheduleApi;

export default productionScheduleApi;
