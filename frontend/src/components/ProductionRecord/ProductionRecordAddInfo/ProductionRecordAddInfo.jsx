import ProductContent from "../Utility/ProductContent.jsx";
import ProductContextCard from "../Utility/ProductContextCard.jsx";
import AddInfoSections from "../ProductionRecordAddInfo/AddInfoSections.jsx";
import AddIcon from "@mui/icons-material/Add";
import ProductDrawer from "../Utility/ProductDrawer.jsx";
import TextField from "@mui/material/TextField";

import AddInfomationsTransferList from "./transferList/AddInfomationsTransferList.jsx";

import { useRecordAddInfo } from "../ProductionRecordContext/RecordAddInfoProvider.jsx";
import { TransferListProvider } from "../ProductionRecordContext/TransferListProvider.jsx";

import { useState } from "react";

function ProcessSectionsDialog() {
  const { processDrawer, setProcessDrawer } = useRecordAddInfo();
  const [processName, setProcessName] = useState("XX-000-XXX");
  const [moldName, setMoldName] = useState("XX-000-XXX");

  return (
    <TransferListProvider>
      <ProductDrawer
        title="製程 1"
        visible={processDrawer}
        onClose={() => setProcessDrawer(false)}
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

        <AddInfomationsTransferList />
      </ProductDrawer>
    </TransferListProvider>
  );
}

function ProcessSections() {
  const { setProcessDrawer } = useRecordAddInfo();
  // 放置製程內容
  return (
    <ProductContextCard
      OnClick={() => setProcessDrawer(true)}
      icon={<AddIcon />}
      title="製程順序與物料需求對應"
    >
      <ProcessSectionsDialog />
    </ProductContextCard>
  );
}

function ProductionRecordAddInfo() {
  return (
    <div>
      <ProductContent title="新增產品資訊">
        <AddInfoSections />
        <ProcessSections />
      </ProductContent>
    </div>
  );
}

export default ProductionRecordAddInfo;
