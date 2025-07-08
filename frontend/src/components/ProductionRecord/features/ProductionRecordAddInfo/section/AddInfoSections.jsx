import { useState } from "react";
import { useRecordAddInfo } from "../../../context/RecordAddInfoProvider.jsx";
import ProductContextCard from "../../../utility/ProductContextCard.jsx";
import ProductDrawer from "../../../utility/ProductDrawer.jsx";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import useNotification from "../../../hook/useNotification.js";
import { homeSlice } from "../../../slice/HomeSlice.jsx";
import { useProductActions } from "../../../service/endpoints/productApi.js";
import {
  ProductDrawerInfo,
  InfoItem,
  ProductInfoText,
} from "./AddInfoSections.styled";

function InfoSectionsDialog() {
  const {
    infoDrawer,
    setInfoDrawer,
    productData: [product],
  } = useRecordAddInfo();

  const { notifySuccess } = useNotification();
  const [oldPdNb, setOldPdNb] = useState("");
  const { data: productDatas } = homeSlice();

  const { handleUpdate } = useProductActions();

  async function handleConfirm() {
    if (!productDatas || !product) return;
    const updateData = { ...product, oldProductSN: oldPdNb };
    await handleUpdate([updateData]);
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
      <ProductDrawerInfo>
        <InfoItem>
          <span>產品編號</span>
          <p>{product.productSN}</p>
        </InfoItem>

        <InfoItem>
          <span>產品名稱</span>
          <p style={{ fontSize: 14, lineHeight: "20px" }}>
            {product.productName}
          </p>
        </InfoItem>

        <InfoItem>
          <span>客戶名稱</span>
          <p>{product.customerName}</p>
        </InfoItem>

        <InfoItem>
          <TextField
            label="舊產品編號"
            defaultValue={product.oldProductSN}
            onChange={(e) => setOldPdNb(e.target.value)}
          />
        </InfoItem>
      </ProductDrawerInfo>
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
          <ProductInfoText>
            <p>產品編號 : {product.productSN}</p>
            <p>舊產品編號 :{product.oldProductSN}</p>
            <p>產品名稱 : {product.productName} </p>
          </ProductInfoText>
          <InfoSectionsDialog />
        </>
      )}
    </ProductContextCard>
  );
}

export default InfoSections;
