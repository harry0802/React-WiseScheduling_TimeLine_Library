import React from 'react'
import styled from 'styled-components'
import { colors } from '../../../../designTokens'

//! =============== 1. Setup & Constants ===============

//! =============== 2. Styled Components ===============

/**
 * @component InlineCode
 * @description 行內代碼組件，統一 code 標籤樣式
 *
 * @example
 * <InlineCode>#FF5733</InlineCode>
 * <InlineCode>color.brand.primary</InlineCode>
 */
const InlineCode = styled.code`
  background-color: ${colors.background.surfaceAlt};
  color: ${colors.accent.gold};
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.9em;
  font-weight: 500;
`

export default InlineCode
