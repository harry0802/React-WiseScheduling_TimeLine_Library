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
                        body: { status: "暫停運作中" }
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
                        body: { status: "正常運作中" }
                    };
                },
                invalidatesTags: ((result, error, ids) =>
                    [{ type: 'productionSchedule', id: ids.status }])
            }),
            updateProductionSchedule: build.mutation({
                query(id) {
                    return {
                        url: `productionSchedule/${id}`,
                        method: 'put',
                        body: { data }
                    };
                },
                invalidatesTags: ((result, error, id) =>
                    [{ type: 'productionSchedule', }])
            }),



        };
    }
});

export const {
    useGetProductionScheduleQuery,
    useAddProductionScheduleMutation,
    useDelProductionScheduleMutation,
    usePauseStausMutation,
    useActionStausMutation,
    useUpdateProductionScheduleMutation
} = productionScheduleApi;

export default productionScheduleApi;
