import Container from "react-bootstrap/Container";
import React, { useState } from "react";
import "../Styles/Home.css";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import PropTypes from "prop-types";
import "../Styles/SearchResult.css";
import { useNavigate } from "react-router-dom";

function SearchResult(props) {
  const [SpeciesCode, setSpeciesCode] = useState();
  const navigate = useNavigate();

  const handleProceed = () => {
    setSpeciesCode(props.key);
    SpeciesCode &&
      navigate("/species-profile/:SpeciesCode", {
        state: { SpeciesCode: SpeciesCode },
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
          <Button variant="text" onClick={handleProceed}>
            See More
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
}
export default SearchResult;

SearchResult.propTypes = {
  ComName: PropTypes.string,
  Species: PropTypes.string,
  key: PropTypes.number,
};
