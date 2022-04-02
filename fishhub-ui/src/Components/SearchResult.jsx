import React, { useEffect } from "react";
import "../Styles/Home.css";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import PropTypes from "prop-types";
import "../Styles/SearchResult.css";
import { Link } from "react-router-dom";
import ImageService from "../Services/ImageService";
import noImage from "../Images/no-image.webp";

function SearchResult(props) {
  useEffect(() => {
    ImageService.deleteAll();
  }, []);

  let handleClick = () => {
    props.selectFish(props.Species);
  };

  return (
    <Card className="result-card" variant="outlined" onClick={handleClick}>
      <CardContent>
        <img
          className="search-image"
          src={"http://localhost:6868/api/image/" + props.Species}
          alt={noImage}
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
  selectFish: PropTypes.func,
};
