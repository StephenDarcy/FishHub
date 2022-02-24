import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Search from "../Components/Search";
import React from "react";
import "../Styles/Home.css";

function Home() {
  return (
    <Container fluid>
      <Row>
        <Search />
      </Row>
      <Row>
        <div className="footer"></div>
      </Row>
    </Container>
  );
}
export default Home;
