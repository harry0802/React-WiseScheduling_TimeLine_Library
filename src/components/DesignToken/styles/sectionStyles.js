import { colors } from '../../../designTokens'
import { spacing } from '../../../designTokens/spacing'
import { borders } from '../../../designTokens/borders'

//! =============== 1. Setup & Constants ===============

/**
 * @description Shared style configurations for DesignToken page MUI components
 * Uses design tokens for consistent theming
 */

//! =============== 2. MUI Style Objects ===============

/**
 * Section title style for h5 typography variants
 * @type {Object}
 */
export const sectionTitleStyle = {
  color: colors.accent.primary,
  fontWeight: 600,
  mb: 2
}

/**
 * Quote box style for highlighted quotations
 * @type {Object}
 */
export const quoteBoxStyle = {
  p: 3,
  mb: 2,
  backgroundColor: colors.background.surfaceAlt,
  border: `1px solid ${colors.border.light}`,
  borderRadius: borders.radius.small,
  borderLeft: `4px solid ${colors.accent.primary}`,
  fontStyle: 'italic'
}

/**
 * Highlight box style for key takeaways and important notes
 * @type {Object}
 */
export const highlightBoxStyle = {
  p: 3,
  mb: 3,
  backgroundColor: colors.background.surfaceAlt,
  border: `2px solid ${colors.border.light}`,
  borderLeft: `4px solid ${colors.accent.primary}`,
  borderRadius: borders.radius.medium,
  clipPath:
    'polygon(0.75rem 0, calc(100% - 0.75rem) 0, 100% 0.75rem, 100% calc(100% - 0.75rem), calc(100% - 0.75rem) 100%, 0.75rem 100%, 0 calc(100% - 0.75rem), 0 0.75rem)'
}

/**
 * Token category card style for grid items
 * @type {Object}
 */
export const tokenCategoryCardStyle = {
  p: 2.5,
  backgroundColor: colors.background.surfaceAlt,
  border: `1px solid ${colors.border.light}`,
  borderRadius: borders.radius.small,
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: colors.accent.primary,
    transform: 'translateY(-2px)'
  }
}

