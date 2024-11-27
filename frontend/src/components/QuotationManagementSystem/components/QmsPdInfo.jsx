import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BaseProductInfoSection from "../../Global/sections/BaseProductInfoSection";
import { useFactoryHomeSlice, useSalesHomeSlice } from "../slice/qmsHome";
import { useGetCustomersQuery } from "../services/salesServices/endpoints/customerApi";

// Constants
const FIELD_TYPES = {
  INPUT: "input",
  AUTOCOMPLETE: "autocomplete",
};

const FIELD_RULES = {
  PRODUCT_NAME: { required: "產品名稱是必填的" },
  CUSTOMER: { required: "請選擇至少一個客戶" },
  PRODUCT_NUMBER: { required: "產品序號是必填的" },
};

// Helper Functions
const createAutocompleteProps = () => ({
  getOptionLabel: (option) =>
    typeof option === "string" ? option : option?.label ?? "",
  isOptionEqualToValue: (option, value) => {
    if (!option || !value) return false;
    const compareValue = typeof value === "string" ? value : value.value;
    return option.value === compareValue;
  },
});

const createCustomerOptions = (customers = []) =>
  customers.map((customer, index) => ({
    key: index,
    value: customer.name,
    label: customer.name,
    id: index,
  }));

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

const createProductNumberField = () => ({
  type: FIELD_TYPES.INPUT,
  name: "productNumber",
  label: "產品序號",
  rules: FIELD_RULES.PRODUCT_NUMBER,
  props: { placeholder: "請輸入產品序號" },
});

const getFields = (customers = [], type) => {
  const fields = createBaseFields(customers);
  return type !== "sales" ? [createProductNumberField(), ...fields] : fields;
};

const QmsPdInfo = React.memo(({ type, onUpdate, BusinessQuotationStore }) => {
  // Hooks
  const useSlice = type === "sales" ? useSalesHomeSlice : useFactoryHomeSlice;
  const { data } = useSlice();
  const {
    data: customers,
    isLoading: isLoadingCustomers,
    error: errorCustomers,
  } = useGetCustomersQuery();

  // Store Data
  const { id, quotationSN, createDate, customerName, productName } =
    BusinessQuotationStore();

  // Memoized Values
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

  // Render Functions
  const renderInfo = useCallback((product) => {
    if (!product) return null;

    const fields = [
      { label: "產品序號", value: product.productNumber },
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

  // Loading State
  if (isLoadingCustomers) {
    return <div>Loading...</div>;
  }

  // Error State
  if (errorCustomers) {
    return <div>Error loading customer data</div>;
  }

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
