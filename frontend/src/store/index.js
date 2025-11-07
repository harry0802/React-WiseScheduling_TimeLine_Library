import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import wiseSchedulingApiSlice from "../components/WiseScheduling/services/apiSlice";

const store = configureStore({
  reducer: {
    [wiseSchedulingApiSlice.reducerPath]: wiseSchedulingApiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      wiseSchedulingApiSlice.middleware,
    ),
});

setupListeners(store.dispatch);

export default store;
