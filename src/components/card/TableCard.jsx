import styled from "styled-components";
import { Icon } from "@iconify/react";
import GlobalStyles from "../../styles/GlobalStyles"; // 导入 GlobalStyles
import BaseButton from "../button/BaseButton";
import { colors } from "../../designTokens";

// Styled components
const TableCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: self-start;
  padding: 1.875rem 1.4375rem;
  color: ${colors.text.inverse};
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 1.25rem;
  background: ${colors.background.secondary};
  border-radius: 8px;
  border: 1px solid ${colors.accent.primary}40;
  box-shadow: 0 2px 8px ${colors.accent.primary}20;
`;

const TableCardHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${colors.border.primary};
`;

const HeaderTitle = styled.h3`
  color: ${colors.accent.primary};
  font-family: Roboto, sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.25rem;
  margin: 0;
`;

const StyledBaseButton = styled(BaseButton)`
  display: flex;
  place-content: center center;
  width: 2.5rem;
  height: 2.5rem;
  background-color: ${colors.accent.primary};
  color: ${colors.background.primary};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 6px ${colors.accent.primary}40;

  & > svg {
    align-self: center;
    font-size: 1.2rem;
  }

  &:hover {
    background-color: ${colors.accent.primary};
    filter: brightness(1.1);
    box-shadow: 0 4px 10px ${colors.accent.primary}60;
    transform: scale(1.05);
  }

  &:active {
    filter: brightness(0.9);
    transform: scale(0.98);
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
