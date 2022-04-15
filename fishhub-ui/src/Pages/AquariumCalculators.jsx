import React from "react";
import "../Styles/AquariumCalculators.css";
import Row from "react-bootstrap/Row";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Container from "react-bootstrap/Container";
import { BsFillCalculatorFill } from "react-icons/bs";
import RectangularCalculator from "../Components/RectangularCalculator";
import CylindricalCalculator from "../Components/CylindricalCalculator";
import TempCalculator from "../Components/TempCalculator";
import CarbonateCalculator from "../Components/CarbonateCalculator";

export default function AquariumCalculators() {
  return (
    <Container className="p-5" style={{ textAlign: "center" }}>
      <Row>
        <h3 style={{ color: "#dcdcdc" }}>
          <BsFillCalculatorFill size={20} /> Calculators & Unit Conversions For
          Your Aquarium
        </h3>
      </Row>

      <Tabs
        style={{
          border: 0,
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
        }}
        defaultActiveKey="Rectangular Aquarium"
        id="tab"
        className="mt-2"
      >
        <Tab
          tabClassName="tab"
          eventKey="Rectangular Aquarium"
          title="Rectangular Aquarium"
        >
          <RectangularCalculator />
        </Tab>
        <Tab
          tabClassName="tab"
          eventKey="Cylindrical Aquarium"
          title="Cylindrical Aquarium"
        >
          <CylindricalCalculator />
        </Tab>
        <Tab
          tabClassName="tab"
          eventKey="Fahrenheit - Celsius"
          title="Fahrenheit - Celsius"
        >
          <TempCalculator />
        </Tab>
        <Tab
          tabClassName="tab"
          eventKey="Carbonate Hardness"
          title="Carbonate Hardness"
        >
          <CarbonateCalculator />
        </Tab>
      </Tabs>
    </Container>
  );
}
