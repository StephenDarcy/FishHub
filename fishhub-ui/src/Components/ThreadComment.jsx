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
  const [loading, isLoading] = useState(true);

  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState();

  useEffect(() => {
    async function getUser() {
      let data = {
        avatar: data.avatar,
      };
      await UserService.getUserAvatar(data).then((response) => {
        setAvatar(response.data);
      });
    }
    async function setProps() {
      await setData(props.data);
      isLoading(false);
    }

    setProps();
    getUser();
  }, [props]);

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
      <Row>
        <Col>
          <UserAvatar
            height={35}
            width={35}
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
