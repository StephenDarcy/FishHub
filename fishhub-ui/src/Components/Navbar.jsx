import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu as MenuIcon } from "react-icons/hi";
import { IoMdClose as CloseIcon } from "react-icons/io";
import { SidebarData as SidebarItems } from "../Data/SidebarData";
import { FaRegUserCircle as AccountIcon } from "react-icons/fa";
import BootstrapNavbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import "../Styles/Navbar.css";
import logo from "../Images/logo-transparent.png";

function Navbar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <BootstrapNavbar className="navbar">
        <Container fluid>
          <MenuIcon onClick={handleShow} size="30" />
          <BootstrapNavbar.Brand>
            <Link to="/">
              <img src={logo} alt="FishHub" className="logo" />
            </Link>
          </BootstrapNavbar.Brand>
          <Link to="/login">
            <AccountIcon size="30" />
          </Link>
          <Offcanvas show={show} start className="sidebar">
            <Offcanvas.Header>
              <CloseIcon className="icon" size="30" onClick={handleClose} />
            </Offcanvas.Header>
            <Offcanvas.Body>
              {SidebarItems.map((item, index) => {
                return (
                  <li key={index} className={item.class}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.sidebarItem}</span>
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
