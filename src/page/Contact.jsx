import React from 'react'
import {
  Container,
  Typography,
  Box,
  Link as MuiLink,
  Grid
} from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import GitHubIcon from '@mui/icons-material/GitHub'
import CodeIcon from '@mui/icons-material/Code'
import EmailIcon from '@mui/icons-material/Email'
import { useTranslation } from 'react-i18next'
import muiTheme from '../styles/muiTheme'
import {
  CreamPaper,
  GoldBorderContainer,
  GoldDivider
} from '../components/StyledComponents'
import { colors } from '../designTokens'
import useDocumentTitle from '../hooks/useDocumentTitle'

const Contact = () => {
  const { t } = useTranslation('contact')

  // 設置頁面標題
  useDocumentTitle(t('meta.title'))

  return (
    <ThemeProvider theme={muiTheme}>
      <Container
        maxWidth='md'
        sx={{
          py: 6,
          backgroundColor: colors.background.primary,
          minHeight: '100vh'
        }}
      >
        <GoldBorderContainer
          sx={{
            mb: 4,
            textAlign: 'center',
            clipPath:
              'polygon(2rem 0, calc(100% - 2rem) 0, 100% 2rem, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 2rem 100%, 0 calc(100% - 2rem), 0 2rem)'
          }}
        >
          <Typography
            variant='h3'
            component='h1'
            gutterBottom
            sx={{
              fontWeight: 700,
              color: colors.accent.primary,
              mb: 2
            }}
          >
            {t('header.title')}
          </Typography>
          <GoldDivider />
          <Typography
            variant='body1'
            sx={{ color: colors.text.inverse, mt: 2 }}
          >
            {t('header.subtitle')}
          </Typography>
        </GoldBorderContainer>

        <Grid
          container
          spacing={3}
        >
          {/* Social Links Section */}
          <Grid
            item
            xs={12}
          >
            <CreamPaper
              elevation={2}
              sx={{
                clipPath:
                  'polygon(1rem 0, calc(100% - 1rem) 0, 100% 1rem, 100% calc(100% - 1rem), calc(100% - 1rem) 100%, 1rem 100%, 0 calc(100% - 1rem), 0 1rem)'
              }}
            >
              <Typography
                variant='h5'
                gutterBottom
                sx={{
                  color: colors.accent.primary,
                  fontWeight: 600,
                  mb: 3
                }}
              >
                {t('sections.social.title')}
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* GitHub */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    backgroundColor: colors.background.surfaceAlt,
                    border: `1px solid ${colors.border.light}`,
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: colors.accent.primary
                    }
                  }}
                >
                  <GitHubIcon
                    sx={{ color: colors.accent.primary, fontSize: 32 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant='subtitle2'
                      sx={{ mb: 0.5, color: colors.text.secondary }}
                    >
                      {t('sections.social.github.label')}
                    </Typography>
                    <MuiLink
                      href='https://github.com/harry0802'
                      target='_blank'
                      rel='noopener noreferrer'
                      sx={{
                        color: colors.accent.primary,
                        fontWeight: 600,
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      {t('sections.social.github.url')}
                    </MuiLink>
                  </Box>
                </Box>

                {/* GitLab */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    backgroundColor: colors.background.surfaceAlt,
                    border: `1px solid ${colors.border.light}`,
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: colors.accent.primary
                    }
                  }}
                >
                  <CodeIcon
                    sx={{ color: colors.accent.primary, fontSize: 32 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant='subtitle2'
                      sx={{ mb: 0.5, color: colors.text.secondary }}
                    >
                      {t('sections.social.gitlab.label')}
                    </Typography>
                    <MuiLink
                      href='https://gitlab.com/f2eharry.two.shoulder'
                      target='_blank'
                      rel='noopener noreferrer'
                      sx={{
                        color: colors.accent.primary,
                        fontWeight: 600,
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      {t('sections.social.gitlab.url')}
                    </MuiLink>
                  </Box>
                </Box>
              </Box>
            </CreamPaper>
          </Grid>

          {/* Contact Information Section */}
          <Grid
            item
            xs={12}
          >
            <CreamPaper
              elevation={2}
              sx={{
                clipPath:
                  'polygon(1rem 0, calc(100% - 1rem) 0, 100% 1rem, 100% calc(100% - 1rem), calc(100% - 1rem) 100%, 1rem 100%, 0 calc(100% - 1rem), 0 1rem)'
              }}
            >
              <Typography
                variant='h5'
                gutterBottom
                sx={{
                  color: colors.accent.primary,
                  fontWeight: 600,
                  mb: 3
                }}
              >
                {t('sections.info.title')}
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    backgroundColor: colors.background.surfaceAlt,
                    border: `1px solid ${colors.border.light}`,
                    borderRadius: 2
                  }}
                >
                  <EmailIcon
                    sx={{ color: colors.accent.primary, fontSize: 32 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant='subtitle2'
                      sx={{ mb: 0.5, color: colors.text.secondary }}
                    >
                      {t('sections.info.email.label')}
                    </Typography>
                    <MuiLink
                      href='mailto:fdd89632@gmail.com'
                      sx={{
                        color: colors.accent.primary,
                        fontWeight: 600,
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      {t('sections.info.email.address')}
                    </MuiLink>
                  </Box>
                </Box>
              </Box>
            </CreamPaper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

export default Contact
