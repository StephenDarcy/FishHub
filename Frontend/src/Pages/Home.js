import React from "react";
import axios from "axios";

function Home() {
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
      {" "}
      <label>
        Search for a fish:
        <input type="text" onChange={(e) => setFish(e.target.value)} />
      </label>
      <button onClick={postFish}>Submit</button>
      <p>{!data ? "Loading..." : data.Species}</p>
    </>
  );
}
export default Home;
