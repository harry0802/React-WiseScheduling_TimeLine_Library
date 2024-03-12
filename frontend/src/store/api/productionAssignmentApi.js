import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { API_BASE } from './apiConfig';


const productionAssignmentApi = createApi({
    reducerPath: 'productionAssignmentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE
    }),
    tagTypes: ['productionAssignment'],
    endpoints(build) {
        return {
            getProductionAssignment: build.query({
                query(arg) {
                    const { week_filter, year_filter, month_filter,status_filter } = arg;
                    return {
                        url: 'productionAssignment/',
                        params: {
                            'week_filter': week_filter,
                            'year_filter': year_filter,
                            'month_filter': month_filter,
                            'status_filter':status_filter
                        }
                    };
                },
                transformResponse(baseQueryReturnValue, meta, arg) {
                    return baseQueryReturnValue;
                },

                providesTags: [{ type: 'productionAssignment' }]
            }),
            addProductionAssignment: build.mutation({
                query(data) {
                    return {
                        url: 'productionAssignment/',
                        method: 'post',
                        body: data
                    };
                },
                invalidatesTags: [{ type: 'productionAssignment' }]
            }),
            delProductionAssignment: build.mutation({
                query(ids) {
                    return {
                        url: `productionAssignment/${ids}`,
                        method: 'delete'
                    };
                }, providesTags: [{ type: 'productionAssignment' }]

            }),
            pauseStaus: build.mutation({
                query(ids) {
                    return {
                        url: `productionAssignment/${ids}`,
                        method: 'put',
                        body: { status: "暫停生產" }
                    };
                },
                invalidatesTags: ((result, error, ids) =>
                    [{ type: 'productionAssignment', id: ids.status }])
            }),
            actionStaus: build.mutation({
                query(ids) {
                    return {
                        url: `productionAssignment/${ids}`,
                        method: 'put',
                        body: { status: "On-going" }
                    };
                },
                invalidatesTags: ((result, error, ids) =>
                    [{ type: 'productionAssignment', id: ids.status }])
            }),
            cancelStaus: build.mutation({
                query(ids) {
                    return {
                        url: `productionAssignment/${ids}`,
                        method: 'put',
                        body: { status: "取消生產" }
                    };
                },
                invalidatesTags: ((result, error, ids) =>
                    [{ type: 'productionAssignment', id: ids.status }])
            }),
            updateProductionAssignment: build.mutation({
                query(pack) {
                    return {
                        url: `productionAssignment/${pack.id}`,
                        method: 'put',
                        body: pack.data
                    };
                },
                invalidatesTags: ((result, error) =>
                    [{ type: 'productionAssignment' }])
            }),



        };
    }
});

export const {
    useGetProductionAssignmentQuery,
    useAddProductionAssignmentMutation,
    useDelProductionAssignmentMutation,
    usePauseStausMutation,
    useCancelStausMutation,
    useActionStausMutation,
    useUpdateProductionAssignmentMutation
} = productionAssignmentApi;

export default productionAssignmentApi;
