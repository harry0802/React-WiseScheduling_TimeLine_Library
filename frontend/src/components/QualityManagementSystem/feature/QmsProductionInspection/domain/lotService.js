import { createLot } from "./Lot";

export function createLotService() {
  return {
    // Creates multiple lots from the given data
    createLots(lotsData) {
      return lotsData.map(createLot);
    },

    // Updates the inspection quantity of a specific lot
    updateLotInspectionQuantity(lots, lotId, quantity) {
      const lot = lots.find((l) => l.id === lotId);
      if (lot) {
        lot.updateLastChildInspectionQuantity(quantity);
      } else {
        console.error(`Lot with id ${lotId} not found`);
      }
      return lots;
    },

    // Updates the good quantity of a specific lot
    updateLotGoodQuantity(lots, lotId, quantity) {
      const lot = lots.find((l) => l.id === lotId);
      if (lot) {
        lot.updateLastChildGoodQuantity(quantity);
      } else {
        console.error(`Lot with id ${lotId} not found`);
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

    hasEmptyProductionQuantity(lot) {
      return (
        !lot.inspectionQuantity ||
        lot.inspectionQuantity === "" ||
        !lot.goodQuantity ||
        lot.goodQuantity === ""
      );
    },

    prepareChildLotsForUpdate(lot) {
      console.log("Preparing child lots for update:", lot);
      return lot.children.map((child) => ({
        id: child.id,
        inspectionQuantity: lot.inspectionQuantity,
        goodQuantity: lot.goodQuantity,
        // 添加其他需要的字段
      }));
    },
  };
}
