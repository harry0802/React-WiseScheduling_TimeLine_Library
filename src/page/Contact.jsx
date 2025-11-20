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
import muiTheme from '../styles/muiTheme'
import {
  CreamPaper,
  GoldBorderContainer,
  GoldDivider
} from '../components/StyledComponents'
import { colors } from '../designTokens'
import useDocumentTitle from '../hooks/useDocumentTitle'

const Contact = () => {
  // 設置頁面標題
  useDocumentTitle('聯絡方式')

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
            聯絡方式
          </Typography>
          <GoldDivider />
          <Typography
            variant='body1'
            sx={{ color: colors.text.inverse, mt: 2 }}
          >
            歡迎透過以下方式與我聯繫，我很樂意與您討論工作合作或技術交流的機會。
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
                社群連結
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
                      GitHub
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
                      github.com/harry0802
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
                      GitLab
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
                      Harry Lin@f2eharry.two.shoulder
                    </MuiLink>
                  </Box>
                </Box>
              </Box>
            </CreamPaper>
          </Grid>

          {/* Contact Information Form Section */}
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
                聯絡資訊
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
                      電子郵件
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
                      fdd89632@gmail.com
                    </MuiLink>
                  </Box>
                </Box>
              </Box>
            </CreamPaper>
          </Grid>

          {/* Note Section */}
          {/* <Grid
            item
            xs={12}
          >
            <Box
              sx={{
                p: 2,
                backgroundColor: colors.background.surfaceAlt,
                border: `2px solid ${colors.border.light}`,
                borderLeft: `4px solid ${colors.accent.primary}`,
                borderRadius: 1,
                clipPath:
                  'polygon(0.75rem 0, calc(100% - 0.75rem) 0, 100% 0.75rem, 100% calc(100% - 0.75rem), calc(100% - 0.75rem) 100%, 0.75rem 100%, 0 calc(100% - 0.75rem), 0 0.75rem)'
              }}
            >
              <Typography
                variant='subtitle1'
                gutterBottom
                sx={{
                  color: colors.accent.primary,
                  fontWeight: 700
                }}
              >
                📝 提示
              </Typography>
              <Typography
                variant='body2'
                sx={{ color: colors.text.primary }}
              >
                歡迎透過以上方式與我聯繫，期待與您交流！
              </Typography>
            </Box>
          </Grid> */}
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

export default Contact

