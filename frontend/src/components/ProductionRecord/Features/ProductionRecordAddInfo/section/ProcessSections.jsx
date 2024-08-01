import { useState } from "react";
import { Form } from "antd";

import ProductContextCard from "../../../Utility/ProductContextCard.jsx";
import ProductDrawer from "../../../Utility/ProductDrawer.jsx";
import ProcessAccordion from "../../ProductionRecordAddInfo/accordion/ProcessAccordion.jsx";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import AddInfomationsTransferList from "../transferList/AddInfomationsTransferList.jsx";
import { useRecordAddInfo } from "../../../Context/RecordAddInfoProvider.jsx";
import { TransferListProvider } from "../../../Context/TransferListProvider.jsx";

import ProductGroupForm from "../../../Utility/ProductGroupForm.jsx";
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
function SectionsDialogTransferList({ type = "" }) {
  return (
    <TransferListProvider>
      <AddInfomationsTransferList type={type} />
    </TransferListProvider>
  );
}

function SectionsDialogAutoInput(params) {}

// 可控組建 裡面的資料是要靈活的
function ProcessSectionsDialog() {
  const { processDrawer, setProcessDrawer } = useRecordAddInfo();
  const [processName, setProcessName] = useState("XX-000-XXX");
  const [moldName, setMoldName] = useState("XX-000-XXX");
  const [form] = Form.useForm();

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("Submitted Values:", values);
      // closeDrawer(); // Close the drawer after successful submission
    } catch (error) {
      console.log("Validation Failed:", error);
    }
  };

  return (
    <Form form={form} initialValues={{ items }} layout="vertical">
      <ProductDrawer
        title="製程 1"
        visible={processDrawer}
        onClose={() => setProcessDrawer(false)}
        onSubmit={handleFormSubmit}
      >
        <div className="product-drawer__info">
          <div className="info__item">
            <TextField
              label="舊產品編號"
              value={processName}
              onChange={(e) => setProcessName(e.target.value)}
            />
          </div>

          <div className="info__item">
            <TextField
              label="製具編號"
              value={moldName}
              onChange={(e) => setMoldName(e.target.value)}
            />
          </div>
        </div>
        <ProductGroupForm items={items} form={form} />
        <SectionsDialogTransferList type="物料" />
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
