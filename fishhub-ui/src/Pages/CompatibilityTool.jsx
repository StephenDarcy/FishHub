import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import "../Styles/CompatibilityTool.css";
import DisplayFish from "../Components/DisplayFish";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SearchDialog from "../Components/SearchDialog";
import CompatibilityCalculator from "../Components/CompatibilityCalculator";

export default function CompatibilityTool() {
  const [firstFish, setFirstFish] = useState("");
  const [secondFish, setSecondFish] = useState("");
  const [firstFishData, setFirstFishData] = useState();
  const [secondFishData, setSecondFishData] = useState();

  function handleFirst(scientificName) {
    setFirstFish(scientificName);
  }

  function handleSecond(scientificName) {
    setSecondFish(scientificName);
  }

  function handleFirstData(data) {
    setFirstFishData(data);
  }

  function handleSecondData(data) {
    setSecondFishData(data);
  }
  return (
    <Container className="compatibility-container">
      <Row>
        <h1 style={{ color: "#0d6efd" }}>Fish Comparison</h1>
        <h2 style={{ color: "#0d6efd" }}>
          Check the compatibility of fish based on water parameters
        </h2>
      </Row>
      <Row className="profile-row" xs={1} md={2}>
        <Col className="profile-col">
          <DisplayFish
            number={1}
            species={firstFish}
            setData={handleFirstData}
          />
        </Col>
        <Col className="profile-col">
          <DisplayFish
            number={2}
            species={secondFish}
            setData={handleSecondData}
          />
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
        {firstFish && secondFish ? (
          <CompatibilityCalculator
            first={firstFishData}
            second={secondFishData}
          />
        ) : (
          <h2 style={{ color: "#0d6efd" }}>
            Select two species of fish to compare their compatibility
          </h2>
        )}
      </Row>
    </Container>
  );
}
