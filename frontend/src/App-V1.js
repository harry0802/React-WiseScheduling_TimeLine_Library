import React from "react";
import { useRoutes } from "react-router-dom";
import routeConfig from "./router/routeConfig";
import "./App.scss";

const App = () => {
  const routes = useRoutes(routeConfig);
  return routes;
};

export default App;
