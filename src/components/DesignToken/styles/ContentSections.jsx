import styled from 'styled-components'
import { colors } from '../../../designTokens'

//! =============== 1. Setup & Constants ===============

/**
 * @description Content section styled components for DesignToken page
 * Provides reusable section wrappers with consistent styling
 */

//! =============== 2. Styled Components ===============

/**
 * @component ContentSection
 * @description Base content section with cream paper background and clipped corners
 * Replaces ClippedCreamPaper component with more semantic naming
 */
export const ContentSection = styled.section`
  background-color: ${colors.background.surface};
  padding: ${({ theme }) => theme.spacing['2xl']};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  clip-path: polygon(
    1.5rem 0,
    calc(100% - 1.5rem) 0,
    100% 1.5rem,
    100% calc(100% - 1.5rem),
    calc(100% - 1.5rem) 100%,
    1.5rem 100%,
    0 calc(100% - 1.5rem),
    0 1.5rem
  );

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xl};
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
 * @component SectionTitle
 * @description Section heading with consistent typography and color
 */
export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: 600;
  color: ${colors.accent.gold};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    font-size: ${({ theme }) => theme.responsiveFontSizes.wide['2xl']};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.ultrawide}) {
    font-size: ${({ theme }) => theme.responsiveFontSizes.ultrawide['2xl']};
  }
`

/**
 * @component SubsectionTitle
 * @description Subsection heading (h3) with consistent styling
 */
export const SubsectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 600;
  color: ${colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    font-size: ${({ theme }) => theme.responsiveFontSizes.wide.xl};
  }
`

/**
 * @component QuoteBox
 * @description Blockquote-style box for highlighted quotes
 */
export const QuoteBox = styled.blockquote`
  background-color: ${colors.background.surfaceAlt};
  border-left: 4px solid ${colors.accent.gold};
  padding: ${({ theme }) => theme.spacing.lg};
  margin: ${({ theme }) => theme.spacing.xl} 0;
  font-style: italic;
  color: ${colors.text.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`

/**
 * @component HighlightBox
 * @description Highlighted information box with gold accent border
 */
export const HighlightBox = styled.div`
  background: linear-gradient(
    135deg,
    ${colors.background.surface},
    ${colors.background.surfaceAlt}
  );
  border: 2px solid ${colors.accent.gold};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  margin: ${({ theme }) => theme.spacing['2xl']} 0;
  box-shadow: ${({ theme }) => theme.shadows.md};
`

/**
 * @component CodeBlock
 * @description Inline code snippet styling
 */
export const CodeInline = styled.code`
  background-color: ${colors.background.surfaceAlt};
  color: ${colors.accent.gold};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`

/**
 * @component ImageContainer
 * @description Centered image container with responsive sizing
 */
export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${({ theme }) => theme.spacing['2xl']} 0;

  img {
    max-width: 100%;
    height: auto;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`

/**
 * @component ContentList
 * @description Styled list for content sections
 */
export const ContentList = styled.ul`
  padding-left: ${({ theme }) => theme.spacing.xl};
  color: ${colors.text.primary};

  li {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    line-height: 1.8;
  }
`

