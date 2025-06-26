/**
 * @file AreaSelector.jsx
 * @description 區域選擇器組件
 * @author Harry's Engineering Team
 */

import React, { memo } from "react";
import { PRODUCTION_AREA } from "../../../../../../config/config";
import {
  StyledMenuItem,
  StyledSelect,
  FilterSection,
} from "../../../../assets/machineBoard.styles";

/**
 * 區域選擇器組件
 * @param {string} area - 當前區域
 * @param {Function} onAreaChange - 區域變更處理函數
 */
const AreaSelector = memo(({ area, onAreaChange }) => (
  <FilterSection>
    <StyledSelect value={area} onChange={onAreaChange}>
      {PRODUCTION_AREA.map(({ value, label }) => (
        <StyledMenuItem key={value} value={value}>
          {label}
        </StyledMenuItem>
      ))}
    </StyledSelect>
  </FilterSection>
));

AreaSelector.displayName = "AreaSelector";

export default AreaSelector;
