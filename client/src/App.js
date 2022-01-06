import React from "react";
import "./Styles/App.css";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import CompatibilityTool from "./Pages/CompatibilityTool";
import AdvancedSearch from "./Pages/AdvancedSearch";
import AquariumC02 from "./Pages/AquariumC02";
import AquariumSize from "./Pages/AquariumSize";
import Forums from "./Pages/Forums";
import SpeciesProfile from "./Pages/SpeciesProfile";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/compatibility" element={<CompatibilityTool />} />
          <Route path="/adv-search" element={<AdvancedSearch />} />
          <Route path="/c02" element={<AquariumC02 />} />
          <Route path="/size" element={<AquariumSize />} />
          <Route path="/forums" element={<Forums />} />
          <Route path="/species-profile" element={<SpeciesProfile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
