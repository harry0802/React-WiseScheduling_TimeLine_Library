import React from 'react'
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Alert,
  Container
} from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import muiTheme from '../../styles/muiTheme'
import { GoldBorderContainer, GoldDivider } from '../StyledComponents'
import { colors } from '../../designTokens'
import ClippedCreamPaper from './styles/ClippedCreamPaper'
import OctagonImage from './styles/OctagonImage'
import {
  highlightBoxStyle
} from './styles/sectionStyles'
import {
  scssExample,
  cssVariablesExample,
  systemTokenExample,
  figmaThemeExample,
  semanticColorExample,
  emotionGlobalStylesExample,
  muiThemeIntegrationExample,
  figmaArchitectureExample
} from './data/exampleData'
// 共用組件
import CenteredImage from './components/shared/CenteredImage'
import ContentDivider from './components/shared/ContentDivider'
import InlineCode from './components/shared/InlineCode'
import ExternalLink from './components/shared/ExternalLink'
import SectionTitle from './components/shared/SectionTitle'
import SubsectionTitle from './components/shared/SubsectionTitle'
import QuoteBox from './components/shared/QuoteBox'
import useDocumentTitle from '../../hooks/useDocumentTitle'

//! =============== 1. Setup & Constants ===============

/**
 * @description Container style configuration
 */
const containerStyle = {
  py: 6,
  backgroundColor: colors.background.primary,
  minHeight: '100vh'
}

/**
 * @description Header clip-path for octagonal design
 */
const headerClipPath =
  'polygon(2rem 0, calc(100% - 2rem) 0, 100% 2rem, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 2rem 100%, 0 calc(100% - 2rem), 0 2rem)'

//! =============== 2. Component Definition ===============

/**
 * @component DesignToken
 * @description Design Token 推動頁面
 * 重構決策：
 * - 提取 SideBanners 到獨立檔案
 * - 使用 theme 系統的響應式斷點
 * - 應用一致的 design tokens
 * - 整合 i18n 支援多語言切換
 */
const DesignToken = () => {
  const { t } = useTranslation('designToken')

  // 設置頁面標題
  useDocumentTitle(t('meta.title'))

  return (
    <ThemeProvider theme={muiTheme}>
      <Container
        maxWidth='lg'
        sx={containerStyle}
      >
        {/* 頁面標題 */}
        <GoldBorderContainer
          sx={{
            mb: 4,
            textAlign: 'center',
            clipPath: headerClipPath
          }}
        >
          <Typography
            variant='h3'
            component='h1'
            gutterBottom
            sx={{ fontWeight: 700, color: colors.accent.primary, mb: 2 }}
          >
            {t('meta.title')}
          </Typography>
          <GoldDivider />
        </GoldBorderContainer>

        {/* 前言 */}
        <ClippedCreamPaper>
          <SectionTitle title={t('intro.title')} />
          <Typography
            variant='body1'
            sx={{ color: colors.text.primary }}
            paragraph
          >
            {t('intro.paragraph1')}
          </Typography>
          <Box sx={{ pl: 2, mb: 2 }}>
            <Typography
              variant='body1'
              sx={{ color: colors.text.primary }}
              paragraph
            >
              <strong>{t('intro.painPoints.styleRepetition.title')}</strong>
              {t('intro.painPoints.styleRepetition.content')}
            </Typography>
            <Typography
              variant='body1'
              sx={{ color: colors.text.primary }}
              paragraph
            >
              <strong>{t('intro.painPoints.updateSync.title')}</strong>
              {t('intro.painPoints.updateSync.content')}
            </Typography>
          </Box>
          <Typography
            variant='body1'
            sx={{ color: colors.text.primary }}
          >
            {t('intro.conclusion')}
            <strong>{t('intro.conclusion_bold')}</strong>{' '}
            {t('intro.conclusion_suffix')}
          </Typography>
        </ClippedCreamPaper>

        {/* 什麼是設計系統 */}
        <ClippedCreamPaper>
          <SectionTitle
            title={t('sections.whatIsDesignSystem.title')}
            showDivider={false}
          />
          <Typography
            variant='body1'
            sx={{ color: colors.text.primary }}
            paragraph
          >
            {t('sections.whatIsDesignSystem.paragraph1')}
            <strong>{t('sections.whatIsDesignSystem.paragraph1_bold')}</strong>
            {t('sections.whatIsDesignSystem.paragraph1_suffix')}
          </Typography>
          <QuoteBox>
            {t('sections.whatIsDesignSystem.quote')}
          </QuoteBox>
          <Typography
            variant='body1'
            sx={{ color: colors.text.primary }}
            paragraph
          >
            {t('sections.whatIsDesignSystem.paragraph2')}
          </Typography>
          <Typography
            variant='body1'
            sx={{ color: colors.text.primary }}
          >
            {t('sections.whatIsDesignSystem.paragraph3')}
            <strong>{t('sections.whatIsDesignSystem.paragraph3_bold')}</strong>
            {t('sections.whatIsDesignSystem.paragraph3_suffix')}
          </Typography>
        </ClippedCreamPaper>

        {/* 什麼是 Design Tokens */}
        <ClippedCreamPaper>
          <SectionTitle
            title={t('sections.whatIsDesignToken.title')}
            showDivider={false}
          />
          <Typography
            variant='body1'
            sx={{ color: colors.text.primary }}
            paragraph
          >
            {t('sections.whatIsDesignToken.paragraph1')}
            <strong>{t('sections.whatIsDesignToken.paragraph1_bold')}</strong>
            {t('sections.whatIsDesignToken.paragraph1_suffix')}
          </Typography>
          <QuoteBox>
            {t('sections.whatIsDesignToken.quote')}
          </QuoteBox>
          <Typography
            variant='body1'
            sx={{ color: colors.text.primary }}
            paragraph
          >
            {t('sections.whatIsDesignToken.paragraph2')}
            <strong>
              {t('sections.whatIsDesignToken.paragraph2_bold')}
            </strong>
            {t('sections.whatIsDesignToken.paragraph2_suffix')}
          </Typography>
          <Typography
            variant='body1'
            sx={{ color: colors.text.primary }}
            paragraph
          >
            {t('sections.whatIsDesignToken.example.intro')}{' '}
            <InlineCode>{t('sections.whatIsDesignToken.example.intro_code')}</InlineCode>
            {t('sections.whatIsDesignToken.example.intro_suffix')}{' '}
            <InlineCode>{t('sections.whatIsDesignToken.example.token_name')}</InlineCode>{' '}
            {t('sections.whatIsDesignToken.example.token_suffix')}{' '}
            <InlineCode>{t('sections.whatIsDesignToken.example.token_value')}</InlineCode>
            {t('sections.whatIsDesignToken.example.token_end')}
          </Typography>
          <Typography
            variant='body1'
            sx={{ color: colors.text.primary }}
            paragraph
          >
            {t('sections.whatIsDesignToken.platformConversion.title')}
          </Typography>
          <Box sx={{ mb: 2, pl: 2 }}>
            <Typography
              variant='body2'
              component='div'
              sx={{ fontFamily: 'monospace', mb: 1 }}
            >
              • <strong>{t('sections.whatIsDesignToken.platformConversion.web')}</strong>{' '}
              <InlineCode>{t('sections.whatIsDesignToken.platformConversion.webCode')}</InlineCode>
            </Typography>
            <Typography
              variant='body2'
              component='div'
              sx={{ fontFamily: 'monospace', mb: 1 }}
            >
              • <strong>{t('sections.whatIsDesignToken.platformConversion.ios')}</strong>{' '}
              <InlineCode>
                {t('sections.whatIsDesignToken.platformConversion.iosCode')}
              </InlineCode>
            </Typography>
            <Typography
              variant='body2'
              component='div'
              sx={{ fontFamily: 'monospace' }}
            >
              • <strong>{t('sections.whatIsDesignToken.platformConversion.android')}</strong>{' '}
              <InlineCode>
                {t('sections.whatIsDesignToken.platformConversion.androidCode')}
              </InlineCode>
            </Typography>
          </Box>
          <Typography
            variant='body1'
            sx={{ color: colors.text.primary }}
            paragraph
          >
            {t('sections.whatIsDesignToken.paragraph3')}
          </Typography>
          <Typography
            variant='body1'
            sx={{ color: colors.text.primary }}
            paragraph
          >
            {t('sections.whatIsDesignToken.benefits.title')}
          </Typography>
          <Box sx={{ pl: 2, mb: 2 }}>
            <Typography
              variant='body1'
              sx={{ color: colors.text.primary }}
              paragraph
            >
              {t('sections.whatIsDesignToken.benefits.repetition.prefix')}
              <strong>{t('sections.whatIsDesignToken.benefits.repetition.bold')}</strong>
              {t('sections.whatIsDesignToken.benefits.repetition.content')}
            </Typography>
            <Typography
              variant='body1'
              sx={{ color: colors.text.primary }}
              paragraph
            >
              {t('sections.whatIsDesignToken.benefits.update.prefix')}
              <strong>{t('sections.whatIsDesignToken.benefits.update.bold')}</strong>
              {t('sections.whatIsDesignToken.benefits.update.content')}{' '}
              <InlineCode>{t('sections.whatIsDesignToken.benefits.update.newColor')}</InlineCode>{' '}
              {t('sections.whatIsDesignToken.benefits.update.content_middle')}{' '}
              <InlineCode>{t('sections.whatIsDesignToken.benefits.update.token')}</InlineCode>{' '}
              {t('sections.whatIsDesignToken.benefits.update.content_suffix')}
            </Typography>
          </Box>
          <Typography
            variant='body1'
            sx={{ color: colors.text.primary }}
            paragraph
          >
            {t('sections.whatIsDesignToken.summary')}
          </Typography>
          <CenteredImage
            src={`${
              import.meta.env.BASE_URL
            }images/desighToken/design-token-concept.webp`}
            alt={t('sections.whatIsDesignToken.imageAlt')}
          />
        </ClippedCreamPaper>

        {/* 色彩命名整合守則 */}
        <ClippedCreamPaper>
          <SectionTitle
            title={t('sections.colorNaming.title')}
            showDivider={false}
          />
          <Box sx={{ mb: 3 }}>
            <SubsectionTitle title={t('sections.colorNaming.structure.title')} />
            <CenteredImage
              src={`${
                import.meta.env.BASE_URL
              }images/desighToken/token-architecture.webp`}
              alt={t('sections.colorNaming.structure.imageAlt')}
              containerSx={{ mt: 2, mb: 3 }}
            />
            <Box
              sx={{
                p: 2,
                backgroundColor: colors.background.surfaceAlt,
                border: `1px solid ${colors.border.light}`,
                borderRadius: 1,
                fontFamily: 'monospace'
              }}
            >
              <Typography
                variant='body1'
                sx={{ fontWeight: 600 }}
              >
                {t('sections.colorNaming.structure.formula')}
              </Typography>
              <Typography
                variant='body2'
                sx={{ color: colors.text.primary }}
              >
                {t('sections.colorNaming.structure.formulaEn')}
              </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography
                variant='body2'
                sx={{ color: colors.text.primary }}
                component='div'
              >
                {t('sections.colorNaming.structure.breakdown.element')}
              </Typography>
              <Typography
                variant='body2'
                sx={{ color: colors.text.primary }}
                component='div'
              >
                {t('sections.colorNaming.structure.breakdown.type')}
              </Typography>
              <Typography
                variant='body2'
                sx={{ color: colors.text.primary }}
                component='div'
              >
                {t('sections.colorNaming.structure.breakdown.hierarchy')}
              </Typography>
              <Typography
                variant='body2'
                sx={{ color: colors.text.primary }}
                component='div'
              >
                {t('sections.colorNaming.structure.breakdown.state')}
              </Typography>
            </Box>
          </Box>
          <ContentDivider />
          <SubsectionTitle title={t('sections.colorNaming.examples.title')} />
          <TableContainer>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>{t('sections.colorNaming.examples.tableHeaders.element')}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{t('sections.colorNaming.examples.tableHeaders.type')}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{t('sections.colorNaming.examples.tableHeaders.hierarchy')}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{t('sections.colorNaming.examples.tableHeaders.state')}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{t('sections.colorNaming.examples.tableHeaders.name')}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{t('sections.colorNaming.examples.tableHeaders.description')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {t('sections.colorNaming.examples.data', { returnObjects: true }).map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.element}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.hierarchy}</TableCell>
                    <TableCell>{row.state || '-'}</TableCell>
                    <TableCell>
                      <Box
                        component='code'
                        sx={{
                          px: 1,
                          py: 0.5,
                          background: 'rgba(97, 218, 251, 0.08)',
                          borderRadius: 1,
                          fontSize: '0.875rem',
                          fontFamily: 'monospace'
                        }}
                      >
                        {row.name}
                      </Box>
                    </TableCell>
                    <TableCell>{row.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <ContentDivider />
          <SubsectionTitle title={t('sections.colorNaming.simplification.title')} />
          <Box
            component='ul'
            sx={{ pl: 3 }}
          >
            <Typography
              component='li'
              variant='body2'
              sx={{ color: colors.text.primary }}
              paragraph
            >
              {t('sections.colorNaming.simplification.point1')}
            </Typography>
            <Typography
              component='li'
              variant='body2'
              sx={{ color: colors.text.primary }}
              paragraph
            >
              {t('sections.colorNaming.simplification.point2')}
            </Typography>
            <Typography
              component='li'
              variant='body2'
              sx={{ color: colors.text.primary }}
            >
              {t('sections.colorNaming.simplification.point3')}
            </Typography>
          </Box>
          <ContentDivider />
          <SubsectionTitle title={t('sections.colorNaming.practicalUse.title')} />
          <SyntaxHighlighter
            language='scss'
            style={vscDarkPlus}
          >
            {scssExample}
          </SyntaxHighlighter>
          <ContentDivider />
          <SubsectionTitle title={t('sections.colorNaming.expansion.title')} />
          <Box
            component='ul'
            sx={{ pl: 3 }}
          >
            <Typography
              component='li'
              variant='body2'
              sx={{ color: colors.text.primary }}
              paragraph
            >
              {t('sections.colorNaming.expansion.point1')}
            </Typography>
            <Typography
              component='li'
              variant='body2'
              sx={{ color: colors.text.primary }}
            >
              {t('sections.colorNaming.expansion.point2')}
            </Typography>
          </Box>
        </ClippedCreamPaper>

        {/* 重點 */}
        <Box sx={highlightBoxStyle}>
          <SubsectionTitle
            title={t('sections.highlights.title')}
            sx={{ color: colors.accent.primary }}
          />
          <Box
            component='ul'
            sx={{ pl: 3 }}
          >
            <Typography
              component='li'
              variant='body2'
              sx={{ color: colors.text.primary }}
              paragraph
            >
              {t('sections.highlights.point1')}
            </Typography>
            <Typography
              component='li'
              variant='body2'
              sx={{ color: colors.text.primary }}
              paragraph
            >
              {t('sections.highlights.point2')}
            </Typography>
            <Typography
              component='li'
              variant='body2'
              sx={{ color: colors.text.primary }}
              paragraph
            >
              {t('sections.highlights.point3')}
            </Typography>
            <Typography
              component='li'
              variant='body2'
              sx={{ color: colors.text.primary }}
            >
              {t('sections.highlights.point4')}
            </Typography>
          </Box>
        </Box>

        {/* CSS Variables 範例 */}
        <ClippedCreamPaper>
          <SectionTitle
            title={t('sections.cssVariables.title')}
            showDivider={false}
          />
          <Alert
            severity='info'
            sx={{ mb: 2 }}
          >
            <Typography variant='body2'>
              {t('sections.cssVariables.alertText')} <strong>{t('sections.cssVariables.alertBold')}</strong> {t('sections.cssVariables.alertSuffix')}
            </Typography>
          </Alert>
          <SyntaxHighlighter
            language='css'
            style={vscDarkPlus}
          >
            {cssVariablesExample}
          </SyntaxHighlighter>
          <QuoteBox>
            {t('sections.cssVariables.quote')}
          </QuoteBox>
          <Box sx={{ mt: 2 }}>
            <ExternalLink href='https://www.havardbrynjulfsen.design/writing/color-variable-names-in-css'>
              {t('sections.cssVariables.link')}
            </ExternalLink>
          </Box>
        </ClippedCreamPaper>

        {/* System Token 範例 */}
        <ClippedCreamPaper>
          <SectionTitle
            title={t('sections.systemToken.title')}
            showDivider={false}
          />
          <SyntaxHighlighter
            language='css'
            style={vscDarkPlus}
          >
            {systemTokenExample}
          </SyntaxHighlighter>
          <CenteredImage
            src={`${
              import.meta.env.BASE_URL
            }images/desighToken/semantic-naming-example.webp`}
            alt={t('sections.systemToken.imageAlt')}
          />
          <Box sx={{ mt: 2 }}>
            <ExternalLink href='https://uxdesign.cc/how-should-you-name-your-colors-in-a-design-system-3086513476df'>
              {t('sections.systemToken.link')}
            </ExternalLink>
          </Box>
        </ClippedCreamPaper>

        {/* Token 架構 */}
        <ClippedCreamPaper>
          <SectionTitle
            title={t('sections.implementation.title')}
            showDivider={false}
          />
          <Typography
            variant='body1'
            sx={{ color: colors.text.primary }}
            paragraph
          >
            {t('sections.implementation.intro')}
          </Typography>
          <Box sx={{ pl: 2, mb: 3 }}>
            <Typography
              variant='body1'
              sx={{ color: colors.text.primary }}
              paragraph
            >
              <strong>{t('sections.implementation.collaboration.title')}</strong>
              {t('sections.implementation.collaboration.content')}
            </Typography>
            <Typography
              variant='body1'
              sx={{ color: colors.text.primary }}
              paragraph
            >
              <strong>{t('sections.implementation.business.title')}</strong>
              {t('sections.implementation.business.content')}{' '}
              <strong>{t('sections.implementation.business.emotion')}</strong>{' '}
              {t('sections.implementation.business.content_suffix')}
            </Typography>
          </Box>

          <ContentDivider />
          <SubsectionTitle title={t('sections.implementation.fileStructure.title')} />
          <SyntaxHighlighter
            language='bash'
            style={vscDarkPlus}
          >
            {figmaArchitectureExample}
          </SyntaxHighlighter>

          <ContentDivider />
          <SubsectionTitle title={t('sections.implementation.primitives.title')} />
          <Typography
            variant='body2'
            sx={{ color: colors.text.primary }}
            paragraph
          >
            {t('sections.implementation.primitives.description')}{' '}
            <InlineCode>{t('sections.implementation.primitives.myosotis')}</InlineCode>{' '}
            {t('sections.implementation.primitives.myosotis_desc')}{' '}
            <InlineCode>{t('sections.implementation.primitives.twilight')}</InlineCode>{' '}
            {t('sections.implementation.primitives.twilight_desc')}
          </Typography>
          <SyntaxHighlighter
            language='typescript'
            style={vscDarkPlus}
          >
            {figmaThemeExample}
          </SyntaxHighlighter>

          <ContentDivider />
          <SubsectionTitle title={t('sections.implementation.semantic.title')} />
          <Typography
            variant='body2'
            sx={{ color: colors.text.primary }}
            paragraph
          >
            {t('sections.implementation.semantic.description')}
          </Typography>
          <SyntaxHighlighter
            language='typescript'
            style={vscDarkPlus}
          >
            {semanticColorExample}
          </SyntaxHighlighter>

          <ContentDivider />
          <SubsectionTitle title={t('sections.implementation.injection.title')} />
          <Typography
            variant='body2'
            sx={{ color: colors.text.primary }}
            paragraph
          >
            {t('sections.implementation.injection.description')}{' '}
            <InlineCode>{t('sections.implementation.injection.component')}</InlineCode>{' '}
            {t('sections.implementation.injection.description_suffix')}
          </Typography>
          <SyntaxHighlighter
            language='typescript'
            style={vscDarkPlus}
          >
            {emotionGlobalStylesExample}
          </SyntaxHighlighter>

          <ContentDivider />
          <SubsectionTitle title={t('sections.implementation.integration.title')} />
          <Typography
            variant='body2'
            sx={{ color: colors.text.primary }}
            paragraph
          >
            {t('sections.implementation.integration.description')}
          </Typography>
          <SyntaxHighlighter
            language='typescript'
            style={vscDarkPlus}
          >
            {muiThemeIntegrationExample}
          </SyntaxHighlighter>
        </ClippedCreamPaper>

        {/* 重點 */}
        <Box sx={highlightBoxStyle}>
          <SubsectionTitle
            title={t('sections.benefits.title')}
            sx={{ color: colors.accent.primary }}
          />
          <Box
            component='ul'
            sx={{ pl: 3 }}
          >
            <Typography
              component='li'
              variant='body2'
              sx={{ color: colors.text.primary }}
              paragraph
            >
              <strong>{t('sections.benefits.designSync.title')}</strong> {t('sections.benefits.designSync.content')}
            </Typography>
            <Typography
              component='li'
              variant='body2'
              sx={{ color: colors.text.primary }}
              paragraph
            >
              <strong>{t('sections.benefits.businessFlexibility.title')}</strong> {t('sections.benefits.businessFlexibility.content')}
            </Typography>
            <Typography
              component='li'
              variant='body2'
              sx={{ color: colors.text.primary }}
              paragraph
            >
              <strong>{t('sections.benefits.devConsistency.title')}</strong> {t('sections.benefits.devConsistency.content')}
            </Typography>
          </Box>
        </Box>

        {/* CSS Variables vs ThemeProvider */}
        <ClippedCreamPaper>
          <SectionTitle
            title={t('sections.cssVsTheme.title')}
            showDivider={false}
          />
          <SubsectionTitle title={t('sections.cssVsTheme.subtitle')} />
          <Box sx={{ mb: 2 }}>
            <Typography
              variant='body1'
              sx={{ color: colors.text.primary }}
              paragraph
            >
              {t('sections.cssVsTheme.cssVariables')}
              <strong>{t('sections.cssVsTheme.cssVariablesBold')}</strong>
              {t('sections.cssVsTheme.cssVariablesSuffix')}
            </Typography>
            <Typography
              variant='body1'
              sx={{ color: colors.text.primary }}
              paragraph
            >
              {t('sections.cssVsTheme.themeProvider')}
              <strong>{t('sections.cssVsTheme.themeProviderBold')}</strong>
              {t('sections.cssVsTheme.themeProviderSuffix')}
            </Typography>
          </Box>
          <Alert
            severity='info'
            sx={{ mb: 2 }}
          >
            <Typography variant='body2'>
              <strong>{t('sections.cssVsTheme.alert.title')}</strong>
            </Typography>
            <Typography
              variant='body2'
              component='div'
            >
              {t('sections.cssVsTheme.alert.point1')}
            </Typography>
            <Typography
              variant='body2'
              component='div'
            >
              {t('sections.cssVsTheme.alert.point2')}{' '}
              <InlineCode>
                {t('sections.cssVsTheme.alert.point2_code')}
              </InlineCode>
              {t('sections.cssVsTheme.alert.point2_middle')}{' '}
              <InlineCode>{t('sections.cssVsTheme.alert.point2_body')}</InlineCode>{' '}
              {t('sections.cssVsTheme.alert.point2_suffix')}
            </Typography>
          </Alert>
          <Box sx={{ mt: 3 }}>
            <SubsectionTitle
              title={t('sections.cssVsTheme.performanceComparison')}
              sx={{ textAlign: 'center' }}
            />
            <Grid
              container
              spacing={2}
            >
              <Grid
                item
                xs={12}
                md={6}
              >
                <CenteredImage
                  src={`${
                    import.meta.env.BASE_URL
                  }images/desighToken/css-variables-theme-comparison-1.webp`}
                  alt={t('sections.cssVsTheme.image1Alt')}
                  containerSx={{ mt: 0 }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
              >
                <CenteredImage
                  src={`${
                    import.meta.env.BASE_URL
                  }images/desighToken/css-variables-theme-comparison-2.webp`}
                  alt={t('sections.cssVsTheme.image2Alt')}
                  containerSx={{ mt: 0 }}
                />
              </Grid>
            </Grid>
          </Box>
          <ContentDivider />
          <SubsectionTitle title={t('sections.cssVsTheme.research.title')} />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <ExternalLink href='https://www.epicreact.dev/css-variables'>
              {t('sections.cssVsTheme.research.link1')}
            </ExternalLink>
            <ExternalLink href='https://www.havardbrynjulfsen.design/writing/color-variable-names-in-css'>
              {t('sections.cssVsTheme.research.link2')}
            </ExternalLink>
            <ExternalLink href='https://uxdesign.cc/how-should-you-name-your-colors-in-a-design-system-3086513476df'>
              {t('sections.cssVsTheme.research.link3')}
            </ExternalLink>
          </Box>
        </ClippedCreamPaper>

        {/* 我的貢獻 */}
        <Box sx={highlightBoxStyle}>
          <SubsectionTitle
            title={t('sections.myContribution.title')}
            sx={{ color: colors.accent.primary }}
          />
          <Typography
            variant='body1'
            sx={{ color: colors.text.primary, mb: 3 }}
          >
            {t('sections.myContribution.content')}
          </Typography>

          {/* 八角形圖片 */}
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              justifyContent: 'center',
              flexWrap: 'wrap',
              mt: 3
            }}
          >
            <OctagonImage>
              <img
                src={`${
                  import.meta.env.BASE_URL
                }images/desighToken/29A9DB76-9685-4DBF-AB0C-686375A98FBA.webp`}
                alt={t('sections.myContribution.image1Alt')}
                loading='lazy'
              />
            </OctagonImage>
            <OctagonImage>
              <img
                src={`${
                  import.meta.env.BASE_URL
                }images/desighToken/B774639B-5C51-4F43-B4E0-1D517DEC7D0E.webp`}
                alt={t('sections.myContribution.image2Alt')}
                loading='lazy'
              />
            </OctagonImage>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default DesignToken

