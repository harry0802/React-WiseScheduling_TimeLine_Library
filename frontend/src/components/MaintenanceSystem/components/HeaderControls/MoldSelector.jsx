import { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import styled from "styled-components";
import { useGetMoldSNsQuery } from "../../features/moldMaintenance/services/moldMaintenanceApi";
import { Stack } from "@mui/system";

const StyledFormControl = styled(FormControl)`
  && {
    color: #fff;
    .MuiOutlinedInput-root {
      max-height: 3.4375rem;
      font-size: 1.25rem;
      border-radius: 4px;
      color: currentColor;

      .MuiOutlinedInput-notchedOutline {
        border: 1px solid currentColor;
        transition: all 0.3s ease;
      }

      &:hover .MuiOutlinedInput-notchedOutline {
        border-color: #666;
      }

      .MuiSelect-icon {
        color: currentColor;
      }
    }

    .MuiInputLabel-root {
      color: currentColor;
      &.Mui-focused {
        color: currentColor;
      }
    }
  }
`;

const StyledMenuItem = styled(MenuItem)`
  color: #fff;
  &.Mui-selected {
    background-color: #444;
    &:hover {
      background-color: #555;
    }
  }
`;

const StyledSelect = styled(Select)`
  && {
    color: currentColor;
    .MuiSelect-icon {
      color: currentColor;
    }
  }
`;

function MoldSelector({ value, onChange }) {
  const [selectedMoldId, setSelectedMoldId] = useState(value || "");

  const { data: moldSn, isLoading, isSuccess } = useGetMoldSNsQuery();
  const handleMoldChange = (e) => {
    const newMoldId = e.target.value;
    setSelectedMoldId(newMoldId);
    onChange?.(newMoldId);
  };
  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Stack direction="row" spacing={1} sx={{ minWidth: 200 }}>
      <StyledFormControl sx={{ minWidth: 200 }}>
        <InputLabel>模具</InputLabel>
        <StyledSelect
          value={selectedMoldId || ""}
          onChange={handleMoldChange}
          label="模具"
        >
          {isSuccess &&
            moldSn.map((mold, index) => (
              <StyledMenuItem key={index} label={mold} value={mold}>
                {mold}
              </StyledMenuItem>
            ))}
        </StyledSelect>
      </StyledFormControl>
    </Stack>
  );
}

export default MoldSelector;
