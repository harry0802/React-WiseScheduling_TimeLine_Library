import ProductContent from "../../utility/ProductContent.jsx";
import ControlledTable from "./table/ControlledTable.jsx";
import ProductDrawer from "../../utility/ProductDrawer.jsx";
import { useEffect } from "react";
import InventoryManagementRadioGroup from "./radioGroup/InventoryManagementRadioGroup.jsx";
import { useRecord } from "../../context/ProductionRecordProvider.jsx";
import ProductionRecordButton from "../../utility/ProductionRecordButton.jsx";
import useInventoryStore from "../../slice/InventorySlice.jsx";
import useNotification from "../../hook/useNotification.js";
import {
  useGetMaterialsQuery,
  useMaterialAtions,
} from "../../service/endpoints/materialApi.js";
import { useGetMaterialOptionsQuery } from "../../service/endpoints/materialOptionApi.js";

/*
! 問題  
?  materials API : 
  todo 分配行為釐清
    * materialCode , materialType 該是誰 ?
    * 為何回傳 api 參數自動忽略  
    * 如何跟新 materials ::  materialCode , materialType ?
    * 已知 materialType 由原物料分配 
    * materialCode 由誰分配  / 邏輯 ? 行為 ?
    
? 原物料分類 ::   materialCode , materialType 
 todo 原物料分類  // API　name 取得物料選項(Done)
   * 來源是否是 materialOptions 的  materialType 與 materialCode
   
 todo 物料種類代碼管理 ===  原物料分類
  *  兩者是否是連動關係

*/

// Fake data for demonstration purposes
const columns = [
  { title: "編號", dataIndex: "key", key: "key", width: 70 },
  {
    title: "物料編號",
    dataIndex: "materialSN",
    key: "materialSN",
    width: 200,
    sorter: (a, b) => a.materialSN.localeCompare(b.materialSN),
  },
  {
    title: "物料種類",
    dataIndex: "materialType",
    key: "materialType",
    width: 200,
  },
  {
    title: "物料名稱",
    dataIndex: "materialName",
    key: "materialName",
    width: 600,
  },
  { title: "數量", dataIndex: "quantity", key: "quantity", width: 200 },
  { title: "單位", dataIndex: "unit", key: "unit", width: 150 },
];

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
    radioData,
    setRadioData,
  } = useInventoryStore();

  const { handleUpdate } = useMaterialAtions();

  // Handle row click
  const onRowClick = (record) => {
    const isSelected = selectedRowKeys.includes(record.id);
    const newSelectedRowKeys = isSelected
      ? selectedRowKeys.filter((selectedId) => selectedId !== record.id) // Deselect if already selected
      : [...selectedRowKeys, record.id]; // Select if not already selected
    setSelectedKeys(newSelectedRowKeys); // Trigger the onSelectChange function with updated selection
  };

  // ! 處理發送事件
  const handleSaveAndNotify = async () => {
    const updateDataSource = await handleSave();
    await handleUpdate(updateDataSource);
    setTimeout(() => notifySuccess(), 200);
  };

  const { data: materials } = useGetMaterialsQuery();
  const { data: materialOptions } = useGetMaterialOptionsQuery();

  // Initialize data when the component mounts

  console.log(materials);

  useEffect(() => {
    handlePageStatust("原物料分類");
  }, []);

  useEffect(() => {
    if (!materials) return;
    (async function () {
      await setData(
        materials?.data.map((item, i) => ({ ...item, key: i + 1 }))
      );
    })();
  }, [materials, setData]);

  useEffect(() => {
    if (!materialOptions) return;
    (async function () {
      await setRadioData(
        materialOptions?.data.map((item) => item.materialType)
      );
    })();
  }, [setRadioData, materialOptions]);

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
