import React from "react";
import FishService from "../Services/FishService";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function SpeciesProfile() {
  const { Species } = useParams();
  const [country, setCountry] = useState();
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    FishService.getCountry(Species)
      .then((response) => {
        console.log(response.status);
        console.log(response.data);

        if (response.status === 200) {
          setCountry([]);
          setCountry(response.data);
          isLoading(false);
        } else {
          console.log("Error fetching country");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log(Species);
  return (
    <div>
      <h1>Species Profile: {Species}</h1>
      {loading ? <p>loading</p> : <h2>Country: {country[0].country}</h2>}
    </div>
  );
}
