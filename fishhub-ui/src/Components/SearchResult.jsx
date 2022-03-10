import Container from "react-bootstrap/Container";
import React from "react";
import "../Styles/Home.css";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import PropTypes from "prop-types";
import "../Styles/SearchResult.css";
import { useNavigate, Link } from "react-router-dom";

function SearchResult(props) {
  const navigate = useNavigate();

  const handleProceed = () => {
    console.log(props.SpecCode);
    navigate("../species-profile/", {
      state: { SpeciesCode: props.SpecCode },
    });
  };

  return (
    <Container fluid>
      <Card className="result-card" variant="outlined">
        <CardContent>
          Common Name: {props.ComName}
          <br />
          Scientific Name: {props.Species}
        </CardContent>
        <CardActions>
          <Link to={`/species-profile/${props.SpecCode}`}>
            <Button variant="text" onClick={handleProceed}>
              See More
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Container>
  );
}
export default SearchResult;

SearchResult.propTypes = {
  ComName: PropTypes.string,
  Species: PropTypes.string,
  SpecCode: PropTypes.number,
};
