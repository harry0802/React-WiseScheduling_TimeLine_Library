import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
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
    methods.reset(product); // 打開抽屜重置表單
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
        notifySuccess("更新成功");
      } catch (error) {
        console.error("提交失敗:", error);
        notifyError(error.message || "更新失敗");
      } finally {
        closeDrawer();
      }
    },
    [customValidation, onUpdate, closeDrawer, notifySuccess, notifyError]
  );

  const contextValue = useMemo(
    () => ({
      product,
      openDrawer,
      closeDrawer,
      handleConfirm,
      infoDrawer,
      config,
      editingItem,
      methods,
    }),
    [
      product,
      openDrawer,
      closeDrawer,
      handleConfirm,
      infoDrawer,
      config,
      editingItem,
      methods,
    ]
  );

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

// Table 子組�� 處理表格類別
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
  const methods = useFormContext();
  const { product } = useContext(ProductInfoContext);

  // 1. 優化需要監聽的欄位
  const watchedFields = useMemo(
    () =>
      formFields
        .filter((field) => field.getDependentValues)
        .map((field) => field.name),
    [formFields]
  );

  // 2. 使用 ref 來追踪上一次的值
  const previousValuesRef = useRef({});

  // 3. 優化更新函數，增加值比較
  const updateDependentValues = useCallback(
    (currentValues) => {
      // 檢查值是否真的改變
      const hasChanged = Object.entries(currentValues).some(
        ([key, value]) => previousValuesRef.current[key] !== value
      );

      if (!hasChanged) return;

      const allValues = methods.getValues();
      formFields.forEach((field) => {
        if (field.getDependentValues) {
          field.getDependentValues(
            {
              ...allValues,
              ...currentValues,
            },
            methods
          );
        }
      });

      // 更新 ref
      previousValuesRef.current = { ...currentValues };
    },
    [formFields, methods]
  );

  // 4. 使用 useRef 來防止首次渲染時觸發
  const isFirstRender = useRef(true);

  // 5. 只監聽需要的欄位值變化
  const formValues = methods.watch(watchedFields);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (Object.keys(formValues).length > 0) {
      updateDependentValues(formValues);
    }
  }, [formValues, updateDependentValues]);

  // 6. 優化 onChange handler
  const handleFieldChange = useCallback(
    (field, value) => {
      const prevValue = methods.getValues(field.name);
      if (prevValue === value) return;

      methods.setValue(field.name, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });

      if (field.getDependentValues) {
        const allValues = methods.getValues();
        field.getDependentValues(
          {
            ...allValues,
            [field.name]: value,
          },
          methods
        );
      }
    },
    [methods]
  );

  return (
    <DynamicForm externalMethods={methods}>
      {formFields.map((field, index) => (
        <DynamicForm.Field
          key={`${field.name}-${index}`}
          field={field}
          methods={methods}
          initialValues={product}
          value={methods.watch(field.name)}
          onChange={(value) => handleFieldChange(field, value)}
        />
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
