import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BaseProductInfoSection from "../../Global/sections/BaseProductInfoSection";
import { useFactoryHomeSlice, useSalesHomeSlice } from "../slice/qmsHome";
import { useGetCustomersQuery } from "../services/endpoints/customerApi";

//  包裝成為函數 帶入 async 的資料
const fields = (customers) => {
  return [
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
      options: customers?.map((customer, index) => ({
        value: customer.name,
        label: customer.name,
        id: index, // 確保每個選項有唯一識別碼
      })),
      rules: { required: "請選擇至少一個客戶" },
      props: {
        getOptionLabel: (option) => {
          if (typeof option === "string") return option;

          return option?.label || "";
        },
        isOptionEqualToValue: (option, value) => {
          if (!option || !value) return false;
          if (typeof value === "string") return option.value === value;
          return option.value === value.value;
        },
      },
    },
  ];
};

function QmsPdInfo({ type, productData, onUpdate }) {
  console.log("🚀 ~ QmsPdInfo ~ productData:", productData);
  const useSlice = type === "sales" ? useSalesHomeSlice : useFactoryHomeSlice;
  const { data } = useSlice();

  const {
    data: customers,
    isLoading: isLoadingCustomers,
    isSuccess: isSuccessCustomers,
    error: errorCustomers,
  } = useGetCustomersQuery();

  // 使用 useMemo 緩存 fields
  const memoizedFields = useMemo(
    () => fields(customers?.data),
    [customers?.data]
  );

  // 優化 render 函數,避免不必要重繪
  const renderInfo = useCallback(
    (product) =>
      product ? (
        <>
          <p>
            <strong>產品序號:</strong> {product.productNumber ?? ""}
          </p>
          <p>
            <strong>產品名稱:</strong> {product.productName ?? ""}
          </p>
          <p>
            <strong>客戶名稱:</strong> {product.customerName ?? ""}
          </p>
        </>
      ) : null,
    []
  );

  // 等待資料完全載入
  if (isLoadingCustomers) return <div>載入中...</div>;
  if (errorCustomers) return <div>載入失敗: {errorCustomers.message}</div>;
  if (!customers?.data?.length) return <div>無客戶資料</div>;

  return (
    <BaseProductInfoSection
      product={productData?.data}
      onUpdate={onUpdate}
      title="產品詳情"
    >
      <BaseProductInfoSection.Info render={renderInfo} />
      <BaseProductInfoSection.Drawer title="產品詳情">
        {isSuccessCustomers && (
          <>
            <BaseProductInfoSection.Form formFields={memoizedFields} />
          </>
        )}
      </BaseProductInfoSection.Drawer>
    </BaseProductInfoSection>
  );
}

export default QmsPdInfo;
