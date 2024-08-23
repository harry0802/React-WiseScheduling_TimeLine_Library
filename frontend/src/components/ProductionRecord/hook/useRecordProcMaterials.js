import { useEffect, useState } from "react";
import { homeSlice } from "../slice/HomeSlice";
import {
  useGetCheckIsDeletableOptionQuery,
  useGetProcessOptionsQuery,
  useProcessOptionActions,
} from "../service/endpoints/processOptionApi";
import {
  useGetMaterialCheckIsDeletableByIdQuery,
  useGetMaterialOptionsQuery,
  useMaterialOptionActions,
} from "../service/endpoints/materialOptionApi";
import { useEffectOnce } from "react-use";
import useNotification from "../hook/useNotification";

// Column Definitions
export const productColumns = [
  { title: "編號", dataIndex: "key", width: 50, key: "key" },
  { title: "製程代碼", dataIndex: "processSN", key: "processSN" },
  { title: "製程名稱", dataIndex: "processName", key: "processName" },
  { title: "製成類別", dataIndex: "processCategory", key: "processCategory" },
];

export const materialColumns = [
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

function isDuplicate(item, processedData, fields) {
  return fields.some((field) => item[field] === processedData[field]);
}

function checkForDuplicates(dataList, processedData, idField, fields) {
  return processedData.id
    ? dataList
        .filter((item) => item[idField] !== processedData.id)
        .some((item) => isDuplicate(item, processedData, fields))
    : dataList.some((item) => isDuplicate(item, processedData, fields));
}

export function useRecordProcMaterials() {
  const [selectedData, setSelectedData] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Explicit mode state
  const [userSelect, setUserSelect] = useState(options[0].value);
  const [productData, setProductData] = useState([]);
  const [materialDataList, setMaterialDataList] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isAppoint, setIsAppoint] = useState(false);
  const { setPageStatus } = homeSlice();
  const [drawerType, setDrawerType] = useState("product");
  const { notifySuccess } = useNotification();
  const [isDuplicate, setIsDuplicate] = useState(false);

  // API
  const { data: processOptionsData } = useGetProcessOptionsQuery();
  const { data: materialOptionsData } = useGetMaterialOptionsQuery();
  const { data: isMaterialDeletable } = useGetMaterialCheckIsDeletableByIdQuery(
    selectedData?.id,
    { skip: drawerType !== "material" || !selectedData?.id }
  );
  const { data: isProcessDeletable } = useGetCheckIsDeletableOptionQuery(
    selectedData?.id,
    {
      skip: drawerType !== "product" || !selectedData?.id,
    }
  );

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

  //  Actions

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
  //    useGetProcessByProductSNsQuery()
  /**
   * Closes the drawer and resets the form state.
   */
  const handleOnClose = () => {
    setDrawerVisible(false);
    setUserSelect(options[0].value);
    setSelectedData(null);
    setIsEditing(false); // Reset editing mode on close
    setDrawerVisible(false);
    setIsDuplicate(false);
  };

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

    /*
     * 如果有 id : 過濾掉自己 比對其他值
     * 如果 沒有 id 判斷值是否有重複
     */

    const result =
      drawerType === "product"
        ? checkForDuplicates(productData, processedData, "id", [
            "processName",
            "processSN",
          ])
        : checkForDuplicates(materialDataList, processedData, "id", [
            "materialCode",
            "materialType",
          ]);

    if (result) return setIsDuplicate(true);

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
    setIsDuplicate(false);
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

  const getAppointStatus = (
    drawerType,
    isMaterialDeletable,
    isProcessDeletable
  ) => {
    if (drawerType === "product") {
      return isProcessDeletable?.data;
    } else if (drawerType === "material") {
      return isMaterialDeletable?.data;
    }
    return false;
  };

  useEffect(() => {
    if (drawerVisible) {
      const appointStatus = getAppointStatus(
        drawerType,
        isMaterialDeletable,
        isProcessDeletable
      );
      setIsAppoint(appointStatus || false);
    }
  }, [isMaterialDeletable, isProcessDeletable, drawerVisible, drawerType]);

  useEffectOnce(() => setPageStatus("製程與物料編碼維護"));

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

  return {
    openDrawer,
    handleSubmit,
    handleInputChange,
    handleDelete,
    handleOnClose,
    setUserSelect,
    productData,
    materialDataList,
    isAppoint,
    selectedData,
    isEditing,
    userSelect,
    drawerVisible,
    setPageStatus,
    drawerType,
    isDuplicate,
    notifySuccess,
  };
}
