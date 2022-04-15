import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/esm/Col";
import { useForm } from "react-hook-form";

export default function CylindricalCalculator() {
  const [checked, setChecked] = useState(false);
  const [complete, setComplete] = useState(false);
  const [total, setTotal] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    let height = watch("height");
    let diameter = watch("diameter");

    if (checked) {
      calculateInches(height, diameter);
    } else {
      calculate(height, diameter);
    }
  };

  const calculate = (height, diameter) => {
    let radius = diameter / 2;
    let volume = ((height * Math.PI * radius * radius) / 1000).toFixed(2);
    setComplete(true);
    setTotal("Total volume in litres is " + volume + "L");
  };

  const calculateInches = (height, diameter) => {
    let radius = diameter / 2;
    let volume = ((height * Math.PI * radius * radius) / 231).toFixed(2);
    setComplete(true);
    setTotal("Total volume in gallons is " + volume + " Gallons");
  };

  return (
    <Container className="calc-container">
      <Row className="mt-2">
        <h3>Cylindrical Aquarium Volume Calculator</h3>
      </Row>
      <Row>
        {!complete ? (
          <h6>
            Calculate the volume of a cylindrical aquarium by providing the
            height and diameter in centimeters and clicking the
            &quot;Calculate&quot; button.
          </h6>
        ) : (
          <h6>{total}</h6>
        )}
      </Row>
      <Row style={{ textAlign: "left", color: "#0d6efd" }}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>
              Height {errors.height && <span>This field is required</span>}
            </Form.Label>
            <Form.Control
              step="0.01"
              min="0"
              type="number"
              {...register("height", { required: true })}
              placeholder="Enter Height"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              Diameter {errors.diameter && <span>This field is required</span>}
            </Form.Label>
            <Form.Control
              step="0.01"
              min="0"
              type="number"
              {...register("diameter", { required: true })}
              placeholder="Enter Diameter"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Row>
              <Col>
                <Form.Check
                  onChange={() => {
                    setChecked(!checked);
                  }}
                  type="checkbox"
                  label="Use inches"
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
