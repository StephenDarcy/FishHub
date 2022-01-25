import React from "react";
import "./Styles/App.css";
import Navbar from "./Components/Navbar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import CompatibilityTool from "./Pages/CompatibilityTool.jsx";
import AdvancedSearch from "./Pages/AdvancedSearch.jsx";
import AquariumC02 from "./Pages/AquariumC02.jsx";
import AquariumSize from "./Pages/AquariumSize.jsx";
import Forums from "./Pages/Forums.jsx";
import SpeciesProfile from "./Pages/SpeciesProfile.jsx";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";

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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
