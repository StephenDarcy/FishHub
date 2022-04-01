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
import { VscSearch as SearchIcon } from "react-icons/vsc";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { Scrollbars } from "react-custom-scrollbars-2";

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
          setData([]);
          setData(refineData(response.data));
          deleteImages();
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

  const returnToSearch = () => {
    setPageState("searching");
  };

  return (
    <>
      {pageState === "searching" && (
        <Container className="search-container">
          <Row className="fishhub-search">
            <h1 className="logo-main-text">
              fishhub search{" "}
              <IconContext.Provider value={{ className: "logo-icon" }}>
                <SearchIcon style={{ textShadow: "1px 1px 1px #696969" }} />
              </IconContext.Provider>
            </h1>
            <h2 className="logo-sub-text">
              browse over 34,800 species of fish
            </h2>
          </Row>
          <form onSubmit={handleSearch}>
            <Row>
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

            <Row>
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
          <h1>Your search returned several results</h1>
          <Button onClick={returnToSearch}>Return to search page</Button>
          <Scrollbars style={{ height: "80%" }}>
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
          </Scrollbars>
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
