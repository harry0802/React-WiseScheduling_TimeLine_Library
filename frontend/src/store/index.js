import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import productionScheduleApi from "./api/productionScheduleApi";
import productionReportApi from "./api/productionReportApi";
import producRecordApiSlice from "../components/ProductionRecord/service/producRecordApiSlice.js";
import qmsApiSlice from "../components/QualityManagementSystem/service/qmsApiSlice.js";
import salesQuotationApiSlice from "../components/QuotationManagementSystem/services/salesServices/apiSlice.js";
import factoryQuotationApiSlice from "../components/QuotationManagementSystemFQ/services/factoryServices/apiSlice.js";
import maintenanceApi from "../components/MaintenanceSystem/features/machineMaintenance/services/maintenanceApi.js";
import moldMaintenanceApi from "../components/MaintenanceSystem/features/moldMaintenance/services/moldMaintenanceApi.js";
import productionCostApi from "../components/CostWiseSystem/service/ReceiptApi";
import wiseSchedulingApiSlice from "../components/WiseScheduling/services/apiSlice";
import { manufacturingApiSlice } from "../components/ManufacturingLiveMonitor/services";
import { realTimeMonitorApi } from "../components/ManufacturingLiveMonitor/services/endpoints/realTimeMonitorApi";
import { productionProgressApi } from "../components/ManufacturingLiveMonitor/services/endpoints/productionProgressApi";
import { oeeInsightApi } from "../components/ManufacturingLiveMonitor/services/endpoints/oeeInsightApi";

const store = configureStore({
  reducer: {
    [productionScheduleApi.reducerPath]: productionScheduleApi.reducer,
    [productionReportApi.reducerPath]: productionReportApi.reducer,
    [producRecordApiSlice.reducerPath]: producRecordApiSlice.reducer,
    [qmsApiSlice.reducerPath]: qmsApiSlice.reducer,
    [salesQuotationApiSlice.reducerPath]: salesQuotationApiSlice.reducer,
    [factoryQuotationApiSlice.reducerPath]: factoryQuotationApiSlice.reducer,
    [maintenanceApi.reducerPath]: maintenanceApi.reducer,
    [moldMaintenanceApi.reducerPath]: moldMaintenanceApi.reducer,
    [productionCostApi.reducerPath]: productionCostApi.reducer,
    [wiseSchedulingApiSlice.reducerPath]: wiseSchedulingApiSlice.reducer,
    [manufacturingApiSlice.reducerPath]: manufacturingApiSlice.reducer,
    [realTimeMonitorApi.reducerPath]: realTimeMonitorApi.reducer,
    [productionProgressApi.reducerPath]: productionProgressApi.reducer,
    [oeeInsightApi.reducerPath]: oeeInsightApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productionScheduleApi.middleware,
      productionReportApi.middleware,
      producRecordApiSlice.middleware,
      qmsApiSlice.middleware,
      salesQuotationApiSlice.middleware,
      factoryQuotationApiSlice.middleware,
      maintenanceApi.middleware,
      moldMaintenanceApi.middleware,
      productionCostApi.middleware,
      wiseSchedulingApiSlice.middleware,
      manufacturingApiSlice.middleware,
      realTimeMonitorApi.middleware,
      productionProgressApi.middleware,
      oeeInsightApi.middleware
    ),
});

setupListeners(store.dispatch);

export default store;
