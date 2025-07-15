import { css } from "styled-components";

// 通用主題變數
export const commonTheme = {
  colors: {
    primary: "#186c98",
    primaryLight: "#739bb0",
    primaryContrastText: "#e1e7f5",
    textPrimary: "#8f8f8f",
    lightBackground: "#eceaea",
    darkBackground: "#515357",
    dangerText: "#ef4444",
    white: "#fff",
    border: "#8f8f8f",
    buttonPrimary: "#83bf45",
    buttonHover: "#6fc1ae",
    buttonActive: "#8bc1e3",
    buttonCancel: "#8f8f8f",
    buttonDelete: "#eb0004",
    buttonDeleteHover: "#e8686a",
    buttonDeleteActive: "#be090c",
    background: "#f1f1f1",
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },
  mediaQueries: {
    sm: "768px",
    lg: "1200px",
  },
};

// 通用混合器 (CSS-in-JS 版本)
export const flexCenter = css`
  display: flex;
  place-content: center center;
`;

export const buttonBase = css`
  ${flexCenter}
  /* width: 2.1875rem; */
  /* height: 2.1875rem; */
  background-color: ${commonTheme.colors.primary};
  color: ${commonTheme.colors.white};
  border: none;
  border-radius: 5px;
  cursor: pointer;

  & > svg {
    align-self: center;
  }
`;

export const hoverActiveStates = (hoverBg, activeBg) => css`
  &:hover {
    background-color: ${hoverBg} !important;
    color: ${commonTheme.colors.white} !important;
  }

  &:active {
    background-color: ${activeBg} !important;
    color: ${commonTheme.colors.white} !important;
  }
`;

// 通用文字樣式
export const textEllipsis = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const colorDanger = css`
  font-weight: 800;
  color: ${commonTheme.colors.dangerText};
`;
