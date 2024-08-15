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
  { title: "物料種類", dataIndex: "materialType", key: "materialType" },
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
  /**
   * Opens the drawer (form) to add or edit a record.
   * @param {Object|null} data - The selected data record, or null for adding a new record.
   * @param {"product"|"material"} type - The type of data being handled, either product or material.
   */
  const openDrawer = (data, type) => {
    setSelectedData(data);
    setDrawerType(type);
    setDrawerVisible(true);
    setIsEditing(!!data); // If data exists, set to edit mode
    if (data && data.description) {
      setUserSelect(data.description);
    }
  };

  /**
   * Closes the drawer and resets the form state.
   */
  const handleOnClose = () => {
    setDrawerVisible(false);
    setUserSelect(options[0].value);
    setSelectedData(null);
    setIsEditing(false); // Reset editing mode on close
  };

  // const handleSubmit = () => {
  //   const processSubmission = (dataList, newData, updateFn, createFn) => {
  //     if (isEditing) {
  //       const updatedData = dataList.map((item) =>
  //         item.id === newData.id ? newData : item
  //       );
  //       updateFn(updatedData);
  //       return updatedData;
  //     } else {
  //       // ! 處理下拉選單

  //       const isProduct = drawerType === "product";
  //       const createdData = [
  //         ...dataList,
  //         isProduct
  //           ? {
  //               ...newData,
  //               processCategory: !!newData.processCategory
  //                 ? newData.processCategory
  //                 : userSelect,
  //             }
  //           : newData,
  //       ];

  //       createFn([
  //         {
  //           ...newData,
  //           processCategory: !!newData.processCategory
  //             ? newData.processCategory
  //             : userSelect,
  //         },
  //       ]);
  //       return createdData;
  //     }
  //   };

  //   const actions = {
  //     product: {
  //       setState: setProductData,
  //       updateFn: handleUpdateProcess,
  //       createFn: handleCreateProcess,
  //     },
  //     material: {
  //       setState: setMaterialDataList,
  //       updateFn: handleUpdateMaterial,
  //       createFn: handleCreateMaterial,
  //     },
  //   };

  //   const { setState, updateFn, createFn } = actions[drawerType];

  //   setState((prevData) =>
  //     processSubmission(prevData, selectedData, updateFn, createFn)
  //   );

  //   resetFormState();
  // };
  const handleSubmit = () => {
    const processedData = {
      ...selectedData,
      processCategory: selectedData?.processCategory || userSelect,
    };

    const { setState, updateFn, createFn } =
      drawerType === "product"
        ? {
            setState: setProductData,
            updateFn: handleUpdateProcess,
            createFn: handleCreateProcess,
          }
        : {
            setState: setMaterialDataList,
            updateFn: handleUpdateMaterial,
            createFn: handleCreateMaterial,
          };

    setState((prevData) =>
      isEditing
        ? prevData.map((item) =>
            item.id === processedData.id ? processedData : item
          )
        : [...prevData, processedData]
    );

    const dataToSubmit = Array.isArray(processedData)
      ? processedData
      : [processedData];
    (isEditing ? updateFn : createFn)(dataToSubmit);

    resetFormState();
  };
  /**
   * Resets the form state after submission or cancellation.
   */
  const resetFormState = () => {
    setDrawerVisible(false);
    setSelectedData(null);
    setUserSelect(options[0].value);
    setIsEditing(false);
    setTimeout(() => notifySuccess(), 200);
  };

  /**
   * Handles input changes in the form fields.
   * @param {string} field - The field name being updated.
   * @param {string} value - The new value for the field.
   */
  const handleInputChange = (field, value) => {
    setSelectedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  /**
   * Handles the deletion of the selected data record.
   */
  const handleDelete = () => {
    if (!selectedData) return;
    const isProduct = drawerType === "product";
    const { id } = selectedData || {};
    isProduct ? handleDeleteProcess(id) : handleDeleteMaterial(id);
    setTimeout(() => notifySuccess(), 200);
    handleOnClose();
  };
  /**
   * Renders the drawer component, which contains the form for adding/editing data.
   * @returns {JSX.Element} - Returns the drawer component with the form.
   */
  function renderDrawer() {
    const isProduct = drawerType === "product";

    const fields = {
      name: isProduct ? "processSN" : "materialCode",
      code: isProduct ? "processName" : "materialType",
      title: isEditing
        ? isProduct
          ? "編輯製程編碼" // "Edit Process Code"
          : "編輯物料種類編碼" // "Edit Material Type Code"
        : isProduct
        ? "添加製程編碼" // "Add Process Code"
        : "添加物料種類編碼", // "Add Material Type Code"
      nameLabel: isProduct ? "製程名稱" : "物料代碼", // "Process Name" or "Material Name"
      codeLabel: isProduct ? "製程代碼" : "物料種類", // "Process Code" or "Material Code"
    };

    const isDisabled = () => {
      if (isProduct) {
        return !selectedData?.processSN || !selectedData?.processName;
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
      setProductData(
        processOptionsData.data.map((item, index) => ({
          ...item,
          key: index + 1,
        }))
      );
    }
    if (materialOptionsData?.data) {
      setMaterialDataList(
        materialOptionsData.data.map((item, index) => ({
          ...item,
          key: index + 1,
        }))
      );
    }
  }, [processOptionsData, materialOptionsData]);

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
