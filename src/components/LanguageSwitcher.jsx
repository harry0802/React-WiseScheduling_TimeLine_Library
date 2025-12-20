import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IconButton, Menu, MenuItem, Box, Typography } from '@mui/material'
import LanguageIcon from '@mui/icons-material/Language'
import { colors } from '../designTokens/colors'

//! =============== 1. Constants ===============

const LANGUAGES = [
  { code: 'zh-TW', label: '繁體中文', flag: '🇹🇼' },
  { code: 'en', label: 'English', flag: '🇺🇸' }
]

//! =============== 2. Main Component ===============

/**
 * Language Switcher Component
 *
 * @description
 * Dropdown menu for switching application language
 * - Persists selection to localStorage
 * - Displays current language with flag icon
 * - Accessible with ARIA labels
 *
 * @component
 */
function LanguageSwitcher() {
  const { i18n, t } = useTranslation('common')
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleOpen = useCallback((event) => {
    setAnchorEl(event.currentTarget)
  }, [])

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const handleLanguageChange = useCallback(
    (languageCode) => {
      i18n.changeLanguage(languageCode)
      handleClose()
    },
    [i18n, handleClose]
  )

  const currentLanguage =
    LANGUAGES.find((lang) => lang.code === i18n.language) || LANGUAGES[0]

  return (
    <>
      <Box
        onClick={handleOpen}
        aria-label='選擇語言'
        aria-controls={open ? 'language-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          padding: '8px 12px',
          borderRadius: '8px',
          cursor: 'pointer',
          color: colors.text.inverse,
          transition: 'background-color 0.2s',
          '&:hover': {
            backgroundColor: colors.accent.primary + '20'
          }
        }}
      >
        <LanguageIcon sx={{ fontSize: '1.25rem' }} />
        <Typography
          component='span'
          sx={{
            fontSize: '0.875rem',
            fontWeight: 500,
            lineHeight: 1
          }}
        >
          {currentLanguage.code === 'zh-TW' ? '繁中' : 'EN'}
        </Typography>
      </Box>

      <Menu
        id='language-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'language-button'
        }}
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: colors.background.primary,
            border: `1px solid ${colors.border.light}`,
            minWidth: 180
          }
        }}
      >
        {LANGUAGES.map((language) => (
          <MenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            selected={language.code === i18n.language}
            sx={{
              color: colors.text.inverse,
              '&.Mui-selected': {
                backgroundColor: colors.accent.primary + '30',
                '&:hover': {
                  backgroundColor: colors.accent.primary + '40'
                }
              },
              '&:hover': {
                backgroundColor: colors.accent.primary + '20'
              }
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                width: '100%'
              }}
            >
              <Typography
                component='span'
                sx={{ fontSize: '1.25rem' }}
              >
                {language.flag}
              </Typography>
              <Typography
                component='span'
                sx={{ fontSize: '0.95rem' }}
              >
                {language.label}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default LanguageSwitcher

