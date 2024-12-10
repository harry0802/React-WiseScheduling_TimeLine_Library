/**
 * @fileoverview 自定義動態表單列表組件
 * @description 基於 react-hook-form 的動態表單列表，支持新增、刪除和自定義字段渲染
 * @author [Your Name]
 */

import React from "react";
import styled from "styled-components";
import { IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useFieldArray, useFormContext } from "react-hook-form";

//! =============== 1. 樣式定義 ===============
//* 使用 styled-components 進行樣式管理，確保組件樣式的獨立性和可維護性

const StyledComponents = {
  //* 容器樣式
  Container: styled.div`
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
  `,

  //* 列表項容器
  ItemContainer: styled.div`
    position: relative;
    width: 80cqw;
    max-height: 300px;
    overflow-y: auto;
    flex: 1;
  `,

  //* 列表項內容
  ItemContent: styled.div`
    margin-top: ${(props) => (props.isFirst ? ".625rem" : "0")};
    width: auto;
    position: relative;
    display: flex;
    align-items: flex-start;
    border-bottom: 1px solid var(--color-border);
  `,

  //* 刪除按鈕
  RemoveButton: styled(IconButton)`
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
  `,

  //* 添加按鈕容器
  AddButtonContainer: styled.div`
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
  `,

  //* 添加按鈕
  AddButton: styled(Button)`
    display: inline-flex;
    align-items: center;
    height: auto;
    font-size: 18px;
    color: var(--color-text);
    font-weight: 400;

    &:hover {
      color: var(--color-hover);
    }
  `,
};

//! =============== 2. 工具函數 ===============
/**
 * @function createEmptyItem
 * @description 根據字段配置創建空的表單項
 * @param {Array} fields - 字段配置數組
 * @returns {Object} - 包含空值的對象
 */
const createEmptyItem = (fields) => {
  return fields.reduce((acc, field) => {
    acc[field.name] = field.type === "number" ? null : "";
    return acc;
  }, {});
};

/**
 * @function updateFieldConfig
 * @description 更新字段配置，處理依賴關係
 * @param {Object} field - 原始字段配置
 * @param {string} name - 字段名稱前綴
 * @param {number} index - 當前索引
 * @param {string|number} id - 項目 ID
 * @returns {Object} - 更新後的字段配置
 */
const updateFieldConfig = (field, name, index, id) => {
  const config = {
    ...field,
    name: `${name}.${index}.${field.name}`,
    label: `${field.label}${index + 1}`,
    id: id || index,
  };

  if (field.dependsOn) {
    config.dependsOn = `${name}.${index}.${field.dependsOn}`;
  }

  return config;
};

//! =============== 3. 主組件 ===============
/**
 * @component CustomTodoList
 * @description 自定義動態表單列表組件
 *
 * @param {Object} props
 * @param {string} props.name - 表單字段名
 * @param {Array} props.fields - 字段配置數組
 * @param {Function} props.renderField - 自定義字段渲染函數
 * @param {boolean} props.canDelete - 是否允許刪除
 * @param {boolean} props.canAdd - 是否允許添加
 *
 * @example
 * <CustomTodoList
 *   name="todos"
 *   fields={[
 *     { name: 'title', type: 'text', label: '任務' },
 *     { name: 'priority', type: 'number', label: '優先級' }
 *   ]}
 *   renderField={({ field, key, id }) => (
 *     <CustomInput {...field} key={key} />
 *   )}
 *   canDelete={false}
 *   canAdd={false}
 * />
 */
function CustomTodoList({
  name,
  fields,
  renderField,
  canDelete = true,
  canAdd = true,
}) {
  console.log("🚀 ~ canDelete:", canDelete);
  const { control } = useFormContext();
  const {
    fields: items,
    append,
    remove,
  } = useFieldArray({
    control,
    name,
  });

  //* 事件處理
  const handleRemove = (index) => remove(index);
  const handleAdd = () => append(createEmptyItem(fields));

  return (
    <StyledComponents.Container>
      <StyledComponents.ItemContainer>
        {items.map((item, index) => (
          <StyledComponents.ItemContent key={item.id} isFirst={index === 0}>
            {canDelete && (
              <StyledComponents.RemoveButton
                onClick={() => handleRemove(index)}
              >
                <CloseIcon />
              </StyledComponents.RemoveButton>
            )}

            {fields.map((field) =>
              renderField({
                key: `${name}.${index}.${field.name}`,
                field: updateFieldConfig(field, name, index, item.id),
                id: item.id || index,
              })
            )}
          </StyledComponents.ItemContent>
        ))}
      </StyledComponents.ItemContainer>

      {canAdd && (
        <StyledComponents.AddButtonContainer>
          <StyledComponents.AddButton
            onClick={handleAdd}
            startIcon={
              <AddIcon
                className="c-btn-primars"
                style={{ width: "30px", height: "30px", borderRadius: "50%" }}
              />
            }
          >
            新增任務
          </StyledComponents.AddButton>
        </StyledComponents.AddButtonContainer>
      )}
    </StyledComponents.Container>
  );
}

export default CustomTodoList;
