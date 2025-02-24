import React from "react";
import styled from "styled-components";
import { Card, Typography } from "antd";
import DeleteIcon from "@mui/icons-material/Delete";

const { Text } = Typography;

const gradientStyles = {
  start: '#8ac0e2',
  end: 'rgba(115, 213, 191, 0.2)',
  hoverStart: '#6ec0ad',
  hoverEnd: '#20479c',
  active: '#8bc1e3'
};

const StyledCard = styled(Card)`
  @property --gradient-start {
    syntax: "<color>";
    initial-value: ${gradientStyles.start};
    inherits: false;
  }

  @property --gradient-end {
    syntax: "<color>";
    initial-value: ${gradientStyles.end};
    inherits: false;
  }

  --gradient-start: ${gradientStyles.start};
  --gradient-end: ${gradientStyles.end};
  
  height: 300px;
  border: 1px solid #8f8f8f;
  border-radius: 10px;
  cursor: pointer;
  grid-column: span 6;

  background: linear-gradient(
    121deg,
    var(--gradient-start) 19.1%,
    var(--gradient-end) 100%
  );

  transition: border-color 0.3s ease,
              background 0.8s ease-in,
              --gradient-start 0.8s ease-in,
              --gradient-end 0.8s ease-in,
              color 0.8s ease-in-out !important;

  &:hover {
    --gradient-start: ${gradientStyles.hoverStart};
    --gradient-end: ${gradientStyles.hoverEnd};
    border-color: #fff;
  }

  &:active {
    --gradient-start: ${gradientStyles.active};
    --gradient-end: ${gradientStyles.active};
  }

  // 跨瀏覽器支持
  @supports not (background: var(--gradient-start)) {
    background: linear-gradient(
      121deg,
      ${gradientStyles.start} 19.1%,
      ${gradientStyles.end} 100%
    );

    &:hover {
      background: linear-gradient(
        121deg,
        ${gradientStyles.hoverStart} 19.1%,
        ${gradientStyles.hoverEnd} 100%
      );
    }

    &:active {
      background: ${gradientStyles.active};
    }
  }

  .ant-card-body {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    color: #fff;
    font-size: 1.12rem;
    font-weight: 400;
    line-height: 3.125rem;
    font-family: Roboto;
  }

  @media only screen and (min-width: 768px) {
    grid-column: span 4;
  }

  @media only screen and (min-width: 1200px) {
    grid-column: span 3;
  }
`;

const QuoteNumber = styled(Text)`
  display: block;
  font-size: 1.125rem;
  color: currentColor;
  margin-bottom: 1.5625rem;
`;

const Date = styled(Text)`
  display: block;
  font-size: 1.125rem;
  font-weight: 500;
  color: currentColor;
  margin-bottom: 0.3125rem;
`;

const ProductName = styled(Text)`
  display: block;
  font-size: 1.5rem;
  color: currentColor;
  margin-bottom: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CustomerName = styled(Text)`
  display: block;
  color: currentColor;
  font-size: 1.125rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DeleteButton = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: #e74c3c;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${StyledCard}:hover & {
    opacity: 1;
  }

  &:hover {
    background: #c0392b;
  }
`;

function SharedCard({
  date,
  quoteNumber,
  productName,
  customerName,
  onDelete,
  onClick,
  className,
}) {
  return (
    <StyledCard onClick={onClick} className={className} bordered={false}>
      <Date>{date}</Date>
      <QuoteNumber>{quoteNumber}</QuoteNumber>
      <ProductName>{productName}</ProductName>
      <CustomerName>{customerName}</CustomerName>
      <DeleteButton
        onClick={(e) => {
          e.stopPropagation();
          onDelete?.();
        }}
      >
        <DeleteIcon style={{ color: "#fff" }} />
      </DeleteButton>
    </StyledCard>
  );
}

export default SharedCard;