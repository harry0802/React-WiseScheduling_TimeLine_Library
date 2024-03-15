import { create } from "zustand";

export const useMachineNoStore = create((set) => ({
  machineNo: 0,
  updateMachineNo: (newmachineNo) => set({ machineNo: newmachineNo }),
}));

// 該機台的母批及子批清單
export const useLotStore = create((set) => ({
  lots: [],
  increaseLot: () =>
    set((state, newLots) => ({ lots: state.lots.append(newLots) })),
  removeAllLots: () => set({ lots: [] }),
  updateLots: (newLots) => set({ lots: newLots }),
}));
