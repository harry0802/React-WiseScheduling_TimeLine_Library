import { configureStore } from '@reduxjs/toolkit';

import postsReducer from 'features/posts/postsSlice';
import authReducer from 'api/authSlice';
import { authApi } from 'api/authApi';
import { deviceApi } from 'api/deviceApi';
import { housesApi } from 'api/housesApi';
import {setupListeners} from "@reduxjs/toolkit/query";


const store = configureStore ({
  
  reducer: {
    posts: postsReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [deviceApi.reducerPath]: deviceApi.reducer,
    [housesApi.reducerPath]: housesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authApi.middleware, deviceApi.middleware,housesApi.middleware]),
});
setupListeners(store.dispatch); // 设置以后，将会支持 refetchOnFocus refetchOnReconnect
export default store