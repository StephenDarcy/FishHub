import React, { useState } from "react";
import PropTypes from "prop-types";

export default function CompatibilityCalculator(props) {
  let fish1 = props.first;
  let fish2 = props.second;
  const [compatibility, setCompatibility] = useState(false);

  let checkWater = () => {
    //check if water types match
    let fish1Water = fish1.ecosystem[0].salinity.toUpperCase();
    let fish2Water = fish2.ecosystem[0].salinity.toUpperCase();
    if (fish1Water == fish2Water) {
      console.log("compatible water type");
      return true;
    } else {
      setCompatibility(false);
    }
  };

  let checkpH = () => {};

  let checkTemp = () => {};

  let checkdH = () => {};

  let calculation = () => {
    if (checkWater() && checkpH() && checkTemp() && checkdH()) {
      setCompatibility(true);
    }
  };

  let result = () => {
    if (fish1 && fish2) {
      calculation();
    } else if (fish1) {
      return <h1>Please select fish 2</h1>;
    } else if (fish2) {
      return <h1>Please select fish 1</h1>;
    } else {
      return <h3>How does the comparison work?</h3>;
    }
  };

  return compatibility ? <h1>Compatible !</h1> : result();
}

CompatibilityCalculator.propTypes = {
  first: PropTypes.object,
  second: PropTypes.object,
};
