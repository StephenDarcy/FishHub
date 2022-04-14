import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiMenu as MenuIcon } from "react-icons/hi";
import { IoMdClose as CloseIcon } from "react-icons/io";
import { SidebarData as SidebarItems } from "../Data/SidebarData";
import BootstrapNavbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import "../Styles/Navbar.css";
import logoWhite from "../Images/logo-transparent-white.png";
import AuthContext from "../Context/Auth";
import LogOut from "./LogOut";
import UserService from "../Services/UserService";
import Avatar from "@mui/material/Avatar";
import SampleUserImg from "../Images/sample-user.png";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import FishHubLogo from "./FishHubLogo";

function Navbar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { loggedIn } = useContext(AuthContext);
  const [userID, setUserID] = useState();
  const [imgSrc, setImgSrc] = useState();

  // sends a request to server with JWT cookie and gets userID back
  useEffect(() => {
    UserService.getID().then((response) => {
      setUserID(response.data);
    });

    async function getUser() {
      await UserService.get().then((response) => {
        setImgSrc(response.data.avatar);
      });
    }

    getUser();
  }, []);

  let getImage = () => {
    if (imgSrc) {
      return `data:image/png;base64,${imgSrc}`;
    } else {
      return SampleUserImg;
    }
  };

  return (
    <>
      <BootstrapNavbar className="navbar">
        <Container style={{ backgroundColor: "#1a1a1b" }}>
          <Col>
            <MenuIcon className="icon" onClick={handleShow} size="30" />
          </Col>
          <Col xs={6} md={8}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <FishHubLogo></FishHubLogo>
            </Link>
          </Col>
          <Col style={{ textAlign: "center" }}>
            {loggedIn === false && (
              <Row>
                <Col xs={6} style={{ paddingTop: 8 }}>
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    <h6 style={{ fontSize: "2vw" }}>Login</h6>
                  </Link>
                </Col>
                <Col xs={6} style={{ paddingTop: 8 }}>
                  <Link to="/signup" style={{ textDecoration: "none" }}>
                    <h6 style={{ fontSize: "2vw" }}>Register</h6>
                  </Link>
                </Col>
              </Row>
            )}
            {loggedIn === true && (
              <Row>
                <Col xs={6} style={{ padding: 0 }}>
                  <Link
                    to={"/profile/" + userID}
                    style={{ textDecoration: "none" }}
                  >
                    <Avatar
                      className="icon"
                      src={getImage()}
                      alt="User"
                      sx={{
                        width: 35,
                        height: 35,
                        border: "2px solid #0d6efd",
                        float: "right",
                      }}
                    />
                  </Link>
                </Col>
                <Col xs={6} style={{ padding: 0 }}>
                  <LogOut />
                </Col>
              </Row>
            )}
          </Col>

          <Offcanvas show={show} start className="sidebar">
            <Offcanvas.Header>
              <CloseIcon
                className="icon-close"
                size="30"
                onClick={handleClose}
              />
            </Offcanvas.Header>
            <Offcanvas.Body className="sidebar-body">
              <Link to="/" onClick={handleClose}>
                <img src={logoWhite} alt="FishHub" className="sidebar-logo" />
              </Link>
              {SidebarItems.map((item, index) => {
                return (
                  <li key={index} className={item.class}>
                    <Link to={item.path} onClick={handleClose}>
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
