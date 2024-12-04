import styled from "styled-components";
import { Grid, Typography, Paper } from "@mui/material";

const StyledPaper = styled(Paper)`
  border-radius: 8px;
  && {
    width: 100%;
    background-color: transparent;
    border: none;
    box-shadow: none;
  }
`;

const StyledGrid = styled(Grid)`
  && {
    display: flex;
    flex-wrap: wrap;
  }
`;

const StyledGridItem = styled(Grid)`
  && {
    flex-basis: 20%;
    max-width: 20%;
    padding: 8px;

    @media (max-width: 1200px) {
      flex-basis: 25%;
      max-width: 25%;
    }

    @media (max-width: 960px) {
      flex-basis: 33.333%;
      max-width: 33.333%;
    }

    @media (max-width: 600px) {
      flex-basis: 50%;
      max-width: 50%;
    }
  }
`;

const StyledLabel = styled(Typography)`
  && {
    color: var(--color-text-secondary);
    font-size: 1.125rem;
  }
`;

const StyledValue = styled(Typography)`
  && {
    font-size: 1.125rem;
    font-weight: 500;
    color: var(--color-text);
  }
`;

export function ProfitGrid({ data }) {
  return (
    <StyledPaper>
      <StyledGrid container>
        {data?.map((item) => (
          <StyledGridItem item key={item.key}>
            <StyledLabel variant="body2">{item.label}</StyledLabel>
            <StyledValue variant="body2">{item.value}</StyledValue>
          </StyledGridItem>
        ))}
      </StyledGrid>
    </StyledPaper>
  );
}
