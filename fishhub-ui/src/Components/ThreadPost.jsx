import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserService from "../Services/UserService";
import UserAvatar from "./UserAvatar";
import SampleUserImg from "../Images/sample-user.png";
import CircularProgress from "@mui/material/CircularProgress";

export default function ThreadPost(props) {
  const [avatar, setAvatar] = useState();
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      await UserService.getUserAvatar(data.createdBy).then((response) => {
        setAvatar(response.data);
      });
    }
    async function setProps() {
      await setData(props.data);
      isLoading(false);
    }

    getUser();
    setProps();
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
      <Row style={{ borderTop: "1px solid #b9b9b9" }}>
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
                <Col>{data.username}</Col>
                <Col style={{ textAlign: "right" }}>{getCreatedAt()}</Col>
              </Row>
              <Row>{data.body}</Row>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

ThreadPost.propTypes = {
  data: PropTypes.object,
};
