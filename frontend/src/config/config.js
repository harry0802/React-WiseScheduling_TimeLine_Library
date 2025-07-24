// get user's timezone
export const TZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
// 凌越ERP
export const REACT_APP_LY_ERP_ON =
  process.env.REACT_APP_LY_ERP_ON === "true" ? true : false;
console.log("🚀 ~   process.env:", process.env);
console.log("🚀 ~ REACT_APP_LY_ERP_ON:", REACT_APP_LY_ERP_ON);

export const PRODUCTION_AREA = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
  { value: "D", label: "D" },
];

// machine list
export const MACHINE_LIST = [
  { productionArea: "A", machineSN: "A1", singleOrDoubleColor: "雙" },
  { productionArea: "A", machineSN: "A2", singleOrDoubleColor: "單" },
  { productionArea: "A", machineSN: "A3", singleOrDoubleColor: "單" },
  { productionArea: "A", machineSN: "A4", singleOrDoubleColor: "單" },
  { productionArea: "A", machineSN: "A5", singleOrDoubleColor: "單" },
  { productionArea: "A", machineSN: "A6", singleOrDoubleColor: "單" },
  { productionArea: "A", machineSN: "A7", singleOrDoubleColor: "單" },
  { productionArea: "A", machineSN: "A8", singleOrDoubleColor: "單" },
  { productionArea: "A", machineSN: "A9", singleOrDoubleColor: "單" },
  { productionArea: "A", machineSN: "A10", singleOrDoubleColor: "單" },
  { productionArea: "B", machineSN: "B1", singleOrDoubleColor: "單" },
  { productionArea: "B", machineSN: "B2", singleOrDoubleColor: "雙" },
  { productionArea: "B", machineSN: "B3", singleOrDoubleColor: "雙" },
  { productionArea: "B", machineSN: "B4", singleOrDoubleColor: "雙" },
  { productionArea: "B", machineSN: "B5", singleOrDoubleColor: "雙" },
  { productionArea: "B", machineSN: "B6", singleOrDoubleColor: "雙" },
  { productionArea: "B", machineSN: "B7", singleOrDoubleColor: "雙" },
  { productionArea: "B", machineSN: "B8", singleOrDoubleColor: "雙" },
  { productionArea: "B", machineSN: "B9", singleOrDoubleColor: "雙" },
  { productionArea: "B", machineSN: "B10", singleOrDoubleColor: "雙" },
  { productionArea: "B", machineSN: "B11", singleOrDoubleColor: "單" },
  { productionArea: "C", machineSN: "C1", singleOrDoubleColor: "雙" },
  { productionArea: "C", machineSN: "C2", singleOrDoubleColor: "單" },
  { productionArea: "C", machineSN: "C3", singleOrDoubleColor: "單" },
  { productionArea: "C", machineSN: "C4", singleOrDoubleColor: "單" },
  { productionArea: "C", machineSN: "C5", singleOrDoubleColor: "單" },
  { productionArea: "C", machineSN: "C6", singleOrDoubleColor: "單" },
  { productionArea: "C", machineSN: "C7", singleOrDoubleColor: "單" },
  { productionArea: "C", machineSN: "C8", singleOrDoubleColor: "單" },
  { productionArea: "C", machineSN: "C9", singleOrDoubleColor: "單" },
  { productionArea: "D", machineSN: "D1", singleOrDoubleColor: "單" },
  { productionArea: "D", machineSN: "D2", singleOrDoubleColor: "單" },
  { productionArea: "D", machineSN: "D3", singleOrDoubleColor: "單" },
  { productionArea: "D", machineSN: "D4", singleOrDoubleColor: "單" },
  { productionArea: "D", machineSN: "D5", singleOrDoubleColor: "單" },
  { productionArea: "D", machineSN: "D6", singleOrDoubleColor: "單" },
  { productionArea: "D", machineSN: "D7", singleOrDoubleColor: "單" },
  { productionArea: "D", machineSN: "D8", singleOrDoubleColor: "單" },
  { productionArea: "D", machineSN: "D9", singleOrDoubleColor: "單" },
];

export const PROCESS_CATEGORY_OPTION = [
  {
    category: "In-IJ(廠內成型)",
  },
  {
    category: "Out-IJ(委外成型)",
  },
  {
    category: "In-BE(廠內後製程)",
  },
  {
    category: "Out-BE(委外後製程)",
  },
  {
    category: "In-TS(廠內出貨檢驗)",
  },
];

export const MACHINE_CONFIG = {
  areas: PRODUCTION_AREA,
  machines: MACHINE_LIST.map((machine) => ({
    id: machine.machineSN,
    value: machine.machineSN,
    label: `${machine.machineSN} (${machine.singleOrDoubleColor})`,
    area: machine.productionArea,
    colorType: machine.singleOrDoubleColor,
  })),
};

// 輔助函數
export const getMachinesByArea = (area) => {
  return MACHINE_CONFIG.machines
    .filter((machine) => machine.area === area)
    .map((machine) => ({
      value: machine.value,
      label: machine.label,
    }));
};

export const getMachineColorType = (machineId) => {
  const machine = MACHINE_CONFIG.machines.find((m) => m.value === machineId);
  return machine?.colorType || null;
};
