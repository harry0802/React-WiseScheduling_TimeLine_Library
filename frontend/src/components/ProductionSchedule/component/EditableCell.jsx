import React, { useCallback, useEffect, useRef, useState } from "react";
import { useEditableForm } from "../context/EditableRowProvider";
import { Form, Input, AutoComplete } from "antd";
import { REACT_APP_LY_ERP_ON } from "../../../config/config";

function useSaveWrapper(form, toggleEdit, record) {
  return useCallback(
    async (saveFunction) => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        saveFunction({ ...record, ...values });
      } catch (errInfo) {
        console.error("Save failed:", errInfo);
      }
    },
    [form, toggleEdit, record]
  );
}

function RenderFormItem({
  dataIndex,
  rule,
  type,
  inputRef,
  save,
  queryFromLYandSave,
  workOrderSNsFromLYState,
}) {
  return (
    <Form.Item style={{ margin: 0 }} name={dataIndex} rules={[rule]}>
      {dataIndex === "workOrderSN" && REACT_APP_LY_ERP_ON ? (
        <AutoComplete
          ref={inputRef}
          onBlur={queryFromLYandSave}
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
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useEditableForm();

  useEffect(() => {
    if (editing) inputRef.current.focus();
  }, [editing]);

  const toggleEdit = useCallback(() => {
    setEditing((prev) => !prev);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  }, [form, dataIndex, record]);

  const handleSaveWrapper = useSaveWrapper(form, toggleEdit, record);

  const save = useCallback(
    () => handleSaveWrapper(handleSave),
    [handleSaveWrapper, handleSave]
  );
  const queryFromLYandSave = useCallback(
    () => handleSaveWrapper(queryFromLY),
    [handleSaveWrapper, queryFromLY]
  );

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
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );

  return <td {...restProps}>{editable ? renderEditableCell() : children}</td>;
};

export default EditableCell;
