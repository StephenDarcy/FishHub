import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../Styles/Search.css";
import FishService from "../Services/FishService";
import SearchResult from "./SearchResult";
import ImageService from "../Services/ImageService";
import FadeLoader from "react-spinners/FadeLoader";
import Button from "react-bootstrap/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { HiSearch as SearchIcon } from "react-icons/hi";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import searchLogo from "../Images/search-transparent-white.png";

const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
});

function Search() {
  const classes = useStyles();
  const [pageState, setPageState] = useState("searching");
  const [data, setData] = useState([]);
  const [fish, setFish] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  let handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPageState("results");
    FishService.getScientific(search)
      .then((response) => {
        console.log(response.status);
        console.log(response.data);

        if (response.status === 200) {
          setLoading(false);
          deleteImages();
          setData([]);
          setData(refineData(response.data));
          //if only one result redirect
          if (response.data.length == 1) {
            navigate("/" + response.data[0].Species);
          }
        } else {
          console.log("Error fetching search result");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteImages = () => {
    ImageService.deleteAll();
  };

  return (
    <>
      {pageState === "searching" && (
        <Container className="search-row">
          <form onSubmit={handleSearch}>
            <Row className="input-row">
              <img src={searchLogo} alt="FishHub" className="search-logo" />
              <TextField
                className={classes.root}
                type="text"
                onChange={(e) => setFish(e.target.value)}
                placeholder="Search here for a fish"
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  classes: {
                    root: {
                      border: "3px solid #77a6f7",
                    },
                  },
                }}
                sx={{
                  width: "100%",
                  border: "3px solid #77a6f7",
                  height: "100%",
                  borderRadius: "20px",
                  outline: "none",
                  backgroundColor: "white",
                }}
              />
            </Row>

            <Row className="btn-row">
              <Col className="btn-col">
                <Button
                  className="search-btn"
                  type="submit"
                  onClick={() => setSearch(fish)}
                >
                  Normal Search
                </Button>
              </Col>
              <Col className="btn-col">
                <Button className="search-btn" type="submit">
                  Scientific Search
                </Button>
              </Col>
            </Row>
          </form>
        </Container>
      )}
      {pageState === "results" && (
        <Container className="results-page">
          {loading ? (
            <FadeLoader size={500} />
          ) : (
            data.map((species) => (
              <SearchResult
                key={species.SpecCode + species.ComName + species.Species}
                {...species}
              />
            ))
          )}
        </Container>
      )}
    </>
  );
}
export default Search;

const refineData = (data) => {
  let refinedData = [];
  let speciesCodes = [];
  data.forEach((species) => {
    if (speciesCodes.includes(species.SpecCode)) {
      // refining duplicate species
      let index = refinedData.findIndex(
        (obj) => obj.SpecCode == species.SpecCode
      );

      refinedData[index].ComName += ", " + species.ComName;
    } else {
      speciesCodes.push(species.SpecCode);
      refinedData.push(species);
    }
  });
  return refinedData;
};
