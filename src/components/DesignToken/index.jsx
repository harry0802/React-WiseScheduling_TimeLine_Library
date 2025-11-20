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
  namingExamples,
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
 */
const DesignToken = () => {
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
            Design Token 推動
          </Typography>
          <GoldDivider />
        </GoldBorderContainer>

        {/* 前言 */}
        <ClippedCreamPaper>
          <SectionTitle title='前言' />
          <Typography
            variant='body1'
            sx={{ color: colors.text.primary }}
            paragraph
          >
            在前端開發的流程中，設計師與工程師的協作密不可分。理想情況是，設計師交付的視覺稿與交互稿，能被工程師以像素級的精準度實現。然而，在設計到開發的轉化過程中，往往存在著一些效率瓶頸：
          </Typography>
          <Box sx={{ pl: 2, mb: 2 }}>
            <Typography
              variant='body1'
              sx={{ color: colors.text.primary }}
              paragraph
            >
              <strong>1. 樣式的重複勞動：</strong>
              將設計稿中的佈局、文字與色彩等核心元素轉換為程式碼，長期消耗前端工程師大量精力。雖然
              Figma 等協作平台已能輔助生成部分 CSS，但在面對 Web、iOS 與 Android
              的多端統一需求時，這些工具仍難以自動解決平台間的語法差異，導致跨平台開發與維護成本居高不下。
            </Typography>
            <Typography
              variant='body1'
              sx={{ color: colors.text.primary }}
              paragraph
            >
              <strong>2. 更新不同步的困擾：</strong>
              設計稿的迭代更新，無法即時反映在工程師的程式碼中。傳統流程下，工程師需要取得新的設計稿，透過肉眼比對或依賴標注來找出差異點，再手動修改程式碼。更麻煩的是，有時一個看似微小的改動（例如調整一個全域字體大小），可能會牽一髮而動全身，導致大範圍的程式碼重構。
            </Typography>
          </Box>
          <Typography
            variant='body1'
            sx={{ color: colors.text.primary }}
          >
            為了解決這些協作上的難題，<strong>設計系統 (Design System)</strong>{' '}
            的概念應運而生。
          </Typography>
        </ClippedCreamPaper>

        {/* 什麼是設計系統 */}
        <ClippedCreamPaper>
          <SectionTitle
            title='什麼是設計系統 (Design System)？'
            showDivider={false}
          />
          <Typography
            variant='body1'
            sx={{ color: colors.text.primary }}
            paragraph
          >
            設計系統被譽為
            <strong>「團隊的單一事實來源 (Single Source of Truth)」</strong>
            ，它整合了所有設計與開發產品所需的元素。
          </Typography>
          <QuoteBox>
            &quot;A Design System is the single source of truth which groups all
            the elements that will allow the teams to design, realize and
            develop a product.&quot;
          </QuoteBox>
          <Typography
            variant='body1'
            sx={{ color: colors.text.primary }}
            paragraph
          >
            在這個系統中，設計師將介面拆解為標準化的組件，並定義好每個組件的樣式、文字屬性、顏色色值等規範。開發者則可以依據這個系統來獲取所需的組件與規範，確保了雙方工作的高度一致性。
          </Typography>
          <Typography
            variant='body1'
            sx={{ color: colors.text.primary }}
          >
            然而，一個靜態的規範庫如何真正解決前文提到的效率與同步問題呢？這就需要設計系統中的核心——
            <strong>Design Tokens</strong>。
          </Typography>
        </ClippedCreamPaper>

        {/* 什麼是 Design Tokens */}
        <ClippedCreamPaper>
          <SectionTitle
            title='什麼是 Design Tokens？'
            showDivider={false}
          />
          <Typography
            variant='body1'
            sx={{ color: colors.text.primary }}
            paragraph
          >
            我們可以將 Design Tokens 理解為
            <strong>「設計系統中的視覺設計原子」</strong>。
          </Typography>
          <QuoteBox>
            &quot;Design tokens are the visual design atoms of the design
            system.&quot;
          </QuoteBox>
          <Typography
            variant='body1'
            sx={{ color: colors.text.primary }}
            paragraph
          >
            它的核心思想是：
            <strong>
              將設計規範中最基礎的屬性（如顏色、間距、字體大小等）抽象化，並賦予其一個與平台無關的「名稱」（即
              Token）
            </strong>
            。這個 Token 就如同一個前端開發者熟悉的「變數」。
          </Typography>
          <Typography
            variant='body1'
            sx={{ color: colors.text.primary }}
            paragraph
          >
            舉個例子：設計師決定品牌主色為 <InlineCode>#FF5733</InlineCode>
            。在設計系統中，我們不直接記錄這個色值，而是創建一個名為{' '}
            <InlineCode>color.brand.primary</InlineCode> 的 Token，並將其值設為{' '}
            <InlineCode>#FF5733</InlineCode>。
          </Typography>
          <Typography
            variant='body1'
            sx={{ color: colors.text.primary }}
            paragraph
          >
            這個 Token 接著可以被自動轉換成各個平台所需的格式：
          </Typography>
          <Box sx={{ mb: 2, pl: 2 }}>
            <Typography
              variant='body2'
              component='div'
              sx={{ fontFamily: 'monospace', mb: 1 }}
            >
              • <strong>Web (CSS):</strong>{' '}
              <InlineCode>--color-brand-primary: #FF5733;</InlineCode>
            </Typography>
            <Typography
              variant='body2'
              component='div'
              sx={{ fontFamily: 'monospace', mb: 1 }}
            >
              • <strong>iOS (Swift):</strong>{' '}
              <InlineCode>
                let colorBrandPrimary = UIColor(hex: &quot;#FF5733&quot;)
              </InlineCode>
            </Typography>
            <Typography
              variant='body2'
              component='div'
              sx={{ fontFamily: 'monospace' }}
            >
              • <strong>Android (XML):</strong>{' '}
              <InlineCode>
                &lt;color
                name=&quot;color_brand_primary&quot;&gt;#FF5733&lt;/color&gt;
              </InlineCode>
            </Typography>
          </Box>
          <Typography
            variant='body1'
            sx={{ color: colors.text.primary }}
            paragraph
          >
            前端工程師在開發時，不再需要手動複製色值，而是直接引用這個語義化的變數（Token）。
          </Typography>
          <Typography
            variant='body1'
            sx={{ color: colors.text.primary }}
            paragraph
          >
            這樣做的好處顯而易見：
          </Typography>
          <Box sx={{ pl: 2, mb: 2 }}>
            <Typography
              variant='body1'
              sx={{ color: colors.text.primary }}
              paragraph
            >
              • <strong>解決了重複勞動</strong>
              ：開發者只需引用變數，無需關心具體數值，也無需為不同平台手動轉換。
            </Typography>
            <Typography
              variant='body1'
              sx={{ color: colors.text.primary }}
              paragraph
            >
              • <strong>解決了更新困擾</strong>：當設計師決定將品牌主色改為{' '}
              <InlineCode>#C70039</InlineCode> 時，只需在設計系統中更新{' '}
              <InlineCode>color.brand.primary</InlineCode> 這個 Token
              的值。接著，所有平台的程式碼只需導入最新的 Token
              檔案，所有使用到此顏色的地方就會自動更新，徹底告別了手動查找和修改的低效率。
            </Typography>
          </Box>
          <Typography
            variant='body1'
            sx={{ color: colors.text.primary }}
            paragraph
          >
            總結來說，Design Tokens
            將設計系統從一份靜態的說明文檔，轉變為一個動態、可同步的自動化橋樑，真正打通了設計與開發之間的壁壘，讓協作變得前所未有的高效與精準。
          </Typography>
          <CenteredImage
            src={`${
              import.meta.env.BASE_URL
            }images/desighToken/design-token-concept.webp`}
            alt='Design Token 概念圖'
          />
        </ClippedCreamPaper>

        {/* 色彩命名整合守則 */}
        <ClippedCreamPaper>
          <SectionTitle
            title='🎯 一般系統專案色彩命名整合守則'
            showDivider={false}
          />
          <Box sx={{ mb: 3 }}>
            <SubsectionTitle title='1. 結構公式' />
            <CenteredImage
              src={`${
                import.meta.env.BASE_URL
              }images/desighToken/token-architecture.webp`}
              alt='Token 架構示意圖'
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
                [元件類別]-[屬性]-[層次]-[狀態]
              </Typography>
              <Typography
                variant='body2'
                sx={{ color: colors.text.primary }}
              >
                element-type-hierarchy-state
              </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography
                variant='body2'
                sx={{ color: colors.text.primary }}
                component='div'
              >
                • 元件類別（element）：button, input, card, modal, table ...
              </Typography>
              <Typography
                variant='body2'
                sx={{ color: colors.text.primary }}
                component='div'
              >
                • 屬性（type）：bg, text, icon, border
              </Typography>
              <Typography
                variant='body2'
                sx={{ color: colors.text.primary }}
                component='div'
              >
                • 層次（hierarchy）：primary, secondary,
                Tertiary（可選，最常只用primary/secondary）
              </Typography>
              <Typography
                variant='body2'
                sx={{ color: colors.text.primary }}
                component='div'
              >
                • 狀態（state）：default, hover, active, disabled（沒有就省略）
              </Typography>
            </Box>
          </Box>
          <ContentDivider />
          <SubsectionTitle title='2. 用法範例與說明' />
          <TableContainer>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>元件</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>類型</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>層次</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>狀態</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>命名範例</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>說明</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {namingExamples.map((row, index) => (
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
          <SubsectionTitle title='3. 命名精簡要點' />
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
              若沒必要，可省略沒用到的層（如 most 元件只有 primary，沒
              secondary/weak 就不加）
            </Typography>
            <Typography
              component='li'
              variant='body2'
              sx={{ color: colors.text.primary }}
              paragraph
            >
              狀態常見 default、hover、active、disabled，沒用到時省略
            </Typography>
            <Typography
              component='li'
              variant='body2'
              sx={{ color: colors.text.primary }}
            >
              全域主題色、最關鍵顏色（如系統主色）可特別命名如 main-color 或
              common-bg
            </Typography>
          </Box>
          <ContentDivider />
          <SubsectionTitle title='4. 實務應用' />
          <SyntaxHighlighter
            language='scss'
            style={vscDarkPlus}
          >
            {scssExample}
          </SyntaxHighlighter>
          <ContentDivider />
          <SubsectionTitle title='5. 持續擴充建議' />
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
              同型號可套用到 modal、badge 等其他常用元件
            </Typography>
            <Typography
              component='li'
              variant='body2'
              sx={{ color: colors.text.primary }}
            >
              真的需要 warning、success 等語意時，直接加屬性（如
              button-bg-warning），否則不用勉強抽象語意
            </Typography>
          </Box>
        </ClippedCreamPaper>

        {/* 重點 */}
        <Box sx={highlightBoxStyle}>
          <SubsectionTitle
            title='📦 重點'
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
              讓每個顏色變數一看就懂「用在哪裡、是什麼層、什麼狀態」
            </Typography>
            <Typography
              component='li'
              variant='body2'
              sx={{ color: colors.text.primary }}
              paragraph
            >
              適合團隊協作，免去彼此猜測
            </Typography>
            <Typography
              component='li'
              variant='body2'
              sx={{ color: colors.text.primary }}
              paragraph
            >
              留足擴充空間（選擇性加上 hierarchy或state）
            </Typography>
            <Typography
              component='li'
              variant='body2'
              sx={{ color: colors.text.primary }}
            >
              語意色/brand色可自選補充，不強求
            </Typography>
          </Box>
        </Box>

        {/* CSS Variables 範例 */}
        <ClippedCreamPaper>
          <SectionTitle
            title='Color variable names in CSS'
            showDivider={false}
          />
          <Alert
            severity='info'
            sx={{ mb: 2 }}
          >
            <Typography variant='body2'>
              If I need different <strong>themes</strong> I tend to do the
              latter. This gives me the opportunity to easily swap the colors of
              my components when viewed in different color themes.
            </Typography>
          </Alert>
          <SyntaxHighlighter
            language='css'
            style={vscDarkPlus}
          >
            {cssVariablesExample}
          </SyntaxHighlighter>
          <QuoteBox>
            Separate the palette from the usage, and it will become much simpler
            to change colors in the future, either by adding new colors to the
            palette, or changing the theme of components and layout.
          </QuoteBox>
          <Box sx={{ mt: 2 }}>
            <ExternalLink href='https://www.havardbrynjulfsen.design/writing/color-variable-names-in-css'>
              → Color variable names in CSS
            </ExternalLink>
          </Box>
        </ClippedCreamPaper>

        {/* System Token 範例 */}
        <ClippedCreamPaper>
          <SectionTitle
            title='The Case Against Numbered Shades in Design Systems'
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
            alt='語義化命名範例'
          />
          <Box sx={{ mt: 2 }}>
            <ExternalLink href='https://uxdesign.cc/how-should-you-name-your-colors-in-a-design-system-3086513476df'>
              → How to name colors in a Design System
            </ExternalLink>
          </Box>
        </ClippedCreamPaper>

        {/* Token 架構 */}
        <ClippedCreamPaper>
          <SectionTitle
            title='CSS Design Tokens 在專案中的實踐架構'
            showDivider={false}
          />
          <Typography
            variant='body1'
            sx={{ color: colors.text.primary }}
            paragraph
          >
            在雞舍專案中，我們建立了一套與設計團隊高度同步的 Design Token 系統。
            這套系統的核心在於「設計協作」與「技術彈性」。
          </Typography>
          <Box sx={{ pl: 2, mb: 3 }}>
            <Typography
              variant='body1'
              sx={{ color: colors.text.primary }}
              paragraph
            >
              <strong>1. 與設計師深度協作 (Figma Variables)：</strong>
              我們的 Token 定義並非憑空產生，而是直接對應設計師在 Figma 中維護的
              Variables。這確保了設計稿 (Design) 與程式碼 (Code)
              使用完全一致的語言，大幅降低了溝通成本。
            </Typography>
            <Typography
              variant='body1'
              sx={{ color: colors.text.primary }}
              paragraph
            >
              <strong>2. 為商業合作佈局 (Emotion & White-labeling)：</strong>
              考慮到未來專案可能面臨的「品牌替換 (White-labeling)」商業需求，
              我們選擇使用 <strong>Emotion</strong> 來管理樣式。透過 CSS
              Variables 的動態注入，我們可以在不修改組件程式碼的情況下，
              快速為不同的商業合作夥伴切換整站的品牌主題色。
            </Typography>
          </Box>

          <ContentDivider />
          <SubsectionTitle title='1. 檔案結構：模組化管理' />
          <SyntaxHighlighter
            language='bash'
            style={vscDarkPlus}
          >
            {figmaArchitectureExample}
          </SyntaxHighlighter>

          <ContentDivider />
          <SubsectionTitle title='2. 定義層：Figma Primitives (theme.ts)' />
          <Typography
            variant='body2'
            sx={{ color: colors.text.primary }}
            paragraph
          >
            這裡忠實還原了設計師在 Figma 中的原始變數定義，如{' '}
            <InlineCode>myosotis</InlineCode> (品牌藍) 與{' '}
            <InlineCode>twilight</InlineCode> (品牌綠)。
          </Typography>
          <SyntaxHighlighter
            language='typescript'
            style={vscDarkPlus}
          >
            {figmaThemeExample}
          </SyntaxHighlighter>

          <ContentDivider />
          <SubsectionTitle title='3. 語意層：Semantic Mapping (color.ts)' />
          <Typography
            variant='body2'
            sx={{ color: colors.text.primary }}
            paragraph
          >
            將原始顏色映射到具體的語意用途（如 primary, surface），讓開發者使用時只需關注「用途」而非「色碼」。
          </Typography>
          <SyntaxHighlighter
            language='typescript'
            style={vscDarkPlus}
          >
            {semanticColorExample}
          </SyntaxHighlighter>

          <ContentDivider />
          <SubsectionTitle title='4. 注入層：Emotion Global Styles' />
          <Typography
            variant='body2'
            sx={{ color: colors.text.primary }}
            paragraph
          >
            利用 Emotion 的 <InlineCode>&lt;Global /&gt;</InlineCode>{' '}
            組件將計算好的變數注入瀏覽器。這是實現「一鍵換膚」的關鍵技術點。
          </Typography>
          <SyntaxHighlighter
            language='typescript'
            style={vscDarkPlus}
          >
            {emotionGlobalStylesExample}
          </SyntaxHighlighter>

          <ContentDivider />
          <SubsectionTitle title='5. 整合層：MUI Theme Integration' />
          <Typography
            variant='body2'
            sx={{ color: colors.text.primary }}
            paragraph
          >
            最後，將定義好的 Token 整合至 MUI
            Theme，確保所有現成組件也能自動繼承最新的品牌設計規範。
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
            title='🚀 架構優勢總結'
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
              <strong>設計同步：</strong> 變數直接對應
              Figma，消除設計與開發的溝通落差。
            </Typography>
            <Typography
              component='li'
              variant='body2'
              sx={{ color: colors.text.primary }}
              paragraph
            >
              <strong>商業彈性：</strong> 基於 Emotion 的架構，讓專案具備快速適應不同品牌識別 (CI) 的能力。
            </Typography>
            <Typography
              component='li'
              variant='body2'
              sx={{ color: colors.text.primary }}
              paragraph
            >
              <strong>開發一致：</strong> 透過 MUI Theme 封裝，開發者可直接使用語意化屬性，無需記憶色碼。
            </Typography>
          </Box>
        </Box>

        {/* CSS Variables vs ThemeProvider */}
        <ClippedCreamPaper>
          <SectionTitle
            title='最後：使用變數有什麼好處'
            showDivider={false}
          />
          <SubsectionTitle title='CSS Variables vs ThemeProvider（React Context）本質差異與優劣' />
          <Box sx={{ mb: 2 }}>
            <Typography
              variant='body1'
              sx={{ color: colors.text.primary }}
              paragraph
            >
              • <strong>CSS Variables 是瀏覽器標準機制</strong>，變數儲存在 CSS
              層級，且會依照 DOM 層級及 selector cascade 直接生效，不需 React
              重新渲染。
            </Typography>
            <Typography
              variant='body1'
              sx={{ color: colors.text.primary }}
              paragraph
            >
              • <strong>ThemeProvider 用 React Context 傳變數</strong>
              ，改變主題狀態會導致所有消費該 Context 的元件重渲，影響效能。
            </Typography>
          </Box>
          <Alert
            severity='info'
            sx={{ mb: 2 }}
          >
            <Typography variant='body2'>
              <strong>範例中展示：</strong>
            </Typography>
            <Typography
              variant='body2'
              component='div'
            >
              • 用 ThemeProvider 切換 Light/Dark，會讓所有 Emotion 組件重新渲染
            </Typography>
            <Typography
              variant='body2'
              component='div'
            >
              • 用 CSS Variables（掛在{' '}
              <InlineCode>
                &lt;body data-theme=&quot;dark|light&quot;&gt;
              </InlineCode>
              ），只有切換 <InlineCode>&lt;body&gt;</InlineCode>{' '}
              屬性，僅body改變樣式，子元件不會重渲，對效能更友善
            </Typography>
          </Alert>
          <Box sx={{ mt: 3 }}>
            <SubsectionTitle
              title='效能比較示意圖'
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
                  alt='CSS Variables vs ThemeProvider 比較 1'
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
                  alt='CSS Variables vs ThemeProvider 比較 2'
                  containerSx={{ mt: 0 }}
                />
              </Grid>
            </Grid>
          </Box>
          <ContentDivider />
          <SubsectionTitle title='研究文章' />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <ExternalLink href='https://www.epicreact.dev/css-variables'>
              → Use CSS Variables instead of React Context
            </ExternalLink>
            <ExternalLink href='https://www.havardbrynjulfsen.design/writing/color-variable-names-in-css'>
              → Color variable names in CSS
            </ExternalLink>
            <ExternalLink href='https://uxdesign.cc/how-should-you-name-your-colors-in-a-design-system-3086513476df'>
              → How to name colors in a Design System
            </ExternalLink>
          </Box>
        </ClippedCreamPaper>

        {/* 我的貢獻 */}
        <Box sx={highlightBoxStyle}>
          <SubsectionTitle
            title='🚀 我的貢獻'
            sx={{ color: colors.accent.primary }}
          />
          <Typography
            variant='body1'
            sx={{ color: colors.text.primary, mb: 3 }}
          >
            在協作中觀察到設計與開發流程的潛在痛點，主動向主管提出導入 Design
            Token
            的構想。在獲得認可後，著手研究並協同設計師與主管三方共同擬定出一套符合團隊需求的協作模式，舉辦分享會從前端視角解說實作方式，成功在專案中試行，促進了設計與開發的協作效率。
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
                alt='Design Token 實踐成果 1'
                loading='lazy'
              />
            </OctagonImage>
            <OctagonImage>
              <img
                src={`${
                  import.meta.env.BASE_URL
                }images/desighToken/B774639B-5C51-4F43-B4E0-1D517DEC7D0E.webp`}
                alt='Design Token 實踐成果 2'
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

