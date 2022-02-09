import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState([]);
  const [fish, setFish] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `${process.env.REACT_APP_API_URL}/fish/scientific/${search}`
      );

      setData(result.data);
    };

    fetchData();
  }, [search]);

  return (
    <>
      {" "}
      <label>
        Search for a fish:
        <input type="text" onChange={(e) => setFish(e.target.value)} />
      </label>
      <button onClick={() => setSearch(fish)}>Submit</button>
      <ul>
        {data.map((species) => (
          <li key={species.SpecCode}>{species.ComName}</li>
        ))}
      </ul>
    </>
  );
}
export default Home;
