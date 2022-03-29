import React from "react";
import "./Styles/App.css";
import { Auth } from "./Context/Auth";
import WebsiteRoutes from "./Components/WebsiteRoutes";

function App() {
  return (
    <Auth>
      <WebsiteRoutes />
    </Auth>
  );
}

export default App;
