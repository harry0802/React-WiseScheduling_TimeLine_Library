import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Layout from "../layout/Layout";
import { Layout as AntLayout } from "antd";

const RootLayout = () => (
  <>
    <Layout>
      <Layout.Sider />
      <AntLayout>
        <Layout.Header />
        <Layout.Content />
        <Layout.Footer />
      </AntLayout>
    </Layout>
  </>
);

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <div>Hello world!</div>,
      },
      // 其他路由可以在這裡添加
    ],
  },
]);

function Root() {
  return <RouterProvider router={router} />;
}

export default Root;
