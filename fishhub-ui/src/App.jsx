import React from "react";
import "./Styles/App.css";
import axios from "axios";
import { Auth } from "./Context/Auth";
import WebsiteRoutes from "./Components/WebsiteRoutes";

axios.defaults.withCredentials = true;

function App() {
  return (
    <Auth>
      <WebsiteRoutes />
    </Auth>
  );
}

export default App;
