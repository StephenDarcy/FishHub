import React from "react";
import axios from "axios";

function Home() {
  function postFish() {
    console.log(fish);
    axios
      .get(`${process.env.REACT_APP_API_URL}/fish/scientific`, {
        params: {
          common: fish,
        },
      })
      .then((response) => setData(response.data))
      .catch((err) => {
        console.error(err);
      });
  }

  const [data, setData] = React.useState(null);
  const [fish, setFish] = React.useState("");

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
