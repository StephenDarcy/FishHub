import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
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

  const [data, setData] = useState([]);
  const [fish, setFish] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  let handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    FishService.getScientific(search)
      .then((response) => {
        console.log(response.status);
        console.log(response.data);

        if (response.status === 200) {
          setLoading(false);
          deleteImages();
          setData([]);
          setData(refineData(response.data));
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
      {" "}
      <Container fluid>
        <Row className="search-row">
          <form onSubmit={handleSearch}>
            <div>
              <Row className="input-row">
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
                    width: "60%",
                    border: "3px solid #77a6f7",
                    height: "5vh",
                    borderRadius: "20px",
                    outline: "none",
                    backgroundColor: "white",
                  }}
                />
              </Row>

              <Row className="btn-row">
                <Button
                  className="search-btn"
                  type="submit"
                  onClick={() => setSearch(fish)}
                >
                  Normal Search
                </Button>
                <Button className="search-btn" type="submit">
                  Scientific Search
                </Button>
              </Row>
            </div>
          </form>
        </Row>
        <Row>
          <Container fluid className="results-box">
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
        </Row>
      </Container>
    </>
  );
}
export default Search;

const refineData = (data) => {
  console.log(data);
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
  console.log(speciesCodes);
  return refinedData;
};
