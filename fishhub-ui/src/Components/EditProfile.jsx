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
import { useForm } from "react-hook-form";

export default function EditProfile() {
  const [image, setImage] = useState(SampleUserImg);
  const [data, setData] = useState({
    username: "",
    email: "",
  });
  const { register, handleSubmit, watch } = useForm();

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

  const onSubmit = () => {
    let first = watch("first");
    let surname = watch("surnames");
    let number = watch("number");
    let country = watch("country");
    let city = watch("city");

    let data = {
      firstName: first,
      surname: surname,
      number: number,
      country: country,
      city: city,
    };

    updateUser(data);
  };

  const refreshPage = () => {
    window.location.reload(false);
  };

  const updateUser = async (data) => {
    await UserService.update(data).then((response) => {
      if (response.data == 200) {
        refreshPage();
      }
    });
  };

  console.log(data);
  return (
    <>
      <Row>
        <h2 style={{ color: "#b9b9b9" }} className="headline">
          Edit Your Profile
        </h2>
      </Row>
      <Row className="avatar-row">
        <UserAvatar img={image} avatar={data.avatar} />
        <UploadImageDialog setImage={handleSetImage} />
      </Row>
      <Row className="form-row">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col sm={6}>
              <Form.Group className="mb-2">
                <Form.Label>
                  <h6>First Name</h6>
                </Form.Label>
                <Form.Control
                  defaultValue={data.firstName || ""}
                  {...register("first")}
                  type="text"
                  placeholder="Enter first name"
                />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group className="mb-2">
                <Form.Label>
                  <h6>Surname</h6>
                </Form.Label>
                <Form.Control
                  defaultValue={data.surname || ""}
                  {...register("surname")}
                  type="text"
                  placeholder="Enter surname"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Form.Group className="mb-2">
                <Form.Label>
                  <h6>Username</h6>
                </Form.Label>
                <Form.Control
                  disabled
                  defaultValue={data.username}
                  type="text"
                  placeholder="Enter username"
                />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group className="mb-2">
                <Form.Label>
                  <h6>Email</h6>
                </Form.Label>
                <Form.Control
                  disabled
                  defaultValue={data.email}
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row></Row>
          <Row>
            <Form.Group className="mb-2">
              <Form.Label>
                <h6>Contact number</h6>
              </Form.Label>
              <Form.Control
                defaultValue={data.number || ""}
                {...register("number")}
                type="text"
                placeholder="Enter number"
              />
            </Form.Group>
          </Row>
          <Row>
            <Col sm={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <h6>Country</h6>
                </Form.Label>
                <Form.Control
                  defaultValue={data.country || ""}
                  {...register("country", { required: true })}
                  type="text"
                  placeholder="Enter country"
                />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <h6>City</h6>
                </Form.Label>
                <Form.Control
                  defaultValue={data.city || ""}
                  {...register("city")}
                  type="text"
                  placeholder="Enter city"
                />
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
