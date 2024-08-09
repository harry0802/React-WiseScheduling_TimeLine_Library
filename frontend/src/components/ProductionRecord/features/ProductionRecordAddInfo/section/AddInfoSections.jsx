import { useEffect, useState } from "react";
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
  const [oldPdNb, setOldPdNb] = useState(
    product.oldProductNumber || "Hello World"
  );
  const [tempOldPdNb, setTempOldPdNb] = useState(oldPdNb);

  function handleChange(e) {
    setTempOldPdNb(e.target.value);
  }
  function handleConfirm() {
    setOldPdNb(tempOldPdNb);
    setInfoDrawer(false);
    notifySuccess();
  }

  useEffect(() => {
    if (!infoDrawer && oldPdNb !== tempOldPdNb) {
      setTempOldPdNb(oldPdNb);
    }
  }, [infoDrawer, oldPdNb, tempOldPdNb]);
  return (
    <ProductDrawer
      title="產品基本資料"
      visible={infoDrawer}
      onClose={() => setInfoDrawer(false)}
      onSubmit={() => handleConfirm()}
      disabled={oldPdNb === tempOldPdNb}
    >
      <div className="product-drawer__info">
        <div className="info__item">
          <span>產品編號</span>
          <p>{product.productNumber}</p>
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
            value={tempOldPdNb}
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
            <p>產品編號 : {product.productNumber}</p>
            <p>舊產品編號 :{product.oldProductNumber}</p>
            <p>產品名稱 : {product.productName} 　</p>
          </div>
          <InfoSectionsDialog />
        </>
      )}
    </ProductContextCard>
  );
}

export default InfoSections;
