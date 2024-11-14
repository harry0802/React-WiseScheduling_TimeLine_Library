// store/types.ts
// 客戶
export interface Customer {
  name: string;
}

// 機台
export interface Machine {
  id: number;
  productionArea: string;
  machineSN: string;
  singleOrDoubleColor?: string;
  tonnage?: string;
  moldTrialCost?: number;
  electricityCostPerSec?: number;
}

// 材料單位
export interface MaterialUnit {
  id: number;
  name: string;
  schema: string;
}

// 包裝單位
export interface PackagingUnit {
  id: number;
  name: string;
  schema: string;
}

// 報價基本資料
export interface QuotationBasic {
  id: number;
  quotationSN: string;
  createDate: string;
  customerName: string | null;
  productName: string | null;
  overheadRnd: number | null;
  profit: number | null;
  risk: number | null;
  annualDiscount: number | null;
  rebate: number | null;
  actualQuotation: number | null;
}

// 材料成本
export interface MaterialCost {
  id?: number;
  materialOptionId: number;
  materialSN: string;
  materialName: string;
  unit: string;
  weight: number;
  unitPrice: number;
  amount: number;
}

// 包裝成本
export interface PackagingCost {
  id?: number;
  packagingType: string;
  materialSN: string;
  materialName: string;
  unit: string;
  quantity: number;
  capacity: number;
  bagsPerKg: number;
  unitPrice: number;
  amount: number;
}

// 注塑成型成本
export interface InjectionMoldingCost {
  id?: number;
  machineId: number;
  workHoursRatio: number;
  defectiveRate: number;
  cycleTime: number;
  packageTime: number;
  moldCavity: number;
  unitPrice: number;
  amount: number;
  subtotal: number;
  electricityCost: number;
}

// 製程成本
export interface ProcessCost {
  id?: number;
  workSecond?: number;
  unitPrice: number;
  amount: number;
}

// 製程
export interface Process {
  id?: number;
  processOptionId: number;
  SQMaterialCostSetting: {
    id?: number;
    estimatedDefectRate: number;
    estimatedMaterialFluctuation: number;
    extractionCost: number;
    processingCost: number;
  };
  SQMaterialCosts: MaterialCost[];
  SQPackagingCosts: PackagingCost[];
  SQInjectionMoldingCosts?: InjectionMoldingCost[];
  SQInPostProcessingCosts?: ProcessCost[];
  SQOutPostProcessingCosts?: ProcessCost[];
}
// 運費
export interface Freight {
  id?: number;
  deliveryDistance: number;
  driverWorkHours: number;
  fuelCostPerKM: number;
  estimatedShipment: number;
  amount: number;
}

// 關稅
export interface CustomsDuty {
  id?: number;
  feeType: string;
  freight: number;
  estimatedShipment: number;
  amount: number;
}

// 運費
export interface Shipping {
  SQFreights: Freight[];
  SQCustomsDuties: CustomsDuty[];
}

// 報價回應
export interface QuotationResponse extends QuotationBasic {
  processes?: Process[];
  shipping?: Shipping;
}

// 報價請求
export interface CreateQuotationRequest {
  createDate: string;
}

// 更新報價請求
export interface UpdateQuotationRequest extends Partial<QuotationBasic> {
  id: number;
}

// 製程請求
export type ProcessRequest = Process;
// 運費請求
export type ShippingRequest = Shipping;
