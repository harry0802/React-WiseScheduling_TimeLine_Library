import { useNavigate, useParams } from "react-router-dom";
import BaseProductInfoSection from "../../Global/sections/BaseProductInfoSection";
import { qmsHomeSlice } from "../slice/qmsHome";
import { useEffect, useState } from "react";

const fields = [
  {
    type: "input",
    name: "productNumber",
    label: "產品序號",
    rules: { required: "Name is required" },
    props: { placeholder: "請輸入產品序號" },
  },
  {
    type: "input",
    name: "productName",
    label: "產品名稱",
    rules: { required: "Name is required" },
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
    rules: { required: "Please select at least one customer" },
  },
];

function QmsPdInfo() {
  const { data } = qmsHomeSlice();
  const { productId } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState([]);

  const handleUpdate = async (formData) => {
    console.log(formData);

    setProductData((prev) => ({
      ...prev,
      customerName: formData.customerName.label
        ? formData.customerName.label
        : formData.customerName,
    }));
  };

  if (data === null || !productId) navigate("/QuotationManagementSystem");

  useEffect(() => {
    (function () {
      const [product] = data?.filter((item) => item.id === productId);
      setProductData(product);
    })();
  }, [productId, data]);
  return (
    <BaseProductInfoSection
      product={productData}
      onUpdate={handleUpdate}
      title="產品詳情"
      // customValidation={(formData) => formData.oldProductSN.length > 0}
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
        <BaseProductInfoSection.Form
          initialValues={{
            productName: productData.productName,
            productNumber: productData.productNumber,
            customerName: productData.customerName,
          }}
          formFields={fields}
        />
      </BaseProductInfoSection.Drawer>
    </BaseProductInfoSection>
  );
}

export default QmsPdInfo;
