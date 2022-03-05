import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link, Navigate } from "react-router-dom";
import UserService from "../Services/UserService";
import UniversalModal from "../Components/UniversalModal";
import "../Styles/Signup.css";
import { AiOutlineMail, AiOutlineLock, AiOutlineUserAdd } from "react-icons/ai";
import InputGroup from "react-bootstrap/InputGroup";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signedUp, setSignedUp] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [redirect, setRedirect] = useState(false);

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

      UserService.create(data)
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
      <Container fluid className="signup-box">
        <h1>Create Account</h1>
        <h6>Join the FishHub community</h6>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <InputGroup>
              <InputGroup.Text>
                <AiOutlineMail />
              </InputGroup.Text>
              <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email Address"
              />
            </InputGroup>
            <Form.Text className="text-muted">
              We&apos;ll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicUsername">
            <InputGroup>
              <InputGroup.Text>
                <AiOutlineUserAdd />
              </InputGroup.Text>
              <Form.Control
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Username"
              />
            </InputGroup>
            <Form.Text className="text-muted">
              The username can only contain alphanumeric characters and
              underscores
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <InputGroup>
              <InputGroup.Text>
                <AiOutlineLock />
              </InputGroup.Text>
              <Form.Control
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <InputGroup>
              <InputGroup.Text>
                <AiOutlineLock />
              </InputGroup.Text>
              <Form.Control
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="Confirm password"
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Link to="/login" className="login-link">
          <h6>Already have an account? Login here</h6>
        </Link>
      </Container>
    </Container>
  );
}
