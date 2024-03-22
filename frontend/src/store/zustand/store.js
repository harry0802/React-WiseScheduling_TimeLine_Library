import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useMachineNoStore = create(
  persist(
    (set, get) => ({
      machineNo: 0,
      updateMachineNo: (newmachineNo) => set({ machineNo: newmachineNo }),
    }),
    {
      name: "machineNo-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

// 該機台的母批及子批清單
export const useLotStore = create(
  persist(
    (set, get) => ({
      lots: [],
      increaseLot: () =>
        set((state, newLots) => ({ lots: state.lots.append(newLots) })),
      removeAllLots: () => set({ lots: [] }),
      updateLots: (newLots) => set({ lots: newLots }),
      updateLotsByInspection: (lotName, schema, newValue) => {
        const newLots = get().lots.map((lot) => {
          // find lot's children by lotName and update the schema's value
          if (lot.lotName === lotName.split("-")[0]) {
            const newChildren = lot.children.map((child) => {
              if (child.lotName === lotName) {
                return { ...child, [schema]: newValue };
              }
              return child;
            });
            return { ...lot, children: newChildren };
          }
          return lot;
        });
        set({ lots: newLots });
      },
    }),
    {
      name: "lots-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
