import { mockLots } from "../../../data/ProductionInspectionData";
import { createLotService } from "./lotService";

// Create QMS Production Inspection Service
export function createQmsProductionInspectionService(updateChildLotsMutation) {
  const lotService = createLotService();

  return {
    // Initialize lots using mock data
    initialLots: lotService.createLots(mockLots),

    // * prepare lots from api
    // async getInitialLots() {
    //   const apiLots = await fetchInitialLotsApi();
    //   return lotService.createLots(apiLots);
    // },

    // Update production quantity for a specific lot
    updateLotInspectionQuantity(lots, lotName, quantity) {
      return lotService.updateLotInspectionQuantity(lots, lotName, quantity);
    },
    updateLotGoodQuantity(lots, lotName, quantity) {
      return lotService.updateLotGoodQuantity(lots, lotName, quantity);
    },

    // Submit lots for processing
    async submitLots(lots) {
      // Check for lots with empty production quantity
      const emptyLots = lotService.getLotsWithEmptyProductionQuantity(lots);

      if (emptyLots.length > 0) {
        throw new Error("EMPTY_PRODUCTION_QUANTITY");
      }

      // Prepare child lots data and update
      const childLots = lotService.prepareChildLotsForUpdate(lots);
      await updateChildLotsMutation(childLots);
    },
  };
}
