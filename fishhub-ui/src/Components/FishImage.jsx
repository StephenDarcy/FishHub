/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import FadeLoader from "react-spinners/FadeLoader";

export default function FishImage(props) {
  const [loading, setLoading] = useState(false);
  return (
    <>
      {loading ? (
        <FadeLoader color={"#26beff"} size={150} />
      ) : (
        <img
          src={"http://localhost:6868/api/image/" + props.species}
          alt="https://place-hold.it/300"
        ></img>
      )}
    </>
  );
}

FishImage.propTypes = {
  species: PropTypes.string,
};
