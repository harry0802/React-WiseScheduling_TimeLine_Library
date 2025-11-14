import { generateColumns } from "../../../utility/tableColumnGenerator";
import { sortDate } from "../../../utility/sortUtils";
import { calculateTotalWidth } from "../../../utility/calculateTotalWidth";
/*
{
  "building": "棟舍",
  "column": "欄位",
  "breed": "品種",
  "earTag": "耳號",
  "birthDate": "出生日期",
  "genotype": "基因型",
  "notes": "備註",
  "sire": "父畜",
  "dam": "母畜",
  "selection": "留種",
  "coatColorGene": "毛色基因",
  "swineFever": "豬瘟",
  "swineErysipelas": "豬丹毒",
  "pseudoRabies": "假性狂犬病",
  "prrs": "藍耳病"
}

*/
export const getColumnDefinitions = () => {
  const columnConfig = [
    {
      title: "棟舍",
      dataIndex: "building",
      key: "building",
    },
    {
      title: "欄位",
      dataIndex: "column",
      key: "column",
    },
    {
      title: "品種",
      dataIndex: "breed",
      key: "breed",
    },
    {
      title: "耳號",
      dataIndex: "earTag",
      key: "earTag",
    },
    {
      title: "出生日期",
      dataIndex: "birthDate",
      key: "birthDate",
      sorter: (a, b) => sortDate(a.birthDate, b.birthDate),
    },
    {
      title: "基因型",
      dataIndex: "genotype",
      key: "genotype",
    },
    {
      title: "備註",
      dataIndex: "notes",
      key: "notes",
    },
    {
      title: "父畜",
      dataIndex: "sire",
      key: "sire",
    },
    {
      title: "母畜",
      dataIndex: "dam",
      key: "dam",
    },
    {
      title: "留種",
      dataIndex: "selection",
      key: "selection",
    },
    {
      title: "毛色基因",
      dataIndex: "coatColorGene",
      key: "coatColorGene",
    },
    {
      title: "豬瘟",
      dataIndex: "swineFever",
      key: "swineFever",
    },
    {
      title: "豬丹毒",
      dataIndex: "swineErysipelas",
      key: "swineErysipelas",
    },
    {
      title: "假性狂犬病",
      dataIndex: "pseudoRabies",
      key: "pseudoRabies",
    },
    {
      title: "藍耳病",
      dataIndex: "prrs",
      key: "prrs",
    },
  ];

  const generatedColumns = generateColumns(columnConfig, {
    setWidthForChars: 3,
    defaultWidth: 120,
  });

  const totalWidth = calculateTotalWidth(generatedColumns);

  return {
    columnConfig: generatedColumns,
    totalWidth,
  };
};
