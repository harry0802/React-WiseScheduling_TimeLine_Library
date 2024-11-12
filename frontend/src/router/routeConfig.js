import React from "react";
import AppLayout from "./AppLayout";
import { RecordAddInfoProvider } from "../components/ProductionRecord/context/RecordAddInfoProvider";
import * as LazyComponents from "./lazyComponents";
// ProductionReportPage
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
            path: "addProductInfo/:productId",
            element: (
              <React.Suspense fallback={<div> Loading... </div>}>
                <LazyComponents.QmsAddtions />
              </React.Suspense>
            ),
          },
        ],
      },
      {
        path: "FactoryQuotationManagementSystem",
        element: <LazyComponents.FactoryQuotationManagementSystem />,
        children: [
          {
            index: true,
            element: <LazyComponents.FactoryQmsHome />,
          },
          {
            path: "addProductInfo/:productId",
            element: <LazyComponents.FactoryQmsAddtions />,
          },
        ],
      },
    ],
  },
];

export default routeConfig;
