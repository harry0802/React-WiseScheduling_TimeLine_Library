import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import productionScheduleApi from "./api/productionScheduleApi";
import productionReportApi from "./api/productionReportApi";
import producRecordApiSlice from "../components/ProductionRecord/service/producRecordApiSlice.js";
const store = configureStore({
  reducer: {
    [productionScheduleApi.reducerPath]: productionScheduleApi.reducer,
    [productionReportApi.reducerPath]: productionReportApi.reducer,
    [producRecordApiSlice.reducerPath]: producRecordApiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productionScheduleApi.middleware,
      productionReportApi.middleware,
      producRecordApiSlice.middleware
    ),
});

setupListeners(store.dispatch);

export default store;
