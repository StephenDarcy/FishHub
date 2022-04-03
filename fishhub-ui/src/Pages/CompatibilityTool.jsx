import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import "../Styles/CompatibilityTool.css";
import DisplayFish from "../Components/DisplayFish";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SearchDialog from "../Components/SearchDialog";

export default function CompatibilityTool() {
  const [firstFish, setFirstFish] = useState("");
  const [secondFish, setSecondFish] = useState("");

  function handleFirst(scientificName) {
    setFirstFish(scientificName);
  }

  function handleSecond(scientificName) {
    setSecondFish(scientificName);
  }

  console.log(firstFish, secondFish);
  return (
    <Container className="compatibility-container">
      <Row>
        <h1>Fish Comparison</h1>
        <h2>Check the compatibility of fish based on water parameters</h2>
      </Row>
      <Row className="profile-row">
        <Col className="profile-col">
          <DisplayFish number={1} species={firstFish} />
        </Col>
        <Col className="profile-col">
          <DisplayFish number={2} species={secondFish} />
        </Col>
      </Row>
      <Row>
        <Col className="profile-col">
          <SearchDialog number={1} setFish={handleFirst} />
        </Col>
        <Col className="profile-col">
          <SearchDialog number={2} setFish={handleSecond} />
        </Col>
      </Row>
      <Row>
        <h2>Select two species of fish to compare their compatibility</h2>
      </Row>
    </Container>
  );
}
