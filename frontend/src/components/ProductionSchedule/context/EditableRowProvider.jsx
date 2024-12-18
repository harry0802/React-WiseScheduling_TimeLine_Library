import React, { createContext, useContext } from "react";
import { Form } from "antd";

// 定義 Context
const EditableContext = createContext(null);

// 定義 Provider 元件
export const EditableProvider = ({ children }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        {children}
      </EditableContext.Provider>
    </Form>
  );
};

// 創建自訂 Hook
export const useEditableForm = () => {
  return useContext(EditableContext);
};
