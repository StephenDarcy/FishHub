import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "../Styles/Search.css";
import { FaSearch } from "react-icons/fa";
import FishService from "../Services/FishService";
import SearchResult from "./SearchResult";
import ImageService from "../Services/ImageService";
import FadeLoader from "react-spinners/FadeLoader";

function Search() {
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
  return data;
};
