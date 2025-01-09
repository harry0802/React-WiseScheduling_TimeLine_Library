import styled from "styled-components";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// const theme = {
//   colors: {
//     primary: {
//       main: "#2C394B",
//       light: "#334756",
//       dark: "#1B2430",
//     },
//     background: {
//       main: "#F9FAFB",(
//       alternate: "#F3F4F6",
//     },
//     text: {,
//       primary: "#334155",
//       secondary: "#64748B",
//     },
//     accent: {
//       blue: "#4B5E8B",
//       green: "#526D4E",
//       red: "#8B4B4B",
//     },
//     border: "#E5E7EB",
//   },
// };
export const theme = {
  colors: {
    primary: {
      main: "#222831", // 深邃的太空黑
      light: "#393E46", // 中性灰
      dark: "#1B1E24", // 更暗的底色
    },
    background: {
      main: "#EEEEEE", // 明亮的背景色
      alternate: "#E4E4E4", // 次要背景
    },
    text: {
      primary: "#222831", // 主要文字用深色
      secondary: "#393E46", // 次要文字用中性灰
    },
    accent: {
      blue: "#00ADB5", // 科技感青色
      green: "#00ADB5", // 保持一致性
      red: "#FF5722", // 警示色
    },
    border: "#DDDDDD", // 淺色邊框
  },
};
// ✨ Box 容器樣式
export const StyledBox = styled(Box)`
  width: 100%;
  height: 650px;
  padding: 0;
  background: ${theme.colors.background.main};
`;

// ✨ DataGrid 樣式
export const StyledDataGrid = styled(DataGrid)`
  && {
    &.MuiDataGrid-root {
      border: 1px solid ${theme.colors.border};
      background: ${theme.colors.background.main};
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        "Helvetica Neue", Arial, sans-serif;

      .MuiDataGrid-columnHeaders {
        background-color: ${theme.colors.primary.main};
        color: #fff;
        font-size: 0.875rem;
        font-weight: 500;
        min-height: 56px;
      }

      .MuiDataGrid-cell {
        padding: 12px 16px;
        color: ${theme.colors.text.primary};
        border-bottom: 1px solid ${theme.colors.border};
      }

      .MuiDataGrid-row {
        &:nth-of-type(even) {
          background-color: ${theme.colors.background.alternate};
        }
        &:hover {
          background-color: rgba(75, 94, 139, 0.04);
        }
      }

      .MuiDataGrid-columnSeparator {
        color: rgba(255, 255, 255, 0.2);
      }

      .MuiDataGrid-toolbar {
        background-color: ${theme.colors.background.main};
        border-bottom: 1px solid ${theme.colors.border};
        padding: 8px 16px;
      }

      .MuiDataGrid-footerContainer {
        background-color: ${theme.colors.background.main};
        border-top: 1px solid ${theme.colors.border};

        .MuiTablePagination-root {
          color: ${theme.colors.text.secondary};

          .MuiButtonBase-root {
            color: ${theme.colors.text.primary};

            &:hover {
              background-color: rgba(0, 173, 181, 0.08);
            }

            &.Mui-disabled {
              color: rgba(57, 62, 70, 0.38);
            }
          }

          .MuiTablePagination-select {
            color: ${theme.colors.text.primary};
          }

          .MuiTablePagination-displayedRows {
            color: ${theme.colors.text.primary};
          }
        }
      }

      // 自定義滾動條
      .MuiDataGrid-virtualScroller {
        &::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        &::-webkit-scrollbar-track {
          background: ${theme.colors.background.alternate};
        }

        &::-webkit-scrollbar-thumb {
          background-color: ${theme.colors.primary.light};
          border-radius: 4px;
        }
      }

      // 數據列樣式
      .number-column {
        font-family: monospace;
        color: ${theme.colors.accent.blue};
        font-weight: 500;
      }

      .cost-column {
        color: ${theme.colors.accent.green};
        font-weight: 500;
      }

      .negative-value {
        color: ${theme.colors.accent.red};
      }

      &.MuiDataGrid-root {
        // 圖標樣式
        .MuiIconButton-root {
          color: #eeeeee;

          &:hover {
            background-color: rgba(0, 173, 181, 0.08);
          }

          &.Mui-disabled {
            color: rgba(57, 62, 70, 0.38); // #393E46 with opacity
          }
        }
        // 排序圖標
        &.MuiDataGrid-sortIcon {
          color: #eeeeee;
        }

        // 選擇框
        .MuiCheckbox-root {
          color: ${theme.colors.accent.blue};

          &.Mui-checked {
            color: ${theme.colors.accent.blue};
          }
        }

        // 菜單圖標
        .MuiDataGrid-menuIcon {
          color: #eeeeee;
        }

        // 過濾圖標
        .MuiDataGrid-filterIcon {
          color: #eeeeee;
        }

        // 列表工具欄圖標
        .MuiDataGrid-toolbarContainer {
          .MuiButtonBase-root {
            color: ${theme.colors.text.primary};

            &:hover {
              color: ${theme.colors.accent.blue};
            }
          }
        }

        // 密度設定要放在最外層
        &.MuiDataGrid-densityCompact {
          .MuiDataGrid-row {
            min-height: 32px !important;
            max-height: 32px !important;
          }
          .MuiDataGrid-cell {
            padding: 1px 8px !important;
          }
        }

        &.MuiDataGrid-densityStandard {
          .MuiDataGrid-row {
            min-height: 52px !important;
            max-height: 52px !important;
          }
          .MuiDataGrid-cell {
            padding: 8px 16px !important;
          }
        }

        &.MuiDataGrid-densityComfortable {
          .MuiDataGrid-row {
            min-height: 72px !important;
            max-height: 72px !important;
          }
          .MuiDataGrid-cell {
            padding: 16px 24px !important;
          }
        }

        // 確保單元格內容垂直置中
        .MuiDataGrid-cell {
          display: flex;
          align-items: center;
        }
      }
    }
  }
`;
