import { useState, useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import styles from './styles.module.css'
import DashboardEntryCar from './DashboardEntryCar'

//! =============== 1. 設定與常量 ===============
//* 定義系統模組及其配置
const SYSTEM_MODULES = [
  {
    id: 'realtime-oee',
    title: 'OEE 即時監控',
    description: '即時監控生產線效率，包含設備運作狀態、產能以及良率指標',
    icon: 'dashboard',
    path: '/RealTimeOEEMonitor',
    color: 'rgba(0, 123, 255, 0.85)',
    stats: { value: '87.2%', trend: 'up', change: '2.4%' }
  },
  {
    id: 'production-progress',
    title: '生產進度追蹤',
    description: '監控各產線生產進度，提供工單達成率、實際生產數量與計劃比較',
    icon: 'trending_up',
    path: '/ProductionProgressTracker',
    color: 'rgba(40, 167, 69, 0.85)',
    stats: { value: '94.5%', trend: 'up', change: '3.7%' }
  },
  {
    id: 'delivery-trend',
    title: '交貨趨勢分析',
    description: '分析出貨數據趨勢，預測未來產能需求及規劃',
    icon: 'assessment',
    path: '/DeliveryTrendAnalyzer',
    color: 'rgba(255, 193, 7, 0.85)',
    stats: { value: '98.3%', trend: 'stable', change: '0.2%' }
  },
  {
    id: 'oee-insight',
    title: 'OEE 深度分析',
    description: '深入分析設備OEE指標，找出瓶頸及改善方向',
    icon: 'insights',
    path: '/OEEInsightSystem',
    color: 'rgba(220, 53, 69, 0.85)',
    stats: { value: '76.8%', trend: 'down', change: '1.5%' }
  }
]

/**
 * @function ManufacturingLiveMonitor
 * @description 製造監控系統的主要入口頁面，提供各模組的卡片導航
 * @returns {JSX.Element} 渲染的模組導航頁或子路由內容
 */
function DashboardEntry() {
  const navigate = useNavigate()
  const location = useLocation()
  const [showDashboard, setShowDashboard] = useState(true)
  const [systemStatus, setSystemStatus] = useState({
    lastUpdate: new Date().toLocaleString(),
    activeLines: 12,
    alertCount: 3,
    systemHealth: '98.7%'
  })

  // 🧠 根據當前路徑判斷是否顯示儀表板
  useEffect(() => {
    // 如果路徑正好是製造監控首頁，顯示儀表板
    setShowDashboard(location.pathname === '/ManufacturingLiveMonitor')

    // 系統狀態模擬更新
    const statusInterval = setInterval(() => {
      setSystemStatus((prev) => ({
        ...prev,
        lastUpdate: new Date().toLocaleString(),
        alertCount: Math.floor(Math.random() * 5),
        systemHealth: (97 + Math.random() * 3).toFixed(1) + '%'
      }))
    }, 15000)

    return () => clearInterval(statusInterval)
  }, [location.pathname])

  /**
   * 處理模組卡片點擊
   * @param {string} path - 目標路徑
   */
  const handleModuleClick = (path) => {
    navigate(path)
  }

  /**
   * 返回儀表板
   */
  const handleBackToDashboard = () => {
    navigate('/ManufacturingLiveMonitor')
  }

  return (
    <div className={styles.container}>
      {showDashboard ? (
        <>
          <header className={styles.header}>
            <h1 className={styles.title}>製造監控中心</h1>
            <div className={styles.systemInfo}>
              <div className={styles.statusItem}>
                <span className={styles.statusLabel}>最後更新</span>
                <span className={styles.statusValue}>
                  {systemStatus.lastUpdate}
                </span>
              </div>
              <div className={styles.statusItem}>
                <span className={styles.statusLabel}>運行產線</span>
                <span className={styles.statusValue}>
                  {systemStatus.activeLines}
                </span>
              </div>
              <div className={styles.statusItem}>
                <span className={styles.statusLabel}>活動警報</span>
                <span className={styles.statusValue}>
                  {systemStatus.alertCount}
                </span>
              </div>
              <div className={styles.statusItem}>
                <span className={styles.statusLabel}>系統狀態</span>
                <span className={styles.statusValue}>
                  {systemStatus.systemHealth}
                </span>
              </div>
            </div>
          </header>

          <div className={styles.modulesGrid}>
            {SYSTEM_MODULES.map((module) => (
              <DashboardEntryCar
                key={module.id}
                title={module.title}
                description={module.description}
                icon={module.icon}
                color={module.color}
                stats={module.stats}
                onClick={() => handleModuleClick(module.path)}
              />
            ))}
          </div>

          <footer className={styles.footer}>
            <div className={styles.footerContent}>
              <p>© {new Date().getFullYear()} 製造智能監控系統 - v1.2.0</p>
              <div className={styles.footerLinks}>
                <a href='#help'>系統說明</a>
                <a href='#settings'>系統設定</a>
                <a href='#contact'>聯絡支援</a>
              </div>
            </div>
          </footer>
        </>
      ) : (
        <>
          <div className={styles.subpageHeader}>
            <button
              className={styles.backButton}
              onClick={handleBackToDashboard}
            >
              <span className={styles.backIcon}>arrow_back</span>
              返回儀表板
            </button>
            <div className={styles.compactStatus}>
              <div className={styles.statusDot}></div>
              系統正常運行中 | 最後更新: {systemStatus.lastUpdate}
            </div>
          </div>
          <div className={styles.outletContainer}>
            <Outlet />
          </div>
        </>
      )}
    </div>
  )
}

export default DashboardEntry

