/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserService from "../Services/UserService";
import UserAvatar from "./UserAvatar";
import SampleUserImg from "../Images/sample-user.png";
import { useNavigate } from "react-router-dom";

export default function ForumItem(props) {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState();

  useEffect(() => {
    async function getUser() {
      await UserService.getUserAvatar(props.createdBy).then((response) => {
        setAvatar(response.data);
      });
    }

    getUser();
  }, [props]);

  const handleClick = () => {
    navigate(`/forums/${props.id}`);
  };

  const getCreatedAt = () => {
    const monthList = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    if (props.createdAt) {
      const date = props.createdAt;
      const year = date.substring(2, 4);
      const monthNumber = date.substring(5, 7);
      const month = monthList[parseInt(monthNumber) - 1];
      return month + " '" + year;
    } else {
      return "";
    }
  };

  return (
    <>
      <Row onClick={handleClick}>
        <Col>
          <UserAvatar img={SampleUserImg} avatar={avatar} />
        </Col>
        <Col xs={7}>{props.topic}</Col>
        <Col></Col>
        <Col>{getCreatedAt()}</Col>
      </Row>
    </>
  );
}
