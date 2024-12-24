import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { timeUtils } from "../utils/timeUtils";

// 維護系統的 Header 參數
export const useMaintenanceHeaderParams = create(
  persist(
    (set) => ({
      maintenance: {
        area: "",
        machineId: "",
        moldSN: "",
        date: timeUtils.getNow(),
        week: timeUtils.getISOWeek(),
        year: timeUtils.getYear(),
      },
      updateMaintenanceHeaderParams: (newParams) =>
        set((state) => ({
          maintenance: {
            ...state.maintenance,
            ...newParams,
          },
        })),
    }),
    {
      name: "maintenance-header-params",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
