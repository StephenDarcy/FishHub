import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/esm/Col";
import { useForm } from "react-hook-form";

export default function TempCalculator() {
  const [celsius, setCelsius] = useState(false);
  const [fahrenheit, setFahrenheit] = useState(false);
  const [complete, setComplete] = useState(false);
  const [total, setTotal] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    let value = watch("temp");

    if (celsius && !fahrenheit) {
      convertToC(value);
    } else if (fahrenheit && !celsius) {
      convertToF(value);
    } else {
      setFahrenheit(!fahrenheit);
      setCelsius(!celsius);
    }
  };

  const convertToC = (value) => {
    let result = ((value - 32) / 1.8).toFixed(2);
    setComplete(true);
    setTotal(watch("temp") + "°F converted to Celsius is " + result + "°C");
  };

  const convertToF = (value) => {
    let result = (value * 1.8 + 32).toFixed(2);
    setComplete(true);
    setTotal(watch("temp") + "°C converted to Fahrenheit is " + result + "°F");
  };

  return (
    <Container className="calc-container">
      <Row className="mt-2">
        <h3>Convert temperature between Fahrenheit and Celsius</h3>
      </Row>
      <Row>
        {!complete ? (
          <h6>
            Convert a temperature to either Fahrenheit or Celsius by clicking
            selecting &quot;Convert to °F&quot; or &quot;Convert to °C&quot;
            checkboxes and then press the &quot;Calculate&quot; button.
          </h6>
        ) : (
          <h6>{total}</h6>
        )}
      </Row>
      <Row style={{ textAlign: "left", color: "#0d6efd" }}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>
              Temperature {errors.temp && <span>This field is required</span>}
            </Form.Label>
            <Form.Control
              step="0.01"
              min="0"
              type="number"
              {...register("temp", { required: true })}
              placeholder="Enter temperature"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Row>
              <Col>
                <Form.Check
                  onChange={() => {
                    setFahrenheit(!fahrenheit);
                  }}
                  type="checkbox"
                  label="Convert to °F"
                />
              </Col>
              <Col>
                <Form.Check
                  onChange={() => {
                    setCelsius(!celsius);
                  }}
                  type="checkbox"
                  label="Convert to °C"
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
