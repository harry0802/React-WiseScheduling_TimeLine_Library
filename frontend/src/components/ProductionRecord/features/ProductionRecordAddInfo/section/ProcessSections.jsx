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
import { useGetSingleProcessAndMaterialsQuery } from "../../../service/endpoints/processApi.js";
import { useParams } from "react-router-dom";
const items = [
  {
    item_code: "dnh75n",
  },
  {
    item_code: "456def",
  },
];

// Process -> Dialog
// *可控組建 裡面的資料是要靈活的
function ProcessSectionsDialog() {
  const [initialValues, setInitialValues] = useState({
    processName: "",
    moldName: "",
  });
  const [tempValues, setTempValues] = useState({ ...initialValues });
  const [moldItems, setMoldItems] = useState([]);
  const { processDrawer, setProcessDrawer } = useRecordAddInfo();
  const [form] = Form.useForm();
  const { notifySuccess } = useNotification();
  const { right: modeData } = useTransferListSlice();

  const handleDrawerClose = () => {
    setTempValues({ ...initialValues });
    form.setFieldsValue({ items: moldItems });
    setProcessDrawer(false);
  };

  const handleFormSubmit = async () => {
    try {
      const { items } = await form.validateFields();
      setMoldItems(
        items.filter(
          ({ item_code }) =>
            !!item_code && typeof item_code !== undefined && item_code !== " "
        )
      );
      setInitialValues({ ...tempValues });
      setTimeout(() => notifySuccess(), 100);
    } catch (error) {
      console.log(error);
      alert("Validation Failed:", error);
    } finally {
      setProcessDrawer(false);
    }
  };

  useEffect(() => {
    setMoldItems(items);
    form.setFieldsValue({ items: moldItems });
  }, [setMoldItems, moldItems, form]);

  return (
    <Form form={form} layout="vertical">
      <ProductDrawer
        title="製程 1"
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
            <TextField
              label="製程名稱"
              defaultValue="XX-000-XXX"
              onChange={(e) =>
                setTempValues({ ...tempValues, processName: e.target.value })
              }
            />
          </div>

          <div className="info__item">
            <TextField
              label="製具編號"
              defaultValue="XX-000-XXX"
              onChange={(e) =>
                setTempValues({ ...tempValues, moldName: e.target.value })
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

// 手風琴 -> 手風琴折疊的內容
function ProcessSectionsListDetail(params) {
  return (
    <div>
      <p></p>
      <p></p>
      <p></p>
    </div>
  );
}

// 手風琴 按下編輯按鈕要設定以紀錄資料
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

// main component
function ProcessSections() {
  const { setProcessDrawer } = useRecordAddInfo();
  const { initialize } = useTransferListSlice();
  const handleDrawer = (transferInit = [7, 0, 8, 9, 20]) => {
    setProcessDrawer(true);
    initialize(transferInit);
  };
  const { productId } = useParams();

  const { data } = useGetSingleProcessAndMaterialsQuery(productId);
  console.log(data);

  // 放置製程內容
  return (
    <>
      <ProductContextCard
        OnClick={() => handleDrawer()}
        icon={<AddIcon />}
        title="製程順序與物料需求對應"
      >
        <ProcessSectionsList />
      </ProductContextCard>
      <ProcessSectionsDialog />
    </>
  );
}

export default ProcessSections;
