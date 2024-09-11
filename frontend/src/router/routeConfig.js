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
      {
        path: "QualityManagementSystem",
        element: <LazyComponents.QualityAssuranceSystemPage />,
        children: [
          {
            index: true,
            element: <LazyComponents.QualityAssuranceSystemMachine />,
          },
          {
            path: "QmsUserAccessSelect",
            element: <LazyComponents.QmsUserAccessSelect />,
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
                <React.Suspense fallback={<div>Loading...</div>}>
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
    ],
  },
];

export default routeConfig;
