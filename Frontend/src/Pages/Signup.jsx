import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import UniversalModal from "../Components/UniversalModal";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signedUp, setSignedUp] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [redirect, setRedirect] = useState(false);

  const addUserEndpoint = "http://localhost:3000/users/add";

  const verifyPassword = (firstPassword, secondPassword) => {
    return firstPassword == secondPassword;
  };

  const startNavigate = () => {
    setTimeout(() => {
      setRedirect(true);
      console.log("redirecting to login page");
    }, 2000);
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
          setSignedUp(true);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log("Passwords do not match");
    }
  };

  if (signedUp) {
    startNavigate();

    if (redirect) {
      return <Navigate to="/login" />;
    }

    return (
      <>
        <UniversalModal
          show={true}
          title="Account successfully created!"
          body="You will now be redirected to sign in"
        />
      </>
    );
  }

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
