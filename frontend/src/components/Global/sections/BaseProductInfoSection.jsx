import React, { createContext, useContext, useState, useCallback } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ProductContextCard from "../../ProductionRecord/utility/ProductContextCard.jsx";
import useNotification from "../../ProductionRecord/hook/useNotification.js";
import BaseDrawer from "../Drawer/BaseDrawer.jsx";
import DynamicForm from "../form/DynamicForm.jsx";
import { useForm } from "react-hook-form";
import BaseTable from "../table/BaseTable.jsx";
import { ProductInfo, ProductInfoText } from "./SectionsStyled.jsx";
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
  const methods = useForm();
  const openDrawer = () => setInfoDrawerState(true);
  const closeDrawer = () => setInfoDrawerState(false);
  const { notifySuccess } = useNotification();

  const handleConfirm = useCallback(async () => {
    const formData = methods.getValues();
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

// Info 子組件 處理文字類別
function Info({ render }) {
  const { product } = useContext(ProductInfoContext);

  return (
    <ProductInfo>
      <ProductInfoText>{product && render(product)}</ProductInfoText>
    </ProductInfo>
  );
}

// Table 子組件 處理表格類別
function Table({ columns, data }) {
  const { product, openDrawer } = useContext(ProductInfoContext);

  return (
    <ProductInfo>
      <BaseTable columns={columns} data={data} onRowClick={openDrawer} />
    </ProductInfo>
  );
}

// Drawer 子組件
function Drawer({ title, children }) {
  const { infoDrawer, closeDrawer, handleConfirm, methods } =
    useContext(ProductInfoContext);

  const onSubmit = (e) => {
    e.preventDefault();
    methods.handleSubmit(handleConfirm)();
  };

  return (
    <BaseDrawer visible={infoDrawer} onClose={closeDrawer}>
      <BaseDrawer.Header>{title}</BaseDrawer.Header>
      <BaseDrawer.Body>{children}</BaseDrawer.Body>
      <BaseDrawer.Footer onSubmit={onSubmit} />
    </BaseDrawer>
  );
}

// Form 子組件
function Form({ formFields, initialValues }) {
  const { methods } = useContext(ProductInfoContext);

  return (
    <DynamicForm
      externalMethods={methods}
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
BaseProductInfoSection.Table = Table;
BaseProductInfoSection.Drawer = Drawer;
BaseProductInfoSection.Form = Form;
export default BaseProductInfoSection;
