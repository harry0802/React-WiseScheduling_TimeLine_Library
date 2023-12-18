import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE } from './apiConfig';
import reduxUtils from 'utils/reduxUtils';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
    prepareHeaders: reduxUtils.prepareAuthHeaders,
  }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    me: builder.query({
      query: () => '/users/me',
      providesTags: (result, error, arg) => ['Auth'],
    }),
    changePassword: builder.mutation({
      query: (newPassword) => ({
        url: '/users/me/change-password',
        method: 'POST',
        body: { new_password: newPassword },
      }),
    }),
    
  }),
});

export const { useMeQuery, useLazyMeQuery, useChangePasswordMutation } =
  authApi;
