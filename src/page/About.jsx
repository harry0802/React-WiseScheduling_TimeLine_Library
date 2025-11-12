import React from "react";
import {
  Container,
  Typography,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  Grid,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import muiTheme from "../styles/muiTheme";
import {
  CreamPaper,
  GoldBorderContainer,
  GoldDivider,
  GoldBadge,
} from "../components/StyledComponents";
import { colors } from "../designTokens";

const About = () => {
  const skills = {
    languages: ["TypeScript", "JavaScript (ES6+)"],
    frameworks: ["React", "Vue"],
    libraries: [
      "MUI",
      "Ant Design",
      "Day.js",
      "Styled Components",
      "Emotion",
      "SCSS",
      "Tailwind CSS",
      "Zod",
      "React Hook Form",
      "Zustand",
      "Redux",
    ],
    tools: ["Git", "npm", "Obsidian", "Excalidraw", "Docker"],
  };

  const coreStrengths = [
    {
      title: "獨立開發能力",
      description: "能夠獨立規劃專案架構、接手並完成功能開發，從設計到實作都能掌握",
    },
    {
      title: "突破困難的決心",
      description: "面對資源限制與技術挑戰，主動尋找解決方案並執行落地",
    },
    {
      title: "技術推動者",
      description: "不僅專注於開發，更主動提出技術改進建議並協助團隊導入",
    },
    {
      title: "持續學習",
      description:
        "透過自主學習掌握新技術（如 TypeScript、Design Token），並分享給團隊",
    },
    {
      title: "跨職能協作",
      description: "與 PM、設計師、後端工程師緊密合作，確保專案順利推進",
    },
  ];

  return (
    <ThemeProvider theme={muiTheme}>
      <Container maxWidth="lg" sx={{ py: 6, backgroundColor: colors.background.primary, minHeight: '100vh' }}>
        {/* Profile Header */}
        <GoldBorderContainer sx={{
          mb: 4,
          clipPath: 'polygon(2rem 0, calc(100% - 2rem) 0, 100% 2rem, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 2rem 100%, 0 calc(100% - 2rem), 0 2rem)',
        }}>
          <CreamPaper elevation={0} sx={{ textAlign: "center" }}>
          {/* Profile Photo */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <Box
              sx={{
                width: 160,
                height: 160,
                borderRadius: "50%",
                border: `4px solid ${colors.accent.gold}`,
                overflow: "hidden",
                boxShadow: 3,
                background: colors.background.secondary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* 預留照片位置 - 請替換 src 為實際照片路徑 */}
              <Box
                component="img"
                src="/images/profile-photo.jpg"
                alt="林志翰的照片"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                onError={(e) => {
                  // 如果圖片載入失敗，顯示預設佔位符
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              {/* 預設佔位符 */}
              <Box
                sx={{
                  display: "none",
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "4rem",
                  color: colors.accent.gold,
                }}
              >
                👤
              </Box>
            </Box>
          </Box>

          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 700, color: colors.text.primary }}
          >
            林志翰
          </Typography>
          <Typography
            variant="h5"
            sx={{ color: colors.text.secondary, fontWeight: 600, mb: 2 }}
          >
            前端工程師
          </Typography>
          <GoldDivider />
          </CreamPaper>
        </GoldBorderContainer>

        {/* Summary Section */}
        <CreamPaper elevation={2} sx={{
          mb: 3,
          clipPath: 'polygon(1rem 0, calc(100% - 1rem) 0, 100% 1rem, 100% calc(100% - 1rem), calc(100% - 1rem) 100%, 1rem 100%, 0 calc(100% - 1rem), 0 1rem)',
        }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: colors.accent.gold,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <span style={{ fontSize: "1.75rem" }}>💡</span>
            摘要
          </Typography>
          <Typography variant="body1" sx={{ color: colors.text.primary, mb: 2 }}>
            我是一位充滿熱情、樂於學習的前端工程師，在第一份工作中，我深刻體會到
            <strong>溝通與團隊合作</strong>
            是推動專案成功的核心。
            我享受與 PM、設計師及後端夥伴緊密協作，並在新創的挑戰中，
            <strong>主動提出解決方案</strong>
            ，在獲得主管支持後，協助團隊導入新技術與優化流程。
          </Typography>
          <Typography variant="body1" sx={{ color: colors.text.primary }}>
            目前正在尋找下一個能讓我貢獻所學、持續成長的舞台。
          </Typography>
        </CreamPaper>

        {/* Work Experience Section */}
        <CreamPaper elevation={2} sx={{
          mb: 3,
          clipPath: 'polygon(1rem 0, calc(100% - 1rem) 0, 100% 1rem, 100% calc(100% - 1rem), calc(100% - 1rem) 100%, 1rem 100%, 0 calc(100% - 1rem), 0 1rem)',
        }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: colors.accent.gold,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <span style={{ fontSize: "1.75rem" }}>💼</span>
            工作經歷
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: colors.text.primary, fontWeight: 600 }}
            >
              雙肩股份有限公司 | 前端工程師
            </Typography>
            <GoldBadge sx={{ mb: 2 }}>1年2個月</GoldBadge>

            <Typography variant="body2" sx={{ color: colors.text.primary, mb: 2 }}>
              在這段期間，我擔任前端工程師，負責與後端、UI/UX 設計師及產品經理協同開發。
              我樂於分享與溝通，在團隊的共同努力下，我們負責的專案成為公司唯一順利結案的專案，
              並獲得技術主管的肯定。
            </Typography>

            {/* Main Achievements */}
            <Box sx={{ my: 2 }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  color: colors.accent.gold,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    bgcolor: colors.accent.gold,
                    borderRadius: "50%",
                  }}
                />
                主要貢獻與成就
              </Typography>

              <Typography variant="body2" sx={{ fontWeight: 600, mt: 1, color: colors.text.primary }}>
                專案開發與優化：
              </Typography>
              <List dense sx={{ '& .MuiListItemText-primary': { color: colors.accent.gold }, '& .MuiListItemText-secondary': { color: colors.text.primary } }}>
                <ListItem>
                  <ListItemText
                    primary="智慧製造專案"
                    primaryTypographyProps={{ fontWeight: 600 }}
                    secondary={
                      <Box component="span">
                        <Typography
                          variant="body2"
                          component="span"
                          display="block"
                          sx={{ color: colors.text.primary }}
                        >
                          • 在時程內接續開發並完成 13 項功能，確保系統順利驗收
                        </Typography>
                        <Typography
                          variant="body2"
                          component="span"
                          display="block"
                          sx={{ color: colors.text.primary }}
                        >
                          •
                          優化既有程式碼庫，修復多個Bug，顯著提升系統穩定性
                        </Typography>
                        <Typography
                          variant="body2"
                          component="span"
                          display="block"
                          sx={{ color: colors.text.primary }}
                        >
                          • 成功將專案由 Webpack 遷移至
                          Vite，改善了開發環境的啟動與熱更新速度
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="智慧農業專案"
                    primaryTypographyProps={{ fontWeight: 600 }}
                    secondary={
                      <Box component="span">
                        <Typography
                          variant="body2"
                          component="span"
                          display="block"
                          sx={{ color: colors.text.primary }}
                        >
                          •
                          接手並規劃新專案架構，包含組件、權限、資料夾結構、API與路由設計
                        </Typography>
                        <Typography
                          variant="body2"
                          component="span"
                          display="block"
                          sx={{ color: colors.text.primary }}
                        >
                          • 將專案遷移至 Vite，並成功導入
                          TypeScript，為專案未來的可維護性與穩定性打下良好基礎
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              </List>
            </Box>

            {/* Technical Contributions */}
            <Box
              sx={{
                my: 2,
                p: 2,
                backgroundColor: colors.background.surfaceAlt,
                border: `2px solid ${colors.border.light}`,
                borderLeft: `4px solid ${colors.accent.gold}`,
                borderRadius: 1,
              }}
            >
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  color: colors.accent.gold,
                  fontWeight: 700,
                }}
              >
                🚀 技術推廣與團隊貢獻
              </Typography>
              <Typography variant="body2" sx={{ color: colors.text.primary, mb: 2 }}>
                <strong>推動 Design Token 概念：</strong>
                在協作中觀察到設計與開發流程的潛在痛點，主動向主管提出導入
                Design Token 的構想。
                在獲得認可後，著手研究並協同設計師與主管三方共同擬定出一套符合團隊需求的協作模式，
                舉辦分享會從前端視角解說實作方式，成功在專案中試行，促進了設計與開發的協作效率。
              </Typography>
              <Typography variant="body2" sx={{ color: colors.text.primary, mb: 2 }}>
                <strong>導入 TypeScript：</strong>
                為了提升專案的長期穩定性，向主管建議在新專案中導入
                TypeScript。
                這個想法獲得支持後，透過自主學習成功將其應用於專案開發中。
              </Typography>
              <Typography variant="body2" sx={{ color: colors.text.primary }}>
                <strong>分享 React 設計模式：</strong>
                將日常進修所學的 React
                設計模式主動撰寫成技術文件並分享至公司內部知識庫，
                促進團隊的共同成長。
              </Typography>
            </Box>

            {/* Challenges and Solutions */}
            <Box
              sx={{
                my: 2,
                p: 2,
                backgroundColor: colors.background.surfaceAlt,
                border: `2px solid ${colors.border.light}`,
                borderLeft: `4px solid ${colors.accent.gold}`,
                borderRadius: 1,
              }}
            >
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  color: colors.accent.gold,
                  fontWeight: 700,
                }}
              >
                ⚡ 挑戰與解決方案
              </Typography>
              <Typography variant="body2" sx={{ color: colors.text.primary, mb: 2 }}>
                <strong>應對設計資源不足：</strong>
                在設計資源有限且客戶時程緊迫的挑戰下，主動承擔起部分頁面的設計工作。
                搜集了大量設計靈感與開源資源，在不侵犯版權的前提下完成頁面，
                最終獲得客戶認可，並成為產品 Demo 的重要部分。
              </Typography>
              <Typography variant="body2" sx={{ color: colors.text.primary }}>
                <strong>克服商用軟體限制：</strong>
                為滿足客戶對甘特圖的客製化需求，在公司無預算購買商用方案的情況下，
                積極研究各種開源方案。最終找到一個高彈性的甘特圖專案，
                在與 PM
                協商並確認可行性後，成功開發出符合驗收標準的功能。
              </Typography>
            </Box>
          </Box>
        </CreamPaper>

        {/* Skills Section */}
        <GoldBorderContainer sx={{
          mb: 3,
          clipPath: 'polygon(1.5rem 0, calc(100% - 1.5rem) 0, 100% 1.5rem, 100% calc(100% - 1.5rem), calc(100% - 1.5rem) 100%, 1.5rem 100%, 0 calc(100% - 1.5rem), 0 1.5rem)',
        }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: colors.accent.gold,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 3,
            }}
          >
            <span style={{ fontSize: "1.75rem" }}>🛠️</span>
            技能總覽
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <CreamPaper
                elevation={0}
                sx={{
                  p: 2,
                  height: '100%',
                  clipPath: 'polygon(0.75rem 0, calc(100% - 0.75rem) 0, 100% 0.75rem, 100% calc(100% - 0.75rem), calc(100% - 0.75rem) 100%, 0.75rem 100%, 0 calc(100% - 0.75rem), 0 0.75rem)',
                }}
              >
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ color: colors.accent.gold, fontWeight: 700 }}
                >
                  語言
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {skills.languages.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      size="small"
                      sx={{ fontWeight: 500 }}
                    />
                  ))}
                </Box>
              </CreamPaper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <CreamPaper
                elevation={0}
                sx={{
                  p: 2,
                  height: '100%',
                  clipPath: 'polygon(0.75rem 0, calc(100% - 0.75rem) 0, 100% 0.75rem, 100% calc(100% - 0.75rem), calc(100% - 0.75rem) 100%, 0.75rem 100%, 0 calc(100% - 0.75rem), 0 0.75rem)',
                }}
              >
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ color: colors.accent.gold, fontWeight: 700 }}
                >
                  框架
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {skills.frameworks.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      size="small"
                      sx={{ fontWeight: 500 }}
                    />
                  ))}
                </Box>
              </CreamPaper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <CreamPaper
                elevation={0}
                sx={{
                  p: 2,
                  height: '100%',
                  clipPath: 'polygon(0.75rem 0, calc(100% - 0.75rem) 0, 100% 0.75rem, 100% calc(100% - 0.75rem), calc(100% - 0.75rem) 100%, 0.75rem 100%, 0 calc(100% - 0.75rem), 0 0.75rem)',
                }}
              >
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ color: colors.accent.gold, fontWeight: 700 }}
                >
                  函式庫
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {skills.libraries.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      size="small"
                      sx={{ fontWeight: 500 }}
                    />
                  ))}
                </Box>
              </CreamPaper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <CreamPaper
                elevation={0}
                sx={{
                  p: 2,
                  height: '100%',
                  clipPath: 'polygon(0.75rem 0, calc(100% - 0.75rem) 0, 100% 0.75rem, 100% calc(100% - 0.75rem), calc(100% - 0.75rem) 100%, 0.75rem 100%, 0 calc(100% - 0.75rem), 0 0.75rem)',
                }}
              >
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ color: colors.accent.gold, fontWeight: 700 }}
                >
                  工具
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {skills.tools.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      size="small"
                      sx={{ fontWeight: 500 }}
                    />
                  ))}
                </Box>
              </CreamPaper>
            </Grid>
          </Grid>
        </GoldBorderContainer>

        {/* Core Strengths Section */}
        <CreamPaper elevation={2} sx={{
          clipPath: 'polygon(1rem 0, calc(100% - 1rem) 0, 100% 1rem, 100% calc(100% - 1rem), calc(100% - 1rem) 100%, 1rem 100%, 0 calc(100% - 1rem), 0 1rem)',
        }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: colors.accent.gold,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <span style={{ fontSize: "1.75rem" }}>🎯</span>
            核心優勢
          </Typography>
          <List>
            {coreStrengths.map((strength, index) => (
              <ListItem key={index} sx={{ py: 1 }}>
                <ListItemText
                  primary={<strong style={{ color: colors.accent.gold }}>{strength.title}：</strong>}
                  secondary={strength.description}
                  primaryTypographyProps={{ variant: "body1" }}
                  secondaryTypographyProps={{
                    variant: "body2",
                    sx: { display: "inline", color: colors.text.primary },
                  }}
                  sx={{ m: 0 }}
                />
              </ListItem>
            ))}
          </List>
        </CreamPaper>
      </Container>
    </ThemeProvider>
  );
};

export default About;
