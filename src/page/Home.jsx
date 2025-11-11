import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Box,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import muiTheme from "../styles/muiTheme";

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
  // 使用 React Query 發起查詢，這將使 DevTools 顯示
  const { data: appInfo, isLoading } = useQuery({
    queryKey: ["appInfo"],
    queryFn: fetchAppInfo,
  });

  if (isLoading) {
    return (
      <ThemeProvider theme={muiTheme}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography>載入中...</Typography>
        </Container>
      </ThemeProvider>
    );
  }

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
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: "primary.main",
              mb: 2,
            }}
          >
            林志翰 - 前端工程師作品集
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              lineHeight: 1.8,
              maxWidth: 800,
              mx: "auto",
            }}
          >
            歡迎來到我的個人作品集！這裡展示了我在智慧製造領域的專案經驗，
            包含生產排程系統、即時監控儀表板等工業級應用開發。
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {featureCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h4"
                    component="h2"
                    gutterBottom
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <span style={{ fontSize: "2rem" }}>{card.icon}</span>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    component={Link}
                    to={card.link}
                    variant="contained"
                    fullWidth
                    sx={{
                      textTransform: "none",
                      fontWeight: 500,
                    }}
                  >
                    {card.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
