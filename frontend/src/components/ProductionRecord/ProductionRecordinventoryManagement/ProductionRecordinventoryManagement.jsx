import ProductContent from "../Utility/ProductContent.jsx";
import { Checkbox } from "antd";
import useTableSettings from "./useTableSettings.jsx";
import ControlledTable from "./ControlledTable.jsx";

const initialData = Array.from({ length: 20 }, (_, index) => ({
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
  { title: "編號", dataIndex: "id", key: "id" },
  { title: "物料種類", dataIndex: "productNumber", key: "productNumber" },
  { title: "物料編號", dataIndex: "customer", key: "customer" },
  { title: "物料名稱", dataIndex: "quantity", key: "quantity" },
  { title: "數量", dataIndex: "amount", key: "amount" },
  { title: "單位", dataIndex: "date", key: "date" },
];

function InventoryManagementTable() {
  const { state, setData, addRow, editRow, deleteRow, setSelectedKeys } =
    useTableSettings(initialData);

  // 處理行選擇變更
  const handleSelectChange = (selectedRowKeys) =>
    setSelectedKeys(selectedRowKeys);

  // 處理行點擊事件
  const handleRowClick = (record) => console.log("Row clicked:", record);

  // 處理新增按鈕點擊事件
  const handleAddClick = () => {
    const newRow = {
      key: `${state.dataSource.length}`,
      id: state.dataSource.length + 1,
      productNumber: `PN-${state.dataSource.length + 1}`,
      customer: `Customer ${state.dataSource.length + 1}`,
      quantity: Math.floor(Math.random() * 1000),
      amount: (Math.random() * 10000).toFixed(2),
      date: new Date().toISOString().split("T")[0],
      selected: false,
    };
    addRow(newRow);
  };
  // 處理編輯按鈕點擊事件
  const handleEditClick = () => {
    const editedRow = { ...state.dataSource[0], productNumber: "PN-Edited" };
    editRow(editedRow);
  };

  // 處理刪除按鈕點擊事件
  const handleDeleteClick = () => deleteRow(state.selectedRowKeys[0]);
  return (
    <div>
      <ControlledTable
        columns={columns}
        dataSource={state.dataSource}
        selectedRowKeys={state.selectedRowKeys}
        onSelectChange={handleSelectChange}
        onRowClick={handleRowClick}
        title="產品列表"
        onAddClick={handleAddClick}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />
    </div>
  );
}

function ProductionRecordinventoryManagement() {
  console.log(123);

  return (
    <ProductContent title="製程資料維護">
      <InventoryManagementTable />
    </ProductContent>
  );
}

export default ProductionRecordinventoryManagement;
