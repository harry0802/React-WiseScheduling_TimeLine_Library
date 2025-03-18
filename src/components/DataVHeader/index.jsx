import React from "react";
import styled from "styled-components";
import { Decoration8, Decoration5 } from "@iimm/data-view-react";

//! =============== 設定與常量 ===============
const DEFAULT_DECORATION_COLOR = ["#3f96a5", "#3f96a5"];

//! =============== 樣式組件 ===============
//* 基礎區塊 - 提取共用樣式減少重複
const BaseSection = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
`;

//* 頂部標題容器
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

//* 左側區域
const LeftSection = styled(BaseSection)`
  flex: 1;
`;

//* 中央區域
const CenterSection = styled(BaseSection)`
  flex: 2;
  justify-content: center;
`;

//* 右側區域
const RightSection = styled(BaseSection)`
  flex: 1;
  justify-content: flex-end;
`;

//* 標題文字
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
 * @function DataVHeader
 * @description DataV風格的頁面頂部標題組件
 */
const DataVHeader = ({
  title = "數據可視化標題",
  style = {},
  decorationColor = DEFAULT_DECORATION_COLOR,
}) => {
  //* 裝飾元素共用樣式
  const decorationProps = {
    color: decorationColor,
  };

  //* 側邊裝飾共用配置
  const sideDecorProps = {
    ...decorationProps,
    style: { width: "481px", height: "60px" },
  };

  return (
    <HeaderContainer style={style} id="top-header">
      <LeftSection>
        <Decoration8 {...sideDecorProps} />
      </LeftSection>

      <CenterSection>
        <Decoration5
          {...decorationProps}
          style={{ width: "770px", height: "60px", marginTop: "35px" }}
        />
        <TitleText className="center-title">{title}</TitleText>
      </CenterSection>

      <RightSection>
        <Decoration8 {...sideDecorProps} reverse={true} />
      </RightSection>
    </HeaderContainer>
  );
};

export default DataVHeader;
