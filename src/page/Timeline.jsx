import React from 'react'
import { Container, Typography, Box, Chip, Grid } from '@mui/material'
import {
  Timeline as MuiTimeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent
} from '@mui/lab'
import { ThemeProvider } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import muiTheme from '../styles/muiTheme'
import {
  CreamPaper,
  GoldBorderContainer,
  GoldDivider,
  GoldBadge
} from '../components/StyledComponents'
import { colors } from '../designTokens'
import useDocumentTitle from '../hooks/useDocumentTitle'

const Timeline = () => {
  const { t } = useTranslation('timeline')

  // 設置頁面標題
  useDocumentTitle(t('meta.title'))

  // 從 i18n 載入時間軸階段資料
  const timelinePhases = Object.keys(
    t('phases', { returnObjects: true })
  ).map((phaseKey) => {
    const phase = t(`phases.${phaseKey}`, { returnObjects: true })
    return {
      phase: phase.phase,
      phaseTitle: phase.phaseTitle,
      items: phase.items
    }
  })

  // 從 i18n 載入技術棧資料
  const techStack = t('techStack.items', { returnObjects: true })


  return (
    <ThemeProvider theme={muiTheme}>
      <Container
        maxWidth='lg'
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
            {t('intro.title')}
          </Typography>
          <GoldDivider />
        </GoldBorderContainer>

        <CreamPaper
          elevation={2}
          sx={{
            mb: 4,
            clipPath:
              'polygon(1rem 0, calc(100% - 1rem) 0, 100% 1rem, 100% calc(100% - 1rem), calc(100% - 1rem) 100%, 1rem 100%, 0 calc(100% - 1rem), 0 1rem)'
          }}
        >
          <Typography
            variant='h5'
            component='h2'
            gutterBottom
            sx={{
              color: colors.accent.primary,
              fontWeight: 600,
              mt: 0,
              mb: 2
            }}
          >
            {t('intro.subtitle')}
          </Typography>
          <Typography
            variant='body1'
            sx={{ color: colors.text.primary }}
            paragraph
          >
            {t('intro.paragraph1')}
          </Typography>
          <Typography
            variant='body1'
            sx={{ color: colors.text.primary }}
          >
            {t('intro.paragraph2')}
          </Typography>
        </CreamPaper>

        <Box sx={{ position: 'relative' }}>
          {timelinePhases.map((phase, phaseIndex) => (
            <Box
              key={phaseIndex}
              sx={{ mb: phaseIndex < timelinePhases.length - 1 ? 6 : 0 }}
            >
              {/* Phase Header */}
              <GoldBorderContainer
                sx={{
                  mb: 3,
                  clipPath:
                    'polygon(1.5rem 0, calc(100% - 1.5rem) 0, 100% 1.5rem, 100% calc(100% - 1.5rem), calc(100% - 1.5rem) 100%, 1.5rem 100%, 0 calc(100% - 1.5rem), 0 1.5rem)'
                }}
              >
                <Typography
                  variant='h5'
                  sx={{
                    color: colors.accent.primary,
                    fontWeight: 700,
                    mb: 0.5
                  }}
                >
                  {phase.phase}
                </Typography>
                <Typography
                  variant='subtitle1'
                  sx={{
                    color: colors.text.inverse,
                    fontWeight: 600
                  }}
                >
                  {phase.phaseTitle}
                </Typography>
              </GoldBorderContainer>

              {/* Phase Items */}
              <MuiTimeline
                position='right'
                sx={{ mt: 0, pt: 0 }}
              >
                {phase.items.map((item, itemIndex) => (
                  <TimelineItem key={itemIndex}>
                    <TimelineOppositeContent
                      sx={{
                        m: 'auto 0',
                        flex: 0.2,
                        px: 2
                      }}
                      align='right'
                      variant='body2'
                    >
                      <GoldBadge sx={{ display: 'inline-block' }}>
                        {item.date}
                      </GoldBadge>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot
                        sx={{
                          borderWidth: 2,
                          borderColor: colors.accent.primary,
                          backgroundColor: colors.background.primary
                        }}
                      />
                      {itemIndex < phase.items.length - 1 && (
                        <TimelineConnector
                          sx={{ bgcolor: colors.accent.primary }}
                        />
                      )}
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: 1.5, px: 2 }}>
                      <CreamPaper
                        elevation={2}
                        sx={{
                          p: 2.5,
                          borderLeft: `4px solid ${colors.accent.primary}`,
                          clipPath:
                            'polygon(0.75rem 0, calc(100% - 0.75rem) 0, 100% 0.75rem, 100% calc(100% - 0.75rem), calc(100% - 0.75rem) 100%, 0.75rem 100%, 0 calc(100% - 0.75rem), 0 0.75rem)'
                        }}
                      >
                        <Typography
                          variant='h6'
                          component='h4'
                          gutterBottom
                          sx={{
                            fontWeight: 600,
                            color: colors.accent.primary,
                            mb: 1
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant='body2'
                          sx={{ color: colors.text.primary, lineHeight: 1.8 }}
                        >
                          {item.description}
                        </Typography>
                      </CreamPaper>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </MuiTimeline>
            </Box>
          ))}
        </Box>

        <CreamPaper
          elevation={2}
          sx={{
            mt: 4,
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
              mb: 2
            }}
          >
            {t('techStack.title')}
          </Typography>
          <Grid
            container
            spacing={1}
          >
            {techStack.map((tech, index) => (
              <Grid
                item
                key={index}
              >
                <Chip
                  label={tech}
                  sx={{
                    fontWeight: 500,
                    borderWidth: 2,
                    borderColor: colors.accent.primary,
                    color: colors.accent.primary,
                    borderStyle: 'solid',
                    backgroundColor: 'transparent'
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </CreamPaper>
      </Container>
    </ThemeProvider>
  )
}

export default Timeline

