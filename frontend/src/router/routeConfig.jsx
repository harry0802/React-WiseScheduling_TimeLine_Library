import React from "react";
import AppLayout from "./AppLayout";
import * as LazyComponents from "./lazyComponents";

const routeConfig = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <LazyComponents.MachineStatusBoard /> },
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
    ],
  },
];

export default routeConfig;
