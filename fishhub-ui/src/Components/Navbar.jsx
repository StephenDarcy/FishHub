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

function Navbar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <BootstrapNavbar className="navbar">
        <Container fluid>
          <MenuIcon onClick={handleShow} />
          <BootstrapNavbar.Brand href="">FishHub</BootstrapNavbar.Brand>
          <Link to="/login">
            <AccountIcon />
          </Link>
          <Offcanvas show={show} start className="sidebar">
            <Offcanvas.Header>
              <CloseIcon onClick={handleClose} />
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
