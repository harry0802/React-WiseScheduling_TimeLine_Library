import styled from "styled-components";
import { Select, MenuItem } from "@mui/material";

export const STATUS_MAP = {
  production: {
    color: "linear-gradient(180deg, #83BF45 0%, #2A2A2A 100%)",
    text: "機台生產中",
  },
  waiting: {
    color: "linear-gradient(180deg, #BDBDBD 0%, #2A2A2A 100%)",
    text: "待機",
  },
  testing: {
    color: "linear-gradient(180deg, #00C2FE 0%, #2A2A2A 100%)",
    text: "試模",
  },
  error: {
    color: "linear-gradient(180deg, #EB0004 0%, #2A2A2A 100%)",
    text: "機台異常",
  },
  tuning: {
    color: "linear-gradient(180deg, #FFCC00 0%, #2A2A2A 100%)",
    text: "機台調機中",
  },
};

export const Container = styled.div`
  width: 100%;
  * {
    box-sizing: border-box;
  }
`;

export const Box = styled.div`
  position: relative;
  margin-bottom: 10px;
  padding: 20px 0;
`;

export const FilterSection = styled.div`
  display: flex;
  gap: 30px;
`;

export const SelectBox = styled.div`
  display: flex;
  align-content: center;
  background: #fff;
`;

export const StyledSelect = styled(Select)`
  && {
    background: #fff;
    border-radius: 4px;
    min-width: 180px;
    height: 45px;

    .MuiSelect-select {
      color: #8f8f8f;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      padding: 8px 16px;
    }

    .MuiOutlinedInput-notchedOutline {
      border-color: #8f8f8f;
    }

    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: #fff;
    }

    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: #4f9ab1;
    }

    .MuiSelect-icon {
      color: #8f8f8f;
    }
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  && {
    background: #fff;
    color: #8f8f8f;
    &:hover {
      background: #4f9ab1;
      color: #ffffff;
    }

    &.Mui-selected {
      background-color: rgba(0, 194, 254, 0.3);

      &:hover {
        background: #4f9ab1;
        color: #ffffff;
      }
    }
  }
`;

export const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-height: 3.75rem;

  @media (min-width: 75rem) {
    font-size: 24px;
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 0.9375rem;
  color: #fff;
  text-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem;
`;

export const MachinesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
  margin-top: 30px;
  padding: 0 16px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const MachineBox = styled.div`
  position: relative;
  margin-top: 30px;
  display: flex;
  min-height: 150px;
  padding: 15px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex-shrink: 0;
  border-radius: 0.25rem;
  cursor: pointer;
  background: ${(props) =>
    STATUS_MAP[props.$status]?.color || STATUS_MAP.waiting.color};
  border: 2px solid transparent;
  background-clip: padding-box;
  transition: border-color 0.3s ease;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  &:hover {
    border-color: #fff;
  }

  .title-container {
    color: #fff;
    font-family: Roboto;
    font-size: 50px;
    font-style: normal;
    font-weight: 400;
    margin: 0;
  }

  .status-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    color: #fff;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 1.25rem;
    margin: 0;
    .icon {
      width: 32px;
      height: 32px;
      flex-shrink: 0;
    }
  }
`;
