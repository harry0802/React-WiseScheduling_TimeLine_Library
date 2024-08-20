import { Button, Form } from "antd";

import ProductContextCard from "../../../utility/ProductContextCard.jsx";
import ProductDrawer from "../../../utility/ProductDrawer.jsx";
import ProcessAccordion from "../accordion/ProcessAccordion.jsx";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import AddInfomationsTransferList from "../transferList/AddInfomationsTransferList.jsx";
import { useRecordAddInfo } from "../../../context/RecordAddInfoProvider.jsx";
import DeleteIcon from "@mui/icons-material/Delete";

import ProductGroupForm from "../../../utility/ProductGroupForm.jsx";
import useNotification from "../../../hook/useNotification.js";
import { useTransferListSlice } from "../../../slice/TransferListSlice.jsx";
import { useGetProcessesAndMaterialsQuery } from "../../../service/endpoints/processApi.js";
import { useGetCategorizedMaterialsQuery } from "../../../service/endpoints/materialApi.js";
import { Autocomplete } from "@mui/material";
import { useProcessDialog } from "../../../hook/useProcessDialog.js";

/*
 ! dialog 製成添加實現
 todo 獲取資料 : 
   - 製程資料     
   - 模具資料
   - 物料資料 

todo 用戶操作:
  - 製程依照用戶需求 / CURD
  - 模具依照用戶需求 /CURD
  - 物料依照用用戶需求 /CURD  

*/

// Process -> Dialog
// *可控組建 裡面的資料是要靈活的

function ProcessSectionsDialog({ processData, isEditMode, onDelete }) {
  const [form] = Form.useForm();
  const { notifySuccess } = useNotification();
  const { setProcessDrawer, processDrawer, productId } = useRecordAddInfo();
  const {
    formValues,
    setFormValues,
    selectedProcess,
    moldItems,
    setMoldItems,
    options,
    inputValue,
    checkMastirialData,
    setInputValue,
    handleCreateProcess,
    handleUpdateProcess,
    handleDeleteProcess,
    convertToApiFormat,
  } = useProcessDialog(processData);

  const handleDrawerClose = () => {
    form.setFieldsValue({ items: moldItems });
    setProcessDrawer(false);
  };

  const handleFormSubmit = async () => {
    if (!selectedProcess) {
      console.error("Invalid process selected");
      return;
    }

    try {
      const { items } = await form.validateFields();
      const filteredItems = items?.filter(
        ({ item_code }) => !!item_code && item_code.trim().length > 0
      );

      setMoldItems(filteredItems);

      const data = convertToApiFormat({
        productId,
        processOptionId: selectedProcess.id,
        jigSN: inputValue,
        molds: filteredItems,
        materials: checkMastirialData,
      });

      isEditMode
        ? await handleUpdateProcess(data)
        : await handleCreateProcess(data);
      setTimeout(() => notifySuccess(), 100);
    } finally {
      handleDrawerClose();
    }
  };

  return (
    <Form form={form} layout="vertical">
      <ProductDrawer
        disabled={
          !selectedProcess ||
          selectedProcess.processName !== inputValue ||
          !formValues.moldName
        }
        title={`製程 ${
          isEditMode ? `${processData?.length}` : `${processData?.length + 1}`
        }`}
        visible={processDrawer}
        onClose={handleDrawerClose}
        onSubmit={handleFormSubmit}
        headericon={
          isEditMode && (
            <Button
              style={{ borderRadius: "50%" }}
              className="ant-btn-default c-btn-primars--delete"
              onClick={onDelete}
            >
              <DeleteIcon />
            </Button>
          )
        }
      >
        <div className="product-drawer__info">
          <div className="info__item">
            <Autocomplete
              freeSolo
              options={options.map((option) => option.processName)}
              onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
              onChange={(_, value) =>
                setFormValues({ ...formValues, processName: value })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="製程名稱"
                  default={formValues.processName}
                />
              )}
            />
          </div>

          <div className="info__item">
            <TextField
              label="製具編號"
              default={formValues.moldName}
              onChange={(e) =>
                setFormValues({ ...formValues, moldName: e.target.value })
              }
            />
          </div>
        </div>
        <ProductGroupForm />
        <AddInfomationsTransferList type={"物料"} />
      </ProductDrawer>
    </Form>
  );
}

// *手風琴 -> 手風琴折疊的內容
function ProcessSectionsListDetail({ materialItems, processIndex = 0 }) {
  const { productSN, materialSN, materialName, quantity, unit } =
    materialItems || {};

  return (
    <div>
      <p>物料:{processIndex + 1}</p>
      <p>{materialSN || "materialSN "}</p>
      <p>{materialName || "materialName"}</p>
      <p>{productSN || "productSN"}</p>
      <p>
        {quantity || "quantity"} {unit || "unit"}
      </p>
    </div>
  );
}

// *手風琴 按下編輯按鈕要設定以紀錄資料
function ProcessSectionsList({ data, processNb = 0, initMaterialCategorized }) {
  const { setProcessDrawer } = useRecordAddInfo();
  const { initializeForEdit } = useTransferListSlice();
  const { materials, jigSN, molds, processCategory } = data || {};
  function uniqByKeepLast(data, key) {
    return [...new Map(data.map((x) => [key(x), x])).values()];
  }

  return (
    <>
      <ProcessAccordion
        title={`製程${processNb + 1} ${
          processCategory ? processCategory : "廠內-成型-1I"
        }`}
        OnClick={() => {
          setProcessDrawer(true);
          initializeForEdit([1, 3, 5, 7, 9], [2, 4, 6, 8, 10]);
        }}
      >
        <p>治具編號 : {jigSN}</p>
        <p>
          模具編號 :{" "}
          {molds
            ?.map((item) => item.moldno)
            .filter(Boolean)
            .join(",") || ""}
        </p>
        {materials?.map((material, i) => (
          <ProcessSectionsListDetail
            materialItems={material}
            processIndex={i}
            key={i}
          />
        ))}
      </ProcessAccordion>
    </>
  );
}

//* main component
function ProcessSections() {
  const { setProcessDrawer, productId } = useRecordAddInfo();
  const { initialize } = useTransferListSlice();

  const { data: initMaterialCategorized } =
    useGetCategorizedMaterialsQuery(false);

  const { data: processData } = useGetProcessesAndMaterialsQuery(productId, {
    skip: !productId || typeof productId === undefined,
  });

  // !AddNewprocess
  const handleAddNewProcess = () => {
    setProcessDrawer(true);
    initialize(initMaterialCategorized?.data);
  };

  /* 
todo : 1. 先拿到所有的製程  
*/

  // 放置製程內容
  return (
    <>
      <ProductContextCard
        OnClick={() => handleAddNewProcess()}
        icon={<AddIcon />}
        title="製程順序與物料需求對應"
      >
        {processData?.data.length > 0 ? (
          processData.data.map((items, i) => (
            <ProcessSectionsList
              key={i}
              data={items}
              processNb={i}
              initMaterialCategorized={initMaterialCategorized.data}
            />
          ))
        ) : (
          <span>請添加製成</span>
        )}
      </ProductContextCard>
      <ProcessSectionsDialog processData={processData?.data} />
    </>
  );
}

export default ProcessSections;
