import React from "react";
import styled from "styled-components";
import { IconButton, Button, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useFieldArray, useFormContext } from "react-hook-form";

const GroupFormContainer = styled.div`
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: var(--color-background-card);
  font-size: 18px;
  color: var(--color-text);
  margin-top: 1.3125rem;
`;

const GroupFormItem = styled.div`
  position: relative;
  max-height: 300px;
  overflow-y: auto;
`;

const GroupFormContent = styled.div`
  /*除了第一個元素添加 margin-top: 10px 剩下都不要*/
  margin-top: ${(props) => (props.isFirst ? ".625rem" : "0")};
  width: 100%;
  position: relative;
  display: flex;
  border-bottom: 1px solid var(--color-border);
`;

const GroupFormInput = styled(TextField)`
  padding: 8px 10px 0.875rem;
  margin-bottom: 0;
  width: 100%;
  .MuiInputBase-input {
    color: var(--color-text);
    border: none;
  }
  .MuiInputLabel-root {
    color: var(--color-text-secondary);
  }
`;

const RemoveButton = styled(IconButton)`
  margin-right: 12px;
  width: 35px !important;
  height: 35px !important;
  color: var(--color-button-primary);
  transition: all 0.3s;
  &:hover {
    color: var(--color-hover);
  }
  &:active {
    color: var(--color-active);
  }
`;

const AdditionContainer = styled.div`
  position: sticky;
  z-index: 1;
  text-align: center;
  bottom: 0;
  margin-bottom: 0;
  background: var(--color-background-card);
  padding-bottom: 5px;
`;

const AddButton = styled(Button)`
  display: inline-flex;
  align-items: center;
  height: auto;
  font-size: 18px;
  color: var(--color-text);
  font-weight: 400;
  &:hover {
    color: var(--color-hover);
  }
`;

function CustomTodoList({ name, fields, renderField }) {
  const { control } = useFormContext();
  const {
    fields: items,
    append,
    remove,
  } = useFieldArray({
    control,
    name,
  });

  return (
    <GroupFormContainer>
      <GroupFormItem>
        {items.map((item, index) => (
          <GroupFormContent key={item.id} isFirst={index === 0}>
            <RemoveButton onClick={() => remove(index)}>
              <CloseIcon />
            </RemoveButton>
            {fields.map((field) =>
              renderField({
                key: `${name}.${index}.${field.name}`,
                field: {
                  ...field,
                  name: `${name}.${index}.${field.name}`,
                  label: `${field.label}${index + 1}`,
                },
              })
            )}
          </GroupFormContent>
        ))}
        <AdditionContainer>
          <AddButton
            onClick={() => append({})}
            startIcon={
              <AddIcon
                className="c-btn-primars"
                style={{ width: "30px", height: "30px", borderRadius: "50%" }}
              />
            }
          >
            新增任务
          </AddButton>
        </AdditionContainer>
      </GroupFormItem>
    </GroupFormContainer>
  );
}

export default CustomTodoList;
