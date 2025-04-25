import { createHashRouter, RouterProvider } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import AppLayout from './layouts/AppLayout'
import ErrorBoundary from './components/ErrorBoundary'

import Home from './page/Home'
import Timeline from './page/Timeline'
import About from './page/About'
import Contact from './page/Contact'
import ErrorPage from './page/ErrorPage'
import LoadingSpinner from './components/LoadingSpinner'
import ManufacturingLiveMonitor from './components/ManufacturingLiveMonitor/index.jsx'
import LoadingWrapper from './components/ManufacturingLiveMonitor/components/Loading/index.jsx'
import DashboardEntry from './components/ManufacturingLiveMonitor/components/DashboardEntry/index.jsx'
// import FactoryPerformanceDashboard from './components/ManufacturingLiveMonitor/feature/FactoryPerformanceDashboard/Index.jsx'
/**
 * @function lazyLoad
 * @description 簡單的延遲載入輔助函數，帶有可選的回調機制和延遲時間
 * @param {Function} importFn - 組件的動態導入函數
 * @param {Function} callback - 載入完成後的回調函數 (可選)
 * @param {number} delay - 延遲時間(毫秒) (可選)
 * @returns {React.LazyExoticComponent} 延遲載入的組件
 */
const lazyLoad = (importFn, callback, delay = 1200) => {
  return lazy(() => {
    return new Promise((resolve) => {
      // 先延遲指定時間
      setTimeout(() => {
        // 然後執行實際的導入函數
        importFn().then((module) => {
          if (callback && typeof callback === 'function') {
            callback(module)
          }
          resolve(module)
        })
      }, delay)
    })
  })
}
const DynamicTimeline = lazyLoad(() => import('./components/timelineGantt'))
const QueryExample = lazyLoad(() =>
  import('./components/examples/QueryExample')
)
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

// 使用 HashRouter 代替 BrowserRouter
const router = createHashRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'timeline', element: <Timeline /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      {
        path: 'dynamic-timeline',
        element: (
          <Suspense fallback={<LoadingSpinner text='載入動態時間軸中...' />}>
            <DynamicTimeline />
          </Suspense>
        )
      },
      {
        path: 'query-example',
        element: (
          <Suspense fallback={<LoadingSpinner text='載入查詢範例中...' />}>
            <QueryExample />
          </Suspense>
        )
      },
      // 捕捉所有不匹配的路徑
      { path: '*', element: <ErrorPage /> }
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
          <ErrorBoundary>
            <Suspense
              fallback={
                <LoadingWrapper>載入製造現場即時監控中...</LoadingWrapper>
              }
            >
              <FactoryPerformanceDashboard />
            </Suspense>
          </ErrorBoundary>
        )
      },
      {
        // 預設路由
        path: 'RealTimeOEEMonitor',
        element: (
          //  使用 await 加上 setTimeout 來模擬載入時間
          <ErrorBoundary>
            <Suspense
              fallback={
                <LoadingWrapper>載入製造現場即時監控中...</LoadingWrapper>
              }
            >
              <RealTimeOEEMonitor />
            </Suspense>
          </ErrorBoundary>
        )
      },
      {
        path: 'ProductionProgressTracker',
        element: (
          <ErrorBoundary>
            <Suspense
              fallback={
                <LoadingWrapper>載入製造現場即時監控中...</LoadingWrapper>
              }
            >
              <ProductionProgressTracker />
            </Suspense>
          </ErrorBoundary>
        )
      },
      {
        path: 'DeliveryTrendAnalyzer',
        element: (
          <ErrorBoundary>
            <Suspense
              fallback={
                <LoadingWrapper>載入製造現場即時監控中...</LoadingWrapper>
              }
            >
              <DeliveryTrendAnalyzer />
            </Suspense>
          </ErrorBoundary>
        )
      },
      {
        path: 'OEEInsightSystem',
        element: (
          <ErrorBoundary>
            <Suspense
              fallback={
                <LoadingWrapper>載入製造現場即時監控中...</LoadingWrapper>
              }
            >
              <OEEInsightSystem />
            </Suspense>
          </ErrorBoundary>
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

