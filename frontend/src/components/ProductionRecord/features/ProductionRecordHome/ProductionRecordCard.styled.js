import styled, { css } from "styled-components";
import { Card, Typography } from "antd";
import { commonTheme } from "../../styles/common";

const { Title, Text, Paragraph } = Typography;

// 卡片專用顏色配置
const cardColors = {
  gradientStart: "#8ac0e2",
  gradientEnd: "rgba(115, 213, 191, 0.2)",
  hoverGradientStart: "#6ec0ad",
  hoverGradientEnd: "#20479c",
  activeGradient: "#8bc1e3"
};

// CSS 變數定義 mixin
const cssVariables = css`
  --pr-gradient-start: ${cardColors.gradientStart};
  --pr-gradient-end: ${cardColors.gradientEnd};
`;

// 記錄卡片主容器
export const StyledRecordCard = styled(Card)`
  ${cssVariables}

  height: 300px;
  border: 1px solid ${commonTheme.colors.border};
  border-radius: 10px;
  background: linear-gradient(
    121deg,
    var(--pr-gradient-start) 19.1%,
    var(--pr-gradient-end) 100%
  );
  cursor: pointer;
  transition: border-color 0.3s ease, background 0.8s ease-in,
    --pr-gradient-start 0.8s ease-in, --pr-gradient-end 0.8s ease-in,
    color 0.8s ease-in-out !important;
  grid-column: span 6;

  /* 響應式設計 */
  @media only screen and (min-width: ${commonTheme.mediaQueries.sm}) {
    grid-column: span 4;
  }

  @media only screen and (min-width: ${commonTheme.mediaQueries.lg}) {
    grid-column: span 3;
  }

  /* Card body 樣式 */
  .ant-card-body {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    color: ${commonTheme.colors.white};
    font-size: 1.12rem;
    font-weight: 400;
    line-height: 3.125rem;
    font-family: Roboto;
  }

  /* hover 狀態 */
  &:hover {
    --pr-gradient-start: ${cardColors.hoverGradientStart};
    --pr-gradient-end: ${cardColors.hoverGradientEnd};
    border-color: ${commonTheme.colors.white};
  }

  /* active 狀態 */
  &:active {
    --pr-gradient-start: ${cardColors.activeGradient};
    --pr-gradient-end: ${cardColors.activeGradient};
  }

  /* 為不支持 CSS 變量的瀏覽器提供後備樣式 */
  @supports not (background: var(--pr-gradient-start)) {
    background: linear-gradient(
      121deg,
      ${cardColors.gradientStart} 19.1%,
      ${cardColors.gradientEnd} 100%
    );

    &:hover {
      background: linear-gradient(
        121deg,
        ${cardColors.hoverGradientStart} 19.1%,
        ${cardColors.hoverGradientEnd} 100%
      );
    }

    &:active {
      background: ${cardColors.activeGradient};
    }
  }
`;

// 共用文字樣式
const commonTextStyles = css`
  display: block;
  color: currentColor;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: inherit;

  &:hover {
    color: ${commonTheme.colors.white};
    text-decoration: underline;
  }
`;

// 卡片標題
export const StyledCardTitle = styled(Title)`
  ${commonTextStyles}

  &.ant-typography,
  &.ant-typography.css-dev-only-do-not-override-1rqnfsa {
    color: ${commonTheme.colors.white} !important;
    margin-bottom: 0;
  }
`;

// 卡片副標題
export const StyledCardSubtitle = styled(Text)`
  ${commonTextStyles}

  margin-bottom: 1.25rem;
  margin: auto 0;
`;

// 卡片內容
export const StyledCardContent = styled(Paragraph)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: currentColor;
  font-size: 1.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0;
`;
