import React from "react";
import styled from "styled-components";

//! =============== 樣式定義 ===============
const CardContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-bottom: 16px;
`;

const CardHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const CardTitleContainer = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const CardContentContainer = styled.div`
  font-size: 14px;
  color: #666;
`;

//! =============== 子元件定義 ===============

/**
 * 卡片標題欄
 */
const Header = ({ children, ...props }) => {
  return <CardHeaderContainer {...props}>{children}</CardHeaderContainer>;
};

/**
 * 卡片標題文字
 */
const Title = ({ children, ...props }) => {
  return <CardTitleContainer {...props}>{children}</CardTitleContainer>;
};

/**
 * 卡片內容區域
 */
const Content = ({ children, ...props }) => {
  return <CardContentContainer {...props}>{children}</CardContentContainer>;
};

//! =============== 主元件定義 ===============

/**
 * 標準卡片元件
 * 使用複合元件模式，可通過 Card.Header、Card.Title、Card.Content 訪問子元件
 */
const Card = ({ children, ...props }) => {
  return <CardContainer {...props}>{children}</CardContainer>;
};

// 將子元件附加到主元件上
Card.Header = Header;
Card.Title = Title;
Card.Content = Content;

export default Card;
