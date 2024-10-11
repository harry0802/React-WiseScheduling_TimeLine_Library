import React, { createContext, useContext, useState, useCallback } from "react";
import EditIcon from "@mui/icons-material/Edit";
import styled from "styled-components";
import ProductContextCard from "../../ProductionRecord/utility/ProductContextCard.jsx";
import useNotification from "../../ProductionRecord/hook/useNotification.js";
import BaseDrawer from "../Drawer/BaseDrawer.jsx";
import DynamicForm from "../form/DynamicForm.jsx";
import { useForm } from "react-hook-form";
// 樣式組件
const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: self-start;
  color: var(--palette-text-primary);
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 1.25rem;
  border-radius: 4px;
  width: 100%;
`;

const ProductInfoText = styled.div`
  height: 100%;
  font-size: 0.875rem;

  > p:not(:first-child) {
    margin-top: 1.25rem;
  }
`;
// 創建上下文
const ProductInfoContext = createContext();

// 主要的 BaseProductInfoSection 組件
function BaseProductInfoSection({
  product,
  onUpdate,
  title = "產品基本資料",
  icon = <EditIcon />,
  children,
  customValidation,
  config,
  editingItem,
}) {
  const [infoDrawer, setInfoDrawerState] = useState(false);
  const { notifySuccess } = useNotification();
  const methods = useForm();
  const openDrawer = () => setInfoDrawerState(true);
  const closeDrawer = () => setInfoDrawerState(false);

  const handleConfirm = useCallback(async () => {
    const formData = methods.getValues();
    console.log(formData);

    if (customValidation ? customValidation(formData) : true) {
      await onUpdate(formData);
      closeDrawer();
      setTimeout(() => notifySuccess(), 100);
    }
  }, [methods, customValidation, onUpdate, closeDrawer, notifySuccess]);

  const contextValue = {
    product,
    openDrawer,
    closeDrawer,
    handleConfirm,
    infoDrawer,
    config,
    editingItem,
    methods,
  };

  return (
    <ProductInfoContext.Provider value={contextValue}>
      <ProductContextCard OnClick={openDrawer} title={title} icon={icon}>
        {children}
      </ProductContextCard>
    </ProductInfoContext.Provider>
  );
}

// Info 子組件
function Info({ render }) {
  const { product } = useContext(ProductInfoContext);

  return (
    <ProductInfo>
      <ProductInfoText>{product && render(product[0])}</ProductInfoText>
    </ProductInfo>
  );
}

// Drawer 子組件
function Drawer({ children }) {
  const { infoDrawer, closeDrawer, handleConfirm, methods } =
    useContext(ProductInfoContext);

  const onSubmit = (e) => {
    e.preventDefault();
    methods.handleSubmit(handleConfirm)();
  };

  return (
    <BaseDrawer visible={infoDrawer} onClose={closeDrawer}>
      <BaseDrawer.Header>產品詳情</BaseDrawer.Header>
      <BaseDrawer.Body>{children}</BaseDrawer.Body>
      <BaseDrawer.Footer onSubmit={onSubmit} />
    </BaseDrawer>
  );
}

// Form 子組件
function Form({ form, formFields, initialValues }) {
  const { methods } = useContext(ProductInfoContext);

  return (
    <DynamicForm
      externalMethods={methods}
      form={form}
      fields={formFields}
      initialValues={initialValues}
      submitButton={false}
    >
      {() => (
        <>
          {formFields.map((field, index) => (
            <DynamicForm.Field key={index} field={field} />
          ))}
        </>
      )}
    </DynamicForm>
  );
}

// 將子組件添加到 BaseProductInfoSection
BaseProductInfoSection.Info = Info;
BaseProductInfoSection.Drawer = Drawer;
BaseProductInfoSection.Form = Form;
export default BaseProductInfoSection;
