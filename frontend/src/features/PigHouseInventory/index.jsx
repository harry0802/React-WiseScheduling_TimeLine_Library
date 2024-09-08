import React, { useState } from "react";
import BaseTable from "../../components/table/BaseTable";
import BaseDrawer from "../../components/Drawer/BaseDrawer";
import { Icon } from "@iconify/react";
import BaseButton from "../../components/button/baseButton";

// 豬舍名稱生成函數
const generatePighouseName = (index) =>
  `豬舍 ${String.fromCharCode(65 + (index % 26))}${Math.floor(index / 26) + 1}`;

// 隨機日期生成函數（過去30天內）
const generateRandomDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 30));
  return date.toISOString().split("T")[0];
};

// 列定義
const columns = [
  { title: "豬舍編號", dataIndex: "id", key: "id", width: 100 },
  { title: "豬舍名稱", dataIndex: "name", key: "name", width: 150 },
  {
    title: "當前存欄量",
    dataIndex: "currentStock",
    key: "currentStock",
    width: 120,
  },
  {
    title: "最大容量",
    dataIndex: "maxCapacity",
    key: "maxCapacity",
    width: 120,
  },
  { title: "豬隻品種", dataIndex: "pigBreed", key: "pigBreed", width: 150 },
  {
    title: "平均體重 (kg)",
    dataIndex: "avgWeight",
    key: "avgWeight",
    width: 150,
  },
  {
    title: "最後更新日期",
    dataIndex: "lastUpdated",
    key: "lastUpdated",
    width: 150,
  },
  { title: "負責人", dataIndex: "manager", key: "manager", width: 120 },
  {
    title: "健康狀況",
    dataIndex: "healthStatus",
    key: "healthStatus",
    width: 120,
  },
];

// 豬隻品種列表
const pigBreeds = ["大白豬", "杜洛克", "藍瑞斯", "漢普夏", "巴克夏", "約克夏"];

// 健康狀況列表
const healthStatuses = ["良好", "一般", "需要關注", "生病"];

// 負責人列表
const managers = ["張三", "李四", "王五", "趙六", "孫七"];

// 數據生成
const data = Array.from({ length: 100 }, (_, index) => ({
  key: `${index + 1}`,
  id: `PH${String(index + 1).padStart(3, "0")}`,
  name: generatePighouseName(index),
  currentStock: Math.floor(Math.random() * 500) + 100,
  maxCapacity: 1000,
  pigBreed: pigBreeds[Math.floor(Math.random() * pigBreeds.length)],
  avgWeight: (Math.random() * (150 - 50) + 50).toFixed(1),
  lastUpdated: generateRandomDate(),
  manager: managers[Math.floor(Math.random() * managers.length)],
  healthStatus:
    healthStatuses[Math.floor(Math.random() * healthStatuses.length)],
}));

function PigHouseInventoryTable() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const onRowClick = (record) => {
    console.log(record);
  };

  const handleSubmit = () => {
    console.log("表單已提交");
    setIsDrawerOpen(false);
  };

  return (
    <>
      <BaseTable
        title="豬舍庫存"
        columns={columns}
        data={data}
        onRowClick={onRowClick}
        onAddClick={() => setIsDrawerOpen(true)}
      />
      <BaseDrawer
        visible={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        width={700}
      >
        <BaseDrawer.Header>
          添加豬舍庫存
          <BaseButton type="delete">
            <Icon
              icon="material-symbols:delete"
              onClick={() => setIsDrawerOpen(false)}
            />
          </BaseButton>
        </BaseDrawer.Header>
        <BaseDrawer.Body>
          <form>
            <input type="text" placeholder="豬舍名稱" />
            <input type="number" placeholder="當前存欄量" />
            <input type="number" placeholder="最大容量" />
            <select>
              <option value="">選擇豬隻品種</option>
              {pigBreeds.map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
            <input type="number" step="0.1" placeholder="平均體重 (kg)" />
            <input type="date" placeholder="最後更新日期" />
            <select>
              <option value="">選擇負責人</option>
              {managers.map((manager) => (
                <option key={manager} value={manager}>
                  {manager}
                </option>
              ))}
            </select>
            <select>
              <option value="">選擇健康狀況</option>
              {healthStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </form>
        </BaseDrawer.Body>
        <BaseDrawer.Footer onSubmit={handleSubmit} disabled={false} />
      </BaseDrawer>
    </>
  );
}

export default PigHouseInventoryTable;
