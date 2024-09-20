import { createLot } from "./Lot";

export function createLotService() {
  return {
    // Creates multiple lots from the given data
    createLots(lotsData) {
      return lotsData.map(createLot);
    },

    // Updates the inspection quantity of a specific lot
    updateLotInspectionQuantity(lots, lotName, quantity) {
      const lot = lots.find((l) => l.getLastChild().lotName === lotName);
      if (lot) {
        lot.updateLastChildInspectionQuantity(quantity);
      } else {
        console.error("Lot not found");
      }
      return lots;
    },
    updateLotGoodQuantity(lots, lotName, quantity) {
      const lot = lots.find((l) => l.getLastChild().lotName === lotName);
      if (lot) {
        lot.updateLastChildGoodQuantity(quantity);
      } else {
        console.error("Lot not found");
      }
      return lots;
    },

    // Filters lots with empty production quantity
    getLotsWithEmptyProductionQuantity(lots) {
      return lots.filter((lot) => lot.hasEmptyProductionQuantity());
    },

    // Prepares child lots for update by extracting relevant information
    prepareChildLotsForUpdate(lots) {
      return lots.map((lot) => {
        const lastChild = lot.getLastChild();
        return {
          ...lastChild,
          id: lastChild.id || lastChild.productionReport_id,
        };
      });
    },
  };
}
