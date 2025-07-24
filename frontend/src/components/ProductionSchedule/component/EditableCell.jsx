import React, { useCallback, useEffect, useRef, useState } from "react";
import { useEditableForm } from "../context/EditableRowProvider";
import { Form, Input, AutoComplete } from "antd";
import { REACT_APP_LY_ERP_ON } from "../../../config/config";

/**
 * @description 創建一個包裝過的儲存函式，統一處理表單驗證和欄位值提取。
 * @param {import('antd').FormInstance} form - Ant Design 的表單實例。
 * @param {function(): void} toggleEdit - 用於切換編輯狀態的函式。
 * @param {object} record - 當前行的資料記錄。
 * @returns {(saveFunction: (values: object) => void) => Promise<void>} - 回傳一個非同步函式，它接收一個實際的儲存處理器。
 * @example
 * const handleSaveWrapper = useSaveWrapper(form, toggleEdit, record);
 * await handleSaveWrapper(myActualSaveLogic);
 */
function useSaveWrapper(form, toggleEdit, record) {
  //* 使用 useCallback 確保回傳的函式在依賴項不變時保持穩定。
  return useCallback(
    async (saveFunction) => {
      try {
        //! 步驟 1: 驗證表單所有欄位
        const values = await form.validateFields();
        //! 步驟 2: 驗證通過後，關閉編輯模式
        toggleEdit();
        //! 步驟 3: 呼叫外部傳入的儲存函式，並合併原記錄和新數值
        saveFunction({ ...record, ...values });
      } catch (errInfo) {
        //? 如果驗證失敗，在控制台印出錯誤，以便除錯。
        console.error("Save failed:", errInfo);
      }
    },
    [form, toggleEdit, record]
  );
}

/**
 * @description 根據 dataIndex 渲染對應的表單輸入元件（一般 Input 或 AutoComplete）。
 * @param {object} props - 組件 props。
 * @param {string} props.dataIndex - 資料欄位的鍵值。
 * @param {object} props.rule - Ant Design 表單驗證規則。
 * @param {string} props.type - HTML input 的 type 屬性。
 * @param {React.RefObject<import('antd').Input>} props.inputRef - input 元件的 ref。
 * @param {() => void} props.save - 一般情況下的儲存處理函式。
 * @param {() => void} props.queryFromLYandSave - 查詢遠端並儲存的處理函式。
 * @param {Array<{value: string}>} props.workOrderSNsFromLYState - AutoComplete 的選項。
 * @returns {JSX.Element} - 渲染後的 Form.Item。
 */
function RenderFormItem({
  dataIndex,
  rule,
  type,
  inputRef,
  save,
  queryFromLYandSave,
  workOrderSNsFromLYState,
}) {
  console.log("🚀 ~ dataIndex:", dataIndex);
  console.log("🚀 ~ workOrderSNsFromLYState:", REACT_APP_LY_ERP_ON);

  return (
    <Form.Item style={{ margin: 0 }} name={dataIndex} rules={[rule]}>
      {/* //? 根據環境變數和 dataIndex 決定是否啟用特定的 AutoComplete 功能 ‵*/}
      {dataIndex === "workOrderSN" && REACT_APP_LY_ERP_ON ? (
        <AutoComplete
          ref={inputRef}
          onBlur={queryFromLYandSave} //* 失去焦點時觸發查詢與儲存
          style={{ width: 140 }}
          options={workOrderSNsFromLYState}
          placeholder="輸入製令單號"
          filterOption={(inputValue, option) =>
            option.value.includes(inputValue)
          }
        />
      ) : (
        <Input ref={inputRef} onPressEnter={save} onBlur={save} type={type} />
      )}
    </Form.Item>
  );
}

/**
 * @description 一個可編輯的表格儲存格元件。點擊後會進入編輯模式。
 * @param {object} props - 組件 props。
 * @param {boolean} props.editable - 控制此儲存格是否可編輯。
 * @param {React.ReactNode} props.children - 儲存格的內容。
 * @param {string} props.dataIndex - 資料欄位的鍵值。
 * @param {object} props.rule - Ant Design 表單驗證規則。
 * @param {string} props.type - HTML input 的 type 屬性。
 * @param {object} props.record - 當前行的資料記錄。
 * @param {(values: object) => void} props.handleSave - 外部傳入的儲存處理函式。
 * @param {(values: object) => void} props.queryFromLY - 外部傳入的遠端查詢處理函式。
 * @param {Array<{value: string}>} props.workOrderSNsFromLYState - AutoComplete 的選項。
 * @param {object} props.restProps - 其餘傳遞給 <td> 的 props。
 * @returns {JSX.Element} - 渲染後的 <td> 元素。
 */
const EditableCell = ({
  editable,
  children,
  dataIndex,
  rule,
  type,
  record,
  handleSave,
  queryFromLY,
  workOrderSNsFromLYState,
  ...restProps
}) => {
  //* ========= 狀態與 Ref 管理 =========
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useEditableForm(); // 從 Context 取得表單實例

  //* ========= 副作用 (Side Effects) =========
  // 進入編輯模式時，自動聚焦到 input
  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  //* ========= 事件處理函式 =========
  /**
   * @description 切換編輯狀態，並將當前格的資料設定到表單中。
   */
  const toggleEdit = useCallback(() => {
    setEditing((prev) => !prev);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  }, [form, dataIndex, record]);

  // 建立包裝過的儲存函式
  const handleSaveWrapper = useSaveWrapper(form, toggleEdit, record);

  // 一般儲存處理
  const save = useCallback(
    () => handleSaveWrapper(handleSave),
    [handleSaveWrapper, handleSave]
  );

  // 遠端查詢並儲存的處理
  const queryFromLYandSave = useCallback(
    () => handleSaveWrapper(queryFromLY),
    [handleSaveWrapper, queryFromLY]
  );
  //* ========= 渲染邏輯 =========
  /**
   * @description 根據編輯狀態決定渲染 input 還是純文字。
   * @returns {JSX.Element}
   */
  const renderEditableCell = () =>
    editing ? (
      <RenderFormItem
        dataIndex={dataIndex}
        rule={rule}
        type={type}
        inputRef={inputRef}
        save={save}
        queryFromLYandSave={queryFromLYandSave}
        workOrderSNsFromLYState={workOrderSNsFromLYState}
      />
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24, cursor: "pointer" }}
        onClick={toggleEdit} //* 點擊儲存格進入編輯模式
      >
        {children}
      </div>
    );

  //! 最終輸出：如果儲存格是可編輯的，則渲染可編輯的版本，否則直接顯示內容
  return <td {...restProps}>{editable ? renderEditableCell() : children}</td>;
};

export default EditableCell;
