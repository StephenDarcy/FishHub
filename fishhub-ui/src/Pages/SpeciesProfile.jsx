import React from "react";
import FishService from "../Services/FishService";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function SpeciesProfile() {
  const { Species } = useParams();
  const [data, setData] = useState();
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    fetchData();

    async function fetchData() {
      await FishService.getAllData(Species).then((response) => {
        setData(response);
        isLoading(false);
      });
      console.log(data);
    }
  }, [Species]);

  return (
    <div>
      <h1>Species Profile: {Species}</h1>
      {loading ? (
        <p>loading</p>
      ) : (
        <>
          <img
            className="search-image"
            src={"http://localhost:6868/api/image/" + Species}
            alt="https://place-hold.it/300"
          ></img>
          <h2>{data.countries[0].status}</h2>
        </>
      )}
    </div>
  );
}
