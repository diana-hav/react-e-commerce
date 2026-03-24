import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import GlobalContext from "./components/GlobalContext/GlobalContext";

import "./assets/css/main.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalContext>
      <HashRouter>
        <App />
      </HashRouter>
    </GlobalContext>
  </React.StrictMode>
);
