import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Topbar from "./components/Global/Topbar";
import Sidebar from "./components/Global/Sidebar";
import ProductionSchedulePage from "./pages/ProductionSchedulePage";
import MachineSelectPage from "./pages/MachineSelectPage";
import ProductionAssignmentPage from "./pages/ProductionAssignmentPage";
import LeaderSignPage from "./pages/LeaderSignPage";
import ProductionDetailPage from "./pages/ProductionDetailPage";
import OperatorSignPage from "./pages/OperatorSignPage";
import ProductionInspectionPage from "./pages/ProductionInspectionPage";
import LoginPage from "./pages/LoginPage";
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
                path={"/MachineSelectPage"}
                element={<MachineSelectPage />}
              />
              <Route
                path={"/ProductionAssignmentPage"}
                element={<ProductionAssignmentPage />}
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
            </Routes>
          </div>
        </Layout>
      </Layout>
    </>
  );
};

export default App;
