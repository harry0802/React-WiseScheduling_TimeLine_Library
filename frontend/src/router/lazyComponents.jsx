import { lazy } from "react";

// lazy 輔助函數
const lazyImport = (factory) => lazy(factory);

// WiseScheduling - 重構後的獨立頁面
export const MachineStatusBoard = lazyImport(() =>
  import("../pages/MachineStatusBoard")
);
export const SmartScheduling = lazyImport(() =>
  import("../pages/SmartScheduling")
);
