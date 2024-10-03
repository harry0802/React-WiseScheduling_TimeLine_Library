/*
{
  "building": "棟舍",
  "pen": "欄位",
  "breed": "品種",
  "ear_tag": "耳號",
  "birth_date": "生日",
  "boar_used": "配種公豬",
  "mating_date": "配種日期",
  "farrowing_date": "分娩日期",
  "reason": "原因",
  "departure_date": "離場日期"
}

*/
import dayjs from "dayjs";
import { generateColumns } from "../../../utility/tableColumnGenerator";
import { sortDate } from "../../../utility/sortUtils";
import { calculateTotalWidth } from "../../../utility/calculateTotalWidth";

export const getColumnDefinitions = () => {
  const columnConfig = [
    {
      title: "棟舍",
      dataIndex: "building",
      key: "building",
      width: 100,
    },
    {
      title: "欄位",
      dataIndex: "pen",
      key: "pen",
      width: 80,
    },
    {
      title: "品種",
      dataIndex: "breed",
      key: "breed",
      width: 100,
    },
    {
      title: "耳號",
      dataIndex: "ear_tag",
      key: "ear_tag",
    },
    {
      title: "生日",
      dataIndex: "birth_date",
      key: "birth_date",

      sorter: (a, b) => sortDate(a.birth_date, b.birth_date),
      render: (text) => dayjs(text).format("YYYY-MM-DD"),
    },
    {
      title: "配種公豬",
      dataIndex: "boar_used",
      key: "boar_used",
    },
    {
      title: "配種日期",
      dataIndex: "mating_date",
      key: "mating_date",

      sorter: (a, b) => sortDate(a.mating_date, b.mating_date),
      render: (text) => dayjs(text).format("YYYY-MM-DD"),
    },
    {
      title: "分娩日期",
      dataIndex: "farrowing_date",
      key: "farrowing_date",
      sorter: (a, b) => sortDate(a.farrowing_date, b.farrowing_date),
      render: (text) => dayjs(text).format("YYYY-MM-DD"),
    },
    {
      title: "原因",
      dataIndex: "reason",
      key: "reason",
      width: 150,
    },
    {
      title: "離場日期",
      dataIndex: "departure_date",
      key: "departure_date",

      sorter: (a, b) => sortDate(a.departure_date, b.departure_date),
      render: (text) => dayjs(text).format("YYYY-MM-DD"),
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
