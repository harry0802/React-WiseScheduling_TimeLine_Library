import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/reset.css"; // 引入 Reset CSS
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./i18n/i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
