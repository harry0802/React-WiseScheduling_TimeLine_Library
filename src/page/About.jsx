import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Chip,
  List,
  ListItem,
  ListItemText,
  Grid,
  Divider,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import muiTheme from "../styles/muiTheme";

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
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Profile Header */}
        <Paper
          elevation={0}
          sx={{
            textAlign: "center",
            mb: 4,
            p: 4,
            background:
              "linear-gradient(135deg, rgba(97, 218, 251, 0.20), rgba(58, 133, 137, 0.15))",
            border: 2,
            borderColor: "primary.light",
            borderRadius: 3,
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 700, color: "text.primary" }}
          >
            林志翰
          </Typography>
          <Typography
            variant="h5"
            sx={{ color: "primary.main", fontWeight: 600, mb: 2 }}
          >
            前端工程師
          </Typography>
          <Divider
            sx={{
              width: 60,
              height: 4,
              bgcolor: "primary.main",
              mx: "auto",
              borderRadius: 2,
            }}
          />
        </Paper>

        {/* Summary Section */}
        <Paper
          elevation={2}
          sx={{
            mb: 3,
            p: 3,
            borderLeft: 4,
            borderColor: "primary.main",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: "primary.main",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <span style={{ fontSize: "1.75rem" }}>💡</span>
            摘要
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            我是一位充滿熱情、樂於學習的前端工程師，在第一份工作中，我深刻體會到
            <strong>溝通與團隊合作</strong>
            是推動專案成功的核心。
            我享受與 PM、設計師及後端夥伴緊密協作，並在新創的挑戰中，
            <strong>主動提出解決方案</strong>
            ，在獲得主管支持後，協助團隊導入新技術與優化流程。
          </Typography>
          <Typography variant="body1" color="text.secondary">
            目前正在尋找下一個能讓我貢獻所學、持續成長的舞台。
          </Typography>
        </Paper>

        {/* Work Experience Section */}
        <Paper
          elevation={2}
          sx={{
            mb: 3,
            p: 3,
            borderLeft: 4,
            borderColor: "primary.main",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: "primary.main",
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
              sx={{ color: "text.primary", fontWeight: 600 }}
            >
              雙肩股份有限公司 | 前端工程師
            </Typography>
            <Chip
              label="1年2個月"
              color="primary"
              size="small"
              sx={{ mb: 2, fontWeight: 600 }}
            />
            <Typography variant="body2" color="text.secondary" paragraph>
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
                  color: "text.primary",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    bgcolor: "primary.main",
                    borderRadius: "50%",
                  }}
                />
                主要貢獻與成就
              </Typography>

              <Typography variant="body2" sx={{ fontWeight: 600, mt: 1 }}>
                專案開發與優化：
              </Typography>
              <List dense>
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
                        >
                          • 在時程內接續開發並完成 13 項功能，確保系統順利驗收
                        </Typography>
                        <Typography
                          variant="body2"
                          component="span"
                          display="block"
                        >
                          •
                          優化既有程式碼庫，修復多個Bug，顯著提升系統穩定性
                        </Typography>
                        <Typography
                          variant="body2"
                          component="span"
                          display="block"
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
                        >
                          •
                          接手並規劃新專案架構，包含組件、權限、資料夾結構、API與路由設計
                        </Typography>
                        <Typography
                          variant="body2"
                          component="span"
                          display="block"
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
            <Paper
              elevation={0}
              sx={{
                my: 2,
                p: 2,
                background:
                  "linear-gradient(135deg, rgba(97, 218, 251, 0.10), rgba(58, 133, 137, 0.08))",
                borderLeft: 4,
                borderColor: "primary.main",
                borderRadius: 2,
              }}
            >
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  color: "primary.main",
                  fontWeight: 700,
                }}
              >
                🚀 技術推廣與團隊貢獻
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                <strong>推動 Design Token 概念：</strong>
                在協作中觀察到設計與開發流程的潛在痛點，主動向主管提出導入
                Design Token 的構想。
                在獲得認可後，著手研究並協同設計師與主管三方共同擬定出一套符合團隊需求的協作模式，
                舉辦分享會從前端視角解說實作方式，成功在專案中試行，促進了設計與開發的協作效率。
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                <strong>導入 TypeScript：</strong>
                為了提升專案的長期穩定性，向主管建議在新專案中導入
                TypeScript。
                這個想法獲得支持後，透過自主學習成功將其應用於專案開發中。
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>分享 React 設計模式：</strong>
                將日常進修所學的 React
                設計模式主動撰寫成技術文件並分享至公司內部知識庫，
                促進團隊的共同成長。
              </Typography>
            </Paper>

            {/* Challenges and Solutions */}
            <Paper
              elevation={0}
              sx={{
                my: 2,
                p: 2,
                background:
                  "linear-gradient(135deg, rgba(97, 218, 251, 0.10), rgba(58, 133, 137, 0.08))",
                borderLeft: 4,
                borderColor: "primary.main",
                borderRadius: 2,
              }}
            >
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  color: "primary.main",
                  fontWeight: 700,
                }}
              >
                ⚡ 挑戰與解決方案
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                <strong>應對設計資源不足：</strong>
                在設計資源有限且客戶時程緊迫的挑戰下，主動承擔起部分頁面的設計工作。
                搜集了大量設計靈感與開源資源，在不侵犯版權的前提下完成頁面，
                最終獲得客戶認可，並成為產品 Demo 的重要部分。
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>克服商用軟體限制：</strong>
                為滿足客戶對甘特圖的客製化需求，在公司無預算購買商用方案的情況下，
                積極研究各種開源方案。最終找到一個高彈性的甘特圖專案，
                在與 PM
                協商並確認可行性後，成功開發出符合驗收標準的功能。
              </Typography>
            </Paper>
          </Box>
        </Paper>

        {/* Skills Section */}
        <Paper
          elevation={2}
          sx={{
            mb: 3,
            p: 3,
            borderLeft: 4,
            borderColor: "primary.main",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: "primary.main",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <span style={{ fontSize: "1.75rem" }}>🛠️</span>
            技能總覽
          </Typography>

          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  background: "rgba(97, 218, 251, 0.08)",
                  border: 2,
                  borderColor: "rgba(97, 218, 251, 0.20)",
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ color: "primary.main", fontWeight: 700 }}
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
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  background: "rgba(97, 218, 251, 0.08)",
                  border: 2,
                  borderColor: "rgba(97, 218, 251, 0.20)",
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ color: "primary.main", fontWeight: 700 }}
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
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  background: "rgba(97, 218, 251, 0.08)",
                  border: 2,
                  borderColor: "rgba(97, 218, 251, 0.20)",
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ color: "primary.main", fontWeight: 700 }}
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
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  background: "rgba(97, 218, 251, 0.08)",
                  border: 2,
                  borderColor: "rgba(97, 218, 251, 0.20)",
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ color: "primary.main", fontWeight: 700 }}
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
              </Paper>
            </Grid>
          </Grid>
        </Paper>

        {/* Core Strengths Section */}
        <Paper
          elevation={2}
          sx={{
            p: 3,
            borderLeft: 4,
            borderColor: "primary.main",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: "primary.main",
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
                  primary={<strong>{strength.title}：</strong>}
                  secondary={strength.description}
                  primaryTypographyProps={{ variant: "body1" }}
                  secondaryTypographyProps={{
                    variant: "body2",
                    sx: { display: "inline" },
                  }}
                  sx={{ m: 0 }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default About;
