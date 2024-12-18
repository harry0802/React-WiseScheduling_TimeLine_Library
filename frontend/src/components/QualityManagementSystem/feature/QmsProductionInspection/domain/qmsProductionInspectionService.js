import { formatInspectionDataForApi } from "../utils/format";
import { createLotService } from "./lotService";

// Create QMS Production Inspection Service
export function createQmsProductionInspectionService(updateChildLotsMutation) {
  const lotService = createLotService();

  return {
    // Initialize lots using external data
    initialLots: (lotsData) => lotService.createLots(lotsData),

    // Update production quantity for a specific lot
    updateLotInspectionQuantity(lots, lotId, quantity) {
      return lotService.updateLotInspectionQuantity(lots, lotId, quantity);
    },
    updateLotGoodQuantity(lots, lotId, quantity) {
      return lotService.updateLotGoodQuantity(lots, lotId, quantity);
    },

    // Submit lots for processing
    async submitLots(lots, inspectionType, inspect) {
      try {
        // Check for lots with empty production quantity
        const emptyLots = lotService.getLotsWithEmptyProductionQuantity(lots);
        if (emptyLots.length > 0) {
          throw new Error("EMPTY_PRODUCTION_QUANTITY");
        }

        // Prepare child lots data and update
        const childLots = lotService.prepareChildLotsForUpdate(lots);
        const apiData = formatInspectionDataForApi(
          childLots,
          inspectionType,
          inspect
        );
        const result = await updateChildLotsMutation(apiData);
        return result;
      } catch (error) {
        console.error("💣 Error submitting lots:", error);
        throw error;
      }
    },
  };
}
