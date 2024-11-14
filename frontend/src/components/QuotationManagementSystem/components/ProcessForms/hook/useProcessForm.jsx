import { useForm } from "react-hook-form";
import {
  FORM_CONFIGURATIONS,
  PROCESS_SELECTION_FORM,
  PROCESS_SUBTYPES,
} from "../../../config/processTypes";
import React from "react";
import { getFieldOptions } from "../utils/formUtils";
import { PROCESS_DATA_KEYS } from "../../../config/ProcessDataKeys";

// export const useProcessForm = ({ initialData, externalMethods }) => {
//   const methods =
//     externalMethods ||
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     useForm({
//       defaultValues: initialData?.processType
//         ? initialData
//         : { processType: initialData?.processType },
//     });

//   const { watch, setValue, reset } = methods;
//   const processType = watch("processType");
//   const activeTab = watch("activeTab") || 0;

//   // 表單配置
//   const formConfig = React.useMemo(
//     () => FORM_CONFIGURATIONS[processType] || {},
//     [processType]
//   );

//   // 製程子類型選項
//   const processSubtypeOptions = React.useMemo(
//     () => PROCESS_SUBTYPES[processType] || [],
//     [processType]
//   );

//   // 選擇欄位配置
//   const selectionFields = React.useMemo(() => {
//     return PROCESS_SELECTION_FORM[0].fields.map((field) => ({
//       ...field,
//       options: getFieldOptions(field, processSubtypeOptions),
//     }));
//   }, [processSubtypeOptions]);

//   // Tab 切換處理
//   const handleTabChange = React.useCallback(
//     (_, newValue) => {
//       setValue("activeTab", newValue);
//     },
//     [setValue]
//   );

//   // 製程類型變更處理
//   const handleProcessTypeChange = React.useCallback(
//     (newType) => {
//       if (!newType) return;

//       if (newType === initialData?.processType) {
//         reset(initialData);
//       } else {
//         reset({
//           processType: newType,
//           activeTab: 0,
//           processSubtype: "",
//         });
//       }
//     },
//     [initialData, reset]
//   );

//   // 清理効果
//   React.useEffect(() => {
//     return () => {
//       reset(initialData || {});
//     };
//   }, [reset, initialData]);

//   return {
//     methods,
//     processType,
//     activeTab,
//     formConfig,
//     selectionFields,
//     handleTabChange,
//     handleProcessTypeChange,
//   };
// };

export const useProcessForm = ({ initialData, externalMethods }) => {
  const methods =
    externalMethods ||
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useForm({
      defaultValues: initialData?.processType
        ? { processType: initialData.processType }
        : { processType: "" },
    });

  const { watch, setValue, reset, getValues } = methods;
  const processType = watch("processType");
  const activeTab = watch("activeTab") || 0;

  // 表單配置
  const formConfig = React.useMemo(
    () => FORM_CONFIGURATIONS[processType] || {},
    [processType]
  );

  // 製程子類型選項
  const processSubtypeOptions = React.useMemo(
    () => PROCESS_SUBTYPES[processType] || [],
    [processType]
  );

  // 選擇欄位配置
  const selectionFields = React.useMemo(() => {
    return PROCESS_SELECTION_FORM[0].fields.map((field) => ({
      ...field,
      options: getFieldOptions(field, processSubtypeOptions),
    }));
  }, [processSubtypeOptions]);

  // Tab 切換處理
  const handleTabChange = React.useCallback(
    (_, newValue) => {
      setValue("activeTab", newValue);
    },
    [setValue]
  );

  // 監聽 processType 變化並設置相應的值
  React.useEffect(() => {
    if (!processType) return;

    if (processType === initialData?.processType) {
      // 當 processType 匹配時，設置完整的初始數據
      Object.entries(initialData).forEach(([key, value]) => {
        setValue(key, value);
      });
    } else {
      // 當 processType 不匹配時，清空其他值
      const currentValues = getValues();
      Object.keys(currentValues).forEach((field) => {
        if (field === "processType") {
          setValue(field, processType);
        } else if (field === "activeTab") {
          setValue(field, 0);
        } else if (Object.values(PROCESS_DATA_KEYS).includes(field)) {
          setValue(field, []);
        } else if (field !== "id") {
          setValue(field, 0);
        }
      });
    }
  }, [processType, initialData, setValue, getValues]);

  // 清理時恢復初始數據
  React.useEffect(() => {
    return () => {
      if (initialData) {
        reset(initialData);
      }
    };
  }, [reset, initialData]);

  return {
    methods,
    processType,
    activeTab,
    formConfig,
    selectionFields,
    handleTabChange,
  };
};
