import { useState } from "react";
import { useRecordAddInfo } from "../../../Context/RecordAddInfoProvider.jsx";
import ProductContextCard from "../../../Utility/ProductContextCard.jsx";
import ProductDrawer from "../../../Utility/ProductDrawer.jsx";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";

function InfoSectionsDialog() {
  const { infoDrawer, setInfoDrawer } = useRecordAddInfo();
  const [oldPdNb, setOldPdNb] = useState("Hello World");

  function handleChange(e) {
    setOldPdNb(e.target.value);
  }

  return (
    <ProductDrawer
      title="產品基本資料"
      visible={infoDrawer}
      onClose={() => setInfoDrawer(false)}
    >
      <div className="product-drawer__info">
        <div className="info__item">
          <span>產品編號</span>
          <p>XX-000-XXX</p>
        </div>

        <div className="info__item">
          <span>產品名稱</span>
          <p style={{ fontSize: 14, lineHeight: "20px" }}>
            產品名稱字數請簡短，並且標題重點書寫明確以便後續好管理與閱讀
          </p>
        </div>

        <div className="info__item">
          <span>客戶名稱</span>
          <p>我是客戶名稱</p>
        </div>

        <div className="info__item">
          <TextField
            label="舊產品編號"
            value={oldPdNb}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
    </ProductDrawer>
  );
}

function InfoSections() {
  const { setInfoDrawer } = useRecordAddInfo();
  return (
    <ProductContextCard
      OnClick={() => setInfoDrawer(true)}
      title="產品基本資料"
      icon={<EditIcon />}
    >
      <div className="product-info__text">
        <p>產品編號 : </p>
        <p>舊產品編號 : </p>
        <p>產品名稱:　</p>
      </div>
      <InfoSectionsDialog />
    </ProductContextCard>
  );
}

export default InfoSections;
