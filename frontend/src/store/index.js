import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import productionScheduleApi from "./api/productionScheduleApi";
import productionReportApi from "./api/productionReportApi";

const store = configureStore({
  reducer: {
    [productionScheduleApi.reducerPath]: productionScheduleApi.reducer,
    [productionReportApi.reducerPath]: productionReportApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productionScheduleApi.middleware,
      productionReportApi.middleware
    ),
});

setupListeners(store.dispatch);

export default store;
