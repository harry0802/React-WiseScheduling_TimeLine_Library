import React from 'react';
import { Route, Routes  } from "react-router-dom";
import ProductionSchedulePage from "./pages/ProductionSchedulePage";
// import SimpleDemo from "./components/ProductionSchedule/SimpleDemo";
import LoginPage from "./pages/LoginPage";


const App = () => {
    return (
        <Routes>
            <Route path={"/"} element={<LoginPage />} />
          
            <Route path={"/ProductionSchedulePage"} element={<ProductionSchedulePage />} />
            {/* <Route path={"/SimpleDemo"} element={<SimpleDemo />} /> */}

        </Routes>
    );
};

export default App;
