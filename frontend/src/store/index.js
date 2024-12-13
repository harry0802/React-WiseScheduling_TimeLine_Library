import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import productionScheduleApi from "./api/productionScheduleApi";
import productionReportApi from "./api/productionReportApi";
import producRecordApiSlice from "../components/ProductionRecord/service/producRecordApiSlice.js";
import qmsApiSlice from "../components/QualityManagementSystem/service/qmsApiSlice.js";
import salesQuotationApiSlice from "../components/QuotationManagementSystem/services/salesServices/apiSlice.js";
import factoryQuotationApiSlice from "../components/QuotationManagementSystemFQ/services/factoryServices/apiSlice.js";
const store = configureStore({
  reducer: {
    [productionScheduleApi.reducerPath]: productionScheduleApi.reducer,
    [productionReportApi.reducerPath]: productionReportApi.reducer,
    [producRecordApiSlice.reducerPath]: producRecordApiSlice.reducer,
    [qmsApiSlice.reducerPath]: qmsApiSlice.reducer,
    [salesQuotationApiSlice.reducerPath]: salesQuotationApiSlice.reducer,
    [factoryQuotationApiSlice.reducerPath]: factoryQuotationApiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productionScheduleApi.middleware,
      productionReportApi.middleware,
      producRecordApiSlice.middleware,
      qmsApiSlice.middleware,
      salesQuotationApiSlice.middleware,
      factoryQuotationApiSlice.middleware
    ),
});

setupListeners(store.dispatch);

export default store;
