import styled from "styled-components";
import { STATUS_STYLE_MAP } from "../utils/statusConverter";
import { Select, MenuItem } from "@mui/material";

// 定義斷點
const BREAKPOINTS = {
  md: "48rem", // 768px
  lg: "75rem", // 1200px
};

export const Container = styled.div`
  width: 100%;
  * {
    box-sizing: border-box;
  }
`;

export const Box = styled.div`
  position: relative;
  margin-bottom: 10px;
  padding: 20px 0;
`;

export const FilterSection = styled.div`
  display: flex;
  gap: 30px;
`;

export const SelectBox = styled.div`
  display: flex;
  align-content: center;
  background: #fff;
`;

export const StyledSelect = styled(Select)`
  && {
    background: #fff;
    border-radius: 4px;
    min-width: 180px;
    height: 45px;

    .MuiSelect-select {
      color: #8f8f8f;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      padding: 8px 16px;
    }

    .MuiOutlinedInput-notchedOutline {
      border-color: #8f8f8f;
    }

    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: #fff;
    }

    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: #4f9ab1;
    }

    .MuiSelect-icon {
      color: #8f8f8f;
    }
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  && {
    background: #fff;
    color: #8f8f8f;
    &:hover {
      background: #4f9ab1;
      color: #ffffff;
    }

    &.Mui-selected {
      background-color: rgba(0, 194, 254, 0.3);

      &:hover {
        background: #4f9ab1;
        color: #ffffff;
      }
    }
  }
`;

export const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-height: 3.75rem;

  @media (min-width: 75rem) {
    font-size: 24px;
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 0.9375rem;
  color: #fff;
  text-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem;
`;

export const MachinesGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  margin-block-start: 1.875rem;
  padding-inline: 1rem;

  /* 響應式層 */
  grid-template-columns: repeat(auto-fill, minmax(15.625rem, 1fr));

  @media (min-width: ${BREAKPOINTS.md}) {
    grid-template-columns: repeat(auto-fill, minmax(18.75rem, 1fr));
  }

  @media (min-width: ${BREAKPOINTS.lg}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const MachineBox = styled.div`
  /* 基礎布局層 */
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  /* 盒模型層 */
  min-height: 9.375rem;
  min-width: 2.75rem; /* 44px 移動端最小點擊區域 */
  margin-block-start: 1.875rem;
  padding: 0.9375rem;
  flex-shrink: 0;

  /* 視覺樣式層 */
  background: linear-gradient(
    180deg,
    ${(props) =>
      STATUS_STYLE_MAP[props.$status]?.color || STATUS_STYLE_MAP.IDLE.color}
  );
  border-radius: 4px;
  border: 0.125rem solid transparent;
  background-clip: padding-box;
  cursor: pointer;

  /* 動效層 */
  transform: translateZ(0); /* 創建新圖層 */
  transition: border-color 0.3s ease;
  will-change: border-color;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);

  &:hover {
    border-color: rgba(100%, 100%, 100%, 1);
  }

  /* 子元素樣式 */
  .title-container {
    color: rgba(100%, 100%, 100%, 1);
    font-size: 3.125rem;
    font-weight: 400;
    margin: 0;
  }

  .status-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 0.9375rem;
    color: rgba(100%, 100%, 100%, 1);
    font-size: 1.25rem;
    line-height: 1.25;
    margin: 0;

    .icon {
      width: 2rem;
      height: 2rem;
      flex-shrink: 0;
    }
  }
`;
