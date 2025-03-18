import React from "react";
import styled from "styled-components";
import { Decoration8, Decoration5 } from "@iimm/data-view-react";

// 頂部標題容器 - 使用flex三分布局
const HeaderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 80px;
  background-color: #080c34;
  background-image: linear-gradient(
    to right,
    rgba(0, 20, 80, 0.8),
    rgba(0, 10, 50, 0.9),
    rgba(0, 20, 80, 0.8)
  );
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
`;

// 左側區域
const LeftSection = styled.div`
  flex: 1;
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
`;

// 中央區域
const CenterSection = styled.div`
  flex: 2;
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 右側區域
const RightSection = styled.div`
  flex: 1;
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

// 標題文字
const TitleText = styled.div`
  font-size: 28px;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  z-index: 10;
`;

/**
 * DataV風格的頁面頂部標題組件，使用三分布局
 * @param {string} title - 標題文字
 * @param {object} style - 容器樣式
 * @returns {JSX.Element}
 */
const DataVHeader = ({ title = "數據可視化標題", style = {} }) => {
  // 裝飾的顏色
  const decorationColor = ["#3f96a5", "#3f96a5"];

  return (
    <HeaderContainer style={style} id="top-header">
      <LeftSection>
        <Decoration8
          color={decorationColor}
          style={{ width: "481px", height: "60px" }}
        />
      </LeftSection>

      <CenterSection>
        <Decoration5
          color={decorationColor}
          style={{ width: "770px", height: "60px", marginTop: "35px" }}
        />
        <TitleText className="center-title">{title}</TitleText>
      </CenterSection>

      <RightSection>
        <Decoration8
          reverse={true}
          color={decorationColor}
          style={{ width: "481px", height: "60px" }}
        />
      </RightSection>
    </HeaderContainer>
  );
};

export default DataVHeader;
