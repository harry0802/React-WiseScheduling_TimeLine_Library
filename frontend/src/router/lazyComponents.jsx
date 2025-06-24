import { lazy } from "react";

// lazy 輔助函數
const lazyImport = (factory) => lazy(factory);

// Pages
export const LoginPage = lazyImport(() => import("../pages/LoginPage"));
export const ProductionSchedulePage = lazyImport(() =>
  import("../pages/ProductionSchedulePage")
);
export const ImportProductionSchedulePage = lazyImport(() =>
  import("../pages/ImportProductionSchedulePage")
);
export const MachineSelectPage = lazyImport(() =>
  import("../pages/MachineSelectPage")
);
export const ProductionReportPage = lazyImport(() =>
  import("../pages/ProductionReportPage")
);
export const LeaderSignPage = lazyImport(() =>
  import("../pages/LeaderSignPage")
);
export const ProductionDetailPage = lazyImport(() =>
  import("../pages/ProductionDetailPage")
);
export const OperatorSignPage = lazyImport(() =>
  import("../pages/OperatorSignPage")
);
export const ProductionInspectionPage = lazyImport(() =>
  import("../pages/ProductionInspectionPage")
);
export const ProductionRecordPage = lazyImport(() =>
  import("../pages/ProductionRecordPage")
);
export const QualityAssuranceSystemPage = lazyImport(() =>
  import("../pages/QualityAssuranceSystemPage")
);

// Below is the router children components area

// ProductionRecord
export const ProductionRecordHome = lazyImport(() =>
  import(
    "../components/ProductionRecord/features/ProductionRecordHome/ProductionRecordHome"
  )
);
export const ProductionRecordAddInfo = lazyImport(() =>
  import(
    "../components/ProductionRecord/features/ProductionRecordAddInfo/ProductionRecordAddInfo"
  )
);
export const ProductionRecordProcMaterials = lazyImport(() =>
  import(
    "../components/ProductionRecord/features/ProductionRecordProcMaterials/ProductionRecordProcMaterials"
  )
);
export const ProductionRecordinventoryManagement = lazyImport(() =>
  import(
    "../components/ProductionRecord/features/ProductionRecordinventoryManagement/ProductionRecordinventoryManagement"
  )
);

// QualityAssuranceSyste
export const QualityAssuranceSystemMachine = lazyImport(() =>
  import("../components/QualityManagementSystem/feature/QmsMachineSelect")
);
export const QmsUserAccessSelect = lazyImport(() =>
  import("../components/QualityManagementSystem/feature/QmsUserAccessSelect")
);
export const QmsAuthenticate = lazyImport(() =>
  import("../components/QualityManagementSystem/feature/QmsAuthenticate")
);
export const QmsProductionInspection = lazyImport(() =>
  import(
    "../components/QualityManagementSystem/feature/QmsProductionInspection/Index"
  )
);

// SalesQuotationManagementSystem
export const SalesQuotationManagementSystem = lazyImport(() =>
  import("../pages/SalesQuotationManagementSystemPage")
);
export const SalesQmsHome = lazyImport(() =>
  import("../components/QuotationManagementSystem/features/Sales/QmsHome")
);
export const SalesQmsCreate = lazyImport(() =>
  import("../components/QuotationManagementSystem/features/Sales/QmsCreate")
);
export const SalesQmsMaintain = lazyImport(() =>
  import("../components/QuotationManagementSystem/features/Sales/QmsMaintain")
);

// FactoryQuotationManagementSystem

export const FactoryQuotationManagementSystem = lazyImport(() =>
  import("../pages/FactoryQuotationManagementSystemPage")
);
export const FactoryQmsHome = lazyImport(() =>
  import(
    "../components/QuotationManagementSystemFQ/features/Factory/FactoryQmsHome"
  )
);
export const FactoryQmsCreate = lazyImport(() =>
  import(
    "../components/QuotationManagementSystemFQ/features/Factory/FactoryQmsCreate"
  )
);
export const FactoryQmsMaintain = lazyImport(() =>
  import(
    "../components/QuotationManagementSystemFQ/features/Factory/FactoryQmsMaintain"
  )
);

// MachineMaintenance
export const MachineMaintenancePage = lazyImport(() =>
  import("../pages/MachineMaintenancePage")
);
export const MoldMaintenancePage = lazyImport(() =>
  import("../pages/MoldMaintenancePage")
);

// export const QmsAddtions = lazyImport(() =>
//   import(
//     "../components/QuotationManagementSystem/features/Sales/QmsAddtionInfos"
//   )
// );

// CostWiseSystem
export const CostWiseSystem = lazyImport(() =>
  import("../components/CostWiseSystem/index")
);
export const MasterBatch = lazyImport(() =>
  import(
    "../components/CostWiseSystem/features/batchManagement/masterBatch/index"
  )
);
export const SubBatch = lazyImport(() =>
  import("../components/CostWiseSystem/features/batchManagement/subBatch/index")
);

// WiseScheduling
export const WiseSchedulingPage = lazyImport(() =>
  import("../pages/WiseSchedulingPage")
);

// TimelineGantt
export const TimelineGanttPage = lazyImport(() =>
  import("../pages/TimelineGanttPage")
);

// ManufacturingLiveMonitor 系統
export const ManufacturingLiveMonitor = lazyImport(() =>
  import("../components/ManufacturingLiveMonitor/index")
);

export const DashboardEntry = lazyImport(() =>
  import("../components/ManufacturingLiveMonitor/components/DashboardEntry/index")
);

export const LoadingWrapper = lazyImport(() =>
  import("../components/ManufacturingLiveMonitor/components/Loading/index")
);

export const RealTimeOEEMonitor = lazyImport(() =>
  import("../components/ManufacturingLiveMonitor/feature/RealTimeOEEMonitor/index")
);

export const ProductionProgressTracker = lazyImport(() =>
  import("../components/ManufacturingLiveMonitor/feature/ProductionProgressTracker/index")
);

export const DeliveryTrendAnalyzer = lazyImport(() =>
  import("../components/ManufacturingLiveMonitor/feature/DeliveryTrendAnalyzer/index")
);

export const OEEInsightSystem = lazyImport(() =>
  import("../components/ManufacturingLiveMonitor/feature/OEEInsightSystem/index")
);

export const FactoryPerformanceDashboard = lazyImport(() =>
  import("../components/ManufacturingLiveMonitor/feature/FactoryPerformanceDashboard/Index")
);
