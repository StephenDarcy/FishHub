import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu as MenuIcon } from "react-icons/hi";
import { IoMdClose as CloseIcon } from "react-icons/io";
import { SidebarData as SidebarItems } from "../Data/SidebarData";
import { FaRegUserCircle as AccountIcon } from "react-icons/fa";
import BootstrapNavbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import "../Styles/Navbar.css";
import logo from "../Images/logo-transparent-blue.png";
import logoWhite from "../Images/logo-transparent-white.png";
import AuthContext from "../Context/Auth";

function Navbar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { loggedIn } = useContext(AuthContext);

  return (
    <>
      <BootstrapNavbar className="navbar">
        <Container fluid>
          <MenuIcon className="icon" onClick={handleShow} size="30" />
          <BootstrapNavbar.Brand>
            <Link to="/">
              <img src={logo} alt="FishHub" className="logo" />
            </Link>
          </BootstrapNavbar.Brand>
          {loggedIn === false && (
            <>
              <Link to="/login">
                <h2>Login</h2>
              </Link>
              <Link to="/signup">
                <h2>Register</h2>
              </Link>
            </>
          )}
          {loggedIn === true && <AccountIcon className="icon" size="30" />}

          <Offcanvas show={show} start className="sidebar">
            <Offcanvas.Header>
              <CloseIcon
                className="icon-close"
                size="30"
                onClick={handleClose}
              />
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Link to="/" onClick={handleClose}>
                <img src={logoWhite} alt="FishHub" className="sidebar-logo" />
              </Link>
              {SidebarItems.map((item, index) => {
                return (
                  <li key={index} className={item.class}>
                    <Link to={item.path}>
                      {item.icon}
                      <span className="icon-span">{item.sidebarItem}</span>
                    </Link>
                  </li>
                );
              })}
            </Offcanvas.Body>
          </Offcanvas>
        </Container>
      </BootstrapNavbar>
    </>
  );
}

export default Navbar;
