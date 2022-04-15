import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/esm/Col";
import { useForm } from "react-hook-form";

export default function RectangularCalculator() {
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
    let length = watch("length");
    let width = watch("width");

    if (checked) {
      calculateInches(height, length, width);
    } else {
      calculate(height, length, width);
    }
  };

  const calculate = (height, length, width) => {
    let volume = ((height * width * length) / 1000).toFixed(2);
    setComplete(true);
    setTotal("Total volume in litres is " + volume + "L");
  };

  const calculateInches = (height, length, width) => {
    let volume = ((height * width * length) / 231).toFixed(2);
    setComplete(true);
    setTotal("Total volume in gallons is " + volume + " Gallons");
  };

  return (
    <Container className="calc-container">
      <Row className="mt-2">
        <h3> Rectangular Aquarium Volume Calculator</h3>
      </Row>
      <Row>
        {!complete ? (
          <h6>
            Calculate the volume of a rectangular aquarium by providing the
            length, width and height in centimeters and clicking the
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
              Length {errors.length && <span>This field is required</span>}
            </Form.Label>
            <Form.Control
              step="0.01"
              min="0"
              type="number"
              {...register("length", { required: true })}
              placeholder="Enter Length"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              Width {errors.width && <span>This field is required</span>}
            </Form.Label>
            <Form.Control
              step="0.01"
              min="0"
              type="number"
              {...register("width", { required: true })}
              placeholder="Enter Width"
            />
          </Form.Group>
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
