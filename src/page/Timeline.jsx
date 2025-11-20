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
  // 設置頁面標題
  useDocumentTitle('開發歷程')

  const timelinePhases = [
    {
      phase: '2024年8月',
      phaseTitle: '基礎功能模組開發',
      items: [
        {
          title: '開發材料管理系統與通知機制',
          description:
            '建立材料管理頁面程式邏輯，實作 row 點選與勾選功能，重構通知邏輯為自訂 hook 提升可重用性',
          date: '2024-08'
        },
        {
          title: '完成製程與物料編碼維護 CRUD 功能',
          description:
            '實作製程與物料編碼維護的完整 CRUD 操作，建立 API 串接邏輯，優化資料驗證與錯誤處理',
          date: '2024-08'
        },
        {
          title: '開發產品資訊管理與派工系統整合',
          description:
            '新增產品資訊頁面資料串接，整合製程與模具資訊顯示，實作隆廷派工系統的製程資訊篩選功能',
          date: '2024-08'
        }
      ]
    },
    {
      phase: '2024年9月',
      phaseTitle: '品保系統開發',
      items: [
        {
          title: '重構應用程式架構與樣式系統',
          description:
            '重構 React 應用結構，優化全局樣式管理，提升程式碼組織性與可維護性',
          date: '2024-09'
        },
        {
          title: '開發品保系統頁面與 API 串接',
          description:
            '實作 QMS 生產檢驗元件，完成品保系統 API 串接，整合產品資料至品保儀表板',
          date: '2024-09'
        },
        {
          title: '修復品保、派工與 BOM 表系統問題',
          description:
            '修正品保系統、派工系統與機台製令單生產明細的關鍵錯誤，確保系統穩定運作',
          date: '2024-09'
        }
      ]
    },
    {
      phase: '2024年10月',
      phaseTitle: '智慧成本分析系統',
      items: [
        {
          title: '開發業務報價系統 UI 與成本分析',
          description:
            '建立智慧成本分析與業務報價系統介面，實作各製程物料與加工成本分析功能',
          date: '2024-10'
        },
        {
          title: '實作業務表單系統與資料處理',
          description:
            '開發業務表單系統，完成表單資料處理邏輯，重構報價系統架構提升程式碼品質',
          date: '2024-10'
        },
        {
          title: '完成業務報價系統表單與 Table 開發',
          description:
            '完成業務報價系統表單邏輯，開發 Table 組件，整合即時品檢系統數據自訂刷新功能',
          date: '2024-10'
        }
      ]
    },
    {
      phase: '2024年11月',
      phaseTitle: '報價系統重構與金額計算',
      items: [
        {
          title: '實作業務報價系統金額計算邏輯',
          description:
            '建立廠內成型製程金額邏輯架構，完成複雜的金額運算系統，實現自動化成本計算',
          date: '2024-11'
        },
        {
          title: '重構報價系統以對應 API 資料結構',
          description:
            '因應 API 格式進行業務與廠內報價系統重構，調整 Table 與 Form 架構以符合後端資料結構',
          date: '2024-11'
        },
        {
          title: '完成 API 串接與動態表單功能',
          description:
            '完成業務報價系統 API 串接，開發動態表單功能，整合 Zod 表單驗證套件提升資料正確性',
          date: '2024-11'
        }
      ]
    },
    {
      phase: '2024年12月',
      phaseTitle: '報價系統優化與保養系統',
      items: [
        {
          title: '優化報價系統驗證與使用者體驗',
          description:
            '完成業務報價系統測試，加入優雅動畫效果，實作即時驗證反饋與錯誤原因顯示功能',
          date: '2024-12'
        },
        {
          title: '整合業務與廠內報價 API 系統',
          description:
            '重構整合業務報價與廠內報價 API，優化 API 請求次數，完善產品詳情補充功能',
          date: '2024-12'
        },
        {
          title: '開發機台與模具保養維護系統',
          description:
            '建立保養系統 header 時間機台選擇 UI，設定 Table 外部函數連接，完成機台與模具保養功能',
          date: '2024-12'
        }
      ]
    },
    {
      phase: '2025年1月',
      phaseTitle: '智慧成本表與數據網格優化',
      items: [
        {
          title: '開發智慧成本表 Table 設計與 API 串接',
          description:
            '設計智慧成本 Table 架構，完成 API 串接，修正後端更新的 ID 問題確保資料同步',
          date: '2025-01'
        },
        {
          title: '優化 ReceiptTable getRowId 處理邏輯',
          description:
            '修正 ReceiptTable 的 getRowId 邏輯以處理父子行結構，更新多重搜尋配置與排序參數',
          date: '2025-01'
        }
      ]
    },
    {
      phase: '2025年2月',
      phaseTitle: 'WiseScheduling 智慧排程系統啟動',
      items: [
        {
          title: '建立 WiseScheduling 頁面與機台狀態板',
          description:
            '開發 WiseScheduling 頁面架構，實作互動式機台狀態管理與動態狀態追蹤功能',
          date: '2025-02'
        },
        {
          title: '重構機台狀態組件與表單驗證架構',
          description:
            '重構 WiseScheduling 機台狀態組件，改進表單驗證與 schema 處理，優化組件結構與樣式',
          date: '2025-02'
        },
        {
          title: '新增時間軸甘特圖實現排程可視化',
          description:
            '開發時間軸甘特圖功能，實現生產排程可視化，重構 MachineSelect 組件優化機台狀態管理',
          date: '2025-02'
        }
      ]
    },
    {
      phase: '2025年3月',
      phaseTitle: 'WiseScheduling API 服務與表單系統',
      items: [
        {
          title: '完成 WiseScheduling 服務層 API 實現',
          description:
            '實作 WiseScheduling API 服務模組，建立機台狀態 API 架構，完成表單驗證邏輯',
          date: '2025-03'
        },
        {
          title: '重構機台狀態管理模組與驗證邏輯',
          description:
            '優化機台狀態管理組件結構，重構表單處理邏輯，統一狀態管理與常量驗證架構',
          date: '2025-03'
        },
        {
          title: '重構維護系統表單與狀態處理',
          description:
            '重構維護系統表單組件，增強表單處理邏輯與狀態管理，更新狀態組件路徑結構',
          date: '2025-03'
        }
      ]
    },
    {
      phase: '2025年4月',
      phaseTitle: 'UI 優化與生產詳情頁面改進',
      items: [
        {
          title: '修正 ReceiptTable 與 DataGrid 樣式',
          description:
            '修正 ReceiptTable 標題與資料對齊問題，關閉虛擬化功能，改善 DataGrid 背景色與滾動條外觀',
          date: '2025-04'
        },
        {
          title: '優化生產詳情頁面樣式與互動',
          description:
            '更新生產詳情頁面樣式，調整按鈕與表格顯示，提升頁面視覺一致性與使用者體驗',
          date: '2025-04'
        },
        {
          title: '新增自訂 Hooks 與數據處理函數',
          description:
            '為生產詳情頁面新增自訂 Hooks，完善數據處理函數，調整按鈕結構增強可用性',
          date: '2025-04'
        }
      ]
    },
    {
      phase: '2025年5月',
      phaseTitle: 'Timeline 動態排程系統重構',
      items: [
        {
          title: '重構 DynamicTimeline 組件與 Hooks',
          description:
            '重構 DynamicTimeline 組件架構，開發新的 Timeline 管理 hooks，改進資料處理邏輯',
          date: '2025-05'
        },
        {
          title: '優化排程服務與錯誤處理機制',
          description:
            '移除智能排程服務過濾條件，優化排程數據處理邏輯，提升錯誤處理與資料轉換能力',
          date: '2025-05'
        },
        {
          title: '實作嚴謹狀態轉換驗證系統',
          description:
            '更新狀態術語從「製立單」改為「製令單」，實作嚴謹的狀態轉換驗證，重構排程組件與工具函數',
          date: '2025-05'
        }
      ]
    },
    {
      phase: '2025年6月',
      phaseTitle: '製造監控 API 服務整合',
      items: [
        {
          title: '實作製造現場即時監控 API 服務',
          description:
            '開發 Manufacturing Live Monitor API 服務，整合 Claude AI 指令，增強 OEE 監控功能',
          date: '2025-06'
        },
        {
          title: '整合即時機台數據與移除 Mock 資料',
          description:
            '整合即時機台數據至系統，移除 Mock 資料，將真實 API 數據整合至 RealTimeOEEMonitor 儀表板',
          date: '2025-06'
        },
        {
          title: '重構儀表板組件與數據處理',
          description:
            '重構儀表板組件改善數據處理，實作生產區域模板，增強 OEE 儀表板功能與視覺呈現',
          date: '2025-06'
        }
      ]
    },
    {
      phase: '2025年7月',
      phaseTitle: '系統優化與樣式統一',
      items: [
        {
          title: '整合即時 API 數據與生產區域模板',
          description:
            '將即時 API 數據整合至監控儀表板，實作生產區域模板功能，完善 OEE 分析系統',
          date: '2025-07'
        },
        {
          title: '優化 ProductionRecord UI 與組件樣式',
          description:
            '強化 ProductionRecord UI 樣式與佈局，提取 QMS Action 組件樣式，統一程式碼格式標準',
          date: '2025-07'
        },
        {
          title: '重構 API 服務層與優化 UI 組件',
          description:
            '全面重構 API 服務層架構，優化 UI 組件效能，更新機台狀態映射邏輯並移除 debug logs',
          date: '2025-07'
        }
      ]
    }
  ]

  const techStack = [
    'React 18',
    'TypeScript',
    'React Router',
    'Redux Toolkit',
    'Styled Components',
    'Material-UI',
    'Ant Design',
    'React Query',
    'React Hook Form',
    'Zod',
    'Vis-timeline',
    'Recharts',
    'Day.js',
    'Zustand'
  ]

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
            開發歷程
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
            專案簡介
          </Typography>
          <Typography
            variant='body1'
            sx={{ color: colors.text.primary }}
            paragraph
          >
            TIIP 模具產業高階製造系統開發歷程，記錄從 2024 年 8 月至 2025 年 7
            月的完整開發過程。
            涵蓋材料管理、品保系統、智慧成本分析、業務報價系統、機台保養維護、
            WiseScheduling 智慧排程、製造監控中心等核心功能模組。
          </Typography>
          <Typography
            variant='body1'
            sx={{ color: colors.text.primary }}
          >
            開發過程從基礎 CRUD 功能建立，逐步演進至複雜的排程可視化、即時監控與
            API 整合。
            採用 React 生態系統、Material-UI、Redux Toolkit、Zod
            驗證等現代化技術棧，
            注重程式碼品質、組件重用性與系統可維護性，實現工業級前端應用開發標準。
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
            技術棧
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

