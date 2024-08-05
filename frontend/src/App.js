import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Topbar from "./components/Global/Topbar";
// import Sidebar from "./components/Global/Sidebar";
import ProductionSchedulePage from "./pages/ProductionSchedulePage";
import ImportProductionSchedulePage from "./pages/ImportProductionSchedulePage";
import MachineSelectPage from "./pages/MachineSelectPage";
import ProductionReportPage from "./pages/ProductionReportPage";
import LeaderSignPage from "./pages/LeaderSignPage";
import ProductionDetailPage from "./pages/ProductionDetailPage";
import OperatorSignPage from "./pages/OperatorSignPage";
import ProductionInspectionPage from "./pages/ProductionInspectionPage";
import LoginPage from "./pages/LoginPage";
import ProductionRecordPage from "./pages/ProductionRecordPage.jsx";

//  ProductionRecordPage - > PATH
import ProductionRecordHome from "./components/ProductionRecord/features/ProductionRecordHome/ProductionRecordHome.jsx";
import ProductionRecordAddInfo from "./components/ProductionRecord/features/ProductionRecordAddInfo/ProductionRecordAddInfo.jsx";
import ProductionRecordProcMaterials from "./components/ProductionRecord/features/ProductionRecordProcMaterials/ProductionRecordProcMaterials.jsx";
import ProductionRecordinventoryManagement from "./components/ProductionRecord/features/ProductionRecordinventoryManagement/ProductionRecordinventoryManagement.jsx";

// context
import { RecordAddInfoProvider } from "./components/ProductionRecord/context/RecordAddInfoProvider.jsx";
import { ProcMaterialsProvider } from "./components/ProductionRecord/context/ProcMaterialsProvider.jsx";

import "./App.scss";
import { Layout } from "antd";

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Layout>
        {/* <Sidebar collapsed={collapsed} /> */}
        <Layout>
          <Topbar collapsed={collapsed} setCollapsed={setCollapsed} />
          <div className="container">
            <Routes>
              <Route path={"/"} element={<LoginPage />} />
              <Route
                path={"/ProductionSchedulePage"}
                element={<ProductionSchedulePage />}
              />
              <Route
                path={"/ImportProductionSchedulePage"}
                element={<ImportProductionSchedulePage />}
              />
              <Route
                path={"/MachineSelectPage"}
                element={<MachineSelectPage />}
              />
              <Route
                path={"/ProductionReportPage"}
                element={<ProductionReportPage />}
              />
              <Route path={"/LeaderSignPage"} element={<LeaderSignPage />} />
              <Route
                path={"/ProductionDetailPage"}
                element={<ProductionDetailPage />}
              />
              <Route
                path={"/OperatorSignPage"}
                element={<OperatorSignPage />}
              />
              <Route
                path={"/ProductionInspectionPage"}
                element={<ProductionInspectionPage />}
              />

              {/* ProductionRecordPage start */}
              <Route
                path={"/ProductionRecordPage"}
                element={<ProductionRecordPage />}
              >
                <Route index element={<ProductionRecordHome />} />
                <Route
                  path="addProductInfo"
                  element={
                    <RecordAddInfoProvider>
                      <ProductionRecordAddInfo />
                    </RecordAddInfoProvider>
                  }
                />
                <Route
                  path="procMaterials"
                  element={
                    <ProcMaterialsProvider>
                      <ProductionRecordProcMaterials />
                    </ProcMaterialsProvider>
                  }
                />
                <Route
                  path="inventoryManagement"
                  element={<ProductionRecordinventoryManagement />}
                />
              </Route>
              {/* ProductionRecordPage end */}
            </Routes>
          </div>
        </Layout>
      </Layout>
    </>
  );
};

export default App;
