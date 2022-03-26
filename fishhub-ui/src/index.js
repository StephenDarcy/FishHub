import React from "react";
import ReactDOM from "react-dom";
import "./Styles/index.css";
import App from "./App.jsx";
import { CookiesProvider } from "react-cookie";

ReactDOM.render(
  <CookiesProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </CookiesProvider>,
  document.getElementById("root")
);
