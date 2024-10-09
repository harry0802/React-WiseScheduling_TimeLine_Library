import React from "react";
import styled from "styled-components";
import { Card, Typography } from "antd";
const { Title, Text, Paragraph } = Typography;
const StyledCard = styled(Card)`
  @property --gradient-start {
    syntax: "<color>";
    initial-value: #8ac0e2;
    inherits: false;
  }

  @property --gradient-end {
    syntax: "<color>";
    initial-value: rgba(115, 213, 191, 0.2);
    inherits: false;
  }

  @property --gradient-rote {
    syntax: "<angle>";
    initial-value: 121deg;
    inherits: false;
  }

  height: 300px;
  border: 1px solid #8f8f8f;
  border-radius: 10px;
  background: linear-gradient(
    var(--gradient-rote),
    var(--gradient-start) 19.1%,
    var(--gradient-end) 100%
  );

  cursor: pointer;
  transition: border-color 0.4s, --gradient-start 0.8s,
    --gradient-end 0.8s ease-out, --gradient-rote 0.8s, color 0.8s !important;
  grid-column: span 6;

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

  &:hover {
    --gradient-start: #6ec0ad;
    --gradient-end: #20479c;
    --gradient-rote: 110deg;
    border-color: #fff;
  }

  &:active {
    --gradient-start: #8bc1e3;
    --gradient-end: #8bc1e3;
    --gradient-rote: 121deg;
  }

  @media only screen and (min-width: 768px) {
    grid-column: span 4;
  }

  @media only screen and (min-width: 1200px) {
    grid-column: span 3;
  }
`;

const CardTitle = styled(Title)`
  &.ant-typography {
    display: block;
    color: currentColor;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: inherit;

    &:hover {
      color: #fff;
      text-decoration: underline;
    }
  }
`;

const CardSubtitle = styled(Text)`
  display: block;
  color: currentColor;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: inherit;
  margin-bottom: 1.25rem;
  margin: auto 0;

  &:hover {
    color: #fff;
    text-decoration: underline;
  }
`;

const CardContent = styled(Paragraph)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: currentColor;
  font-size: 1.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function SharedCard({ title, subtitle, content, onButtonClick, className }) {
  return (
    <StyledCard onClick={onButtonClick} className={className} bordered={false}>
      <CardTitle level={5}>{title}</CardTitle>
      <CardSubtitle>{subtitle}</CardSubtitle>
      <CardContent>{content}</CardContent>
    </StyledCard>
  );
}

export default SharedCard;
