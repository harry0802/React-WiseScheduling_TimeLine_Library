import { generateColumns } from "../../utility/tableColumnGenerator";

export const getColumnDefinitions = () => {
  const columnConfig = [
    {
      title: "統計",
      children: [
        {
          title: "日期",
          dataIndex: "date",
          fixed: "left",
          width: 120,
          key: "date",
        },
        {
          title: "總隻數",
          dataIndex: "totalPigs",
          fixed: "left",
          key: "totalPigs",
        },
        {
          title: "死亡頭數",
          dataIndex: "totalDeaths",
          fixed: "left",
          key: "totalDeaths",
        },
        {
          title: "總出售",
          dataIndex: "totalSold",
          fixed: "left",
          key: "totalSold",
        },
      ],
    },
    {
      title: "種豬",
      children: [
        {
          title: "原總數",
          dataIndex: "breedingPigOriginal",
          key: "breedingPigOriginal",
        },
        { title: "移入", dataIndex: "breedingPigIn", key: "breedingPigIn" },
        { title: "移出", dataIndex: "breedingPigOut", key: "breedingPigOut" },
        {
          title: "死亡頭數",
          dataIndex: "breedingPigDeath",
          key: "breedingPigDeath",
        },
        { title: "出售", dataIndex: "breedingPigSold", key: "breedingPigSold" },
        {
          title: "剩餘總數",
          dataIndex: "breedingPigRemaining",
          key: "breedingPigRemaining",
        },
      ],
    },
    {
      title: "檢定",
      children: [
        {
          title: "原總數",
          dataIndex: "testingPigOriginal",
          key: "testingPigOriginal",
        },
        { title: "移入", dataIndex: "testingPigIn", key: "testingPigIn" },
        { title: "移出", dataIndex: "testingPigOut", key: "testingPigOut" },
        {
          title: "死亡頭數",
          dataIndex: "testingPigDeath",
          key: "testingPigDeath",
        },
        { title: "出售", dataIndex: "testingPigSold", key: "testingPigSold" },
        {
          title: "剩餘總數",
          dataIndex: "testingPigRemaining",
          key: "testingPigRemaining",
        },
      ],
    },
    {
      title: "肉豬",
      children: [
        {
          title: "原總數",
          dataIndex: "meatPigOriginal",
          key: "meatPigOriginal",
        },
        { title: "移入", dataIndex: "meatPigIn", key: "meatPigIn" },
        { title: "移出", dataIndex: "meatPigOut", key: "meatPigOut" },
        { title: "死亡頭數", dataIndex: "meatPigDeath", key: "meatPigDeath" },
        { title: "出售", dataIndex: "meatPigSold", key: "meatPigSold" },
        {
          title: "剩餘總數",
          dataIndex: "meatPigRemaining",
          key: "meatPigRemaining",
        },
      ],
    },
    {
      title: "分娩(3)",
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
          dataIndex: "farrowing3WeakBorn",
          key: "farrowing3WeakBorn",
        },
        {
          title: "仔豬死亡",
          dataIndex: "farrowing3PigletDeath",
          key: "farrowing3PigletDeath",
        },
        {
          title: "弱仔死亡",
          dataIndex: "farrowing3WeakDeath",
          key: "farrowing3WeakDeath",
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
      children: [
        {
          title: "母豬原總數",
          dataIndex: "farrowing8SowOriginal",
          key: "farrowing8SowOriginal",
        },
        {
          title: "保育豬原總數",
          dataIndex: "farrowing8NurseryOriginal",
          key: "farrowing8NurseryOriginal",
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
          dataIndex: "farrowing8WeakBorn",
          key: "farrowing8WeakBorn",
        },
        {
          title: "仔豬死亡",
          dataIndex: "farrowing8PigletDeath",
          key: "farrowing8PigletDeath",
        },
        {
          title: "弱仔死亡",
          dataIndex: "farrowing8WeakDeath",
          key: "farrowing8WeakDeath",
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
          dataIndex: "farrowing8NurseryIn",
          key: "farrowing8NurseryIn",
        },
        {
          title: "保育豬移出",
          dataIndex: "farrowing8NurseryOut",
          key: "farrowing8NurseryOut",
        },
        {
          title: "保育豬死亡",
          dataIndex: "farrowing8NurseryDeath",
          key: "farrowing8NurseryDeath",
        },
        {
          title: "剩餘仔豬總數",
          dataIndex: "farrowing8PigletRemaining",
          key: "farrowing8PigletRemaining",
        },
        {
          title: "剩餘保育豬總數",
          dataIndex: "farrowing8NurseryRemaining",
          key: "farrowing8NurseryRemaining",
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
      children: [
        {
          title: "原總數",
          dataIndex: "nurseryPigOriginal",
          key: "nurseryPigOriginal",
        },
        { title: "移入", dataIndex: "nurseryPigIn", key: "nurseryPigIn" },
        { title: "移出", dataIndex: "nurseryPigOut", key: "nurseryPigOut" },
        {
          title: "死亡頭數",
          dataIndex: "nurseryPigDeath",
          key: "nurseryPigDeath",
        },
        { title: "出售", dataIndex: "nurseryPigSold", key: "nurseryPigSold" },
        {
          title: "剩餘總數",
          dataIndex: "nurseryPigRemaining",
          key: "nurseryPigRemaining",
        },
      ],
    },
  ];

  const calculateTotalWidth = (cols) => {
    return cols.reduce((total, col) => {
      if (typeof col.width === "number") {
        return total + col.width;
      }
      if (col.children) {
        return total + calculateTotalWidth(col.children);
      }
      return total + 100; // 默認寬度
    }, 0);
  };
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
