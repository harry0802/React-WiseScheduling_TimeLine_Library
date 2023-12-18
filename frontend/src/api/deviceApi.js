import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE } from './apiConfig';
import reduxUtils from 'utils/reduxUtils';

export const deviceApi = createApi({
  reducerPath: 'deviceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
    prepareHeaders: reduxUtils.prepareAuthHeaders,
  }),
  tagTypes: ['Device'],
  endpoints: (builder) => ({
    getDevices: builder.query({
      query: () => '/devices',
      transformResponse: (response) => {
        const devices = response?.data.devices || [];
        const mapping = devices.reduce((acc, current) => {
          acc[`${current.order}`] = current;

          return acc;
        }, {});

        return { ...response, mapping };
      },
      providesTags: (result, error, arg) => ['Device'],
    }),
    controlDevice: builder.mutation({
      query: (arg) => ({
        url: `/devices/${arg.deviceId}`,
        method: 'POST',
        body: { command: arg.command },
      }),
    }),
  }),
});

export const { useGetDevicesQuery, useControlDeviceMutation } = deviceApi;
