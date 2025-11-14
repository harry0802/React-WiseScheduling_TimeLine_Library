import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Container,
  Typography,
  CardContent,
  CardActions,
  Grid,
  Box,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import muiTheme from "../styles/muiTheme";
import {
  CreamPaper,
  GoldBorderContainer,
  GoldDivider,
  CornerButton,
} from "../components/StyledComponents";
import { colors } from "../designTokens";

// 模擬一個假的 API 調用，用於激活 React Query
const fetchAppInfo = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "時間軸專案",
        version: "1.0.0",
        features: ["時間軸視覺化", "數據滑動器", "查詢功能"],
      });
    }, 500);
  });
};

const Home = () => {
  const [pigSystemModule, setPigSystemModule] = useState("inventory");

  // 使用 React Query 發起查詢，這將使 DevTools 顯示
  const { data: appInfo, isLoading } = useQuery({
    queryKey: ["appInfo"],
    queryFn: fetchAppInfo,
  });

  if (isLoading) {
    return (
      <ThemeProvider theme={muiTheme}>
        <Container maxWidth="lg" sx={{ py: 4, backgroundColor: colors.background.primary, minHeight: '100vh' }}>
          <Typography sx={{ color: colors.text.inverse }}>載入中...</Typography>
        </Container>
      </ThemeProvider>
    );
  }

  // 養豬場管理系統模組
  const pigSystemModules = {
    inventory: {
      icon: "🐷",
      title: "豬舍庫存管理",
      description: "養豬場智慧管理系統 - 豬舍庫存即時追蹤與數據分析",
      link: "/pig-house-inventory",
      buttonText: "查看庫存",
    },
    breeding: {
      icon: "🐖",
      title: "種豬繁殖記錄",
      description: "母豬繁殖週期管理與配種記錄追蹤系統",
      link: "/sow-breeding-records",
      buttonText: "查看記錄",
    },
    culling: {
      icon: "🐗",
      title: "公豬淘汰管理",
      description: "公豬淘汰流程管理與決策支援系統",
      link: "/culling-boar",
      buttonText: "管理淘汰",
    },
    genotype: {
      icon: "🧬",
      title: "公豬基因型管理",
      description: "公豬基因型數據管理與品種改良追蹤",
      link: "/boargenotype",
      buttonText: "查看基因型",
    },
  };

  const currentPigModule = pigSystemModules[pigSystemModule];

  const featureCards = [
    {
      icon: "👨‍💻",
      title: "關於我",
      description: "前端工程師，專注於 React 生態系統與工業級系統開發",
      link: "/about",
      buttonText: "查看履歷",
    },
    {
      icon: "📅",
      title: "開發歷程",
      description: "專案開發時程與技術演進歷程",
      link: "/timeline",
      buttonText: "查看開發歷程",
    },
    {
      icon: "🤖",
      title: "智慧排程系統",
      description: "工業級生產排程管理，支援多區域即時調度與狀態追蹤",
      link: "/wise-scheduling",
      buttonText: "進入智慧排程",
    },
    {
      icon: "📊",
      title: "專案作品展示",
      description: "科專_TIIP模具產業高階製造系統展示",
      link: "/project-showcase",
      buttonText: "查看專案詳情",
    },
    {
      icon: "🏭",
      title: "製造監控中心",
      description: "多功能生產監控儀表板，包含 OEE 分析、進度追蹤等",
      link: "/ManufacturingLiveMonitor",
      buttonText: "進入監控中心",
    },
    {
      icon: "🎨",
      title: "Design Token 推動",
      description: "設計系統規範化，推動設計與開發協作效率提升",
      link: "/design-token",
      buttonText: "查看 Design Token",
    },
    {
      icon: "📬",
      title: "聯絡方式",
      description: "歡迎聯繫討論專案合作或技術交流",
      link: "/contact",
      buttonText: "聯絡我",
    },
  ];

  return (
    <ThemeProvider theme={muiTheme}>
      <Container
        maxWidth="lg"
        sx={{
          py: 6,
          backgroundColor: colors.background.primary,
          minHeight: '100vh'
        }}
      >
        {/* Hero Section */}
        <GoldBorderContainer
          sx={{
            mb: 6,
            position: 'relative',
            clipPath: 'polygon(2rem 0, calc(100% - 2rem) 0, 100% 2rem, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 2rem 100%, 0 calc(100% - 2rem), 0 2rem)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: -2,
              left: -2,
              right: -2,
              bottom: -2,
              background: `linear-gradient(135deg, ${colors.accent.gold}40, transparent)`,
              clipPath: 'polygon(2rem 0, calc(100% - 2rem) 0, 100% 2rem, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 2rem 100%, 0 calc(100% - 2rem), 0 2rem)',
              zIndex: -1,
            }
          }}
        >
          <Box sx={{ textAlign: "center", py: 2 }}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: colors.accent.gold,
                mb: 3,
                letterSpacing: '0.02em',
                textShadow: `0 2px 8px ${colors.accent.gold}30`,
              }}
            >
              林志翰 - 前端工程師作品集
            </Typography>
            <GoldDivider sx={{ width: '100px', height: '3px', mx: 'auto' }} />
            <Typography
              variant="h6"
              sx={{
                color: colors.text.inverse,
                lineHeight: 2,
                maxWidth: 700,
                mx: "auto",
                mt: 3,
                fontWeight: 400,
                opacity: 0.95,
              }}
            >
              歡迎來到我的個人作品集！這裡展示了我在智慧製造領域的專案經驗，
              包含生產排程系統、即時監控儀表板等工業級應用開發。
            </Typography>
          </Box>
        </GoldBorderContainer>

        {/* Feature Cards Grid */}
        <Grid container spacing={2}>
          {featureCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CreamPaper
                elevation={0}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  position: 'relative',
                  overflow: 'hidden',
                  clipPath: 'polygon(0.75rem 0, calc(100% - 0.75rem) 0, 100% 0.75rem, 100% calc(100% - 0.75rem), calc(100% - 0.75rem) 100%, 0.75rem 100%, 0 calc(100% - 0.75rem), 0 0.75rem)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 6px 16px ${colors.accent.gold}25`,
                    '& .card-icon': {
                      transform: 'scale(1.08)',
                    },
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  <Box
                    className="card-icon"
                    sx={{
                      fontSize: "2rem",
                      mb: 1,
                      display: 'inline-block',
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Typography
                    variant="subtitle1"
                    component="h2"
                    gutterBottom
                    sx={{
                      color: colors.accent.gold,
                      fontWeight: 700,
                      mb: 1,
                      fontSize: '1.05rem',
                      letterSpacing: '0.01em',
                    }}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: colors.text.primary,
                      lineHeight: 1.6,
                      minHeight: '2.8em',
                      fontSize: '0.85rem',
                    }}
                  >
                    {card.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <CornerButton
                    component={Link}
                    to={card.link}
                    fullWidth
                    sx={{
                      py: 0.75,
                      fontSize: '0.85rem',
                    }}
                  >
                    {card.buttonText}
                  </CornerButton>
                </CardActions>
              </CreamPaper>
            </Grid>
          ))}

          {/* 養豬場管理系統卡片 (可切換模組) */}
          <Grid item xs={12} sm={6} md={4}>
            <CreamPaper
              elevation={0}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                position: 'relative',
                overflow: 'hidden',
                clipPath: 'polygon(0.75rem 0, calc(100% - 0.75rem) 0, 100% 0.75rem, 100% calc(100% - 0.75rem), calc(100% - 0.75rem) 100%, 0.75rem 100%, 0 calc(100% - 0.75rem), 0 0.75rem)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 6px 16px ${colors.accent.gold}25`,
                  '& .card-icon': {
                    transform: 'scale(1.08)',
                  },
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, p: 2 }}>
                {/* 模組切換按鈕 */}
                <Box sx={{ mb: 1.5 }}>
                  <ToggleButtonGroup
                    value={pigSystemModule}
                    exclusive
                    onChange={(e, newValue) => newValue && setPigSystemModule(newValue)}
                    size="small"
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 0.5,
                      '& .MuiToggleButtonGroup-grouped': {
                        border: `1px solid ${colors.accent.gold}60`,
                        borderRadius: '4px !important',
                        margin: '2px',
                        '&:not(:first-of-type)': {
                          borderLeft: `1px solid ${colors.accent.gold}60`,
                        },
                      },
                      '& .MuiToggleButton-root': {
                        color: colors.text.primary,
                        fontSize: '1.3rem',
                        padding: '6px 10px',
                        minWidth: 'auto',
                        backgroundColor: `${colors.background.secondary}`,
                        backdropFilter: 'blur(4px)',
                        transition: 'all 0.3s ease',
                        '&.Mui-selected': {
                          backgroundColor: colors.accent.gold,
                          color: colors.background.primary,
                          boxShadow: `0 2px 8px ${colors.accent.gold}40, inset 0 1px 0 rgba(255,255,255,0.2)`,
                          transform: 'scale(1.05)',
                          '&:hover': {
                            backgroundColor: colors.accent.gold,
                            filter: 'brightness(1.1)',
                          },
                        },
                        '&:hover': {
                          backgroundColor: `${colors.accent.gold}20`,
                          transform: 'translateY(-1px)',
                          boxShadow: `0 2px 6px ${colors.accent.gold}20`,
                        },
                      },
                    }}
                  >
                    <ToggleButton value="inventory">🐷</ToggleButton>
                    <ToggleButton value="breeding">🐖</ToggleButton>
                    <ToggleButton value="culling">🐗</ToggleButton>
                    <ToggleButton value="genotype">🧬</ToggleButton>
                  </ToggleButtonGroup>
                </Box>

                <Box
                  className="card-icon"
                  sx={{
                    fontSize: "2rem",
                    mb: 1,
                    display: 'inline-block',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  {currentPigModule.icon}
                </Box>
                <Typography
                  variant="subtitle1"
                  component="h2"
                  gutterBottom
                  sx={{
                    color: colors.accent.gold,
                    fontWeight: 700,
                    mb: 1,
                    fontSize: '1.05rem',
                    letterSpacing: '0.01em',
                  }}
                >
                  {currentPigModule.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: colors.text.primary,
                    lineHeight: 1.6,
                    minHeight: '2.8em',
                    fontSize: '0.85rem',
                  }}
                >
                  {currentPigModule.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ p: 2, pt: 0 }}>
                <CornerButton
                  component={Link}
                  to={currentPigModule.link}
                  fullWidth
                  sx={{
                    py: 0.75,
                    fontSize: '0.85rem',
                  }}
                >
                  {currentPigModule.buttonText}
                </CornerButton>
              </CardActions>
            </CreamPaper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
