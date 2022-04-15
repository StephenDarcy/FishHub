import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../Styles/Search.css";
import FishService from "../Services/FishService";
import SearchResult from "./SearchResult";
import FadeLoader from "react-spinners/FadeLoader";
import Button from "react-bootstrap/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { VscSearch as SearchIcon } from "react-icons/vsc";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { useForm } from "react-hook-form";

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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  let handleSearch = async () => {
    setLoading(true);
    await FishService.getScientific(watch("search"))
      .then((response) => {
        console.log(response.status);
        console.log(response.data);

        if (response.status === 200) {
          setLoading(false);
          setPageState("results");
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

  const returnToSearch = () => {
    setPageState("searching");
  };

  const redirectSci = () => {
    navigate("/" + watch("search"));
  };

  return (
    <>
      {pageState === "searching" && (
        <Container className="search-container">
          <Row className="fishhub-search">
            <h1 className="logo-main-text" style={{ fontSize: "8vw" }}>
              fishhub search{" "}
              <IconContext.Provider value={{ className: "logo-icon" }}>
                <SearchIcon />
              </IconContext.Provider>
            </h1>
            <h2 className="logo-sub-text">
              browse over 34,800 species of fish
            </h2>
          </Row>
          <form
            onSubmit={handleSubmit(handleSearch)}
            style={{ paddingLeft: "10%", paddingRight: "10%" }}
          >
            <Row>
              {errors.search && <p>Invalid Search</p>}
              <TextField
                className={classes.root}
                type="text"
                placeholder="Search here for a fish"
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  width: "100%",
                  border: "3px solid #0d6efd",
                  height: "100%",
                  borderRadius: "10px",
                  outline: "none",
                  backgroundColor: "white",
                }}
                {...register("search", { required: "Required" })}
              />
            </Row>

            <Row xs={1} sm={1} md={2}>
              <Col className="btn-col">
                <Button className="search-btn" type="submit">
                  Normal Search
                </Button>
              </Col>
              <Col className="btn-col">
                <Button className="search-btn" onClick={redirectSci}>
                  Scientific Search
                </Button>
              </Col>
            </Row>
          </form>
        </Container>
      )}
      {pageState === "results" && (
        <Container className="results-page">
          <h1 style={{ color: "#dcdcdc" }}>
            Your search returned several results
          </h1>
          <Button onClick={returnToSearch}>Return to search page</Button>
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
