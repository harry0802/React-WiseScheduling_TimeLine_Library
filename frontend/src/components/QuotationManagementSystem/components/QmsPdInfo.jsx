/**
 * @file QmsPdInfo.jsx
 * @description QMS 產品資訊組件，處理產品基本資訊的顯示和編輯
 */

import React, { useCallback, useMemo } from "react";
import BaseProductInfoSection from "../../Global/sections/BaseProductInfoSection";
import { useGetCustomersQuery } from "../services/salesServices/endpoints/customerApi";
import { LoadingSkeleton } from "./LoadingSkeleton";

//! =============== 1. 設定與常量 ===============
const FIELD_TYPES = {
  INPUT: "input",
  AUTOCOMPLETE: "autocomplete",
};

const FIELD_RULES = {
  PRODUCT_NAME: { required: "產品名稱是必填的" },
  CUSTOMER: { required: "請選擇至少一個客戶" },
  PRODUCT_NUMBER: { required: "產品序號是必填的" },
};

//! =============== 2. 工具函數 ===============
/**
 * @function createAutocompleteProps
 * @description 創建自動完成組件的屬性
 * @returns {Object} 自動完成組件屬性配置
 */
const createAutocompleteProps = () => ({
  getOptionLabel: (option) =>
    typeof option === "string" ? option : option?.label ?? "",
  isOptionEqualToValue: (option, value) => {
    if (!option || !value) return false;
    const compareValue = typeof value === "string" ? value : value.value;
    return option.value === compareValue;
  },
});

/**
 * @function createCustomerOptions
 * @description 將客戶數據轉換為下拉選項格式
 * @param {Array} customers - 客戶數據列表
 * @returns {Array} 格式化後的選項列表
 */
const createCustomerOptions = (customers = []) =>
  customers.map((customer, index) => ({
    key: index,
    value: customer.name,
    label: customer.name,
    id: index,
  }));

//! =============== 3. 欄位配置 ===============
/**
 * @function createBaseFields
 * @description 創建基礎表單欄位配置
 * @param {Array} customers - 客戶數據列表
 * @returns {Array} 表單欄位配置
 */
const createBaseFields = (customers = []) => [
  {
    type: FIELD_TYPES.INPUT,
    name: "productName",
    label: "產品名稱",
    rules: FIELD_RULES.PRODUCT_NAME,
    props: { placeholder: "請輸入產品名稱" },
  },
  {
    type: FIELD_TYPES.AUTOCOMPLETE,
    name: "customerName",
    label: "客戶名稱",
    options: createCustomerOptions(customers),
    rules: FIELD_RULES.CUSTOMER,
    props: createAutocompleteProps(),
  },
];

/**
 * @function createProductNumberField
 * @description 創建產品序號欄位配置
 * @returns {Object} 產品序號欄位配置
 */
const createProductNumberField = () => ({
  type: FIELD_TYPES.INPUT,
  name: "productNumber",
  label: "產品序號",
  rules: FIELD_RULES.PRODUCT_NUMBER,
  props: { placeholder: "請輸入產品序號" },
});

/**
 * @function getFields
 * @description 根據類型獲取表單欄位配置
 * @param {Array} customers - 客戶數據列表
 * @param {string} type - 業務類型
 * @returns {Array} 表單欄位列表
 */
const getFields = (customers = [], type) => {
  const fields = createBaseFields(customers);
  return type !== "sales" ? [createProductNumberField(), ...fields] : fields;
};

//! =============== 4. 主組件 ===============
/**
 * @component QmsPdInfo
 * @description 產品資訊展示與編輯組件
 */
const QmsPdInfo = React.memo(({ type, onUpdate, BusinessQuotationStore }) => {
  //* --------- Hooks ---------

  const {
    data: customers,
    isLoading: isLoadingCustomers,
    error: errorCustomers,
  } = useGetCustomersQuery();

  //* --------- Store Data ---------
  const { id, quotationSN, createDate, customerName, productName } =
    BusinessQuotationStore();

  //* --------- Memoized Values ---------
  const memoizedFields = useMemo(
    () => getFields(customers?.data, type),
    [customers?.data, type]
  );

  const productInfo = useMemo(
    () => ({
      id,
      createDate,
      productNumber: quotationSN,
      productName,
      customerName,
    }),
    [id, createDate, quotationSN, productName, customerName]
  );

  //* --------- Render Functions ---------
  const renderInfo = useCallback((product) => {
    if (!product) return null;

    const fields = [
      { label: "產品編號", value: product.productNumber },
      { label: "產品名稱", value: product.productName },
      { label: "客戶名稱", value: product.customerName },
    ].filter(Boolean);

    return fields.map(({ label, value }) => (
      <p key={label} className="mb-2">
        <strong className="mr-2">{label}:</strong>
        <span>{value ?? ""}</span>
      </p>
    ));
  }, []);

  //* --------- Loading & Error States ---------
  if (isLoadingCustomers) return <LoadingSkeleton />;
  if (errorCustomers) return <div>Error loading customer data</div>;

  //* --------- Render ---------
  return (
    <BaseProductInfoSection
      product={productInfo}
      onUpdate={onUpdate}
      title="產品詳情"
    >
      <BaseProductInfoSection.Info render={renderInfo} />
      <BaseProductInfoSection.Drawer title="產品詳情">
        <BaseProductInfoSection.Form formFields={memoizedFields} />
      </BaseProductInfoSection.Drawer>
    </BaseProductInfoSection>
  );
});

QmsPdInfo.displayName = "QmsPdInfo";

export default QmsPdInfo;
