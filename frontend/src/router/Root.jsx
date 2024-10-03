import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layout/Layout";
import { Layout as AntLayout } from "antd";
import PigHouseInventory from "../pages/PigHouseInventory";
import SowBreedingRecords from "../pages/SowBreedingRecords";
import Boargenotype from "../pages/Boargenotype";
import CullingBoar from "../pages/CullingBoar";

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
      {
        path: "sow-breeding-records",
        element: <SowBreedingRecords />,
      },
      {
        path: "boar-genotype",
        element: <Boargenotype />,
      },
      {
        path: "culling-boar",
        element: <CullingBoar />,
      },
      {
        path: "*",
        element: <div>404 Not Found</div>,
      },
      // 其他路由可以在這裡添加
    ],
  },
]);

function Root() {
  return <RouterProvider router={router} />;
}

export default Root;
