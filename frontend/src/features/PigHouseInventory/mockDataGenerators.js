import {
  flattenObject,
  generateRandomDate,
  generateRandomNumber,
} from "../../utility/dataGeneratorUtils";

const pigBreeds = ["大白豬", "杜洛克", "藍瑞斯", "漢普夏", "巴克夏", "約克夏"];
const healthStatuses = ["良好", "一般", "需要關注", "生病"];
const managers = ["張三", "李四", "王五", "趙六", "孫七"];

// * Table Cloumn 設定最小寬度與最大寬度
const pigCategories = {
  breeding: { min: 50, max: 150 },
  testing: { min: 50, max: 150 },
  meat: { min: 50, max: 150 },
  nursery: { min: 50, max: 150 },
  farrowing3: { min: 20, max: 70, includeNursery: false },
  farrowing8: { min: 20, max: 70, includeNursery: true },
};

// * 生成豬隻數據
const generatePigData = ({ min, max }) => ({
  original: generateRandomNumber(min, max),
  in: generateRandomNumber(0, 20),
  out: generateRandomNumber(0, 20),
  death: generateRandomNumber(0, 10),
  sold: generateRandomNumber(0, 20),
  remaining: generateRandomNumber(min - 20, max - 20),
});

// * 生成隨機數據
const generateFarrowingData = ({ min, max, includeNursery }) => {
  const data = {
    sow: generatePigData({ min, max }),
    piglet: {
      ...generatePigData({ min: min * 4, max: max * 4 }),
      born: generateRandomNumber(min * 2, max * 2),
      weakBorn: generateRandomNumber(0, 20),
      weakDeath: generateRandomNumber(0, 10),
    },
  };
  // ! 特殊屬性
  if (includeNursery) {
    data.nurseryPig = generatePigData({ min: min * 2, max: max * 2 });
    data.sold = generateRandomNumber(0, 100);
  }

  return data;
};

export function generateMockInventory(index) {
  // !生成豬隻數據
  const pigData = Object.entries(pigCategories).reduce((acc, [key, value]) => {
    acc[key] = key.includes("farrowing")
      ? generateFarrowingData(value)
      : generatePigData(value);
    return acc;
  }, {});

  // ! 扁平化數據
  const flattenedPigData = flattenObject(pigData);

  //* 總隻數
  const totalPigs = Object.values(pigData).reduce((sum, category) => {
    const categoryTotal =
      category.remaining ||
      (category.sow?.remaining || 0) +
        (category.piglet?.remaining || 0) +
        (category.nurseryPig?.remaining || 0);
    return sum + (isNaN(categoryTotal) ? 0 : categoryTotal);
  }, 0);

  // * 總死亡數
  const totalDeaths = Object.values(pigData).reduce((sum, category) => {
    const categoryDeaths =
      category.death ||
      (category.sow?.death || 0) +
        (category.piglet?.death || 0) +
        (category.nurseryPig?.death || 0);
    return sum + (isNaN(categoryDeaths) ? 0 : categoryDeaths);
  }, 0);

  // * 總出售數
  const totalSold = Object.values(pigData).reduce((sum, category) => {
    const categorySold =
      category.sold ||
      (category.sow?.sold || 0) +
        (category.piglet?.sold || 0) +
        (category.sold || 0);
    return sum + (isNaN(categorySold) ? 0 : categorySold);
  }, 0);

  return {
    id: `PH${String(index + 1).padStart(3, "0")}`,
    key: `${index + 1}`,
    date: generateRandomDate(),
    pigBreed: pigBreeds[generateRandomNumber(0, pigBreeds.length - 1)],
    manager: managers[generateRandomNumber(0, managers.length - 1)],
    healthStatus:
      healthStatuses[generateRandomNumber(0, healthStatuses.length - 1)],
    totalPigs,
    totalDeaths,
    totalSold,
    ...flattenedPigData,
  };
}

export function generateMockInventories(count) {
  return Array.from({ length: count }, (_, index) =>
    generateMockInventory(index)
  );
}
