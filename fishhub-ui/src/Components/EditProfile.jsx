import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
// eslint-disable-next-line no-unused-vars
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../Styles/EditProfile.css";
import UserAvatar from "./UserAvatar";
import UploadImageDialog from "./UploadImageDialog";
import SampleUserImg from "../Images/sample-user.png";
import UserService from "../Services/UserService";

export default function EditProfile() {
  const [image, setImage] = useState(SampleUserImg);
  const [data, setData] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    async function getUser() {
      await UserService.get().then((response) => {
        setData(response.data);
      });
    }

    getUser();
  }, []);

  const handleSetImage = (newImage) => {
    setImage(newImage);
  };

  console.log(data);
  return (
    <>
      <Row>
        <h2 className="headline">Edit Profile</h2>
      </Row>
      <Row className="avatar-row">
        <Col></Col>
        <Col>
          <UserAvatar img={image} avatar={data.avatar} />
          <UploadImageDialog setImage={handleSetImage} />
        </Col>
        <Col></Col>
      </Row>
      <Row className="form-row">
        <Form>
          <Row>
            <Col sm={6}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter first name" />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group className="mb-3">
                <Form.Label>Surname</Form.Label>
                <Form.Control type="text" placeholder="Enter surname" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                defaultValue={data.username}
                type="text"
                placeholder="Enter username"
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                disabled
                defaultValue={data.email}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label>Contact number</Form.Label>
              <Form.Control type="text" placeholder="Enter number" />
            </Form.Group>
          </Row>
          <Row>
            <Col sm={6}>
              <Form.Group className="mb-3">
                <Form.Label>Country</Form.Label>
                <Form.Control type="text" placeholder="Enter country" />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="Enter city" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={4}>
              {" "}
              <Button variant="primary" type="submit" className="save-edit-btn">
                Save
              </Button>
            </Col>
            <Col sm={4}></Col>
            <Col sm={4}></Col>
          </Row>
        </Form>
      </Row>
    </>
  );
}
