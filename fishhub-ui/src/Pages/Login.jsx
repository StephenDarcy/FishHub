import React, { useState, useContext } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import "../Styles/Login.css";
import UserService from "../Services/UserService";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { useCookies } from "react-cookie";
import AuthContext from "../Context/Auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  const { getLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleCookie() {
    setCookie("token", token, {
      path: "/",
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = {
      email: email,
      password: password,
    };

    UserService.login(data)
      .then((response) => {
        setToken(response.data);
        handleCookie();
        getLoggedIn();
        console.log(cookies.token);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Row className="login-row ">
        <Container fluid className="login-box">
          <Container fluid className="login-form">
            <Row className="form-row">
              <h1 className="mt-5">Welcome Back</h1>
            </Row>

            <Row className="form-row">
              <h6 className="mb-3">Login to your account</h6>
            </Row>

            <Form>
              <Row className="form-row">
                <Form.Group
                  onChange={(e) => setEmail(e.target.value)}
                  className="mb-3 mt-3"
                  controlId="formBasicEmail"
                >
                  <InputGroup>
                    <InputGroup.Text>
                      <AiOutlineMail />
                    </InputGroup.Text>
                    <Form.Control type="email" placeholder="Email Address" />
                  </InputGroup>
                </Form.Group>
              </Row>

              <Row className="form-row">
                <Form.Group
                  onChange={(e) => setPassword(e.target.value)}
                  className="mb-3 mt-3"
                  controlId="formBasicPassword"
                >
                  <InputGroup>
                    <InputGroup.Text>
                      <AiOutlineLock />
                    </InputGroup.Text>
                    <Form.Control type="password" placeholder="Password" />
                  </InputGroup>
                </Form.Group>
              </Row>

              <Row className="mt-3" xs={1}>
                <Col>
                  {" "}
                  <Button
                    style={{ width: "100%", float: "left" }}
                    onClick={handleSubmit}
                  >
                    Log In
                  </Button>
                </Col>
                <Col></Col>
              </Row>
            </Form>

            <Row>
              <Link to="/signup" className="signup-link">
                <h6>Don&apos;t have an account? Signup here</h6>
              </Link>
            </Row>
          </Container>
        </Container>
      </Row>
    </Container>
  );
}
