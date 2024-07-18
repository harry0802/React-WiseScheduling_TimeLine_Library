import React from "react";
import { Card, Typography, Button } from "antd";
const { Title, Text, Paragraph } = Typography;

const ProductionRecordCard = ({
  title,
  subtitle,
  content,
  buttonText = "閱讀更多",
  onButtonClick,
}) => {
  return (
    <Card className="record-card" bordered={false}>
      <Title level={5} className="record-card__title">
        {title}
      </Title>
      <Text className="record-card__subtitle">{subtitle}</Text>
      <Paragraph className="record-card__content">{content}</Paragraph>
      <Button
        type="link"
        className="record-card__buttonText"
        onClick={onButtonClick}
      >
        {buttonText}
      </Button>
    </Card>
  );
};

export default ProductionRecordCard;
