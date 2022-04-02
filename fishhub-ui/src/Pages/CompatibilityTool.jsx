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
          <DisplayFish species={firstFish} />
        </Col>
        <Col className="profile-col">
          <DisplayFish species={secondFish} />
        </Col>
      </Row>
      <Row>
        <Col className="profile-col">
          <SearchDialog setFish={handleFirst} />
        </Col>
        <Col className="profile-col">
          <SearchDialog setFish={handleSecond} />
        </Col>
      </Row>
    </Container>
  );
}
