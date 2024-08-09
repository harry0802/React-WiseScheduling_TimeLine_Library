import React from "react";
import { Card, Typography, Button } from "antd";
const { Title, Text, Paragraph } = Typography;

function ProductionRecordCard({ title, subtitle, content, onButtonClick }) {
  return (
    <Card onClick={onButtonClick} className="record-card" bordered={false}>
      <Title level={5} className="record-card__title">
        {title}
      </Title>

      <Text className="record-card__subtitle">{subtitle}</Text>
      <Paragraph className="record-card__content">{content}</Paragraph>
    </Card>
  );
}

export default ProductionRecordCard;
