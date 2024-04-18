import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useMachineSNStore = create(
  persist(
    (set, get) => ({
      // machineSN_Store: 0,
      updateMachineSN: (newmachineSN_Store) =>
        set({ machineSN_Store: newmachineSN_Store }),
    }),
    {
      name: "machineSN", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export const useProductionScheduleIdsStore = create(
  persist(
    (set, get) => ({
      updateProductionScheduleIds: (productionScheduleIdsStore) =>
        set({ productionScheduleIdsStore: productionScheduleIdsStore }),
    }),
    {
      name: "psIds", // name of the item in the storage (must be unique)
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
          if (lot.lotName === lotName?.split("-")[0]) {
            const updatedChildren = lot.children.map((child) => {
              var totalDefectiveQuantity = 0;
              if (child.lotName === lotName) {
                totalDefectiveQuantity =
                  child.colorDifference +
                  child.deformation +
                  child.shrinkage +
                  child.shortage +
                  child.hole +
                  child.bubble +
                  child.impurity +
                  child.pressure +
                  child.overflow +
                  child.flowMark +
                  child.oilStain +
                  child.burr +
                  child.blackSpot +
                  child.scratch +
                  child.encapsulation +
                  child.other -
                  child[schema] +
                  newValue;
                return {
                  ...child,
                  [schema]: newValue,
                  defectiveQuantity: totalDefectiveQuantity,
                };
              }
              return child;
            });
            return { ...lot, children: updatedChildren };
          }
          return lot;
        });
        set({ lots: newLots });
      },
      updateLotsByProductionQuantity: (lotName, newValue) => {
        const newLots = get().lots.map((lot) => {
          if (lot.lotName === lotName?.split("-")[0]) {
            const updatedChildren = lot.children.map((child) => {
              if (child.lotName === lotName) {
                return {
                  ...child,
                  productionQuantity: Number(newValue),
                };
              }
              return child;
            });
            return { ...lot, children: updatedChildren };
          }
          return lot;
        });
        set({ lots: newLots });
      },
    }),
    {
      name: "lots", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
