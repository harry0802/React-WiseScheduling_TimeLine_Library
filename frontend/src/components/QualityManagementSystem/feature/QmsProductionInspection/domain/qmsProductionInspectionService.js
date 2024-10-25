import { formatInspectionDataForApi } from "../utils/format";
import { createLotService } from "./lotService";

// Create QMS Production Inspection Service
export function createQmsProductionInspectionService(updateChildLotsMutation) {
  const lotService = createLotService();

  return {
    // Initialize lots using external data
    initialLots: (lotsData) => {
      if (Array.isArray(lotsData)) {
        return lotService.createLots(lotsData);
      } else if (typeof lotsData === "object") {
        return lotService.createLots([lotsData]);
      } else {
        console.error("Invalid lotsData format");
        return [];
      }
    },

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
        // 检查所有批次是否都有生产数量
        const emptyLots = lots.filter((lot) =>
          lotService.hasEmptyProductionQuantity(lot)
        );
        if (emptyLots.length > 0) {
          console.error("Empty production quantity found:", emptyLots);
          throw new Error("EMPTY_PRODUCTION_QUANTITY");
        }

        // 准备所有批次的子批次数据
        const allChildLots = lots.flatMap((lot) =>
          lotService.prepareChildLotsForUpdate(lot)
        );
        console.log("Prepared child lots:", allChildLots);

        // 格式化所有批次的数据
        const apiData = formatInspectionDataForApi(
          allChildLots,
          inspectionType,
          inspect
        );

        // 提交所有批次的数据
        const result = await updateChildLotsMutation(apiData);

        return result;
      } catch (error) {
        console.error("💣 Error submitting lots:", error);
        throw error;
      }
    },
  };
}
