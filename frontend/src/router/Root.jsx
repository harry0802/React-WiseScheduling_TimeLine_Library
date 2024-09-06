import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layout/Layout";
import { Layout as AntLayout } from "antd";
import PigHouseInventory from "../pages/PigHouseInventory";

const RootLayout = () => (
  <Layout>
    <Layout.Sider />
    <AntLayout>
      <Layout.Header />
      <Layout.Content />
      <Layout.Footer />
    </AntLayout>
  </Layout>
);

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <div>Hello world!</div>,
      },
      {
        path: "pig-house-inventory",
        element: <PigHouseInventory />,
      },
      // 其他路由可以在這裡添加
    ],
  },
]);

function Root() {
  return <RouterProvider router={router} />;
}

export default Root;
