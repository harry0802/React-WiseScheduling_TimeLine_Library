import React from 'react';
import { Route, Routes  } from "react-router-dom";
import ProductionSchedulePage from "./pages/ProductionSchedulePage";
import ProductionAssignmentPage from "./pages/ProductionAssignmentPage";
// import SimpleDemo from "./components/ProductionSchedule/SimpleDemo";
import LoginPage from "./pages/LoginPage";


const App = () => {
    return (
        <>
            <div className='container'>
                <Routes>
                    <Route path={"/"} element={<LoginPage />} />
                
                    <Route path={"/ProductionSchedulePage"} element={<ProductionSchedulePage />} />
                    <Route path={"/ProductionAssignmentPage"} element={<ProductionAssignmentPage />} />
                    {/* <Route path={"/SimpleDemo"} element={<SimpleDemo />} /> */}

                </Routes>
            </div>
        </>
        
    );
};

export default App;
