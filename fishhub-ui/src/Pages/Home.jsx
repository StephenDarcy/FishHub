import Container from "react-bootstrap/Container";
import Search from "../Components/Search";
import React from "react";
import "../Styles/Home.css";

function Home() {
  return (
    <Container className="home">
      <Search />
    </Container>
  );
}
export default Home;
