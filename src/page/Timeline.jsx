import React from 'react';
import {
  Container,
  Typography,
  Box,
  Chip,
  Grid,
} from '@mui/material';
import {
  Timeline as MuiTimeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';
import { ThemeProvider } from '@mui/material/styles';
import muiTheme from '../styles/muiTheme';
import {
  CreamPaper,
  GoldBorderContainer,
  GoldDivider,
  GoldBadge,
} from '../components/StyledComponents';
import { colors } from '../designTokens';

const Timeline = () => {
  const timelinePhases = [
    {
      phase: '2025年6月',
      phaseTitle: '智慧排程系統開發',
      items: [
        {
          title: '實作智慧排程與機台狀態管理系統',
          description: '開發生產排程管理功能，實作機台狀態板、工單調度系統，支援即時狀態更新與歷史記錄查詢',
          date: '2025-06'
        },
        {
          title: '優化時間軸視覺化與主題管理',
          description: '導入大字體工廠友善主題，提升排程系統可讀性，強化時間軸配置與對話框互動體驗',
          date: '2025-06'
        },
        {
          title: '重構機台狀態管理與表單處理',
          description: '簡化 MachineBoard 組件架構，優化機台狀態更新流程，完善表單驗證與錯誤處理機制',
          date: '2025-06'
        }
      ]
    },
    {
      phase: '2025年7月',
      phaseTitle: '製造監控中心開發',
      items: [
        {
          title: '建構製造現場即時監控 API 服務',
          description: '設計並實作儀表板數據檢索服務，開發 OEE 監控、機台概覽等多個即時監控端點',
          date: '2025-07'
        },
        {
          title: '整合即時 API 數據至監控儀表板',
          description: '將真實生產數據整合至監控系統，實作生產區域模板與多區域 OEE 儀表板功能',
          date: '2025-07'
        },
        {
          title: '優化成本分析與生產報表系統',
          description: '重構智慧成本表分析功能，使用進階 Server-side DataGrid，修正生產良率計算邏輯',
          date: '2025-07'
        },
        {
          title: '強化排程時間驗證與狀態控制',
          description: '實作嚴謹的時間驗證機制，根據工單狀態動態控制表單編輯權限，優先使用計劃工單時間',
          date: '2025-07'
        }
      ]
    },
    {
      phase: '2025年8月',
      phaseTitle: '系統安全性強化',
      items: [
        {
          title: '更新 Content-Security-Policy 配置',
          description: '實作動態 CSP 設定，使用動態 host 與 scheme 值提升安全性與跨域資源管理',
          date: '2025-08'
        }
      ]
    },
    {
      phase: '2025年11月',
      phaseTitle: '專案重構與整合',
      items: [
        {
          title: '整合 WiseScheduling 模組至主分支',
          description: '從獨立分支合併智慧排程改進，移除 Docker 與後端檔案，專注前端功能開發',
          date: '2025-11'
        },
        {
          title: '建構完整 Mock API 支援系統',
          description: '開發完整的 Mock 數據系統，支援離線開發與測試，新增詳細文件與測試腳本',
          date: '2025-11'
        },
        {
          title: '修正數據結構與機台資訊顯示',
          description: '優化 useMachineBoard 數據處理邏輯，修正機台序號顯示問題，新增調試日誌系統',
          date: '2025-11'
        },
        {
          title: '重構與強化 WiseScheduling 組件',
          description: '全面重構智慧排程組件架構，提升程式碼可維護性，優化使用者體驗與視覺呈現',
          date: '2025-11'
        }
      ]
    }
  ];

  const techStack = [
    'React 18', 'TypeScript', 'React Router', 'Redux Toolkit',
    'Styled Components', 'Material-UI', 'Ant Design',
    'React Query', 'React Hook Form', 'Zod',
    'Vis-timeline', 'Recharts', 'Day.js', 'Zustand'
  ];

  return (
    <ThemeProvider theme={muiTheme}>
      <Container maxWidth="lg" sx={{ py: 6, backgroundColor: colors.background.primary, minHeight: '100vh' }}>
        <GoldBorderContainer sx={{
          mb: 4,
          textAlign: 'center',
          clipPath: 'polygon(2rem 0, calc(100% - 2rem) 0, 100% 2rem, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 2rem 100%, 0 calc(100% - 2rem), 0 2rem)',
        }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: colors.accent.primary,
              mb: 2,
            }}
          >
            開發歷程
          </Typography>
          <GoldDivider />
        </GoldBorderContainer>

        <CreamPaper elevation={2} sx={{
          mb: 4,
          clipPath: 'polygon(1rem 0, calc(100% - 1rem) 0, 100% 1rem, 100% calc(100% - 1rem), calc(100% - 1rem) 100%, 1rem 100%, 0 calc(100% - 1rem), 0 1rem)',
        }}>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{
              color: colors.accent.primary,
              fontWeight: 600,
              mt: 0,
              mb: 2,
            }}
          >
            專案簡介
          </Typography>
          <Typography variant="body1" sx={{ color: colors.text.primary }} paragraph>
            這是一個工業級智慧製造管理系統，專注於生產排程、即時監控與數據分析。
            專案從 2025 年 6 月啟動，經過持續迭代開發，目前已整合智慧排程系統、製造監控中心、
            OEE 分析等多個核心模組。
          </Typography>
          <Typography variant="body1" sx={{ color: colors.text.primary }}>
            開發過程中注重系統架構設計、使用者體驗優化、以及程式碼品質維護，
            採用現代化的前端技術棧與最佳實踐，確保系統的可擴展性與可維護性。
          </Typography>
        </CreamPaper>

        <Box sx={{ position: 'relative' }}>
          {timelinePhases.map((phase, phaseIndex) => (
            <Box key={phaseIndex} sx={{ mb: phaseIndex < timelinePhases.length - 1 ? 6 : 0 }}>
              {/* Phase Header */}
              <GoldBorderContainer sx={{
                mb: 3,
                clipPath: 'polygon(1.5rem 0, calc(100% - 1.5rem) 0, 100% 1.5rem, 100% calc(100% - 1.5rem), calc(100% - 1.5rem) 100%, 1.5rem 100%, 0 calc(100% - 1.5rem), 0 1.5rem)',
              }}>
                <Typography
                  variant="h5"
                  sx={{
                    color: colors.accent.primary,
                    fontWeight: 700,
                    mb: 0.5,
                  }}
                >
                  {phase.phase}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: colors.text.inverse,
                    fontWeight: 600,
                  }}
                >
                  {phase.phaseTitle}
                </Typography>
              </GoldBorderContainer>

              {/* Phase Items */}
              <MuiTimeline position="right" sx={{ mt: 0, pt: 0 }}>
                {phase.items.map((item, itemIndex) => (
                  <TimelineItem key={itemIndex}>
                    <TimelineOppositeContent
                      sx={{
                        m: 'auto 0',
                        flex: 0.2,
                        px: 2
                      }}
                      align="right"
                      variant="body2"
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
                          backgroundColor: colors.background.primary,
                        }}
                      />
                      {itemIndex < phase.items.length - 1 && (
                        <TimelineConnector sx={{ bgcolor: colors.accent.primary }} />
                      )}
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: 1.5, px: 2 }}>
                      <CreamPaper
                        elevation={2}
                        sx={{
                          p: 2.5,
                          borderLeft: `4px solid ${colors.accent.primary}`,
                          clipPath: 'polygon(0.75rem 0, calc(100% - 0.75rem) 0, 100% 0.75rem, 100% calc(100% - 0.75rem), calc(100% - 0.75rem) 100%, 0.75rem 100%, 0 calc(100% - 0.75rem), 0 0.75rem)',
                        }}
                      >
                        <Typography
                          variant="h6"
                          component="h4"
                          gutterBottom
                          sx={{
                            fontWeight: 600,
                            color: colors.accent.primary,
                            mb: 1,
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="body2"
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

        <CreamPaper elevation={2} sx={{
          mt: 4,
          clipPath: 'polygon(1rem 0, calc(100% - 1rem) 0, 100% 1rem, 100% calc(100% - 1rem), calc(100% - 1rem) 100%, 1rem 100%, 0 calc(100% - 1rem), 0 1rem)',
        }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: colors.accent.primary,
              fontWeight: 600,
              mb: 2,
            }}
          >
            技術棧
          </Typography>
          <Grid container spacing={1}>
            {techStack.map((tech, index) => (
              <Grid item key={index}>
                <Chip
                  label={tech}
                  sx={{
                    fontWeight: 500,
                    borderWidth: 2,
                    borderColor: colors.accent.primary,
                    color: colors.accent.primary,
                    borderStyle: 'solid',
                    backgroundColor: 'transparent',
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </CreamPaper>
      </Container>
    </ThemeProvider>
  );
};

export default Timeline;
