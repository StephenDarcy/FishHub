import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/esm/Col";
import { useForm } from "react-hook-form";

export default function CarbonateCalculator() {
  const [ppm, setPpm] = useState(false);
  const [dKH, setDKH] = useState(false);
  const [ml, setMl] = useState(false);
  const [ppm2, setPpm2] = useState(false);
  const [dKH2, setDKH2] = useState(false);
  const [ml2, setMl2] = useState(false);
  const [complete, setComplete] = useState(false);
  const [total, setTotal] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    let value = watch("hardness");
    var input, output;

    if (ppm && !dKH && !ml) {
      input = "ppm";
    } else if (!ppm && dKH && !ml) {
      input = "dkh";
    } else if (!ppm && !dKH && ml) {
      input = "ml";
    }

    if (ppm2 && !dKH2 && !ml2) {
      output = "ppm";
    } else if (!ppm2 && dKH2 && !ml2) {
      output = "dkh";
    } else if (!ppm2 && !dKH2 && ml2) {
      output = "ml";
    }

    // ppm conversion
    if (input == "ppm" && output == "dkh") {
      convertPpmToDKH(value);
    } else if (input == "ppm" && output == "ml") {
      convertPpmToMl(value);
    }

    // dkh conversion
    if (input == "dkh" && output == "ppm") {
      convertDKHtoPpm(value);
    } else if (input == "dkh" && output == "ml") {
      convertDKHToMl(value);
    }

    // ml conversion
    if (input == "ml" && output == "dkh") {
      convertMlToDKH(value);
    } else if (input == "ml" && output == "ppm") {
      convertMltoPpm(value);
    }
  };

  // ppm conversions //works
  const convertPpmToDKH = (value) => {
    let result = (value / 17.86).toFixed(2);
    setComplete(true);
    setTotal(result);
  };

  // works
  const convertPpmToMl = (value) => {
    let result = (value * 0.358).toFixed(2);
    setComplete(true);
    setTotal(result);
  };

  // dkh conversions // works
  const convertDKHtoPpm = (value) => {
    let result = (value * 17.86).toFixed(2);
    setComplete(true);
    setTotal(result);
  };

  const convertDKHToMl = (value) => {
    let result = (value / 2.8).toFixed(2);
    setComplete(true);
    setTotal(result);
  };

  // ml conversions
  const convertMlToDKH = (value) => {
    let result = (value * 2.8).toFixed(2);
    setComplete(true);
    setTotal(result);
  };

  const convertMltoPpm = (value) => {
    let result = (value / 0.358).toFixed(2);
    setComplete(true);
    setTotal(result);
  };

  return (
    <Container className="calc-container">
      <Row className="mt-2">
        <h3>Carbonate Hardness Unit Conversion</h3>
      </Row>
      <Row>
        {!complete ? (
          <h6>
            Carbonate hardness, or carbonate alkalinity is a measure of the
            alkalinity of water caused by the presence of carbonate (CO2− 3) and
            bicarbonate (HCO− 3) anions. Convert carbonate hardness as parts per
            million (ppm or mg/L), degree KH (dKH) or Milliequivalents per
            liter.
          </h6>
        ) : (
          <h6>{total}</h6>
        )}
      </Row>
      <Row className="mt-4 mb-4">
        <h6 style={{ color: "#0d6efd" }}>
          First select the format the value you wish to convert is in, then
          select the format you wish to convert to below
        </h6>
      </Row>
      <Row style={{ textAlign: "left", color: "#0d6efd" }}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Row>
              <Col>
                <Form.Check
                  onChange={() => {
                    setDKH(!dKH);
                  }}
                  type="checkbox"
                  label="Degree KH (dKH)"
                />
              </Col>
              <Col>
                <Form.Check
                  onChange={() => {
                    setPpm(!ppm);
                  }}
                  type="checkbox"
                  label="Parts per
                  million (ppm or mg/L)"
                />
              </Col>
              <Col>
                <Form.Check
                  onChange={() => {
                    setMl(!ml);
                  }}
                  type="checkbox"
                  label="Milliequivalents per
                  liter"
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              Value {errors.temp && <span>This field is required</span>}
            </Form.Label>
            <Form.Control
              step="0.01"
              min="0"
              type="number"
              {...register("hardness", { required: true })}
              placeholder="Enter value"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Row>
              <Col>
                <Form.Check
                  onChange={() => {
                    setDKH2(!dKH2);
                  }}
                  type="checkbox"
                  label="Degree KH (dKH)"
                />
              </Col>
              <Col>
                <Form.Check
                  onChange={() => {
                    setPpm2(!ppm2);
                  }}
                  type="checkbox"
                  label="Parts per
                  million (ppm or mg/L)"
                />
              </Col>
              <Col>
                <Form.Check
                  onChange={() => {
                    setMl2(!ml2);
                  }}
                  type="checkbox"
                  label="Milliequivalents per
                  liter"
                />
              </Col>
              <Col>
                <Button type="submit" style={{ float: "right" }}>
                  Calculate
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Row>
    </Container>
  );
}
