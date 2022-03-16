import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "../Styles/Search.css";
import { FaSearch } from "react-icons/fa";
import FishService from "../Services/FishService";
import SearchResult from "./SearchResult";

function Search() {
  const [data, setData] = useState([]);
  const [fish, setFish] = useState("");
  const [search, setSearch] = useState("");

  let handleSearch = async (e) => {
    e.preventDefault();

    FishService.getScientific(search)
      .then((response) => {
        console.log(response.status);
        console.log(response.data);

        if (response.status === 200) {
          setData([]);
          setData(response.data);
        } else {
          console.log("Error fetching search result");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {" "}
      <Container fluid>
        <Row>
          <form onSubmit={handleSearch}>
            <div>
              <div className="search-bar">
                <input
                  className="searchBox"
                  type="text"
                  onChange={(e) => setFish(e.target.value)}
                  placeholder="Search here for a fish"
                />
                <button
                  type="submit"
                  className="searchButton"
                  onClick={() => setSearch(fish)}
                >
                  <FaSearch />
                </button>
              </div>
            </div>
          </form>
        </Row>
        <Row>
          <Container fluid className="results-box">
            <h1>Your search returned several results</h1>
            {data.map((species) => (
              <SearchResult
                key={species.SpecCode + species.ComName + species.Species}
                {...species}
              />
            ))}
          </Container>
        </Row>
      </Container>
    </>
  );
}
export default Search;
