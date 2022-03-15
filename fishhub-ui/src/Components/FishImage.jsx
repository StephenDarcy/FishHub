/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import FadeLoader from "react-spinners/FadeLoader";
import http from "../http-image";

export default function FishImage(props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [imgSource, setImgSource] = useState();

  let imgURL =
    "https://en.wikipedia.org/w/api.php?origin=*action=query&titles=Green%20neon%20tetra&prop=pageimages&format=json&pithumbsize=1024";

  useEffect(() => {
    http
      .get(imgURL)
      .then((response) => {
        console.log(response.status);
        console.log(response.data);

        if (response.status === 200) {
          setData([]);
          setData(response.data);
          setLoading(false);
        } else {
          console.log("Error fetching fish image");
          setLoading(false);
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
        <img src="http://localhost:6868/api/image/" alt="Fish Image"></img>
      )}
    </>
  );
}

FishImage.propTypes = {
  species: PropTypes.string,
};
