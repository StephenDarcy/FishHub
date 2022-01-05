import React from "react";
import "./Styles/App.css";
import axios from "axios";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  function postFish() {
    console.log(fish);
    axios
      .post("http://localhost:3001/fish", { name: fish })
      .then(() => console.log("fish sent"))
      .catch((err) => {
        console.error(err);
      });
  }

  const [data, setData] = React.useState(null);
  const [fish, setFish] = React.useState("");

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  console.log(data);

  return (
    <>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" />
          </Routes>
          <label>
            Search for a fish:
            <input type="text" onChange={(e) => setFish(e.target.value)} />
          </label>
          <button onClick={postFish}>Submit</button>
          <p>{!data ? "Loading..." : data.Species}</p>
        </div>
      </Router>
    </>
  );
}

export default App;
