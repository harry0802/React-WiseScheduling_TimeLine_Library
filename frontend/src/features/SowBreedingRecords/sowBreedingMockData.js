import {
  generateRandomDate,
  generateRandomNumber,
} from "../../utility/dataGeneratorUtils";

// 將所有選項定義為一個對象
const OPTIONS = {
  bloodSample: ["是", "否"],
  batch: ["A", "B", "C", "D", "E"],
  building: ["A棟", "B棟", "C棟", "D棟"],
  column: ["1", "2", "3", "4", "5"],
  variety: ["大白豬", "杜洛克", "藍瑞斯", "漢普夏"],
  pregnancyResult: ["陽性", "陰性", "待確認"],
  boolean: ["是", "否"],
  genotype: ["AA", "AB", "BB", "CC"],
  coatColorGene: ["白", "黑", "花"],
};

function generateRandomItem(index) {
  const getRandomOption = (optionKey) =>
    OPTIONS[optionKey][generateRandomNumber(0, OPTIONS[optionKey].length - 1)];

  return {
    id: `SB${String(index + 1).padStart(3, "0")}`,
    blood_sample: getRandomOption("bloodSample"),
    batch: getRandomOption("batch"),
    parity: generateRandomNumber(1, 10),
    building: getRandomOption("building"),
    column: getRandomOption("column"),
    variety: getRandomOption("variety"),
    ear_tag: `ET${generateRandomNumber(1000, 9999)}`,
    birthday: generateRandomDate(),
    sire: `S${generateRandomNumber(100, 999)}`,
    breeding_date: generateRandomDate(),
    due_date: generateRandomDate(),
    weaning_date: generateRandomDate(),
    to_delivery_shed_date: generateRandomDate(),
    breeding_three_week_date: generateRandomDate(),
    pregnancy_test_date_1: generateRandomDate(),
    pregnancy_result_1: getRandomOption("pregnancyResult"),
    pregnancy_test_date_2: generateRandomDate(),
    pregnancy_result_2: getRandomOption("pregnancyResult"),
    dual_infection: getRandomOption("boolean"),
    AR: getRandomOption("boolean"),
    PR: getRandomOption("boolean"),
    E_coli: getRandomOption("boolean"),
    PRRS: getRandomOption("boolean"),
    harmful_removal: getRandomOption("boolean"),
    genotype: getRandomOption("genotype"),
    coat_color_gene: getRandomOption("coatColorGene"),
    sire_info: `父畜${generateRandomNumber(100, 999)}`,
    dam_info: `母畜${generateRandomNumber(100, 999)}`,
    notes: `備註${generateRandomNumber(1, 100)}`,
  };
}

export function generateMockSowBreedingRecords(count) {
  return Array.from({ length: count }, (_, index) => generateRandomItem(index));
}
