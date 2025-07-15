import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useHeaderNameStore = create()(
  persist(
    (set, get) => ({
      headerName: "戰情室",
      setHeaderName: (headerName) => set({ headerName }),
      resetHeaderName: () => set({ headerName: "" }),
    }),
    {
      name: "food-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
