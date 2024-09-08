const pigBreeds = ["大白豬", "杜洛克", "藍瑞斯", "漢普夏", "巴克夏", "約克夏"];
const healthStatuses = ["良好", "一般", "需要關注", "生病"];
const managers = ["張三", "李四", "王五", "趙六", "孫七"];

const generateRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generateRandomDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - generateRandomNumber(0, 365));
  return date.toISOString().split("T")[0];
};

const pigCategories = {
  breeding: { min: 50, max: 150 },
  testing: { min: 50, max: 150 },
  meat: { min: 50, max: 150 },
  nursery: { min: 50, max: 150 },
  farrowing3: { min: 20, max: 70, includeNursery: false },
  farrowing8: { min: 20, max: 70, includeNursery: true },
};

const generatePigData = ({ min, max }) => ({
  original: generateRandomNumber(min, max),
  in: generateRandomNumber(0, 20),
  out: generateRandomNumber(0, 20),
  death: generateRandomNumber(0, 10),
  sold: generateRandomNumber(0, 20),
  remaining: generateRandomNumber(min - 20, max - 20),
});

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

  if (includeNursery) {
    data.nurseryPig = generatePigData({ min: min * 2, max: max * 2 });
    data.sold = generateRandomNumber(0, 100);
  }

  return data;
};

const flattenObject = (obj, prefix = "") =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length
      ? `${prefix}${k.charAt(0).toUpperCase() + k.slice(1)}`
      : k;
    if (
      typeof obj[k] === "object" &&
      obj[k] !== null &&
      !Array.isArray(obj[k])
    ) {
      Object.assign(acc, flattenObject(obj[k], pre));
    } else {
      acc[pre] = obj[k];
    }
    return acc;
  }, {});

export const generateMockInventory = (index) => {
  const pigData = Object.entries(pigCategories).reduce((acc, [key, value]) => {
    acc[key] = key.includes("farrowing")
      ? generateFarrowingData(value)
      : generatePigData(value);
    return acc;
  }, {});

  const flattenedPigData = flattenObject(pigData);

  const totalPigs = Object.values(pigData).reduce(
    (sum, category) =>
      sum +
      (category.remaining ||
        category.sow?.remaining +
          category.piglet?.remaining +
          (category.nurseryPig?.remaining || 0)),
    0
  );

  const totalDeaths = Object.values(pigData).reduce(
    (sum, category) =>
      sum +
      (category.death ||
        category.sow?.death +
          category.piglet?.death +
          (category.nurseryPig?.death || 0)),
    0
  );

  const totalSold = Object.values(pigData).reduce(
    (sum, category) =>
      sum +
      (category.sold ||
        category.sow?.sold + category.piglet?.sold + (category.sold || 0)),
    0
  );

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
};

export const generateMockInventories = (count) =>
  Array.from({ length: count }, (_, index) => generateMockInventory(index));
