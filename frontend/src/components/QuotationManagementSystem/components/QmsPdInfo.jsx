import { useNavigate, useParams } from "react-router-dom";
import BaseProductInfoSection from "../../Global/sections/BaseProductInfoSection";
import { qmsHomeSlice } from "../slice/qmsHome";
import { useEffect, useState } from "react";
import { Form } from "antd";

const fields = [
  {
    type: "input",
    name: "productNumber",
    label: "產品序號",
    rules: { required: "請輸入產品序號" },
    props: { placeholder: "請輸入產品序號" },
  },
  {
    type: "input",
    name: "username",
    label: "用戶名",
    rules: { required: "請輸入用戶名" },
    props: { placeholder: "請輸入用戶名" },
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
  },
];

function QmsPdInfo() {
  const { data } = qmsHomeSlice();
  const { productId } = useParams();
  const navigate = useNavigate();

  const [form] = Form.useForm();

  if (data === null || !productId) navigate("/ProductionRecordPage");
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    (function () {
      const product = data?.filter((item) => item.id === productId);
      setProductData(product);
    })();
  }, [productId, data]);
  return (
    <BaseProductInfoSection
      product={productData}
      //   onUpdate={handleUpdate}
      title="產品詳情"
      customValidation={(formData) => formData.oldProductSN.length > 0}
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
      <BaseProductInfoSection.Drawer>
        <BaseProductInfoSection.Form form={form} formFields={fields} />
      </BaseProductInfoSection.Drawer>
    </BaseProductInfoSection>
  );
}

export default QmsPdInfo;
