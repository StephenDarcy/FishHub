import React, { useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import "../Styles/Search.css";
import { FaSearch } from "react-icons/fa";

function Search() {
  const [data, setData] = useState([]);
  const [fish, setFish] = useState("");
  const [search, setSearch] = useState("");

  let handleSearch = async (e) => {
    e.preventDefault();

    try {
      let res = await axios(
        `${process.env.REACT_APP_API_URL}/fish/scientific/${search}`
      );
      if (res.status === 200) {
        setData(res.data);
      } else {
        console.log("Error fetching search result");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {" "}
      <Container fluid style={{ display: "flex", justifyContent: "center" }}>
        <Row>
          <form onSubmit={handleSearch}>
            <div className="wrap">
              <div className="search">
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
          {" "}
          <ul className="results-list">
            {data.map((species) => (
              <li className="results-item" key={species.SpecCode}>
                <Card>
                  <Card.Body>{species.ComName}</Card.Body>
                </Card>
              </li>
            ))}
          </ul>
        </Row>
      </Container>
    </>
  );
}
export default Search;
