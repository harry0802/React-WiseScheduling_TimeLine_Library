import React from "react";
import {
  StyledRecordCard,
  StyledCardTitle,
  StyledCardSubtitle,
  StyledCardContent,
} from "./ProductionRecordCard.styled";

function ProductionRecordCard({ title, subtitle, content, onButtonClick }) {
  return (
    <StyledRecordCard onClick={onButtonClick} bordered={false}>
      <StyledCardTitle level={5}>{title}</StyledCardTitle>

      <StyledCardSubtitle>{subtitle}</StyledCardSubtitle>
      <StyledCardContent>{content}</StyledCardContent>
    </StyledRecordCard>
  );
}

export default ProductionRecordCard;
