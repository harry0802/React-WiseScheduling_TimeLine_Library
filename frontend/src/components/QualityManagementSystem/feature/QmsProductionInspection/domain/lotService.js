import { createLot } from "./Lot";

export function createLotService() {
  return {
    createLots(lotsData) {
      return lotsData.map(createLot);
    },

    updateLotProductionQuantity(lots, lotName, quantity) {
      const lot = lots.find((l) => l.getLastChild().lotName === lotName);
      if (lot) {
        lot.updateLastChildProductionQuantity(quantity);
      }
      return lots;
    },

    getLotsWithEmptyProductionQuantity(lots) {
      return lots.filter((lot) => lot.hasEmptyProductionQuantity());
    },

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
