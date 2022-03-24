import React, { useContext } from "react";
import UserProfile from "../Pages/UserProfile";
import LogOut from "./LogOut";
import Navbar from "./Navbar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home.jsx";
import CompatibilityTool from "../Pages/CompatibilityTool.jsx";
import AdvancedSearch from "../Pages/AdvancedSearch.jsx";
import AquariumC02 from "../Pages/AquariumC02.jsx";
import AquariumSize from "../Pages/AquariumSize.jsx";
import Forums from "../Pages/Forums.jsx";
import SpeciesProfile from "../Pages/SpeciesProfile.jsx";
import ErrorPage from "../Pages/ErrorPage.jsx";
import Login from "../Pages/Login.jsx";
import Signup from "../Pages/Signup.jsx";
import AuthContext from "../Context/Auth";

export default function WebsiteRoutes() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Routes that require the user not to be signed in */}
        {loggedIn === false && (
          <>
            {" "}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}

        {/* Routes that require the user to be signed in */}
        {loggedIn === true && (
          <>
            <Route path="/profile/:id" element={<UserProfile />} />
            <LogOut />
          </>
        )}
        <Route exact path="/" element={<Home />} />
        <Route path="/compatibility" element={<CompatibilityTool />} />
        <Route path="/adv-search" element={<AdvancedSearch />} />
        <Route path="/c02" element={<AquariumC02 />} />
        <Route path="/size" element={<AquariumSize />} />
        <Route path="/forums" element={<Forums />} />
        <Route path=":Species" element={<SpeciesProfile />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}