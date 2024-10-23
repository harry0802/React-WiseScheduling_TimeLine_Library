import React, { createContext, useContext, useState, useCallback } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ProductContextCard from "../../ProductionRecord/utility/ProductContextCard.jsx";
import useNotification from "../../ProductionRecord/hook/useNotification.js";
import BaseDrawer from "../Drawer/BaseDrawer.jsx";
import DynamicForm from "../form/DynamicForm.jsx";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
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
  const [infoDrawer, setInfoDrawer] = useState(false);
  const methods = useForm({ defaultValues: product });
  const { notifySuccess, notifyError } = useNotification();

  const openDrawer = useCallback(() => {
    methods.reset(product); // 打開抽屜時重置表單
    setInfoDrawer(true);
  }, [methods, product]);

  const closeDrawer = () => setInfoDrawer(false);

  const handleConfirm = useCallback(
    async (formData) => {
      try {
        if (customValidation && !customValidation(formData)) {
          throw new Error("自定義驗證失敗");
        }
        await onUpdate(formData);
        closeDrawer();
        notifySuccess("更新成功");
      } catch (error) {
        console.error("提交失敗:", error);
        notifyError(error.message || "更新失敗");
      }
    },
    [customValidation, onUpdate, closeDrawer, notifySuccess, notifyError]
  );

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
      <FormProvider {...methods}>
        <ProductContextCard OnClick={openDrawer} title={title} icon={icon}>
          {children}
        </ProductContextCard>
      </FormProvider>
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
  const { openDrawer } = useContext(ProductInfoContext);
  return (
    <ProductInfo>
      <BaseTable columns={columns} data={data} onRowClick={openDrawer} />
    </ProductInfo>
  );
}

// Drawer 子組件
function Drawer({ title, children }) {
  const { infoDrawer, closeDrawer, handleConfirm } =
    useContext(ProductInfoContext);
  const methods = useFormContext();

  const onSubmit = useCallback(() => {
    methods.handleSubmit(handleConfirm)();
  }, [methods, handleConfirm]);

  return (
    <BaseDrawer visible={infoDrawer} onClose={closeDrawer}>
      <BaseDrawer.Header>{title}</BaseDrawer.Header>
      <BaseDrawer.Body>{children}</BaseDrawer.Body>
      <BaseDrawer.Footer onSubmit={onSubmit} />
    </BaseDrawer>
  );
}

// Form 子組件
function Form({ formFields }) {
  const { methods, product } = useContext(ProductInfoContext);

  return (
    <DynamicForm externalMethods={methods}>
      {formFields.map((field, index) => (
        <DynamicForm.Field key={index} field={field} initialValues={product} />
      ))}
    </DynamicForm>
  );
}

// 將子組件添加到 BaseProductInfoSection
BaseProductInfoSection.Info = Info;
BaseProductInfoSection.Table = Table;
BaseProductInfoSection.Drawer = Drawer;
BaseProductInfoSection.Form = Form;
export default BaseProductInfoSection;
