import {
  generateRandomDate,
  generateRandomNumber,
} from "../../utility/dataGeneratorUtils";

const buildings = ["5", "6", "7", "8"];
const columns = ["16", "25", "34", "43"];
const breeds = ["YL", "KD2", "LL", "DD"];
const earTagPrefixes = ["465-6", "510-13", "755-3", "620-7"];
const boarUsedPrefixes = ["D1173", "D1174", "D1175", "D1176"];
const reasons = ["死亡", "生產效率低", "年齡過大", "健康問題", "遺傳缺陷"];

function generateEarTag(breed, prefix) {
  return `${breed} ${prefix}-${String(generateRandomNumber(1, 999)).padStart(
    3,
    "0"
  )}`;
}

export function generateMockCullingBoar(index) {
  const breed = breeds[generateRandomNumber(0, breeds.length - 1)];
  const earTagPrefix =
    earTagPrefixes[generateRandomNumber(0, earTagPrefixes.length - 1)];
  const boarUsedPrefix =
    boarUsedPrefixes[generateRandomNumber(0, boarUsedPrefixes.length - 1)];

  return {
    id: `CB${String(index + 1).padStart(3, "0")}`,
    key: `${index + 1}`,
    building: buildings[generateRandomNumber(0, buildings.length - 1)],
    column: columns[generateRandomNumber(0, columns.length - 1)],
    breed: breed,
    ear_tag: generateEarTag(breed, earTagPrefix),
    birth_date: generateRandomDate(),
    boar_used: `${boarUsedPrefix}`,
    mating_date: generateRandomDate(),
    farrowing_date: generateRandomDate(),
    reason: reasons[generateRandomNumber(0, reasons.length - 1)],
    departure_date: generateRandomDate(),
  };
}

export function generateMockCullingBoars(count) {
  return Array.from({ length: count }, (_, index) =>
    generateMockCullingBoar(index)
  );
}
