import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import AppLayout from "./layouts/AppLayout";
import FullScreenLayout from "./layouts/FullScreenLayout";
import Home from "./page/Home";
import Timeline from "./page/Timeline";
import About from "./page/About";
import Contact from "./page/Contact";
import ErrorPage from "./page/ErrorPage";
import LoadingSpinner from "./components/LoadingSpinner";
import { Loading } from "@iimm/data-view-react";
const DynamicTimeline = lazy(() => import("./components/timelineGantt"));
const QueryExample = lazy(() => import("./components/examples/QueryExample"));

const ManufacturingLiveMonitor = lazy(
  () =>
    new Promise((resolve) =>
      setTimeout(
        () => resolve(import("./components/ManufacturingLiveMonitor")),
        1500
      )
    )
);

// 創建路由配置
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Home /> },
        { path: "timeline", element: <Timeline /> },
        { path: "about", element: <About /> },
        { path: "contact", element: <Contact /> },
        {
          path: "dynamic-timeline",
          element: (
            <Suspense fallback={<LoadingSpinner text="載入動態時間軸中..." />}>
              <DynamicTimeline />
            </Suspense>
          ),
        },
        {
          path: "query-example",
          element: (
            <Suspense fallback={<LoadingSpinner text="載入查詢範例中..." />}>
              <QueryExample />
            </Suspense>
          ),
        },
        // 已移除全屏頁面到獨立路由
        // 捕捉所有不匹配的路徑
        { path: "*", element: <ErrorPage /> },
      ],
    },
    {
      // 全屏頁面使用隔離布局
      path: "/ManufacturingLiveMonitor",
      element: <FullScreenLayout />,
      children: [
        {
          // 預設路由
          index: true,
          element: (
            //  使用 await 加上 setTimeout 來模擬載入時間
            <Suspense fallback={<Loading>載入製造現場即時監控中...</Loading>}>
              <ManufacturingLiveMonitor />
            </Suspense>
          ),
        },
        // 未來可能的其他全屏頁面可在此添加
      ],
    },
  ],
  {
    basename: "/", // 明確指定使用根路徑，覆蓋package.json中的homepage設置
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
