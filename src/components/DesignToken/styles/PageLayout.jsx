import styled from 'styled-components'
import { colors } from '../../../designTokens'

//! =============== 1. Setup & Constants ===============

/**
 * @description Page layout styled components for DesignToken page
 * Uses design tokens and theme system for consistent styling
 */

//! =============== 2. Styled Components ===============

/**
 * @component PageContainer
 * @description Main page container with responsive padding and background
 * Replaces inline Container sx props with styled component
 */
export const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['3xl']}
    ${({ theme }) => theme.spacing.md};
  background-color: ${colors.background.primary};
  min-height: 100vh;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xl}
      ${({ theme }) => theme.spacing.sm};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    padding: ${({ theme }) => theme.spacing['3xl']}
      ${({ theme }) => theme.spacing.xl};
  }
`

/**
 * @component PageHeader
 * @description Page title header with clipped corners design
 * Replaces GoldBorderContainer with custom clipPath
 */
export const PageHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  background-color: ${colors.background.surface};
  border: 2px solid ${colors.accent.primary};
  clip-path: polygon(
    2rem 0,
    calc(100% - 2rem) 0,
    100% 2rem,
    100% calc(100% - 2rem),
    calc(100% - 2rem) 100%,
    2rem 100%,
    0 calc(100% - 2rem),
    0 2rem
  );

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    clip-path: polygon(
      1rem 0,
      calc(100% - 1rem) 0,
      100% 1rem,
      100% calc(100% - 1rem),
      calc(100% - 1rem) 100%,
      1rem 100%,
      0 calc(100% - 1rem),
      0 1rem
    );
  }
`

/**
 * @component PageTitle
 * @description Main page title with responsive typography
 */
export const PageTitle = styled.h1`
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  color: ${colors.accent.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    font-size: ${({ theme }) => theme.responsiveFontSizes.wide['4xl']};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.ultrawide}) {
    font-size: ${({ theme }) => theme.responsiveFontSizes.ultrawide['4xl']};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tv}) {
    font-size: ${({ theme }) => theme.responsiveFontSizes.tv['4xl']};
  }
`

/**
 * @component DividerLine
 * @description Gold-colored divider line for page header
 */
export const DividerLine = styled.hr`
  border: none;
  height: 2px;
  background: linear-gradient(
    to right,
    transparent,
    ${colors.accent.primary},
    transparent
  );
  margin: ${({ theme }) => theme.spacing.md} 0;
`

