import React from "react";
import "../Styles/Home.css";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import PropTypes from "prop-types";
import "../Styles/SearchResult.css";
import { Link } from "react-router-dom";

function SearchResult(props) {
  return (
    <Card className="result-card" variant="outlined">
      <CardContent>
        <img
          className="search-image"
          src={"http://localhost:6868/api/image/" + props.Species}
          alt="https://place-hold.it/300"
        ></img>
        Common Name(s): {props.ComName}
        <br />
        Scientific Name: {props.Species}
      </CardContent>
      <CardActions>
        <Link to={`${props.Species}`}>
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
};
