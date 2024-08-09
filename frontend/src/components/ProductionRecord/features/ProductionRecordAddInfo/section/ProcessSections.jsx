import { useState } from "react";
import { Button, Form } from "antd";

import ProductContextCard from "../../../utility/ProductContextCard.jsx";
import ProductDrawer from "../../../utility/ProductDrawer.jsx";
import ProcessAccordion from "../accordion/ProcessAccordion.jsx";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import AddInfomationsTransferList from "../transferList/AddInfomationsTransferList.jsx";
import { useRecordAddInfo } from "../../../context/RecordAddInfoProvider.jsx";
import { TransferListProvider } from "../../../context/TransferListProvider.jsx";
import DeleteIcon from "@mui/icons-material/Delete";

import ProductGroupForm from "../../../utility/ProductGroupForm.jsx";
// import { RedoRounded } from "@mui/icons-material";

const items = [
  {
    item_code: "dnh75n",
  },
  {
    item_code: "456def",
  },
];

// 滑動組件 製成材料選取功能
function SectionsDialogTransferList() {
  return (
    <TransferListProvider>
      <AddInfomationsTransferList type={"物料"} />
    </TransferListProvider>
  );
}

// 可控組建 裡面的資料是要靈活的
function ProcessSectionsDialog() {
  const { processDrawer, setProcessDrawer } = useRecordAddInfo();

  const [form] = Form.useForm();

  const [initialValues, setInitialValues] = useState({
    processName: "XX-000-XXX",
    moldName: "XX-000-XXX",
  });
  const [tempValues, setTempValues] = useState({ ...initialValues });

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      setInitialValues({ ...tempValues });
      setProcessDrawer(false);
      console.log(values);
    } catch (error) {
      alert("Validation Failed:", error);
    }
  };

  const handleDrawerClose = () => {
    // Reset temp values to initial values when drawer is closed
    setTempValues({ ...initialValues });
    setProcessDrawer(false);
  };

  return (
    <Form form={form} initialValues={{ ...items }} layout="vertical">
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
              value={tempValues.processName}
              onChange={(e) =>
                setTempValues({ ...tempValues, processName: e.target.value })
              }
            />
          </div>

          <div className="info__item">
            <TextField
              label="製具編號"
              value={tempValues.moldName}
              onChange={(e) =>
                setTempValues({ ...tempValues, moldName: e.target.value })
              }
            />
          </div>
        </div>
        <ProductGroupForm items={items} form={form} />
        <SectionsDialogTransferList />
      </ProductDrawer>
    </Form>
  );
}

// 手風琴折疊的內容
function ProcessSectionsListDetail(params) {
  return (
    <div>
      <p></p>
      <p></p>
      <p></p>
    </div>
  );
}

// 手風琴
function ProcessSectionsList() {
  const { setProcessDrawer } = useRecordAddInfo();
  return (
    <>
      <ProcessAccordion
        title="製程1 廠內-成型-1I"
        OnClick={() => setProcessDrawer(true)}
      />
      <ProcessSectionsDialog />
    </>
  );
}

// main component
function ProcessSections() {
  const { setProcessDrawer } = useRecordAddInfo();

  // 放置製程內容
  return (
    <>
      <ProductContextCard
        OnClick={() => setProcessDrawer(true)}
        icon={<AddIcon />}
        title="製程順序與物料需求對應"
      >
        <ProcessSectionsList />
      </ProductContextCard>
    </>
  );
}

export default ProcessSections;
