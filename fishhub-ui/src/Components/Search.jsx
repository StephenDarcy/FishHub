import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "../Styles/Search.css";
import { FaSearch } from "react-icons/fa";
import FishService from "../Services/FishService";
import SearchResult from "./SearchResult";

function Search() {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState([]);
  const [fish, setFish] = useState("");
  const [search, setSearch] = useState("");

  const sampleData = [
    {
      Species: "Symphysodon aequifasciatus",
      ComName: "Blue discus",
      Language: "English",
      SpecCode: 11185,
    },
    {
      Species: "Symphysodon aequifasciatus",
      ComName: "Brown Discus",
      Language: "English",
      SpecCode: 11185,
    },
    {
      Species: "Symphysodon discus",
      ComName: "Discus",
      Language: "English",
      SpecCode: 11186,
    },
    {
      Species: "Paratrygon aiereba",
      ComName: "Discus ray",
      Language: "English",
      SpecCode: 50646,
    },
    {
      Species: "Brachychalcinus orbicularis",
      ComName: "Discus tetra",
      Language: "English",
      SpecCode: 10693,
    },
    {
      Species: "Symphysodon aequifasciatus",
      ComName: "Green discus",
      Language: "English",
      SpecCode: 11185,
    },
    {
      Species: "Symphysodon discus",
      ComName: "Red discus",
      Language: "English",
      SpecCode: 11186,
    },
  ];

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
            {sampleData.map((species) => (
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
