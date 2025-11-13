import dayjs from "dayjs";
import { generateColumns } from "../../../utility/tableColumnGenerator";
import { sortDate, sortNumber } from "../../../utility/sortUtils";
import { calculateTotalWidth } from "../../../utility/calculateTotalWidth";

export const getColumnDefinitions = () => {
  const columnConfig = [
    {
      title: "統計",
      dataIndex: "statistics",
      key: "statistics",
      children: [
        {
          title: "日期",
          dataIndex: "date",
          fixed: "left",
          width: 120,
          key: "date",
          sorter: (a, b) => sortDate(a.date, b.date),
        },
        {
          title: "總隻數",
          dataIndex: "totalPigs",
          fixed: "left",
          key: "totalPigs",
          sorter: (a, b) => sortNumber(a.totalPigs, b.totalPigs),
        },
        {
          title: "死亡頭數",
          dataIndex: "totalDeaths",
          fixed: "left",
          key: "totalDeaths",
          sorter: (a, b) => sortNumber(a.totalDeaths, b.totalDeaths),
        },
        {
          title: "總出售",
          dataIndex: "totalSold",
          fixed: "left",
          key: "totalSold",
          sorter: (a, b) => sortNumber(a.totalSold, b.totalSold),
        },
      ],
    },
    {
      title: "種豬",
      dataIndex: "breedingPigs",
      key: "breedingPigs",
      children: [
        {
          title: "原總數",
          dataIndex: "breedingOriginal",
          key: "breedingOriginal",
        },
        { title: "移入", dataIndex: "breedingIn", key: "breedingIn" },
        { title: "移出", dataIndex: "breedingOut", key: "breedingOut" },
        {
          title: "死亡頭數",
          dataIndex: "breedingDeath",
          key: "breedingDeath",
        },
        { title: "出售", dataIndex: "breedingSold", key: "breedingSold" },
        {
          title: "剩餘總數",
          dataIndex: "breedingRemaining",
          key: "breedingRemaining",
        },
      ],
    },
    {
      title: "檢定",
      dataIndex: "testing",
      key: "testing",
      children: [
        {
          title: "原總數",
          dataIndex: "testingOriginal",
          key: "testingOriginal",
        },
        { title: "移入", dataIndex: "testingIn", key: "testingIn" },
        { title: "移出", dataIndex: "testingOut", key: "testingOut" },
        {
          title: "死亡頭數",
          dataIndex: "testingDeath",
          key: "testingDeath",
        },
        { title: "出售", dataIndex: "testingSold", key: "testingSold" },
        {
          title: "剩餘總數",
          dataIndex: "testingRemaining",
          key: "testingRemaining",
        },
      ],
    },
    {
      title: "肉豬",
      dataIndex: "meatPigs",
      key: "meatPigs",
      children: [
        {
          title: "原總數",
          dataIndex: "meatOriginal",
          key: "meatOriginal",
        },
        { title: "移入", dataIndex: "meatIn", key: "meatIn" },
        { title: "移出", dataIndex: "meatOut", key: "meatOut" },
        { title: "死亡頭數", dataIndex: "meatDeath", key: "meatDeath" },
        { title: "出售", dataIndex: "meatSold", key: "meatSold" },
        {
          title: "剩餘總數",
          dataIndex: "meatRemaining",
          key: "meatRemaining",
        },
      ],
    },
    {
      title: "分娩(3)",
      dataIndex: "farrowing3",
      key: "farrowing3",
      children: [
        {
          title: "母豬原總數",
          dataIndex: "farrowing3SowOriginal",
          key: "farrowing3SowOriginal",
        },
        {
          title: "仔豬原總數",
          dataIndex: "farrowing3PigletOriginal",
          key: "farrowing3PigletOriginal",
        },
        {
          title: "仔豬出生",
          dataIndex: "farrowing3PigletBorn",
          key: "farrowing3PigletBorn",
        },
        {
          title: "出生弱仔",
          dataIndex: "farrowing3PigletWeakBorn",
          key: "farrowing3PigletWeakBorn",
        },
        {
          title: "仔豬死亡",
          dataIndex: "farrowing3PigletDeath",
          key: "farrowing3PigletDeath",
        },
        {
          title: "弱仔死亡",
          dataIndex: "farrowing3PigletWeakDeath",
          key: "farrowing3PigletWeakDeath",
        },
        {
          title: "母豬死亡",
          dataIndex: "farrowing3SowDeath",
          key: "farrowing3SowDeath",
        },
        {
          title: "母豬移入",
          dataIndex: "farrowing3SowIn",
          key: "farrowing3SowIn",
        },
        {
          title: "母豬移出",
          dataIndex: "farrowing3SowOut",
          key: "farrowing3SowOut",
        },
        {
          title: "仔豬移入",
          dataIndex: "farrowing3PigletIn",
          key: "farrowing3PigletIn",
        },
        {
          title: "仔豬移出",
          dataIndex: "farrowing3PigletOut",
          key: "farrowing3PigletOut",
        },
        {
          title: "母豬出售",
          dataIndex: "farrowing3SowSold",
          key: "farrowing3SowSold",
        },
        {
          title: "仔豬出售",
          dataIndex: "farrowing3PigletSold",
          key: "farrowing3PigletSold",
        },
        {
          title: "剩餘仔豬總數",
          dataIndex: "farrowing3PigletRemaining",
          key: "farrowing3PigletRemaining",
        },
        {
          title: "剩餘母豬",
          dataIndex: "farrowing3SowRemaining",
          key: "farrowing3SowRemaining",
        },
      ],
    },
    {
      title: "分娩(8)",
      dataIndex: "farrowing8",
      key: "farrowing8",
      children: [
        {
          title: "母豬原總數",
          dataIndex: "farrowing8SowOriginal",
          key: "farrowing8SowOriginal",
        },
        {
          title: "保育豬原總數",
          dataIndex: "farrowing8NurseryPigOriginal",
          key: "farrowing8NurseryPigOriginal",
        },
        {
          title: "仔豬原總數",
          dataIndex: "farrowing8PigletOriginal",
          key: "farrowing8PigletOriginal",
        },
        {
          title: "仔豬出生",
          dataIndex: "farrowing8PigletBorn",
          key: "farrowing8PigletBorn",
        },
        {
          title: "出生弱仔",
          dataIndex: "farrowing8PigletWeakBorn",
          key: "farrowing8PigletWeakBorn",
        },
        {
          title: "仔豬死亡",
          dataIndex: "farrowing8PigletDeath",
          key: "farrowing8PigletDeath",
        },
        {
          title: "弱仔死亡",
          dataIndex: "farrowing8PigletWeakDeath",
          key: "farrowing8PigletWeakDeath",
        },
        {
          title: "母豬移入",
          dataIndex: "farrowing8SowIn",
          key: "farrowing8SowIn",
        },
        {
          title: "母豬移出",
          dataIndex: "farrowing8SowOut",
          key: "farrowing8SowOut",
        },
        {
          title: "母豬死亡",
          dataIndex: "farrowing8SowDeath",
          key: "farrowing8SowDeath",
        },
        {
          title: "仔豬移入",
          dataIndex: "farrowing8PigletIn",
          key: "farrowing8PigletIn",
        },
        {
          title: "仔豬移出",
          dataIndex: "farrowing8PigletOut",
          key: "farrowing8PigletOut",
        },
        { title: "出售", dataIndex: "farrowing8Sold", key: "farrowing8Sold" },
        {
          title: "保育豬移入",
          dataIndex: "farrowing8NurseryPigIn",
          key: "farrowing8NurseryPigIn",
        },
        {
          title: "保育豬移出",
          dataIndex: "farrowing8NurseryPigOut",
          key: "farrowing8NurseryPigOut",
        },
        {
          title: "保育豬死亡",
          dataIndex: "farrowing8NurseryPigDeath",
          key: "farrowing8NurseryPigDeath",
        },
        {
          title: "剩餘仔豬總數",
          dataIndex: "farrowing8PigletRemaining",
          key: "farrowing8PigletRemaining",
        },
        {
          title: "剩餘保育豬總數",
          dataIndex: "farrowing8NurseryPigRemaining",
          key: "farrowing8NurseryPigRemaining",
        },
        {
          title: "剩餘母豬",
          dataIndex: "farrowing8SowRemaining",
          key: "farrowing8SowRemaining",
        },
      ],
    },
    {
      title: "保育",
      dataIndex: "nursery",
      key: "nursery",
      children: [
        {
          title: "原總數",
          dataIndex: "nurseryOriginal",
          key: "nurseryOriginal",
        },
        { title: "移入", dataIndex: "nurseryIn", key: "nurseryIn" },
        { title: "移出", dataIndex: "nurseryOut", key: "nurseryOut" },
        {
          title: "死亡頭數",
          dataIndex: "nurseryDeath",
          key: "nurseryDeath",
        },
        { title: "出售", dataIndex: "nurserySold", key: "nurserySold" },
        {
          title: "剩餘總數",
          dataIndex: "nurseryRemaining",
          key: "nurseryRemaining",
        },
      ],
    },
  ];

  // 計算寬度
  const generateColumnss = generateColumns(columnConfig, {
    setWidthForChars: 3,
    defaultWidth: 120,
  });

  const totalWidth = calculateTotalWidth(generateColumnss);

  return {
    columnConfig: generateColumnss,
    totalWidth,
  };
};
