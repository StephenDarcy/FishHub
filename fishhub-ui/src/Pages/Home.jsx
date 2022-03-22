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
    </Container>
  );
}
export default Home;
