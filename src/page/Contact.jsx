import React from 'react';
import { PageContainer, Title, Paragraph, Card } from '../styles/SharedStyles';
import styled from 'styled-components';

const ContactCard = styled(Card)`
  margin-top: 1.5rem;
`;

const ContactItem = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Contact = () => {
  return (
    <PageContainer>
      <Title>聯絡我們</Title>
      <Paragraph>如果您有任何問題或建議，請隨時與我們聯繫。</Paragraph>
      <ContactCard>
        <ContactItem>
          <strong>電子郵件：</strong>&nbsp;contact@timelineproject.com
        </ContactItem>
        <ContactItem>
          <strong>電話：</strong>&nbsp;(02) 1234-5678
        </ContactItem>
        <ContactItem>
          <strong>地址：</strong>&nbsp;台北市信義區松高路1號
        </ContactItem>
        <ContactItem>
          <strong>營業時間：</strong>&nbsp;週一至週五 9:00-18:00
        </ContactItem>
      </ContactCard>
    </PageContainer>
  );
};

export default Contact;
