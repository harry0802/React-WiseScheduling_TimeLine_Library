// formConfigs.js
export const COMMON_FIELDS = [
  { id: "electricBox", label: "電控箱內清潔", type: "radio" },
  { id: "heatingCircuit", label: "電熱線路", type: "radio" },
  { id: "wiringComplete", label: "線路完整度", type: "radio" },
  { id: "oilPipe", label: "曲肘打油管", type: "radio" },
  { id: "boxCleaning", label: "電控箱內清潔", type: "radio" },
  { id: "machineCleaning", label: "全機清潔保養", type: "radio" },
  { id: "safetyDoor", label: "安全門及相關安全設備", type: "radio" },
];

export const FORM_CONFIGS = {
  inspector: {
    fields: COMMON_FIELDS,
    personnel: {
      type: "text",
      label: "執行者",
    },
  },
  reinspector: {
    fields: COMMON_FIELDS,
    personnel: {
      type: "select",
      label: "複檢者",
      options: ["陳進賢", "林勝豐", "林金柱", "謝尚文"],
    },
  },
  approver: {
    fields: COMMON_FIELDS,
    personnel: {
      type: "select",
      label: "承認者",
      options: ["魏銘毅"],
    },
  },
};
