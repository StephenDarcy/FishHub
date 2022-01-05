import React from "react";
import { Link } from "react-router-dom";
import { HiMenu } from "react-icons/hi";

function Navbar() {
  return (
    <>
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <HiMenu />
        </Link>
      </div>
    </>
  );
}

export default Navbar;
