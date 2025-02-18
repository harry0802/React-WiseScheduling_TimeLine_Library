import React from "react";
import AppLayout from "./AppLayout";
import { RecordAddInfoProvider } from "../components/ProductionRecord/context/RecordAddInfoProvider";
import * as LazyComponents from "./lazyComponents";

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
      // 添加 WiseScheduling 路由
      {
        path: "WiseSchedulingPage",
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <LazyComponents.WiseSchedulingPage />
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
];

export default routeConfig;
