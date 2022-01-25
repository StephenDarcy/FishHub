import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const addUserEndpoint = "http://localhost:3000/users/add";

  const verifyPassword = (firstPassword, secondPassword) => {
    return firstPassword == secondPassword;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(username, email, password, confirmPassword);

    if (verifyPassword(password, confirmPassword)) {
      let data = {
        username: username,
        email: email,
        password: password,
      };

      axios
        .post(addUserEndpoint, data)
        .then((response) => {
          console.log(response.status);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log("Passwords do not match");
    }
  };

  return (
    <Container fluid>
      <h1>Signup for an account</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We&apos;ll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Enter username"
          />
          <Form.Text className="text-muted">
            The username can only contain alphanumeric characters and
            underscores
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <h2>Already have an account?</h2>
      <Link to="/login">
        <h3>Click here to login!</h3>
      </Link>
    </Container>
  );
}
