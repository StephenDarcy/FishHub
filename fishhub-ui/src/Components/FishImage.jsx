/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import FadeLoader from "react-spinners/FadeLoader";
import http from "../http-image";
import axios from "axios";

export default function FishImage(props) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [imgSource, setImgSource] = useState();

  let imgURL =
    "https://en.wikipedia.org/w/api.php?origin=*action=query&titles=Green%20neon%20tetra&prop=pageimages&format=json&pithumbsize=1024";

  useEffect(() => {
    axios
      .get(imgURL, {
        proxy: {
          host: "localhost",
          port: 80,
        },
      })
      .then((response) => {
        console.log(response.status);
        console.log(response.data);

        if (response.status === 200) {
          setData([]);
          setData(response.data);
          setLoading(false);
        } else {
          console.log("Error fetching fish image");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      {loading ? (
        <FadeLoader color={"#26beff"} size={150} />
      ) : (
        <img src={imgSource} alt="Fish Image"></img>
      )}
    </>
  );
}

FishImage.propTypes = {
  species: PropTypes.string,
};
