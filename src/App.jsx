import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import AppLayout from "./layouts/AppLayout";
import Home from "./page/Home";
import Timeline from "./page/Timeline";
import About from "./page/About";
import Contact from "./page/Contact";
import ErrorPage from "./page/ErrorPage";
import LoadingSpinner from "./components/LoadingSpinner";

// 使用 React.lazy 懶加載大型元件
const Slider = lazy(() => import("./page/Slider"));
const DynamicTimeline = lazy(() => import("./components/timelineGantt"));
const QueryExample = lazy(() => import("./components/examples/QueryExample"));

// 創建路由配置
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "timeline", element: <Timeline /> },
      {
        path: "slider",
        element: (
          <Suspense fallback={<LoadingSpinner text="載入數據滑動器中..." />}>
            <Slider />
          </Suspense>
        ),
      },
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
      // 捕捉所有不匹配的路徑
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
