import React from "react";
import AppLayout from "./AppLayout";
import { RecordAddInfoProvider } from "../components/ProductionRecord/context/RecordAddInfoProvider";
import * as LazyComponents from "./lazyComponents";
import LoadingWrapper from "../components/ManufacturingLiveMonitor/components/Loading";

// 直接 import ManufacturingLiveMonitor 相關組件（非 lazy）
import ManufacturingLiveMonitor from "../components/ManufacturingLiveMonitor";
import DashboardEntry from "../components/ManufacturingLiveMonitor/components/DashboardEntry";
import FactoryPerformanceDashboard from "../components/ManufacturingLiveMonitor/feature/FactoryPerformanceDashboard/Index";
import RealTimeOEEMonitor from "../components/ManufacturingLiveMonitor/feature/RealTimeOEEMonitor";
import ProductionProgressTracker from "../components/ManufacturingLiveMonitor/feature/ProductionProgressTracker";
import DeliveryTrendAnalyzer from "../components/ManufacturingLiveMonitor/feature/DeliveryTrendAnalyzer";
import OEEInsightSystem from "../components/ManufacturingLiveMonitor/feature/OEEInsightSystem";

const routeConfig = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <LazyComponents.LoginPage /> },
      {
        path: "ProductionSchedulePage",
        element: <LazyComponents.ProductionSchedulePage />,
      },
      {
        path: "ImportProductionSchedulePage",
        element: <LazyComponents.ImportProductionSchedulePage />,
      },
      {
        path: "MachineSelectPage",
        element: <LazyComponents.MachineSelectPage />,
      },
      {
        path: "ProductionReportPage",
        element: <LazyComponents.ProductionReportPage />,
      },
      { path: "LeaderSignPage", element: <LazyComponents.LeaderSignPage /> },
      {
        path: "ProductionDetailPage",
        element: <LazyComponents.ProductionDetailPage />,
      },
      {
        path: "OperatorSignPage",
        element: <LazyComponents.OperatorSignPage />,
      },
      {
        path: "ProductionInspectionPage",
        element: <LazyComponents.ProductionInspectionPage />,
      },
      // 機台狀態操作面板
      {
        path: "MachineStatusBoard",
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <LazyComponents.MachineStatusBoard />
          </React.Suspense>
        ),
      },
      // 智慧排程
      {
        path: "SmartScheduling",
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <LazyComponents.SmartScheduling />
          </React.Suspense>
        ),
      },
      // 添加 TimelineGantt 路由
      {
        path: "TimelineGanttPage",
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <LazyComponents.TimelineGanttPage />
          </React.Suspense>
        ),
      },
      {
        path: "QualityManagementSystem",
        element: <LazyComponents.QualityAssuranceSystemPage />,
        children: [
          {
            index: true,
            element: <LazyComponents.QualityAssuranceSystemMachine />,
          },
          {
            path: ":machineSN",
            element: <LazyComponents.QmsUserAccessSelect />,
          },
          {
            path: ":machineSN/:userType",
            element: <LazyComponents.QmsAuthenticate />,
          },
          {
            path: ":machineSN/:userType/dashboard",
            element: <LazyComponents.QmsProductionInspection />,
          },
        ],
      },
      {
        path: "ProductionRecordPage",
        element: <LazyComponents.ProductionRecordPage />,
        children: [
          { index: true, element: <LazyComponents.ProductionRecordHome /> },
          {
            path: "addProductInfo/:productId",
            element: (
              <RecordAddInfoProvider>
                <React.Suspense fallback={<div> Loading... </div>}>
                  <LazyComponents.ProductionRecordAddInfo />
                </React.Suspense>
              </RecordAddInfoProvider>
            ),
          },
          {
            path: "procMaterials",
            element: <LazyComponents.ProductionRecordProcMaterials />,
          },
          {
            path: "inventoryManagement",
            element: <LazyComponents.ProductionRecordinventoryManagement />,
          },
        ],
      },
      // SalesQuotationManagementSystem
      {
        path: "SalesQuotationManagementSystem",
        element: <LazyComponents.SalesQuotationManagementSystem />,
        children: [
          {
            index: true,
            replace: true,
            element: <LazyComponents.SalesQmsHome />,
          },
          {
            path: "create/:productId",
            element: (
              <React.Suspense fallback={<div>Loading...</div>}>
                <LazyComponents.SalesQmsCreate mode="create" />
              </React.Suspense>
            ),
          },
          {
            path: "edit/:productId",
            element: (
              <React.Suspense fallback={<div>Loading...</div>}>
                <LazyComponents.SalesQmsMaintain mode="edit" />
              </React.Suspense>
            ),
          },
        ],
      },
      // FactoryQuotationManagementSystem
      {
        path: "FactoryQuotationManagementSystem",
        element: <LazyComponents.FactoryQuotationManagementSystem />,
        children: [
          {
            index: true,
            replace: true,
            element: <LazyComponents.FactoryQmsHome />,
          },
          {
            path: "create/:productId",
            element: (
              <React.Suspense fallback={<div> Loading... </div>}>
                <LazyComponents.FactoryQmsCreate mode="create" />
              </React.Suspense>
            ),
          },
          {
            path: "edit/:productId",
            element: (
              <React.Suspense fallback={<div> Loading... </div>}>
                <LazyComponents.FactoryQmsMaintain mode="edit" />
              </React.Suspense>
            ),
          },
        ],
      },
      {
        path: "CostWiseSystemPage",
        element: <LazyComponents.CostWiseSystem />,
        children: [
          {
            index: true,
            replace: true,
            element: <LazyComponents.MasterBatch />,
          },
          {
            path: "subBatch/:productionScheduleId",
            element: <LazyComponents.SubBatch />,
          },
        ],
      },
      // MachineMaintenance
      {
        path: "MachineMaintenance",
        element: <LazyComponents.MachineMaintenancePage />,
      },
      {
        path: "MoldMaintenance",
        element: <LazyComponents.MoldMaintenancePage />,
      },
    ],
  },
  // 🏭 ManufacturingLiveMonitor 獨立路由區塊 - 隔離的全屏系統
  {
    element: <ManufacturingLiveMonitor />,
    children: [
      {
        index: true,
        path: "ManufacturingLiveMonitor",
        element: <DashboardEntry />,
      },
      {
        path: "FactoryPerformanceDashboard",
        element: (
          <React.Suspense
            fallback={
              <LoadingWrapper>載入製造現場即時監控中...</LoadingWrapper>
            }
          >
            <FactoryPerformanceDashboard />
          </React.Suspense>
        ),
      },
      {
        path: "RealTimeOEEMonitor",
        element: (
          <React.Suspense
            fallback={
              <LoadingWrapper>載入製造現場即時監控中...</LoadingWrapper>
            }
          >
            <RealTimeOEEMonitor />
          </React.Suspense>
        ),
      },
      {
        path: "ProductionProgressTracker",
        element: (
          <React.Suspense
            fallback={
              <LoadingWrapper>載入製造現場即時監控中...</LoadingWrapper>
            }
          >
            <ProductionProgressTracker />
          </React.Suspense>
        ),
      },
      {
        path: "DeliveryTrendAnalyzer",
        element: (
          <React.Suspense
            fallback={
              <LoadingWrapper>載入製造現場即時監控中...</LoadingWrapper>
            }
          >
            <DeliveryTrendAnalyzer />
          </React.Suspense>
        ),
      },
      {
        path: "OEEInsightSystem",
        element: (
          <React.Suspense
            fallback={
              <LoadingWrapper>載入製造現場即時監控中...</LoadingWrapper>
            }
          >
            <OEEInsightSystem />
          </React.Suspense>
        ),
      },
    ],
  },
];

export default routeConfig;
