import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { initialState, createHomeActions } from "../hook/useQmsHome";

// 工廠報價系統首頁
export const useFactoryHomeSlice = create(
  persist(
    (set, get) => ({
      ...initialState,
      pageStatus: "工廠報價管理系統",
      ...createHomeActions(set, get),
    }),
    {
      name: "factory-home-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// 業務報價系統首頁
export const useSalesHomeSlice = create(
  persist(
    (set, get) => ({
      ...initialState,
      pageStatus: "業務報價管理系統",
      ...createHomeActions(set, get),
    }),
    {
      name: "sales-home-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
