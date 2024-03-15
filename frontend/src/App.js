import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductionSchedulePage from "./pages/ProductionSchedulePage";
import MachineSelectPage from "./pages/MachineSelectPage";
import ProductionAssignmentPage from "./pages/ProductionAssignmentPage";
import LeaderSignPage from "./pages/LeaderSignPage";
import ProductionDetailPage from "./pages/ProductionDetailPage";
import OperatorSignPage from "./pages/OperatorSignPage";
// import SimpleDemo from "./components/ProductionSchedule/SimpleDemo";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <>
      <div className="container">
        <Routes>
          <Route path={"/"} element={<LoginPage />} />
          <Route
            path={"/ProductionSchedulePage"}
            element={<ProductionSchedulePage />}
          />
          <Route path={"/MachineSelectPage"} element={<MachineSelectPage />} />
          <Route
            path={"/ProductionAssignmentPage"}
            element={<ProductionAssignmentPage />}
          />
          <Route path={"/LeaderSignPage"} element={<LeaderSignPage />} />
          <Route
            path={"/ProductionDetailPage"}
            element={<ProductionDetailPage />}
          />
          <Route path={"/OperatorSignPage"} element={<OperatorSignPage />} />
          {/* <Route path={"/SimpleDemo"} element={<SimpleDemo />} /> */}
        </Routes>
      </div>
    </>
  );
};

export default App;
