import React from "react";
import styled from "styled-components";
import { IconButton, Button } from "@mui/material";
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
  padding: 0.625rem 0;
  overflow: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const GroupFormItem = styled.div`
  position: relative;
  width: 80cqw;
  max-height: 300px;
  overflow-y: auto;
  flex: 1;
`;

const GroupFormContent = styled.div`
  margin-top: ${(props) => (props.isFirst ? ".625rem" : "0")};
  width: auto;
  position: relative;
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid var(--color-border);
`;

const RemoveButton = styled(IconButton)`
  && {
    color: var(--color-button-primary);
    transition: all 0.3s;
    padding: 8px;
  }

  & > svg {
    width: 24px;
    height: 24px;
    stroke-width: 1.5;
    stroke: currentColor;
  }

  &:hover {
    color: var(--color-hover);
  }
`;

const AdditionContainer = styled.div`
  position: sticky;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  z-index: 5;
  text-align: center;
  background: var(--color-background-card);
  padding: 10px 0;
  border-top: 1px solid var(--color-border);
  margin-top: auto;
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
  const { control, reset } = useFormContext();
  const {
    fields: items,
    append,
    remove,
  } = useFieldArray({
    control,
    name,
  });

  const handleRemove = (index) => {
    remove(index);
  };

  const handleAdd = () => {
    // 確保添加空值對象
    const emptyItem = fields.reduce((acc, field) => {
      acc[field.name] = field.type === "number" ? null : "";
      return acc;
    }, {});
    append(emptyItem);
  };

  return (
    <GroupFormContainer>
      <GroupFormItem>
        {items.map((item, index) => (
          <GroupFormContent key={item.id} isFirst={index === 0}>
            <RemoveButton onClick={() => handleRemove(index)}>
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
      </GroupFormItem>
      <AdditionContainer>
        <AddButton
          onClick={handleAdd}
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
    </GroupFormContainer>
  );
}

export default CustomTodoList;
