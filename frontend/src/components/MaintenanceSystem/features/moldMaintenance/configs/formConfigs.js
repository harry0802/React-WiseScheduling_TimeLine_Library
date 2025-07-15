// formConfigs.js
export const COMMON_FIELDS = [
  { id: "moldClean", label: "模具清潔", type: "radio" },
  { id: "moldOil", label: "模具上油", type: "radio" },
  { id: "cavityCheck", label: "模穴外觀面檢查", type: "radio" },
  { id: "screwCheck", label: "鎖付螺絲是否鬆動", type: "radio" },
  { id: "partsCheck", label: "易損件是否老化需更換", type: "radio" },
  { id: "wireCheck", label: "線路檢查是否有壓傷、斷裂或雜亂", type: "radio" },
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
