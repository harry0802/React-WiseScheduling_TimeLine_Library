import React from 'react';
import { Route, Routes  } from "react-router-dom";
import ProductionSchedulePage from "./pages/ProductionSchedulePage";
import LoginPage from "./pages/LoginPage";


const App = () => {
    return (
        <Routes>
            <Route path={"/"} element={<LoginPage />} />
          
            <Route path={"/ProductionSchedulePage"} element={<ProductionSchedulePage />} />

        </Routes>
    );
};

export default App;
