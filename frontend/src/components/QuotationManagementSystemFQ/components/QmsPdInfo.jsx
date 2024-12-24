/**
 * @file QmsPdInfo.jsx
 * @description QMS 產品資訊組件，負責處理產品基本資訊的顯示和編輯
 */

import React, { useCallback, useMemo } from "react";
import BaseProductInfoSection from "../../Global/sections/BaseProductInfoSection";
import { useGetCustomersQuery } from "../../QuotationManagementSystem/services/salesServices/endpoints/customerApi";
import { useGetProductListQuery } from "../services/factoryServices/endpoints/processApi";
import { LoadingSkeleton } from "./LoadingSkeleton";
import timeUtils from "../utility/timeUtils";

/*

src/
├── components/
│   └── QmsPdInfo/
│       ├── index.jsx              // 主組件
│       ├── constants.js           // 常量定義
│       ├── types.ts              // 類型定義
│       ├── utils.js              // 工具函數
│       └── components/           // 子組件
├── hooks/                        // 自定義 hooks
└── services/                     // API 服務
*/

//! =============== 1. 設定與常量 ===============
//* 欄位類型定義
const FIELD_TYPES = {
  INPUT: "input",
  AUTOCOMPLETE: "autocomplete",
  SELECT: "select",
};

//* 驗證規則配置
const FIELD_RULES = {
  PRODUCT_NAME: { required: "產品名稱是必填的" },
  CUSTOMER: { required: "請選擇至少一個客戶" },
  PRODUCT_NUMBER: { required: "產品序號是必填的" },
};

//! =============== 2. 類型與介面 ===============
/**
 * @typedef {Object} ProductInfo
 * @property {string} id - 產品 ID
 * @property {string} createDate - 建立日期
 * @property {string} productNumber - 產品編號
 * @property {string} productName - 產品名稱
 * @property {string} customerName - 客戶名稱
 * @property {string} productSN - 產品序號
 */

/**
 * @typedef {Object} FieldConfig
 * @property {string} type - 欄位類型
 * @property {string} name - 欄位名稱
 * @property {string} label - 欄位標籤
 * @property {Object} rules - 驗證規則
 * @property {Array} options - 選項列表
 * @property {Object} props - 組件屬性
 */

//! =============== 3. 核心功能 ===============
/**
 * @function createField
 * @description 創建表單欄位配置
 * @param {string} name - 欄位名稱
 * @param {string} label - 欄位標籤
 * @param {string} type - 欄位類型
 * @param {Object} props - 組件屬性
 * @param {Object} rules - 驗證規則
 * @param {Array} options - 選項列表
 * @param {Function} getDependentValues - 關聯值獲取函數
 * @returns {FieldConfig} 欄位配置 物件
 */
const createField = (
  name,
  label,
  type,
  props = {},
  rules = {},
  options = [],
  getDependentValues = null,
  disabled = false
) => ({
  type,
  name,
  label,
  rules,
  options,
  props,
  ...(getDependentValues && { getDependentValues }),
});

//! =============== 4. 工具函數 ===============
/**
 * @function createAutocompleteProps
 * @description 創建自動完成組件的屬性配置
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
 */
const createCustomerOptions = (customers = []) =>
  customers.map((customer, index) => ({
    key: index,
    value: customer.name,
    label: customer.name,
    id: index,
  }));

/**
 * @function createBaseFields
 * @description 創建基礎表單欄位配置
 */
const createBaseFields = (customers = [], productList = []) => [
  createField(
    "productName",
    "產品名稱",
    FIELD_TYPES.SELECT,
    {
      placeholder: "請選擇產品名稱",
    },
    FIELD_RULES.PRODUCT_NAME,
    productList?.map((product) => ({
      value: product.productName,
      label: product.productName,
      productSN: product.productSN,
    })) || [],
    (values, form) => {
      const selectedProduct = productList?.find(
        (p) => p.productName === values.productName
      );
      if (selectedProduct) {
        form.setValue("productSN", selectedProduct.productSN, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        });
      }
    }
  ),
  createField(
    "productSN",
    "產品編號",
    FIELD_TYPES.INPUT,
    {
      placeholder: "請輸入產品編號",
      disabled: true,
    },
    FIELD_RULES.PRODUCT_NUMBER
  ),
  createField(
    "customerName",
    "客戶名稱",
    FIELD_TYPES.AUTOCOMPLETE,
    createAutocompleteProps(),
    FIELD_RULES.CUSTOMER,
    createCustomerOptions(customers)
  ),
];

//! =============== 5. 主組件 ===============
/**
 * @component QmsPdInfo
 * @description 產品資訊展示與編輯組件
 */
const QmsPdInfo = React.memo(({ type, onUpdate, BusinessQuotationStore }) => {
  //* --------- Hooks ---------
  const {
    data: customers,
    isLoading: isLoadingCustomers,
    isSuccess: isSuccessCustomers,
    error: errorCustomers,
  } = useGetCustomersQuery();

  const {
    data: productList,
    isLoading: isLoadingProductList,
    isSuccess: isSuccessProductList,
  } = useGetProductListQuery();

  //* --------- Store Data ---------
  const { id, quotationSN, createDate, customerName, productName, productSN } =
    BusinessQuotationStore();

  //* --------- Memoized Values ---------
  const memoizedFields = useMemo(
    () => createBaseFields(customers?.data, productList?.data),
    [customers?.data, productList?.data]
  );

  const productInfo = useMemo(
    () => ({
      id,
      createDate: timeUtils.formatters.chineseDateTime(createDate),
      productNumber: quotationSN,
      productName,
      customerName,
      productSN,
    }),
    [id, createDate, quotationSN, productName, customerName, productSN]
  );

  //* --------- Render Functions ---------
  const renderInfo = useCallback((product) => {
    if (!product) return null;

    const fields = [
      { label: "建單日期", value: product.createDate },
      { label: "報價編號", value: product.productNumber },
      { label: "產品名稱", value: product.productName },
      { label: "產品編號", value: product.productSN },
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
  if (!isSuccessCustomers || !isSuccessProductList) {
    return <LoadingSkeleton />;
  }

  if (errorCustomers) {
    return <div>Error loading customer data</div>;
  }

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

export default QmsPdInfo;
