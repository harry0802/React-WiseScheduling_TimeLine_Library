import { mockLots } from "../../../data/ProductionInspectionData";
import { createLotService } from "./lotService";

export function createQmsProductionInspectionService(updateChildLotsMutation) {
  const lotService = createLotService();

  return {
    initialLots: lotService.createLots(mockLots),

    updateLotProductionQuantity(lots, lotName, quantity) {
      return lotService.updateLotProductionQuantity(lots, lotName, quantity);
    },

    async submitLots(lots) {
      const emptyLots = lotService.getLotsWithEmptyProductionQuantity(lots);
      if (emptyLots.length > 0) {
        throw new Error("EMPTY_PRODUCTION_QUANTITY");
      }

      const childLots = lotService.prepareChildLotsForUpdate(lots);
      await updateChildLotsMutation(childLots);
    },
  };
}
