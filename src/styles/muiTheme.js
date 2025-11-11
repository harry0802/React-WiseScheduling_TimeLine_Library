import { createTheme } from '@mui/material/styles';
import { theme as styledTheme } from './theme';

/**
 * MUI Theme Configuration
 * 整合現有的 styled-components theme 配置
 * 提供一致的設計系統給 MUI 組件使用
 */
const muiTheme = createTheme({
  palette: {
    primary: {
      main: styledTheme.colors.primary,
      dark: styledTheme.colors.primaryDark,
      contrastText: '#fff',
    },
    secondary: {
      main: styledTheme.colors.secondary,
      contrastText: '#fff',
    },
    error: {
      main: styledTheme.colors.error,
    },
    success: {
      main: styledTheme.colors.success,
    },
    warning: {
      main: styledTheme.colors.warning,
    },
    text: {
      primary: styledTheme.colors.text,
      secondary: styledTheme.colors.lightText,
    },
    background: {
      default: styledTheme.colors.background,
      paper: styledTheme.colors.cardBackground,
    },
    divider: styledTheme.colors.border,
  },
  typography: {
    fontFamily: styledTheme.fonts.main,
    h1: {
      fontFamily: styledTheme.fonts.headings,
      fontSize: styledTheme.fontSizes['5xl'],
      fontWeight: 700,
    },
    h2: {
      fontFamily: styledTheme.fonts.headings,
      fontSize: styledTheme.fontSizes['4xl'],
      fontWeight: 700,
    },
    h3: {
      fontFamily: styledTheme.fonts.headings,
      fontSize: styledTheme.fontSizes['3xl'],
      fontWeight: 600,
    },
    h4: {
      fontFamily: styledTheme.fonts.headings,
      fontSize: styledTheme.fontSizes['2xl'],
      fontWeight: 600,
    },
    h5: {
      fontFamily: styledTheme.fonts.headings,
      fontSize: styledTheme.fontSizes.xl,
      fontWeight: 600,
    },
    h6: {
      fontFamily: styledTheme.fonts.headings,
      fontSize: styledTheme.fontSizes.lg,
      fontWeight: 600,
    },
    body1: {
      fontSize: styledTheme.fontSizes.base,
      lineHeight: 1.8,
    },
    body2: {
      fontSize: styledTheme.fontSizes.sm,
      lineHeight: 1.8,
    },
    button: {
      fontSize: styledTheme.fontSizes.base,
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  spacing: 8, // 基礎間距單位 (8px)
  shape: {
    borderRadius: 8,
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
    styledTheme.shadows['2xl'],
  ],
  breakpoints: {
    values: {
      xs: 0,
      sm: parseInt(styledTheme.breakpoints.mobile),
      md: parseInt(styledTheme.breakpoints.tablet),
      lg: parseInt(styledTheme.breakpoints.desktop),
      xl: parseInt(styledTheme.breakpoints.largeDesktop),
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: styledTheme.borderRadius.md,
          padding: `${styledTheme.spacing.sm} ${styledTheme.spacing.lg}`,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: styledTheme.borderRadius.lg,
          boxShadow: styledTheme.shadows.md,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: styledTheme.borderRadius.lg,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: styledTheme.borderRadius.md,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: styledTheme.borderRadius.md,
        },
      },
    },
  },
});

export default muiTheme;
