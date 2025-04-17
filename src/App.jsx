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

const DynamicTimeline = lazy(() => import('./components/timelineGantt'))
const QueryExample = lazy(() => import('./components/examples/QueryExample'))
const RealTimeOEEMonitor = lazy(() =>
  import(
    './components/ManufacturingLiveMonitor/feature/RealTimeOEEMonitor/index.jsx'
  )
)
const ProductionProgressTracker = lazy(() =>
  import(
    './components/ManufacturingLiveMonitor/feature/ProductionProgressTracker/index.jsx'
  )
)

const DeliveryTrendAnalyzer = lazy(() =>
  import(
    './components/ManufacturingLiveMonitor/feature/DeliveryTrendAnalyzer/index.jsx'
  )
)

const OEEInsightSystem = lazy(() =>
  import(
    './components/ManufacturingLiveMonitor/feature/OEEInsightSystem/index.jsx'
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
    path: 'ManufacturingLiveMonitor',
    element: <ManufacturingLiveMonitor />,
    errorElement: <ErrorPage />,
    children: [
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

