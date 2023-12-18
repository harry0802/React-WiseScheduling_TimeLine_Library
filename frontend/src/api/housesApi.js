
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE } from './apiConfig';
import reduxUtils from 'utils/reduxUtils';

export const housesApi = createApi({
  reducerPath: 'housesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
    prepareHeaders: reduxUtils.prepareAuthHeaders,
  }),
  tagTypes: ['House'],
  endpoints: (builder) => ({
    getHouses: builder.query({
      query: () => `/houses`,
 
      transformResponse(baseQueryReturnValue, meta, arg) {
        return baseQueryReturnValue.data;
      },
      providesTags: (result, error, arg) => ['House'],
    }),
    getHousesDeviceById: builder.query({
      query: (id) => `/houses/${id}/devices`,
   
      transformResponse(baseQueryReturnValue, meta, arg) {
        return baseQueryReturnValue.data;
      },
      providesTags: (result, error, arg) => ['House'],
      // keepUnusedDataFor:60, // 设置数据缓存的时间，单位秒 默认60s
      keepUnusedDataFor:1, // 设置数据缓存的时间，单位秒 默认60s


    }),
    updateValues: builder.mutation({
      query: (temp) => ({
        url: `/houses/devices/${temp.id}`,
        method: 'POST',
        body: { command: temp.value },
      }),
      providesTags: (result, error, arg) => ['House'],

    }),

    // }),
  }),
});

export const { useGetHousesDeviceByIdQuery ,useGetHousesQuery,useUpdateValuesMutation} = housesApi;
