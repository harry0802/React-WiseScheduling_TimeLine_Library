import { createTheme } from '@mui/material/styles'
import { theme as styledTheme } from './theme'
import { colors, typography, spacing, borders, effects } from '../designTokens'

/**
 * MUI Theme Configuration
 * 整合 Design Tokens 與現有的 styled-components theme 配置
 * 提供一致的設計系統給 MUI 組件使用
 * 日式高級餐廳風格
 */
const muiTheme = createTheme({
  palette: {
    mode: 'dark', // 啟用深色模式
    primary: {
      main: colors.accent.primary,
      dark: colors.accent.primaryHover,
      light: colors.accent.primaryLight,
      contrastText: colors.text.inverse
    },
    secondary: {
      main: styledTheme.colors.secondary,
      contrastText: '#fff'
    },
    error: {
      main: colors.functional.error
    },
    success: {
      main: colors.functional.success
    },
    warning: {
      main: colors.functional.warning
    },
    info: {
      main: colors.functional.info
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
      disabled: colors.text.tertiary
    },
    background: {
      default: colors.background.primary,
      paper: colors.background.surface
    },
    divider: colors.border.light
  },
  typography: {
    fontFamily: styledTheme.fonts.main,
    h1: {
      fontFamily: styledTheme.fonts.headings,
      fontSize: styledTheme.fontSizes['5xl'],
      fontWeight: 700
    },
    h2: {
      fontFamily: styledTheme.fonts.headings,
      fontSize: styledTheme.fontSizes['4xl'],
      fontWeight: 700
    },
    h3: {
      fontFamily: styledTheme.fonts.headings,
      fontSize: styledTheme.fontSizes['3xl'],
      fontWeight: 600
    },
    h4: {
      fontFamily: styledTheme.fonts.headings,
      fontSize: styledTheme.fontSizes['2xl'],
      fontWeight: 600
    },
    h5: {
      fontFamily: styledTheme.fonts.headings,
      fontSize: styledTheme.fontSizes.xl,
      fontWeight: 600
    },
    h6: {
      fontFamily: styledTheme.fonts.headings,
      fontSize: styledTheme.fontSizes.lg,
      fontWeight: 600
    },
    body1: {
      fontSize: styledTheme.fontSizes.base,
      lineHeight: 1.8
    },
    body2: {
      fontSize: styledTheme.fontSizes.sm,
      lineHeight: 1.8
    },
    button: {
      fontSize: styledTheme.fontSizes.base,
      fontWeight: 500,
      textTransform: 'none'
    }
  },
  spacing: 8, // 基礎間距單位 (8px)
  shape: {
    borderRadius: 8
  },
  shadows: [
    'none',
    styledTheme.shadows.sm,
    styledTheme.shadows.md,
    styledTheme.shadows.lg,
    styledTheme.shadows.xl,
    styledTheme.shadows['2xl'],
    styledTheme.shadows.xl,
    styledTheme.shadows['2xl'],
    styledTheme.shadows['2xl'],
    styledTheme.shadows['2xl'],
    styledTheme.shadows['2xl'],
    styledTheme.shadows['2xl'],
    styledTheme.shadows['2xl'],
    styledTheme.shadows['2xl'],
    styledTheme.shadows['2xl'],
    styledTheme.shadows['2xl'],
    styledTheme.shadows['2xl'],
    styledTheme.shadows['2xl'],
    styledTheme.shadows['2xl'],
    styledTheme.shadows['2xl'],
    styledTheme.shadows['2xl'],
    styledTheme.shadows['2xl'],
    styledTheme.shadows['2xl'],
    styledTheme.shadows['2xl'],
    styledTheme.shadows['2xl']
  ],
  breakpoints: {
    values: {
      xs: 0,
      sm: parseInt(styledTheme.breakpoints.mobile),
      md: parseInt(styledTheme.breakpoints.tablet),
      lg: parseInt(styledTheme.breakpoints.desktop),
      xl: parseInt(styledTheme.breakpoints.largeDesktop)
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: borders.radius.small,
          padding: `${spacing.md} ${spacing.xl}`,
          textTransform: 'none',
          fontWeight: typography.fontWeight.semibold,
          transition: effects.transitions.normal
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: borders.radius.medium,
          boxShadow: effects.shadows.small,
          transition: effects.transitions.normal,
          '&:hover': {
            boxShadow: effects.shadows.medium
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: borders.radius.small,
          backgroundImage: 'none' // 移除 MUI 預設漸層
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: borders.radius.small,
            backgroundColor: colors.background.surface,
            '& fieldset': {
              borderColor: colors.border.light
            },
            '&:hover fieldset': {
              borderColor: colors.accent.primary
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.accent.primary
            }
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: borders.radius.small,
          fontWeight: typography.fontWeight.medium
        }
      }
    }
  }
})

export default muiTheme

