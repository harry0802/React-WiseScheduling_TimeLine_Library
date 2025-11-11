import React from "react";
import {
  Container,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Divider,
  Alert,
  Link as MuiLink,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import muiTheme from "../styles/muiTheme";
import {
  CreamPaper,
  GoldBorderContainer,
  GoldDivider,
} from "../components/StyledComponents";
import { colors } from "../designTokens";

const DesignToken = () => {
  const namingExamples = [
    {
      element: "button",
      type: "bg",
      hierarchy: "primary",
      state: "default",
      name: "button-bg-primary-default",
      description: "主按鈕預設底色",
    },
    {
      element: "button",
      type: "bg",
      hierarchy: "primary",
      state: "hover",
      name: "button-bg-primary-hover",
      description: "主按鈕hover底色",
    },
    {
      element: "button",
      type: "bg",
      hierarchy: "secondary",
      state: "disabled",
      name: "button-bg-secondary-disabled",
      description: "次要按鈕禁用底色",
    },
    {
      element: "input",
      type: "border",
      hierarchy: "primary",
      state: "focus",
      name: "input-border-primary-focus",
      description: "輸入框focus主色",
    },
    {
      element: "card",
      type: "bg",
      hierarchy: "weak",
      state: "",
      name: "card-bg-weak",
      description: "卡片淡化底色",
    },
    {
      element: "text",
      type: "",
      hierarchy: "secondary",
      state: "",
      name: "text-secondary",
      description: "輔助文字色",
    },
  ];

  const scssExample = `$button-bg-primary-default:   #1976d2;
$button-bg-primary-hover:     #115293;
$button-bg-secondary-default: #eeeeee;
$button-bg-secondary-hover:   #cccccc;

$text-primary:      #212121;
$text-secondary:    #757575;
$text-weak:         #bdbdbd;

$input-border-primary-focus:  #1976d2;
$input-border-default:        #cccccc;
$card-bg-default:             #FFFFFF;
$card-bg-weak:                #fafafa;`;

  const cssVariablesExample = `:root {
  --color-mist: #EEE;
  --color-fog: #DDD;
  --color-asphalt: #333;
  --color-void: #202020;

  /* Usage specific color variables */
  --card-bg-color: var(--color-mist);
  --card-text-color: var(--color-void);
}

:root[data-theme="dark"] {
  --card-bg-color: var(--color-asphalt);
  --card-text-color: var(--color-fog);
}

.card {
  color: var(--card-text-color);
  background-color: var(--card-bg-color);
}`;

  const systemTokenExample = `/* Value-based variables at the global level */
:root {
  /* Colors */
  --system-color-bondiBlue: rgb(0 58 71);
  --system-color-canaryYellow: rgb(255 239 0);
  --system-color-caribbeanGreen: rgb(0 204 153);

  /* Font Sizes */
  --system-fontSize-jumbo: 3.052rem;
  --system-fontSize-large: 1.563rem;
  --system-fontSize-small: 0.8rem;

  /* Font Weights */
  --system-fontWeight-bold: 700;
  --system-fontWeight-medium: 400;
  --system-fontWeight-light: 200;

  /* Durations */
  --system-duration-presto: 60ms;
  --system-duration-allegro: 125ms;
  --system-duration-andante: 500ms;

  /* Elevation */
  --system-boxShadow-slightlyRaised: 0 1px 2px 0 rgb(0 0 0 / 10%);
  --system-boxShadow-floatingBox: 0 0 30px 0 rgb(0 0 0 / 35%);
}`;

  const tokenStructureExample = `src/
└── styles/
    ├── tokens/
    │   ├── colors.ts
    │   ├── spacing.ts
    │   ├── font.ts
    │   ├── radius.ts
    │   ├── border.ts
    │   ├── shadow.ts
    │   ├── animation.ts
    │   ├── opacity.ts
    │   ├── zIndex.ts
    │   ├── breakpoints.ts
    │   └── index.ts       # 統一匯出所有 Token
    │
    └── globalStyles.ts    # 用於全域注入 CSS Variables`;

  const colorsObjectExample = `export const colors = {
  base: {
    primary: '#1976d2',
    secondary: '#ff4081',
    background: '#ffffff',
    text: '#333333',
  },
  states: {
    error: '#ff4d4f',
    success: '#52c41a',
    warning: '#faad14',
  },
  brand: {
    logoBlue: '#0047ab',
  },
};`;

  const tokenCategories = [
    { category: "colors/", description: "基礎色、狀態色、品牌色" },
    { category: "spacing/", description: "間距尺寸、欄間距" },
    { category: "font/", description: "字體大小、字重、字體族群、行高" },
    { category: "radius/", description: "圓角設定" },
    { category: "border/", description: "邊框寬度、樣式、顏色" },
    { category: "shadow/", description: "陰影深度與樣式" },
    { category: "animation/", description: "動畫時長、緩動函數" },
    { category: "opacity/", description: "透明度分級" },
    { category: "zIndex/", description: "圖層順序" },
    { category: "breakpoints/", description: "響應式斷點設定" },
  ];

  return (
    <ThemeProvider theme={muiTheme}>
      <Container maxWidth="lg" sx={{ py: 4, backgroundColor: colors.background.primary, minHeight: '100vh' }}>
        <GoldBorderContainer sx={{ mb: 4, textAlign: 'center' }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: colors.accent.gold,
              mb: 2,
            }}
          >
            Design Token 推動
          </Typography>
          <GoldDivider />
        </GoldBorderContainer>

        {/* 前言 */}
        <CreamPaper elevation={2} sx={{ mb: 3 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: colors.accent.gold,
              fontWeight: 600,
            }}
          >
            前言
          </Typography>

          <Divider sx={{ my: 2, borderColor: colors.border.light }} />

          <Typography variant="body1" sx={{ color: colors.text.primary }} paragraph>
            在前端開發的流程中，設計師與工程師的協作密不可分。理想情況是，設計師交付的視覺稿與交互稿，能被工程師以像素級的精準度實現。然而，在設計到開發的轉化過程中，往往存在著一些效率瓶頸：
          </Typography>

          <Box sx={{ pl: 2, mb: 2 }}>
            <Typography variant="body1" sx={{ color: colors.text.primary }} paragraph>
              <strong>1. 樣式的重複勞動：</strong>設計稿中的佈局、文字、顏色等核心元素，需要前端工程師花費大量時間手動轉譯為程式碼。儘管近年來出現了如 Zeplin、藍湖等協作平台，可以自動生成部分 CSS 程式碼，但它們難以完全滿足 Web、iOS、Android 等多平台的代碼需求，跨平台的轉譯成本依然很高。
            </Typography>
            <Typography variant="body1" sx={{ color: colors.text.primary }} paragraph>
              <strong>2. 更新不同步的困擾：</strong>設計稿的迭代更新，無法即時反映在工程師的程式碼中。傳統流程下，工程師需要取得新的設計稿，透過肉眼比對或依賴標注來找出差異點，再手動修改程式碼。更麻煩的是，有時一個看似微小的改動（例如調整一個全域字體大小），可能會牽一髮而動全身，導致大範圍的程式碼重構。
            </Typography>
          </Box>

          <Typography variant="body1" sx={{ color: colors.text.primary }}>
            為了解決這些協作上的難題，<strong>設計系統 (Design System)</strong> 的概念應運而生。
          </Typography>
        </CreamPaper>

        {/* 什麼是設計系統 */}
        <CreamPaper elevation={2} sx={{ mb: 3 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: colors.accent.gold,
              fontWeight: 600,
            }}
          >
            什麼是設計系統 (Design System)？
          </Typography>

          <Typography variant="body1" sx={{ color: colors.text.primary }} paragraph>
            設計系統被譽為<strong>「團隊的單一事實來源 (Single Source of Truth)」</strong>，它整合了所有設計與開發產品所需的元素。
          </Typography>

          <Box
            sx={{
              p: 2,
              mb: 2,
              backgroundColor: colors.background.surfaceAlt,
              border: `1px solid ${colors.border.light}`,
              borderRadius: 1,
              fontStyle: "italic",
            }}
          >
            <Typography variant="body2" sx={{ color: colors.text.primary }}>
              &quot;A Design System is the single source of truth which groups all the elements that will allow the teams to design, realize and develop a product.&quot;
            </Typography>
          </Box>

          <Typography variant="body1" sx={{ color: colors.text.primary }} paragraph>
            在這個系統中，設計師將介面拆解為標準化的組件，並定義好每個組件的樣式、文字屬性、顏色色值等規範。開發者則可以依據這個系統來獲取所需的組件與規範，確保了雙方工作的高度一致性。
          </Typography>

          <Typography variant="body1" sx={{ color: colors.text.primary }}>
            然而，一個靜態的規範庫如何真正解決前文提到的效率與同步問題呢？這就需要設計系統中的核心——<strong>Design Tokens</strong>。
          </Typography>
        </CreamPaper>

        {/* 什麼是 Design Tokens */}
        <CreamPaper elevation={2} sx={{ mb: 3 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: colors.accent.gold,
              fontWeight: 600,
            }}
          >
            什麼是 Design Tokens？
          </Typography>

          <Typography variant="body1" sx={{ color: colors.text.primary }} paragraph>
            我們可以將 Design Tokens 理解為<strong>「設計系統中的視覺設計原子」</strong>。
          </Typography>

          <Box
            sx={{
              p: 2,
              mb: 2,
              backgroundColor: colors.background.surfaceAlt,
              border: `1px solid ${colors.border.light}`,
              borderRadius: 1,
              fontStyle: "italic",
            }}
          >
            <Typography variant="body2" sx={{ color: colors.text.primary }}>
              &quot;Design tokens are the visual design atoms of the design system.&quot;
            </Typography>
          </Box>

          <Typography variant="body1" sx={{ color: colors.text.primary }} paragraph>
            它的核心思想是：<strong>將設計規範中最基礎的屬性（如顏色、間距、字體大小等）抽象化，並賦予其一個與平台無關的「名稱」（即 Token）</strong>。這個 Token 就如同一個前端開發者熟悉的「變數」。
          </Typography>

          <Typography variant="body1" sx={{ color: colors.text.primary }} paragraph>
            舉個例子：設計師決定品牌主色為 <code>#FF5733</code>。在設計系統中，我們不直接記錄這個色值，而是創建一個名為 <code>color.brand.primary</code> 的 Token，並將其值設為 <code>#FF5733</code>。
          </Typography>

          <Typography variant="body1" sx={{ color: colors.text.primary }} paragraph>
            這個 Token 接著可以被自動轉換成各個平台所需的格式：
          </Typography>

          <Box sx={{ mb: 2, pl: 2 }}>
            <Typography variant="body2" component="div" sx={{ fontFamily: "monospace", mb: 1 }}>
              • <strong>Web (CSS):</strong> <code>--color-brand-primary: #FF5733;</code>
            </Typography>
            <Typography variant="body2" component="div" sx={{ fontFamily: "monospace", mb: 1 }}>
              • <strong>iOS (Swift):</strong> <code>let colorBrandPrimary = UIColor(hex: &quot;#FF5733&quot;)</code>
            </Typography>
            <Typography variant="body2" component="div" sx={{ fontFamily: "monospace" }}>
              • <strong>Android (XML):</strong> <code>&lt;color name=&quot;color_brand_primary&quot;&gt;#FF5733&lt;/color&gt;</code>
            </Typography>
          </Box>

          <Typography variant="body1" sx={{ color: colors.text.primary }} paragraph>
            前端工程師在開發時，不再需要手動複製色值，而是直接引用這個語義化的變數（Token）。
          </Typography>

          <Typography variant="body1" sx={{ color: colors.text.primary }} paragraph>
            這樣做的好處顯而易見：
          </Typography>

          <Box sx={{ pl: 2, mb: 2 }}>
            <Typography variant="body1" sx={{ color: colors.text.primary }} paragraph>
              • <strong>解決了重複勞動</strong>：開發者只需引用變數，無需關心具體數值，也無需為不同平台手動轉換。
            </Typography>
            <Typography variant="body1" sx={{ color: colors.text.primary }} paragraph>
              • <strong>解決了更新困擾</strong>：當設計師決定將品牌主色改為 <code>#C70039</code> 時，只需在設計系統中更新 <code>color.brand.primary</code> 這個 Token 的值。接著，所有平台的程式碼只需導入最新的 Token 檔案，所有使用到此顏色的地方就會自動更新，徹底告別了手動查找和修改的低效率。
            </Typography>
          </Box>

          <Typography variant="body1" sx={{ color: colors.text.primary }} paragraph>
            總結來說，Design Tokens 將設計系統從一份靜態的說明文檔，轉變為一個動態、可同步的自動化橋樑，真正打通了設計與開發之間的壁壘，讓協作變得前所未有的高效與精準。
          </Typography>

          {/* Design Token Concept Image */}
          <Box
            sx={{
              mt: 3,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={`${import.meta.env.BASE_URL}images/desighToken/design-token-concept.png`}
              alt="Design Token 概念圖"
              sx={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: 2,
                boxShadow: 2,
              }}
            />
          </Box>
        </CreamPaper>

        {/* 色彩命名整合守則 */}
        <CreamPaper elevation={2} sx={{ mb: 3 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: colors.accent.gold,
              fontWeight: 600,
            }}
          >
            🎯 一般系統專案色彩命名整合守則
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              1. 結構公式
            </Typography>

            {/* Token Architecture Image */}
            <Box
              sx={{
                mt: 2,
                mb: 3,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src={`${import.meta.env.BASE_URL}images/desighToken/token-architecture.png`}
                alt="Token 架構示意圖"
                sx={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: 2,
                  boxShadow: 2,
                }}
              />
            </Box>

            <Box
              sx={{
                p: 2,
                backgroundColor: colors.background.surfaceAlt,
                border: `1px solid ${colors.border.light}`,
                borderRadius: 1,
                fontFamily: "monospace",
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                [元件類別]-[屬性]-[層次]-[狀態]
              </Typography>
              <Typography variant="body2" sx={{ color: colors.text.primary }}>
                element-type-hierarchy-state
              </Typography>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ color: colors.text.primary }} component="div">
                • 元件類別（element）：button, input, card, modal, table ...
              </Typography>
              <Typography variant="body2" sx={{ color: colors.text.primary }} component="div">
                • 屬性（type）：bg, text, icon, border
              </Typography>
              <Typography variant="body2" sx={{ color: colors.text.primary }} component="div">
                • 層次（hierarchy）：primary, secondary, Tertiary（可選，最常只用primary/secondary）
              </Typography>
              <Typography variant="body2" sx={{ color: colors.text.primary }} component="div">
                • 狀態（state）：default, hover, active, disabled（沒有就省略）
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            2. 用法範例與說明
          </Typography>
          <TableContainer>
            <Table size="small">
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
                    <TableCell>{row.state || "-"}</TableCell>
                    <TableCell>
                      <Box
                        component="code"
                        sx={{
                          px: 1,
                          py: 0.5,
                          background: "rgba(97, 218, 251, 0.08)",
                          borderRadius: 1,
                          fontSize: "0.875rem",
                          fontFamily: "monospace",
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

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            3. 命名精簡要點
          </Typography>
          <Box component="ul" sx={{ pl: 3 }}>
            <Typography component="li" variant="body2" sx={{ color: colors.text.primary }} paragraph>
              若沒必要，可省略沒用到的層（如 most 元件只有 primary，沒 secondary/weak 就不加）
            </Typography>
            <Typography component="li" variant="body2" sx={{ color: colors.text.primary }} paragraph>
              狀態常見 default、hover、active、disabled，沒用到時省略
            </Typography>
            <Typography component="li" variant="body2" sx={{ color: colors.text.primary }}>
              全域主題色、最關鍵顏色（如系統主色）可特別命名如 main-color 或 common-bg
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            4. 實務應用
          </Typography>
          <SyntaxHighlighter language="scss" style={vscDarkPlus}>
            {scssExample}
          </SyntaxHighlighter>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            5. 持續擴充建議
          </Typography>
          <Box component="ul" sx={{ pl: 3 }}>
            <Typography component="li" variant="body2" sx={{ color: colors.text.primary }} paragraph>
              同型號可套用到 modal、badge 等其他常用元件
            </Typography>
            <Typography component="li" variant="body2" sx={{ color: colors.text.primary }}>
              真的需要 warning、success 等語意時，直接加屬性（如 button-bg-warning），否則不用勉強抽象語意
            </Typography>
          </Box>
        </CreamPaper>

        {/* 重點 */}
        <Box
          sx={{
            mb: 3,
            p: 3,
            backgroundColor: colors.background.surfaceAlt,
            border: `2px solid ${colors.border.light}`,
            borderLeft: `4px solid ${colors.accent.gold}`,
            borderRadius: 1,
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ color: colors.accent.gold, fontWeight: 600 }}>
            📦 重點
          </Typography>
          <Box component="ul" sx={{ pl: 3 }}>
            <Typography component="li" variant="body2" sx={{ color: colors.text.primary }} paragraph>
              讓每個顏色變數一看就懂「用在哪裡、是什麼層、什麼狀態」
            </Typography>
            <Typography component="li" variant="body2" sx={{ color: colors.text.primary }} paragraph>
              適合團隊協作，免去彼此猜測
            </Typography>
            <Typography component="li" variant="body2" sx={{ color: colors.text.primary }} paragraph>
              留足擴充空間（選擇性加上 hierarchy或state）
            </Typography>
            <Typography component="li" variant="body2" sx={{ color: colors.text.primary }}>
              語意色/brand色可自選補充，不強求
            </Typography>
          </Box>
        </Box>

        {/* CSS Variables 範例 */}
        <CreamPaper elevation={2} sx={{ mb: 3 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: colors.accent.gold,
              fontWeight: 600,
            }}
          >
            Color variable names in CSS
          </Typography>

          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              If I need different <strong>themes</strong> I tend to do the latter. This gives me the opportunity to easily swap the colors of my components when viewed in different color themes.
            </Typography>
          </Alert>

          <SyntaxHighlighter language="css" style={vscDarkPlus}>
            {cssVariablesExample}
          </SyntaxHighlighter>

          <Box
            sx={{
              mt: 2,
              p: 2,
              backgroundColor: colors.background.surfaceAlt,
              border: `1px solid ${colors.border.light}`,
              borderRadius: 1,
              fontStyle: "italic",
            }}
          >
            <Typography variant="body2" sx={{ color: colors.text.primary }}>
              Separate the palette from the usage, and it will become much simpler to change colors in the future, either by adding new colors to the palette, or changing the theme of components and layout.
            </Typography>
          </Box>

          <Box sx={{ mt: 2 }}>
            <MuiLink
              href="https://www.havardbrynjulfsen.design/writing/color-variable-names-in-css"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: colors.accent.gold, fontWeight: 600 }}
            >
              → Color variable names in CSS
            </MuiLink>
          </Box>
        </CreamPaper>

        {/* System Token 範例 */}
        <CreamPaper elevation={2} sx={{ mb: 3 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: colors.accent.gold,
              fontWeight: 600,
            }}
          >
            The Case Against Numbered Shades in Design Systems
          </Typography>

          <SyntaxHighlighter language="css" style={vscDarkPlus}>
            {systemTokenExample}
          </SyntaxHighlighter>

          {/* Semantic Naming Example Image */}
          <Box
            sx={{
              mt: 3,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={`${import.meta.env.BASE_URL}images/desighToken/semantic-naming-example.png`}
              alt="語義化命名範例"
              sx={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: 2,
                boxShadow: 2,
              }}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <MuiLink
              href="https://uxdesign.cc/how-should-you-name-your-colors-in-a-design-system-3086513476df"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: colors.accent.gold, fontWeight: 600 }}
            >
              → How to name colors in a Design System
            </MuiLink>
          </Box>
        </CreamPaper>

        {/* Token 架構 */}
        <CreamPaper elevation={2} sx={{ mb: 3 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: colors.accent.gold,
              fontWeight: 600,
            }}
          >
            CSS Design Tokens 在專案中的最佳實踐架構
          </Typography>

          <Typography variant="body1" sx={{ color: colors.text.primary }} paragraph>
            在導入 Design Tokens 的過程中，建立一套清晰、可擴展的組織架構至關重要。這不僅能讓開發者快速找到並使用 Tokens，也為未來的設計系統自動化、主題切換等功能奠定堅實的基礎。
          </Typography>

          <Typography variant="body1" sx={{ color: colors.text.primary }} paragraph>
            以下介紹一種業界最為普遍且高效的 Token 管理架構，它結合了「按屬性分類」、「模組化管理」與「CSS 變數注入」的優點。
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            1. 核心原則：按設計屬性「大類型」拆分
          </Typography>

          <Typography variant="body2" sx={{ color: colors.text.primary }} paragraph>
            第一步是將所有的 Design Tokens 按照其 CSS 屬性進行分類。這種方式非常直觀，完全對應設計師與開發者共同的認知模型。
          </Typography>

          <Typography variant="body2" sx={{ color: colors.text.primary }} paragraph>
            常見的分類目錄如下：
          </Typography>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            {tokenCategories.map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Box
                  sx={{
                    p: 2,
                    backgroundColor: colors.background.surfaceAlt,
                    border: `1px solid ${colors.border.light}`,
                    borderRadius: 1,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, fontFamily: "monospace" }}
                  >
                    {item.category}
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.text.primary }}>
                    {item.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            2. 檔案與目錄的組織結構
          </Typography>

          <Typography variant="body2" sx={{ color: colors.text.primary }} paragraph>
            基於上述分類，我們可以在專案中建立對應的檔案結構。推薦在 src/styles 或 src/theme 目錄下建立一個 tokens 資料夾來集中管理。
          </Typography>

          <SyntaxHighlighter language="bash" style={vscDarkPlus}>
            {tokenStructureExample}
          </SyntaxHighlighter>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            3. 物件化的內部檔案結構
          </Typography>

          <Typography variant="body2" sx={{ color: colors.text.primary }} paragraph>
            在每一個 Token 檔案內部，使用 JavaScript/TypeScript 物件來進行更細緻的分類，增加語義化並避免命名衝突。
          </Typography>

          <Typography variant="body2" sx={{ color: colors.text.primary }} paragraph>
            以 colors.ts 為例：
          </Typography>

          <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
            {colorsObjectExample}
          </SyntaxHighlighter>

          <Alert severity="success" sx={{ mt: 3 }}>
            <Typography variant="body2">
              <strong>總結：</strong>採用「以設計屬性大類拆分 → 檔案模組化 → 物件結構化 → 統一出口管理 → 動態生成 CSS Variables」的架構，是目前管理 Design Tokens 最穩健且主流的方式。
            </Typography>
          </Alert>
        </CreamPaper>

        {/* CSS Variables vs ThemeProvider */}
        <CreamPaper elevation={2} sx={{ mb: 3 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: colors.accent.gold,
              fontWeight: 600,
            }}
          >
            最後：使用變數有什麼好處
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            CSS Variables vs ThemeProvider（React Context）本質差異與優劣
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ color: colors.text.primary }} paragraph>
              • <strong>CSS Variables 是瀏覽器標準機制</strong>，變數儲存在 CSS 層級，且會依照 DOM 層級及 selector cascade 直接生效，不需 React 重新渲染。
            </Typography>
            <Typography variant="body1" sx={{ color: colors.text.primary }} paragraph>
              • <strong>ThemeProvider 用 React Context 傳變數</strong>，改變主題狀態會導致所有消費該 Context 的元件重渲，影響效能。
            </Typography>
          </Box>

          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              <strong>範例中展示：</strong>
            </Typography>
            <Typography variant="body2" component="div">
              • 用 ThemeProvider 切換 Light/Dark，會讓所有 Emotion 組件重新渲染
            </Typography>
            <Typography variant="body2" component="div">
              • 用 CSS Variables（掛在 <code>&lt;body data-theme=&quot;dark|light&quot;&gt;</code>），只有切換 <code>&lt;body&gt;</code> 屬性，僅body改變樣式，子元件不會重渲，對效能更友善
            </Typography>
          </Alert>

          {/* CSS Variables vs ThemeProvider Comparison Images */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, textAlign: "center" }}>
              效能比較示意圖
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="img"
                    src={`${import.meta.env.BASE_URL}images/desighToken/css-variables-theme-comparison-1.png`}
                    alt="CSS Variables vs ThemeProvider 比較 1"
                    sx={{
                      maxWidth: "100%",
                      height: "auto",
                      borderRadius: 2,
                      boxShadow: 2,
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="img"
                    src={`${import.meta.env.BASE_URL}images/desighToken/css-variables-theme-comparison-2.png`}
                    alt="CSS Variables vs ThemeProvider 比較 2"
                    sx={{
                      maxWidth: "100%",
                      height: "auto",
                      borderRadius: 2,
                      boxShadow: 2,
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            研究文章
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <MuiLink
              href="https://www.epicreact.dev/css-variables"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: colors.accent.gold, fontWeight: 600 }}
            >
              → Use CSS Variables instead of React Context
            </MuiLink>
            <MuiLink
              href="https://www.havardbrynjulfsen.design/writing/color-variable-names-in-css"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: colors.accent.gold, fontWeight: 600 }}
            >
              → Color variable names in CSS
            </MuiLink>
            <MuiLink
              href="https://uxdesign.cc/how-should-you-name-your-colors-in-a-design-system-3086513476df"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: colors.accent.gold, fontWeight: 600 }}
            >
              → How to name colors in a Design System
            </MuiLink>
          </Box>
        </CreamPaper>

        {/* 我的貢獻 */}
        <Box
          sx={{
            p: 3,
            backgroundColor: colors.background.surfaceAlt,
            border: `2px solid ${colors.border.light}`,
            borderLeft: `4px solid ${colors.accent.gold}`,
            borderRadius: 1,
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ color: colors.accent.gold, fontWeight: 600 }}>
            🚀 我的貢獻
          </Typography>
          <Typography variant="body1" sx={{ color: colors.text.primary }}>
            在協作中觀察到設計與開發流程的潛在痛點，主動向主管提出導入 Design Token 的構想。在獲得認可後，著手研究並協同設計師與主管三方共同擬定出一套符合團隊需求的協作模式，舉辦分享會從前端視角解說實作方式，成功在專案中試行，促進了設計與開發的協作效率。
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default DesignToken;
