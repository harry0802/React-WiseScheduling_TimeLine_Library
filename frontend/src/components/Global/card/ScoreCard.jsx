import React from "react";
import styled from "styled-components";

// Styled Components for the card
const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  /* padding: 20px; */
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
`;

const CardTitle = styled.div`
  align-self: start;
  margin-bottom: 10px;
  font-size: 1.125rem;
  font-weight: 400;
`;

const CardValue = styled.div`
  display: flex;
  align-items: baseline;
  font-weight: 400;
`;

const Value = styled.span`
  font-size: 5rem;
  margin-right: 5px;
`;

const Unit = styled.span`
  font-size: 1.125rem;
`;

// React component for the ScoreCard
const ScoreCard = ({ title, value = "00,000", unit = "元" }) => {
  return (
    <Card>
      <CardTitle>{title}</CardTitle>
      <CardValue>
        <Value>{value}</Value>
        <Unit>{unit}</Unit>
      </CardValue>
    </Card>
  );
};

export default ScoreCard;
