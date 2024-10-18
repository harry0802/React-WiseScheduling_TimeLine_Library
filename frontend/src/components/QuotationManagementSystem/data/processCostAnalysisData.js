import { MACHINE_LIST, PROCESS_CATEGORY_OPTION } from "../../../config/config";
import {
  FORM_CONFIGURATIONS,
  PROCESS_TYPE_OPTIONS,
  PROCESS_TYPES,
  PROCESS_SELECTION_FORM,
  PROCESS_SUBTYPES,
} from "../../QuotationManagementSystem/config/processTypes.js";

const getRandomMachine = () => {
  return MACHINE_LIST[Math.floor(Math.random() * MACHINE_LIST.length)];
};

const getRandomSubtype = (processType) => {
  const subtypes = PROCESS_SUBTYPES[processType];
  return subtypes && subtypes.length > 0
    ? subtypes[Math.floor(Math.random() * subtypes.length)].key
    : "";
};

export const mockProcessCostAnalysisData = [
  {
    id: "1",
    processType: PROCESS_TYPES.TRANSPORTATION.key,
    processSubtype: getRandomSubtype(PROCESS_TYPES.TRANSPORTATION.key),
    transportType: "貨車",
    distance: 100,
    time: 2,
    returnDistance: 80,
    quantity: 1000,
    customsQuantity: 1000,
    freightCost: 5000,
    processCategory: PROCESS_CATEGORY_OPTION[1].category,
  },
  {
    id: "2",
    processType: PROCESS_TYPES.APPEARANCE_INSPECTION.key,
    processSubtype: getRandomSubtype(PROCESS_TYPES.APPEARANCE_INSPECTION.key),
    preInspectionRate: 5,
    preInspectionLossRate: 2,
    inspectionFee: 1000,
    processingFee: 2000,
    processCategory: PROCESS_CATEGORY_OPTION[4].category,
    machine: getRandomMachine(),
    materials: [
      {
        type: "主要材料",
        code: "M001",
        name: "布料A",
        weight: 100,
        unit: "kg",
        unitPrice: 50,
        amount: 5000,
      },
      {
        type: "輔助材料",
        code: "M002",
        name: "染料B",
        weight: 10,
        unit: "kg",
        unitPrice: 100,
        amount: 1000,
      },
    ],
  },
  {
    id: "3",
    processType: PROCESS_TYPES.INTERNAL_APPEARANCE_REPAIR.key,
    processSubtype: getRandomSubtype(
      PROCESS_TYPES.INTERNAL_APPEARANCE_REPAIR.key
    ),
    preInspectionRate: 3,
    preInspectionLossRate: 1,
    inspectionFee: 800,
    processingFee: 3000,
    processCategory: PROCESS_CATEGORY_OPTION[0].category,
    machine: getRandomMachine(),
  },
  {
    id: "4",
    processType: PROCESS_TYPES.INTERNAL_SHIPPING_INSPECTION.key,
    processSubtype: getRandomSubtype(
      PROCESS_TYPES.INTERNAL_SHIPPING_INSPECTION.key
    ),
    preInspectionRate: 2,
    preInspectionLossRate: 0.5,
    inspectionFee: 600,
    processingFee: 2500,
    processCategory: PROCESS_CATEGORY_OPTION[2].category,
    machine: getRandomMachine(),
  },
];
