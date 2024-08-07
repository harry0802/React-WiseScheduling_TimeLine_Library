import ProductContent from "../../utility/ProductContent.jsx";
import ControlledTable from "./table/ControlledTable.jsx";
import ProductDrawer from "../../utility/ProductDrawer.jsx";
import { useEffect } from "react";
import InventoryManagementRadioGroup from "./radioGroup/InventoryManagementRadioGroup.jsx";
import { useRecord } from "../../context/ProductionRecordProvider.jsx";
import ProductionRecordButton from "../../utility/ProductionRecordButton.jsx";
import useInventoryStore from "../../slice/InventorySlice.jsx";
import useNotification from "../../hook/useNotification.js";

// Fake data for demonstration purposes
const columns = [
  { title: "編號", dataIndex: "id", key: "id", width: 70 },
  {
    title: "物料編號",
    dataIndex: "customer",
    key: "customer",
    width: 200,
    sorter: (a, b) => a.productNumber.localeCompare(b.productNumber),
  },
  {
    title: "物料種類",
    dataIndex: "productNumber",
    key: "productNumber",
    width: 200,
  },
  { title: "物料名稱", dataIndex: "quantity", key: "quantity", width: 600 },
  { title: "數量", dataIndex: "amount", key: "amount", width: 200 },
  { title: "單位", dataIndex: "date", key: "date", width: 150 },
];

const initialData = Array.from({ length: 100 }, (_, index) => ({
  key: index,
  id: index,
  productNumber: `PN-${index + 1}`,
  customer: `Customer ${index + 1}`,
  quantity: Math.floor(Math.random() * 1000),
  amount: (Math.random() * 10000).toFixed(2),
  date: new Date().toISOString().split("T")[0],
}));

const radioData = Array.from({ length: 10 }, (_, i) => `類型${i + 1}`);

function InventoryManagementTable() {
  const { handlePageStatust } = useRecord();
  const { notifySuccess } = useNotification();
  // Access Zustand store
  const {
    dataSource,
    selectedRowKeys,
    drawerVisible,
    selectedProductNumber,
    setData,
    setSelectedKeys,
    setDrawerVisible,
    setSelectedProductNumber,
    handleEditClick,
    handleSave,
  } = useInventoryStore();
  // Handle row click
  const onRowClick = (record) => {
    const isSelected = selectedRowKeys.includes(record.id);
    const newSelectedRowKeys = isSelected
      ? selectedRowKeys.filter((selectedId) => selectedId !== record.id) // Deselect if already selected
      : [...selectedRowKeys, record.id]; // Select if not already selected
    setSelectedKeys(newSelectedRowKeys); // Trigger the onSelectChange function with updated selection
  };

  const handleSaveAndNotify = async () => {
    handleSave();
    setTimeout(() => notifySuccess(), 200);
  };

  // Initialize data when the component mounts
  useEffect(() => {
    handlePageStatust("原物料分類");
    setData(initialData);
  }, []);

  return (
    <>
      <ControlledTable
        columns={columns}
        dataSource={dataSource}
        selectedRowKeys={selectedRowKeys}
        onSelectChange={setSelectedKeys}
        onRowClick={onRowClick}
        title="產品列表"
      >
        <ProductionRecordButton
          shape="round"
          OnClick={handleEditClick}
          disabled={selectedRowKeys.length === 0}
        >
          編輯
        </ProductionRecordButton>
        <button onClick={notifySuccess}>13</button>
      </ControlledTable>

      <ProductDrawer
        title="原物料分類"
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        onSubmit={handleSaveAndNotify}
      >
        <InventoryManagementRadioGroup
          data={radioData}
          value={selectedProductNumber}
          onChange={(e) => setSelectedProductNumber(e.target.value)}
        />
        {/* <button onClick={handleSave}>保存</button> */}
      </ProductDrawer>
    </>
  );
}

function ProductionRecordInventoryManagement() {
  return (
    <ProductContent title="製程資料維護">
      <InventoryManagementTable />
    </ProductContent>
  );
}

export default ProductionRecordInventoryManagement;
