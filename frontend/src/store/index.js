import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import productionScheduleApi from "./api/productionScheduleApi";
import productionReportApi from "./api/productionReportApi";
import producRecordApiSlice from "../components/ProductionRecord/service/producRecordApiSlice.js";
import qmsApiSlice from "../components/QualityManagementSystem/service/qmsApiSlice.js";
import salesQuotationApiSlice from "../components/QuotationManagementSystem/services/apiSlice.ts";
const store = configureStore({
  reducer: {
    [productionScheduleApi.reducerPath]: productionScheduleApi.reducer,
    [productionReportApi.reducerPath]: productionReportApi.reducer,
    [producRecordApiSlice.reducerPath]: producRecordApiSlice.reducer,
    [qmsApiSlice.reducerPath]: qmsApiSlice.reducer,
    [salesQuotationApiSlice.reducerPath]: salesQuotationApiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productionScheduleApi.middleware,
      productionReportApi.middleware,
      producRecordApiSlice.middleware,
      qmsApiSlice.middleware,
      salesQuotationApiSlice.middleware
    ),
});

setupListeners(store.dispatch);

export default store;
