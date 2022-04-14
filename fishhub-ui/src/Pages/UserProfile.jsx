import React from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../Styles/UserProfile.css";
import Container from "react-bootstrap/Container";
import { MdEdit } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import EditProfile from "../Components/EditProfile";

export default function UserProfile() {
  return (
    <Container className="container">
      <Tab.Container className="tabbed-container" defaultActiveKey="first">
        <Row className="tabbed-container-row">
          <Col sm={3} className="left-pane">
            <Nav variant="tabs" className="flex-column left-nav">
              <Nav.Item
                className="nav-item"
                activeStyle={{ backgroundColor: "orange" }}
              >
                <Nav.Link className="nav-link" eventKey="first">
                  <Col sm={3}>
                    <MdEdit />
                  </Col>
                  <Col sm={9}>Edit Profile</Col>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="nav-item">
                <Nav.Link className="nav-link" eventKey="second">
                  <Col sm={3}>
                    <RiLockPasswordFill />
                  </Col>
                  <Col sm={9}>Change Password</Col>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9} className="right-pane">
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <EditProfile />
              </Tab.Pane>
              <Tab.Pane eventKey="second">test 2</Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}
