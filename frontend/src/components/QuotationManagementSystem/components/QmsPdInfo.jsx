import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import BaseProductInfoSection from "../../Global/sections/BaseProductInfoSection";
import { qmsHomeSlice } from "../slice/qmsHome";

const fields = [
  {
    type: "input",
    name: "productNumber",
    label: "產品序號",
    rules: { required: "產品序號是必填的" },
    props: { placeholder: "請輸入產品序號" },
  },
  {
    type: "input",
    name: "productName",
    label: "產品名稱",
    rules: { required: "產品名稱是必填的" },
    props: { placeholder: "請輸入產品名稱" },
  },
  {
    type: "autocomplete",
    name: "customerName",
    label: "客戶名稱",
    options: [
      { value: "clientA", label: "客戶A" },
      { value: "clientB", label: "客戶B" },
      { value: "clientC", label: "客戶C" },
      { value: "clientD", label: "客戶D" },
    ],
    rules: { required: "請選擇至少一個客戶" },
    props: {
      getOptionLabel: (option) => option.label || option,
      isOptionEqualToValue: (option, value) =>
        option.value === value || option === value,
    },
  },
];

function QmsPdInfo() {
  const { data } = qmsHomeSlice();
  const { productId } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({});

  const handleUpdate = useCallback((formData) => {
    console.log("Form Data:", formData);
    setProductData((prev) => ({
      ...prev,
      ...formData,
      customerName:
        formData.customerName && typeof formData.customerName === "object"
          ? formData.customerName.label
          : formData.customerName,
    }));
    // 這裡可以添加其他更新邏輯，比如發送API請求
  }, []);

  useEffect(() => {
    if (data === null || !productId) {
      navigate("/QuotationManagementSystem");
    } else {
      const [product] = data?.filter((item) => item.id === productId) || [];
      if (product) {
        setProductData(product);
      }
    }
  }, [productId, data, navigate]);

  return (
    <BaseProductInfoSection
      product={productData}
      onUpdate={handleUpdate}
      title="產品詳情"
    >
      <BaseProductInfoSection.Info
        render={(product) => (
          <>
            {product && (
              <>
                <p>
                  <strong>產品序號:</strong> {product.productNumber}
                </p>
                <p>
                  <strong>產品名稱:</strong> {product.productName}
                </p>
                <p>
                  <strong>客戶名稱:</strong> {product.customerName}
                </p>
              </>
            )}
          </>
        )}
      />
      <BaseProductInfoSection.Drawer title="產品詳情">
        <BaseProductInfoSection.Form formFields={fields} />
      </BaseProductInfoSection.Drawer>
    </BaseProductInfoSection>
  );
}

export default QmsPdInfo;
