import React from "react";
import FishService from "../Services/FishService";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Scrollbars } from "react-custom-scrollbars-2";
import "../Styles/SpeciesProfile.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function SpeciesProfile() {
  const { Species } = useParams();
  const [data, setData] = useState();
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    fetchData();

    async function fetchData() {
      await FishService.getAllData(Species).then((response) => {
        setData(response);
        isLoading(false);
        console.log(response);
      });
    }
  }, [Species]);

  return (
    <Container className="species-profile">
      <Scrollbars
        style={{ height: "100%", width: "100%", border: "1px solid #151a24" }}
      >
        <h1 style={{ color: "#dcdcdc" }}>{Species}</h1>
        {loading ? (
          <p>loading</p>
        ) : (
          <>
            <img
              className="search-image"
              src={"http://localhost:6868/api/image/" + Species}
              alt="https://place-hold.it/300"
            ></img>
            <Row>
              <Col>
                <h2 className="pt-3">Countries</h2>
                {data.countries.map((object, index) => (
                  <>
                    <h5 className="pt-3" style={{ color: "white" }}>
                      Country {index + 1}
                    </h5>
                    <h6>Country: {object.country}</h6>
                    <h6>Status: {object.status}</h6>
                  </>
                ))}
                <h2 className="pt-3">Ecosystems</h2>
                {data.ecosystem.map((object, index) => (
                  <>
                    <h5 className="pt-3" style={{ color: "white" }}>
                      Ecosystem {index + 1}
                    </h5>
                    <h6>Ecosystem: {object.name}</h6>
                    <h6>Climate: {object.climate}</h6>
                    <h6>Type: {object.type}</h6>
                    <h6>Location: {object.location}</h6>
                    <h6>Water Type: {object.salinity}</h6>
                  </>
                ))}
              </Col>
              <Col>
                <h2 className="pt-3">Water Parameters</h2>
                {data.parameters.map((object) => (
                  <>
                    <h6>Minimum Temperature(C): {object.minTemp}</h6>
                    <h6>Maximum Temperature(C): {object.maxTemp}</h6>
                    <h6>dH: {object.maxDH}</h6>
                    <h6>
                      PH Range: {object.minPH} to {object.maxPH}
                    </h6>
                  </>
                ))}
                <h2 className="pt-3">Food</h2>
                {data.foodchain.map((object) => (
                  <>
                    <h6>Natural food: {object.foodText}</h6>
                    <h6>Trophic Level: {object.trophicLevel}</h6>
                  </>
                ))}
              </Col>
            </Row>
          </>
        )}
      </Scrollbars>
    </Container>
  );
}
