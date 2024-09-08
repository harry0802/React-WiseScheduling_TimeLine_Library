import styled from "styled-components";
import { Icon } from "@iconify/react";
import BaseButton from "../button/BaseButton";
import GlobalStyles from "../../styles/GlobalStyle"; // 导入 GlobalStyles

// Styled components
const TableCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: self-start;
  padding: 1.875rem 1.4375rem;
  color: var(--color-text-primary);
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 1.25rem;
  background: var(--color-background-card);
  border-radius: 4px;
  border: 1px solid #fff;
`;

const TableCardHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
`;

const HeaderTitle = styled.h3`
  color: var(--color-text-primary);
  font-family: Roboto, sans-serif;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.25rem;
`;

const StyledBaseButton = styled(BaseButton)`
  display: flex;
  place-content: center center;
  width: 2.1875rem;
  height: 2.1875rem;
  background-color: var(--color-primary-main);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  & > svg {
    align-self: center;
  }

  &:hover {
    background-color: var(--color-hover);
  }

  &:active {
    background-color: var(--color-active);
  }
`;

// TableCard component
function TableCard({ title, onAddClick, children }) {
  return (
    <TableCardWrapper>
      <GlobalStyles />
      <TableCardHeader>
        <HeaderTitle>{title}</HeaderTitle>
        <StyledBaseButton onClick={onAddClick}>
          <Icon icon="mingcute:add-fill" />
        </StyledBaseButton>
      </TableCardHeader>
      {children}
    </TableCardWrapper>
  );
}

export default TableCard;
