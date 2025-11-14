import { createGlobalStyle } from 'styled-components'
import { colors } from '../designTokens'

// Ant Design 全局主題樣式
export const AntdThemeStyles = createGlobalStyle`
  /* ===== Form 表單樣式 ===== */
  .ant-form {
    .ant-form-item-label > label {
      color: ${colors.text.inverse} ;
      font-weight: 500;
      font-size: 14px;
    }

    .ant-form-item-required::before {
      color: ${colors.functional.error} ;
    }

    .ant-form-item-explain-error {
      color: ${colors.functional.error};
    }
  }

  /* ===== Drawer 抽屜樣式 ===== */
  .ant-drawer {
    .ant-form-item-label > label {
      color: ${colors.text.inverse} ;
      font-weight: 500;
    }

    .ant-form-item {
      margin-bottom: 20px;
    }
  }

  /* ===== Input 輸入框樣式 ===== */
  .ant-input,
  .ant-input-number,
  .ant-picker {
    background: ${colors.background.primary} !important;
    border: 1px solid ${colors.border.primary} !important;
    color: #ffffff !important;
    font-weight: 500;
    border-radius: 6px;
    transition: all 0.3s;

    &:hover {
      border-color: ${colors.accent.gold} !important;
      background: ${colors.background.primary} !important;
    }

    &:focus,
    &.ant-input-focused,
    &.ant-picker-focused {
      border-color: ${colors.accent.gold} !important;
      box-shadow: 0 0 0 2px ${colors.accent.gold}20 !important;
      background: ${colors.background.primary} !important;
    }

    &:active {
      border-color: ${colors.accent.gold} !important;
      background: ${colors.background.primary} !important;
    }

    &::placeholder {
      color: #b0b0b0;
    }

    &:disabled {
      background: ${colors.background.secondary} !important;
      color: ${colors.text.secondary};
      border-color: ${colors.border.primary} !important;
      opacity: 0.6;
    }
  }

  /* Input Number 容器 */
  .ant-input-number {
    &:hover,
    &:focus,
    &.ant-input-number-focused {
      border-color: ${colors.accent.gold} !important;
      box-shadow: 0 0 0 2px ${colors.accent.gold}20 !important;
    }
  }

  /* Input Number 內部輸入框 */
  .ant-input-number-input {
    background: transparent;
    color: #ffffff !important;
    font-weight: 500;
  }

  /* Input Number 操作按鈕 */
  .ant-input-number-handler-wrap {
    background: ${colors.background.secondary};
    border-left: 1px solid ${colors.border.primary};

    .ant-input-number-handler {
      border-color: ${colors.border.primary};
      color: ${colors.text.secondary};

      &:hover {
        color: ${colors.accent.gold};
      }

      &:active {
        background: ${colors.accent.gold}20;
      }
    }
  }

  /* ===== Select 下拉選單樣式 ===== */
  .ant-select {
    .ant-select-selector {
      background: ${colors.background.primary} !important;
      border: 1px solid ${colors.border.primary} !important;
      color: ${colors.text.inverse};
      border-radius: 6px;
      transition: all 0.3s;
    }

    .ant-select-arrow {
      color: ${colors.text.secondary};
    }

    &:hover .ant-select-selector {
      border-color: ${colors.accent.gold} !important;
    }

    &.ant-select-focused .ant-select-selector,
    &.ant-select-open .ant-select-selector {
      border-color: ${colors.accent.gold} !important;
      box-shadow: 0 0 0 2px ${colors.accent.gold}20 !important;
    }

    .ant-select-selection-placeholder {
      color: ${colors.text.secondary};
    }

    .ant-select-selection-item {
      color: #ffffff !important;
      font-weight: 500;
    }
  }

  /* Select 下拉選單面板 */
  .ant-select-dropdown {
    background: ${colors.background.secondary};
    border: 1px solid ${colors.accent.gold}40;
    border-radius: 8px;
    box-shadow: 0 4px 12px ${colors.accent.gold}30;

    .ant-select-item {
      color: ${colors.text.inverse};

      &:hover {
        background: ${colors.accent.gold}20;
      }

      &.ant-select-item-option-selected {
        background: ${colors.accent.gold};
        color: ${colors.background.primary};
        font-weight: 600;
      }
    }
  }

  /* ===== DatePicker 日期選擇器樣式 ===== */
  .ant-picker-dropdown {
    .ant-picker-panel-container {
      background: ${colors.background.secondary};
      border: 1px solid ${colors.accent.gold}40;
      border-radius: 8px;
      box-shadow: 0 4px 12px ${colors.accent.gold}30;
    }

    .ant-picker-header {
      color: ${colors.accent.gold};
      border-bottom: 1px solid ${colors.border.primary};

      button {
        color: ${colors.text.inverse};

        &:hover {
          color: ${colors.accent.gold};
        }
      }
    }

    .ant-picker-content {
      th {
        color: ${colors.text.secondary};
      }

      .ant-picker-cell {
        color: ${colors.text.inverse};

        &:hover .ant-picker-cell-inner {
          background: ${colors.accent.gold}20;
        }

        &.ant-picker-cell-in-view.ant-picker-cell-selected .ant-picker-cell-inner {
          background: ${colors.accent.gold};
          color: ${colors.background.primary};
        }

        &.ant-picker-cell-today .ant-picker-cell-inner::before {
          border-color: ${colors.accent.gold};
        }
      }
    }

    .ant-picker-footer {
      border-top: 1px solid ${colors.border.primary};
      background: ${colors.background.primary};

      .ant-picker-now-btn {
        color: ${colors.accent.gold};

        &:hover {
          color: ${colors.accent.gold};
          filter: brightness(1.2);
        }
      }
    }
  }

  /* ===== Checkbox 核取方塊樣式 ===== */
  .ant-checkbox-wrapper {
    color: ${colors.text.inverse};

    .ant-checkbox {
      .ant-checkbox-inner {
        background: ${colors.background.primary};
        border-color: ${colors.border.primary};
      }

      &:hover .ant-checkbox-inner {
        border-color: ${colors.accent.gold};
      }

      &.ant-checkbox-checked .ant-checkbox-inner {
        background: ${colors.accent.gold};
        border-color: ${colors.accent.gold};
      }
    }
  }

  /* ===== Radio 單選按鈕樣式 ===== */
  .ant-radio-wrapper {
    color: ${colors.text.inverse};

    .ant-radio {
      .ant-radio-inner {
        background: ${colors.background.primary};
        border-color: ${colors.border.primary};
      }

      &:hover .ant-radio-inner {
        border-color: ${colors.accent.gold};
      }

      &.ant-radio-checked .ant-radio-inner {
        border-color: ${colors.accent.gold};
        background: ${colors.background.primary};

        &::after {
          background: ${colors.accent.gold};
        }
      }
    }
  }

  /* ===== TextArea 文字區域樣式 ===== */
  .ant-input-textarea {
    .ant-input {
      background: ${colors.background.primary};
      color: ${colors.text.inverse};
      border-radius: 6px;
    }
  }

  /* ===== Button 按鈕樣式 (在表單中) ===== */
  .ant-btn-primary {
    background: ${colors.accent.gold};
    border-color: ${colors.accent.gold};
    color: ${colors.background.primary};
    font-weight: 500;

    &:hover {
      background: ${colors.accent.gold};
      border-color: ${colors.accent.gold};
      filter: brightness(1.1);
    }

    &:active {
      filter: brightness(0.9);
    }
  }

  /* ===== Scrollbar 美化 ===== */
  .ant-select-dropdown,
  .ant-picker-dropdown {
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }

    ::-webkit-scrollbar-track {
      background: ${colors.background.primary};
      border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb {
      background: ${colors.accent.gold}40;
      border-radius: 3px;

      &:hover {
        background: ${colors.accent.gold}60;
      }
    }
  }
`

export default AntdThemeStyles

