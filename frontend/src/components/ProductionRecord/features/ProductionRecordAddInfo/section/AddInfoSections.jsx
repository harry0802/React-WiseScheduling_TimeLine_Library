import { useState } from "react";
import { useRecordAddInfo } from "../../../context/RecordAddInfoProvider.jsx";
import ProductContextCard from "../../../utility/ProductContextCard.jsx";
import ProductDrawer from "../../../utility/ProductDrawer.jsx";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import useNotification from "../../../hook/useNotification.js";

function InfoSectionsDialog() {
  const {
    infoDrawer,
    setInfoDrawer,
    productData: [product],
  } = useRecordAddInfo();

  const { notifySuccess } = useNotification();
  const [oldPdNb, setOldPdNb] = useState("");

  function handleChange(e) {
    setOldPdNb(e.target.value);
  }
  function handleConfirm() {
    setInfoDrawer(false);
    setTimeout(() => {
      notifySuccess();
    }, 100);
  }

  return (
    <ProductDrawer
      title="產品基本資料"
      visible={infoDrawer}
      onClose={() => setInfoDrawer(false)}
      onSubmit={() => handleConfirm()}
      disabled={oldPdNb === ""}
    >
      <div className="product-drawer__info">
        <div className="info__item">
          <span>產品編號</span>
          <p>{product.productSN}</p>
        </div>

        <div className="info__item">
          <span>產品名稱</span>
          <p style={{ fontSize: 14, lineHeight: "20px" }}>
            {product.productName}
          </p>
        </div>

        <div className="info__item">
          <span>客戶名稱</span>
          <p>{product.customerName}</p>
        </div>

        <div className="info__item">
          <TextField
            label="舊產品編號"
            defaultValue={product.oldProductSN}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
    </ProductDrawer>
  );
}

function InfoSections() {
  const {
    setInfoDrawer,
    productData: [product],
  } = useRecordAddInfo();
  return (
    <ProductContextCard
      OnClick={() => setInfoDrawer(true)}
      title="產品基本資料"
      icon={<EditIcon />}
    >
      {product && (
        <>
          <div className="product-info__text">
            <p>產品編號 : {product.productSN}</p>
            <p>舊產品編號 :{product.oldProductSN}</p>
            <p>產品名稱 : {product.productName} </p>
          </div>
          <InfoSectionsDialog />
        </>
      )}
    </ProductContextCard>
  );
}

export default InfoSections;
