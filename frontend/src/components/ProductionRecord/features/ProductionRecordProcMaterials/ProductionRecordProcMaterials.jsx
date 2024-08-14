import styles from "./ProductionRecordProcMaterials.module.scss";
import { Table } from "antd";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useRecord } from "../../context/ProductionRecordProvider.jsx";
import ProductContextCard from "../../utility/ProductContextCard";
import ProductDrawer from "../../utility/ProductDrawer";
import ProductTextFieldInput from "../../utility/ProductTextFieldInput";
import ProductTextFieldSelect from "../../utility/ProductTextFieldSelect";
import Productcontent from "../../utility/ProductContent";
import useNotification from "../../hook/useNotification";
import {
  useGetProcessOptionsQuery,
  useProcessOptionActions,
} from "../../service/endpoints/processOptionApi";
import {
  useGetMaterialOptionsQuery,
  useMaterialOptionActions,
} from "../../service/endpoints/materialOptionApi";
import ProductionRecordButton from "../../utility/ProductionRecordButton";
import DeleteIcon from "@mui/icons-material/Delete";

// Column Definitions
const productColumns = [
  { title: "編號", dataIndex: "key", width: 50, key: "key" },
  { title: "製程代碼", dataIndex: "processSN", key: "processSN" },
  { title: "製程名稱", dataIndex: "processName", key: "processName" },
  { title: "製成類別", dataIndex: "processCategory", key: "processCategory" },
];

const materialColumns = [
  { title: "編號", dataIndex: "key", width: 50, key: "key" },
  { title: "物料代碼", dataIndex: "materialCode", key: "materialCode" },
  { title: "物料名稱", dataIndex: "materialType", key: "materialType" },
];

// Options for Process Categories
const options = [
  { value: "In-ij廠內成型", label: "In-ij廠內成型" },
  { value: "Out-委外成型", label: "Out-委外成型" },
  { value: "In-BE-廠內後製程", label: "In-BE-廠內後製程" },
  { value: "Out-BE-委外後製程", label: "Out-BE-委外後製程" },
  { value: "In-TS廠內出貨檢驗", label: "In-TS廠內出貨檢驗" },
];

// Reusable Table Component
function ReusableTable({ columns, data, onRowClick }) {
  return (
    <Table
      scroll
      sticky
      className={styles.reusableTable}
      columns={columns}
      dataSource={data}
      pagination={false}
      onRow={(record) => ({
        onClick: () => onRowClick(record),
      })}
    />
  );
}

// ProcMaterials Table Component
function ProcMaterialsTable({ title, columns, data, onRowClick, onAddClick }) {
  return (
    <>
      <ProductContextCard OnClick={onAddClick} title={title} icon={<AddIcon />}>
        <ReusableTable columns={columns} data={data} onRowClick={onRowClick} />
      </ProductContextCard>
    </>
  );
}

// Main Component
function ProductionRecordProcMaterials() {
  const [selectedData, setSelectedData] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Explicit mode state
  const [userSelect, setUserSelect] = useState(options[0].value);
  const [productData, setProductData] = useState([]);
  const [materialDataList, setMaterialDataList] = useState([]);
  const { notifySuccess } = useNotification();

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerType, setDrawerType] = useState("product");

  const { handlePageStatust } = useRecord();

  const { data: processOptionsData } = useGetProcessOptionsQuery();
  const { data: materialOptionsData } = useGetMaterialOptionsQuery();

  const {
    handleCreate: handleCreateMaterial,
    handleUpdate: handleUpdateMaterial,
    handleDelete: handleDeleteMaterial,
  } = useMaterialOptionActions();

  const {
    handleCreate: handleCreateProcess,
    handleUpdate: handleUpdateProcess,
    handleDelete: handleDeleteProcess,
  } = useProcessOptionActions();

  const openDrawer = (data, type) => {
    setSelectedData(data);
    setDrawerType(type);
    setDrawerVisible(true);
    setIsEditing(!!data); // If data exists, set to edit mode
    if (data && data.description) {
      setUserSelect(data.description);
    }
  };

  const handleOnClose = () => {
    setDrawerVisible(false);
    setUserSelect(options[0].value);
    setSelectedData(null);
    setIsEditing(false); // Reset editing mode on close
  };

  const handleSubmit = () => {
    const processSubmission = (dataList, newData, updateFn, createFn) => {
      if (isEditing) {
        const updatedData = dataList.map((item) =>
          item.id === newData.id ? newData : item
        );
        updateFn(updatedData);
        return updatedData;
      } else {
        const createdData = [...dataList, newData];

        createFn([newData]);
        return createdData;
      }
    };

    const actions = {
      product: {
        setState: setProductData,
        updateFn: handleUpdateProcess,
        createFn: handleCreateProcess,
      },
      material: {
        setState: setMaterialDataList,
        updateFn: handleUpdateMaterial,
        createFn: handleCreateMaterial,
      },
    };

    const { setState, updateFn, createFn } = actions[drawerType];

    setState((prevData) =>
      processSubmission(prevData, selectedData, updateFn, createFn)
    );

    resetFormState();
  };

  const resetFormState = () => {
    setDrawerVisible(false);
    setSelectedData(null);
    setUserSelect(options[0].value);
    setIsEditing(false);
    setTimeout(() => notifySuccess(), 200);
  };

  const handleInputChange = (field, value) => {
    setSelectedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  //! handleDelete
  const handleDelete = () => {
    if (!selectedData) return;
    const isProduct = drawerType === "product";
    const { id } = selectedData || {};
    isProduct ? handleDeleteProcess(id) : handleDeleteMaterial(id);
    setTimeout(() => notifySuccess(), 200);
    handleOnClose();
  };

  // * RenderDrawer component
  function renderDrawer() {
    const isProduct = drawerType === "product";

    const fields = {
      name: isProduct ? "processSN" : "materialCode",
      code: isProduct ? "processName" : "materialType",
      title: isEditing
        ? isProduct
          ? "編輯製程編碼"
          : "編輯物料種類編碼"
        : isProduct
        ? "添加製程編碼"
        : "添加物料種類編碼",
      nameLabel: isProduct ? "製程名稱" : "物料名稱",
      codeLabel: isProduct ? "製程代碼" : "物料代碼",
    };

    const isDisabled = () => {
      if (isProduct) {
        return (
          !selectedData?.processSN ||
          !selectedData?.processName ||
          !selectedData?.processCategory
        );
      } else {
        return !selectedData?.materialCode || !selectedData?.materialType;
      }
    };

    const handleFieldChange = (field) => (e) =>
      handleInputChange(field, e.target.value);

    return (
      <ProductDrawer
        title={fields.title}
        visible={drawerVisible}
        onClose={handleOnClose}
        onSubmit={handleSubmit}
        headericon={
          isEditing && (
            <ProductionRecordButton
              OnClick={handleDelete}
              className="c-btn-primars--delete"
            >
              <DeleteIcon />
            </ProductionRecordButton>
          )
        }
        disabled={isDisabled()}
      >
        <ProductTextFieldInput
          label={fields.nameLabel}
          value={selectedData?.[fields.name] || ""}
          OnChange={handleFieldChange(fields.name)}
        />
        <ProductTextFieldInput
          label={fields.codeLabel}
          value={selectedData?.[fields.code] || ""}
          OnChange={handleFieldChange(fields.code)}
        />

        {isProduct && (
          <ProductTextFieldSelect
            // ! 處理下拉選單
            label="製程類別"
            value={selectedData?.processCategory || userSelect}
            option={options}
            OnChange={(e) => {
              const selectedValue = e.target.value;
              setUserSelect(selectedValue);
              handleInputChange("processCategory", selectedValue);
            }}
          />
        )}
      </ProductDrawer>
    );
  }

  useEffect(() => {
    handlePageStatust("製程與物料編碼維護");
  }, []);

  // Ensure each item has a unique key
  useEffect(() => {
    if (processOptionsData?.data) {
      const productsWithKeys = processOptionsData.data.map((item, index) => ({
        ...item,
        key: index + 1 || `product-${index + 1}`,
      }));
      setProductData(productsWithKeys);
    }

    if (materialOptionsData?.data) {
      const materialsWithKeys = materialOptionsData.data.map((item, index) => ({
        ...item,
        key: index + 1 || `material-${index + 1}`,
      }));
      setMaterialDataList(materialsWithKeys);
    }
  }, [materialOptionsData, processOptionsData]);

  // Ensure each item has a unique key
  useEffect(() => {
    if (processOptionsData?.data) {
      const productsWithKeys = processOptionsData.data.map((item, index) => ({
        ...item,
        key: index + 1 || `product-${index + 1}`,
      }));
      setProductData(productsWithKeys);
    }

    if (materialOptionsData?.data) {
      const materialsWithKeys = materialOptionsData.data.map((item, index) => ({
        ...item,
        key: index + 1 || `material-${index + 1}`,
      }));
      setMaterialDataList(materialsWithKeys);
    }
  }, [materialOptionsData, processOptionsData]);

  return (
    <div>
      <Productcontent title="製程與物料編碼">
        <div className={styles["procMaterials-context"]}>
          <ProcMaterialsTable
            title="製程編碼管理"
            columns={productColumns}
            data={productData}
            onRowClick={(record) => openDrawer(record, "product")}
            onAddClick={() => openDrawer(null, "product")}
          />

          <ProcMaterialsTable
            title="物料種類代碼管理"
            columns={materialColumns}
            data={materialDataList}
            onRowClick={(record) => openDrawer(record, "material")}
            onAddClick={() => openDrawer(null, "material")}
          />
        </div>
        {renderDrawer()}
      </Productcontent>
    </div>
  );
}

export default ProductionRecordProcMaterials;
