import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserService from "../Services/UserService";
import UserAvatar from "./UserAvatar";
import SampleUserImg from "../Images/sample-user.png";
import CircularProgress from "@mui/material/CircularProgress";

export default function ThreadComment(props) {
  const [avatar, setAvatar] = useState();
  const [id, setId] = useState();
  const [loading, isLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState();

  useEffect(() => {
    async function getID() {
      await UserService.getID().then((response) => {
        setId(response.data);
      });
    }
    async function setProps() {
      await setData(props.data);
      isLoading(false);
    }

    setProps();
    getID();
  }, [props]);

  useEffect(() => {
    async function getAvatar() {
      await UserService.getUserAvatar(id).then((response) => {
        setAvatar(response.data);
      });
    }
    getAvatar();
  }, [id]);

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
    if (data.createdAt) {
      const date = data.createdAt;
      const year = date.substring(2, 4);
      const monthNumber = date.substring(5, 7);
      const month = monthList[parseInt(monthNumber) - 1];
      return month + " '" + year;
    } else {
      return "";
    }
  };

  return (
    <Container>
      <Row
        style={{
          borderTop: "1px solid #b9b9b9",
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <Col>
          <UserAvatar
            height={50}
            width={50}
            img={SampleUserImg}
            avatar={avatar}
          />
        </Col>
        <Col xs={11}>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <Row>
                <Col>
                  <p style={{ color: "#dcdcdc", fontSize: "2vw" }}>
                    {data.username}
                  </p>
                </Col>
                <Col style={{ textAlign: "right" }}>
                  <p style={{ color: "#dcdcdc", fontSize: "2vw" }}>
                    {getCreatedAt()}
                  </p>
                </Col>
              </Row>
              <Row>
                <p style={{ color: "#dcdcdc", fontSize: "1.5vw" }}>
                  {data.body}
                </p>
              </Row>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

ThreadComment.propTypes = {
  data: PropTypes.object,
};
