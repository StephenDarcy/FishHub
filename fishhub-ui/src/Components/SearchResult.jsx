import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import PropTypes from "prop-types";
import "../Styles/SearchResult.css";
import { Link } from "react-router-dom";
import ImageService from "../Services/ImageService";
import noImage from "../Images/no-image.webp";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Figure from "react-bootstrap/Figure";

function SearchResult(props) {
  useEffect(() => {
    ImageService.deleteAll();
  }, []);

  let handleClick = () => {
    if (props.selectFish) {
      props.selectFish(props.Species);
    }
  };

  return (
    <Card
      sx={{
        backgroundColor: "#1a1a1b",
        border: "2px solid #dcdcdc",
        borderRadius: "20px",
      }}
      className="result-card"
      variant="outlined"
      onClick={handleClick}
    >
      <CardContent>
        <Row>
          <Col sm={2}>
            <Figure>
              <Figure.Image
                className="search-image"
                src={"http://localhost:6868/api/image/" + props.Species}
                alt={"Image of Species"}
                width={350}
                height={350}
                onError={(e) => (e.target.src = noImage)}
              ></Figure.Image>
            </Figure>
          </Col>
          <Col style={{ color: "#dcdcdc" }}>
            <Row>
              <h1
                className="search-head"
                style={{ color: "#dcdcdc", fontSize: "3rem" }}
              >
                Common Name(s):
              </h1>{" "}
              <h2 className="search-head" style={{ fontSize: "2rem" }}>
                {props.ComName}
              </h2>
            </Row>
            <Row>
              <h1
                className="search-head"
                style={{ color: "#dcdcdc", fontSize: "3rem" }}
              >
                Scientific Name:
              </h1>
              <h2 className="search-head" style={{ fontSize: "2rem" }}>
                {props.Species}
              </h2>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col></Col>
          <Col></Col>
        </Row>
      </CardContent>
      <CardActions>
        <Link to={`/${props.Species}`}>
          <Button variant="text">See More</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
export default SearchResult;

SearchResult.propTypes = {
  ComName: PropTypes.string,
  Species: PropTypes.string,
  SpecCode: PropTypes.number,
  selectFish: PropTypes.func,
};
