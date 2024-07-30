import ProductContent from "../../Utility/ProductContent.jsx";
import { Checkbox } from "antd";
import useTableSettings from "./table/useTableSettings.jsx";
import ControlledTable from "./table/ControlledTable.jsx";
import ProductDrawer from "../../Utility/ProductDrawer.jsx";
import { useState } from "react";

import InventoryManagementRadioGroup from "./radioGroup/InventoryManagementRadioGroup.jsx";
import { useRecord } from "../../Context/ProductionRecordProvider.jsx";
import { useEffect } from "react";

const initialData = Array.from({ length: 100 }, (_, index) => ({
  key: `${index}`,
  id: index + 1,
  productNumber: `PN-${index + 1}`,
  customer: `Customer ${index + 1}`,
  quantity: Math.floor(Math.random() * 1000),
  amount: (Math.random() * 10000).toFixed(2),
  date: new Date().toISOString().split("T")[0],
  selected: false,
}));

const columns = [
  { title: "編號", dataIndex: "id", key: "id", with: 70 },
  {
    title: "物料種類",
    dataIndex: "productNumber",
    key: "productNumber",
    with: 200,
  },
  { title: "物料編號", dataIndex: "customer", key: "customer", with: 200 },
  { title: "物料名稱", dataIndex: "quantity", key: "quantity", with: 600 },
  { title: "數量", dataIndex: "amount", key: "amount", with: 200 },
  { title: "單位", dataIndex: "date", key: "date", with: 150 },
];

const generateData = () => {
  const types = ["原物料", "色母", "色粉", "包材", "其他用料", "膠頭"];
  const data = [];

  for (let i = 0; i < 100; i++) {
    const type = types[i % types.length];
    const id = Math.floor(i / types.length) + 1;
    data.push(`${type}${id}`);
  }

  return data;
};

function InventoryManagementTable() {
  const [managetDrawer, setManagetDrawer] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const { handlePageStatust } = useRecord();

  const { state, editRow, setSelectedKeys } = useTableSettings(initialData);

  // 處理行選擇變更
  const handleSelectChange = (selectedRowKeys) =>
    setSelectedKeys(selectedRowKeys);

  // 處理行點擊事件
  const handleRowClick = (record) => console.log("Row clicked:", record);

  // 處理編輯按鈕點擊事件
  const handleEditClick = () => {
    const editedRow = { ...state.dataSource[0], productNumber: "PN-Edited" };
    editRow(editedRow);
  };
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const radioData = generateData();

  useEffect(() => {
    handlePageStatust("原物料分類");
  }, []);

  return (
    <div>
      <ControlledTable
        columns={columns}
        dataSource={state.dataSource}
        selectedRowKeys={state.selectedRowKeys}
        onSelectChange={handleSelectChange}
        onRowClick={handleRowClick}
        title="產品列表"
        onEditClick={() => setManagetDrawer(true)}
      />
      <ProductDrawer
        title="原物料分類"
        visible={managetDrawer}
        onClose={() => setManagetDrawer(false)}
      >
        <InventoryManagementRadioGroup
          data={radioData}
          value={selectedValue}
          onChange={handleRadioChange}
        />
      </ProductDrawer>
    </div>
  );
}

function ProductionRecordinventoryManagement() {
  return (
    <ProductContent title="製程資料維護">
      <InventoryManagementTable />
    </ProductContent>
  );
}

export default ProductionRecordinventoryManagement;
