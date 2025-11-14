import { generateColumns } from "../../../utility/tableColumnGenerator";
import { sortDate, sortNumber } from "../../../utility/sortUtils";
import { calculateTotalWidth } from "../../../utility/calculateTotalWidth";
/*
{
    "blood_sample": "PR採血",
    "batch": "批次",
    "parity": "產次",
    "building": "棟舍",
    "column": "欄位",
    "variety": "品種",
    "ear_tag": "耳號",
    "birthday": "生日",
    "sire": "配種公豬",
    "breeding_date": "配種日期",
    "due_date": "預產期",
    "weaning_date": "離乳日期",
    "to_delivery_shed_date": "至分娩舍日期",
    "breeding_three_week_date": "配種三週日期",
    "pregnancy_test_date_1": "測孕日期(1)",
    "pregnancy_result_1": "測孕結果(1)",
    "pregnancy_test_date_2": "測孕日期(2)",
    "pregnancy_result_2": "測孕結果(2)",
    "dual_infection": "雙毒（小病毒/丹毒）",
    "AR": "AR",
    "PR": "PR",
    "E_coli": "E.coli",
    "PRRS": "PRRS",
    "harmful_removal": "害獲滅",
    "genotype": "基因型",
    "coat_color_gene": "毛色基因",
    "sire_info": "父畜",
    "dam_info": "母畜",
    "notes": "備註"
}

*/
export const getColumnDefinitions = () => {
  const columnConfig = [
    {
      title: "血液檢測",
      dataIndex: "blood_sample",
      key: "blood_sample",
      fixed: "left",
      width: 80,
    },
    {
      title: "批次",
      dataIndex: "batch",
      key: "batch",
      sorter: (a, b) => sortNumber(a.batch, b.batch),
      fixed: "left",
      width: 70,
    },
    {
      title: "產次",
      dataIndex: "parity",
      key: "parity",
      sorter: (a, b) => sortNumber(a.parity, b.parity),
      fixed: "left",
      width: 70,
    },
    {
      title: "棟舍",
      dataIndex: "building",
      key: "building",
      fixed: "left",
      width: 60,
    },
    {
      title: "欄位",
      dataIndex: "column",
      key: "column",
      fixed: "left",
      width: 60,
    },
    {
      title: "品種",
      dataIndex: "variety",
      key: "variety",
      fixed: "left",
      width: 85,
    },
    {
      title: "耳號",
      dataIndex: "ear_tag",
      key: "ear_tag",
      fixed: "left",
      width: 85,
    },
    {
      title: "生日",
      dataIndex: "birthday",
      key: "birthday",
      sorter: (a, b) => sortDate(a.birthday, b.birthday),
      fixed: "left",
      width: 85,
    },
    {
      title: "配種公豬",
      dataIndex: "sire",
      key: "sire",
    },
    {
      title: "配種日期",
      dataIndex: "breeding_date",
      key: "breeding_date",
      sorter: (a, b) => sortDate(a.breeding_date, b.breeding_date),
    },
    {
      title: "預產期",
      dataIndex: "due_date",
      key: "due_date",
      sorter: (a, b) => sortDate(a.due_date, b.due_date),
    },
    {
      title: "離乳日期",
      dataIndex: "weaning_date",
      key: "weaning_date",
      sorter: (a, b) => sortDate(a.weaning_date, b.weaning_date),
    },
    {
      title: "至分娩舍日期",
      dataIndex: "to_delivery_shed_date",
      key: "to_delivery_shed_date",
      sorter: (a, b) =>
        sortDate(a.to_delivery_shed_date, b.to_delivery_shed_date),
    },
    {
      title: "配種三週日期",
      dataIndex: "breeding_three_week_date",
      key: "breeding_three_week_date",
      sorter: (a, b) =>
        sortDate(a.breeding_three_week_date, b.breeding_three_week_date),
    },
    {
      title: "測孕日期(1)",
      dataIndex: "pregnancy_test_date_1",
      key: "pregnancy_test_date_1",
      sorter: (a, b) =>
        sortDate(a.pregnancy_test_date_1, b.pregnancy_test_date_1),
    },
    {
      title: "測孕結果(1)",
      dataIndex: "pregnancy_result_1",
      key: "pregnancy_result_1",
    },
    {
      title: "測孕日期(2)",
      dataIndex: "pregnancy_test_date_2",
      key: "pregnancy_test_date_2",
      sorter: (a, b) =>
        sortDate(a.pregnancy_test_date_2, b.pregnancy_test_date_2),
    },
    {
      title: "測孕結果(2)",
      dataIndex: "pregnancy_result_2",
      key: "pregnancy_result_2",
    },
    {
      title: "雙毒（小病毒/丹毒）",
      dataIndex: "dual_infection",
      key: "dual_infection",
    },
    {
      title: "AR",
      dataIndex: "AR",
      key: "AR",
    },
    {
      title: "PR",
      dataIndex: "PR",
      key: "PR",
    },
    {
      title: "E_coli",
      dataIndex: "E_coli",
      key: "E_coli",
    },
    {
      title: "PRRS",
      dataIndex: "PRRS",
      key: "PRRS",
    },
    {
      title: "害獲滅",
      dataIndex: "harmful_removal",
      key: "harmful_removal",
    },
    {
      title: "基因型",
      dataIndex: "genotype",
      key: "genotype",
    },
    {
      title: "毛色基因",
      dataIndex: "coat_color_gene",
      key: "coat_color_gene",
    },
    {
      title: "父畜",
      dataIndex: "sire_info",
      key: "sire_info",
    },
    {
      title: "母畜",
      dataIndex: "dam_info",
      key: "dam_info",
    },
    {
      title: "備註",
      dataIndex: "notes",
      key: "notes",
    },
  ];

  // 使用 generateColumns 自動生成每個欄位的寬度
  const generatedColumns = generateColumns(columnConfig, {
    setWidthForChars: 3, // 每個字符分配 3px
    defaultWidth: 120, // 默認寬度設置為 120px
  });

  // 計算總寬度
  const totalWidth = calculateTotalWidth(generatedColumns);
  console.log("Total width of the columns: ", totalWidth);
  return {
    columnConfig: generatedColumns,
    totalWidth,
  };
};
