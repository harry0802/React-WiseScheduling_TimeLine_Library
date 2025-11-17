import { createHashRouter, RouterProvider } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import AppLayout from './layouts/AppLayout'
import PigSystemLayout from './layouts/PigSystemLayout'

// ⚡ 首頁和關鍵頁面使用 lazy load 減少初始 bundle
const Home = lazy(() => import('./page/Home'))
const Timeline = lazy(() => import('./page/Timeline'))
const About = lazy(() => import('./page/About'))
const Contact = lazy(() => import('./page/Contact'))
const ProjectShowcase = lazy(() => import('./page/ProjectShowcase'))
const DesignToken = lazy(() => import('./page/DesignToken'))
import ErrorPage from './page/ErrorPage' // ErrorPage 需要立即可用
// 養豬場管理系統頁面
import Boargenotype from './pages/Boargenotype'
import CullingBoar from './pages/CullingBoar'
import PigHouseInventory from './pages/PigHouseInventory'
import SowBreedingRecords from './pages/SowBreedingRecords'
import LoadingSpinner from './components/LoadingSpinner'
import ManufacturingLiveMonitor from './components/ManufacturingLiveMonitor/index.jsx'
import LoadingWrapper from './components/ManufacturingLiveMonitor/components/Loading/index.jsx'
import DashboardEntry from './components/ManufacturingLiveMonitor/components/DashboardEntry/index.jsx'
// import FactoryPerformanceDashboard from './components/ManufacturingLiveMonitor/feature/FactoryPerformanceDashboard/Index.jsx'
/**
 * @function lazyLoad
 * @description 簡單的延遲載入輔助函數，帶有可選的回調機制
 * ⚡ 移除人為延遲以提升載入效能
 * @param {Function} importFn - 組件的動態導入函數
 * @param {Function} callback - 載入完成後的回調函數 (可選)
 * @returns {React.LazyExoticComponent} 延遲載入的組件
 */
const lazyLoad = (importFn, callback) => {
  return lazy(() => {
    return importFn().then((module) => {
      if (callback && typeof callback === 'function') {
        callback(module)
      }
      return module
    })
  })
}
const DynamicTimeline = lazyLoad(() => import('./components/timelineGantt'))
const RealTimeOEEMonitor = lazyLoad(() =>
  import(
    './components/ManufacturingLiveMonitor/feature/RealTimeOEEMonitor/index.jsx'
  )
)
const ProductionProgressTracker = lazyLoad(() =>
  import(
    './components/ManufacturingLiveMonitor/feature/ProductionProgressTracker/index.jsx'
  )
)

const DeliveryTrendAnalyzer = lazyLoad(() =>
  import(
    './components/ManufacturingLiveMonitor/feature/DeliveryTrendAnalyzer/index.jsx'
  )
)

const OEEInsightSystem = lazyLoad(() =>
  import(
    './components/ManufacturingLiveMonitor/feature/OEEInsightSystem/index.jsx'
  )
)
const FactoryPerformanceDashboard = lazyLoad(() =>
  import(
    './components/ManufacturingLiveMonitor/feature/FactoryPerformanceDashboard/Index.jsx'
  )
)

const WiseScheduling = lazyLoad(() =>
  import('./components/WiseScheduling/components/schedule/index.jsx')
)

// 使用 HashRouter 代替 BrowserRouter
const router = createHashRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Home />
          </Suspense>
        )
      },
      {
        path: 'timeline',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Timeline />
          </Suspense>
        )
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <About />
          </Suspense>
        )
      },
      {
        path: 'contact',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Contact />
          </Suspense>
        )
      },
      {
        path: 'project-showcase',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ProjectShowcase />
          </Suspense>
        )
      },
      {
        path: 'design-token',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <DesignToken />
          </Suspense>
        )
      },
      {
        path: 'dynamic-timeline',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <DynamicTimeline />
          </Suspense>
        )
      },
      {
        path: 'wise-scheduling',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <WiseScheduling />
          </Suspense>
        )
      },
      // 捕捉所有不匹配的路徑
      { path: '*', element: <ErrorPage /> }
    ]
  },
  {
    element: <PigSystemLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: 'boargenotype', element: <Boargenotype /> },
      { path: 'culling-boar', element: <CullingBoar /> },
      { path: 'pig-house-inventory', element: <PigHouseInventory /> },
      { path: 'sow-breeding-records', element: <SowBreedingRecords /> }
    ]
  },
  {
    element: <ManufacturingLiveMonitor />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: 'ManufacturingLiveMonitor',
        element: <DashboardEntry />
      },
      {
        path: 'FactoryPerformanceDashboard',
        element: (
          <Suspense
            fallback={
              <LoadingWrapper>載入製造現場即時監控中...</LoadingWrapper>
            }
          >
            <FactoryPerformanceDashboard />
          </Suspense>
        )
      },
      {
        // 預設路由
        path: 'RealTimeOEEMonitor',
        element: (
          //  使用 await 加上 setTimeout 來模擬載入時間

          <Suspense
            fallback={
              <LoadingWrapper>載入製造現場即時監控中...</LoadingWrapper>
            }
          >
            <RealTimeOEEMonitor />
          </Suspense>
        )
      },
      {
        path: 'ProductionProgressTracker',
        element: (
          <Suspense
            fallback={
              <LoadingWrapper>載入製造現場即時監控中...</LoadingWrapper>
            }
          >
            <ProductionProgressTracker />
          </Suspense>
        )
      },
      {
        path: 'DeliveryTrendAnalyzer',
        element: (
          <Suspense
            fallback={
              <LoadingWrapper>載入製造現場即時監控中...</LoadingWrapper>
            }
          >
            <DeliveryTrendAnalyzer />
          </Suspense>
        )
      },
      {
        path: 'OEEInsightSystem',
        element: (
          <Suspense
            fallback={
              <LoadingWrapper>載入製造現場即時監控中...</LoadingWrapper>
            }
          >
            <OEEInsightSystem />
          </Suspense>
        )
      }
      // 未來可能的其他全屏頁面可在此添加
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App

