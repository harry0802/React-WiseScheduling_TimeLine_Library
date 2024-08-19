import { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
import { useGetCategorizedMaterialsQuery } from "../../../service/endpoints/materialApi.js";
import { Autocomplete } from "@mui/material";
import { useGetMaterialOptionsQuery } from "../../../service/endpoints/materialOptionApi.js";
import { useGetProcessOptionsQuery } from "../../../service/endpoints/processOptionApi.js";

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
function ProcessSectionsDialog({ processData }) {
  const { processSN, molds } = processData || {};

  const [initialValues, setInitialValues] = useState({
    processName: "",
    moldName: "",
  });

  const [selectedProcess, setSelectedProcess] = useState(null); // Store the selected process object
  const [moldItems, setMoldItems] = useState(molds ? molds : []);
  const { processDrawer, setProcessDrawer } = useRecordAddInfo();
  const [form] = Form.useForm();
  const { notifySuccess } = useNotification();
  const { right: modeData } = useTransferListSlice();

  const { data: processesOptions } = useGetProcessOptionsQuery();

  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (processesOptions?.data) {
      setOptions(processesOptions?.data);
    }
  }, [processesOptions]);

  useEffect(() => {
    const selected = options.find(
      (option) => option.processName === initialValues.processName
    );
    setSelectedProcess(selected || null);
  }, [initialValues.processName, options]);

  useEffect(() => {
    form.setFieldsValue({ moldItems });
  }, [moldItems, form]);

  function handleDrawerClose() {
    form.setFieldsValue({ items: moldItems });
    setProcessDrawer(false);
  }

  async function handleFormSubmit() {
    if (!selectedProcess) {
      console.error("Invalid process selected");
      return;
    }

    const { id, processName } = selectedProcess;
    console.log("Selected Process ID:", id);
    console.log("Selected Process Name:", processName);

    try {
      const { items } = await form.validateFields();
      const filteredItems = items.filter(
        ({ item_code }) =>
          !!item_code && typeof item_code !== undefined && item_code !== " "
      );
      setMoldItems(filteredItems);
      setTimeout(() => notifySuccess(), 100);
    } catch (error) {
      console.log("Validation Failed:", error.message);
    } finally {
      setProcessDrawer(false);
    }
  }

  return (
    <Form form={form} layout="vertical">
      <ProductDrawer
        disabled={!selectedProcess || !initialValues.moldName}
        title={`製程 ${processData?.length + 1}`}
        visible={processDrawer}
        onClose={handleDrawerClose}
        onSubmit={handleFormSubmit}
        headericon={
          <Button
            style={{ borderRadius: "50%" }}
            className="ant-btn-default c-btn-primars--delete"
          >
            <DeleteIcon />
          </Button>
        }
      >
        <div className="product-drawer__info">
          <div className="info__item">
            <Autocomplete
              freeSolo
              options={options.map((option) => option.processName)} // Display processName for Autocomplete
              onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
              onChange={(_, value) => {
                setInitialValues({ ...initialValues, processName: value });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="製程名稱"
                  value={initialValues.processName}
                />
              )}
            />
          </div>

          <div className="info__item">
            <TextField
              label="製具編號"
              defaultValue={processSN ? processSN : ""}
              onChange={(e) =>
                setInitialValues({ ...initialValues, moldName: e.target.value })
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
function ProcessSectionsListDetail(params) {
  return (
    <div>
      <p></p>
      <p></p>
      <p></p>
    </div>
  );
}

// *手風琴 按下編輯按鈕要設定以紀錄資料
function ProcessSectionsList() {
  const { setProcessDrawer } = useRecordAddInfo();
  const { initializeForEdit } = useTransferListSlice();
  return (
    <>
      <ProcessAccordion
        title="製程1 廠內-成型-1I"
        OnClick={() => {
          setProcessDrawer(true);
          initializeForEdit([1, 3, 5, 7, 9], [2, 4, 6, 8, 10]);
        }}
      />
    </>
  );
}

//* main component
function ProcessSections() {
  const { setProcessDrawer, productId } = useRecordAddInfo();
  const { initialize } = useTransferListSlice();

  const { data: initMaterialCategorized } =
    useGetCategorizedMaterialsQuery(false);
  const { data: processData } = useGetProcessesAndMaterialsQuery(productId);

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
        {processData?.length > 0 ? (
          <ProcessSectionsList />
        ) : (
          <span>請添加製成</span>
        )}
      </ProductContextCard>
      <ProcessSectionsDialog processData={processData?.data} />
    </>
  );
}

export default ProcessSections;
