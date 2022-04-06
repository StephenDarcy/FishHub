import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function CompatibilityCalculator(props) {
  let fish1 = props.first;
  let fish2 = props.second;

  const [complete, setComplete] = useState(false);

  let calculate = (fish1, fish2) => {
    // pH values
    let fish1minPH = fish1.parameters[0].minPH;
    let fish1maxPH = fish1.parameters[0].maxPH;
    let fish2minPH = fish2.parameters[0].minPH;
    let fish2maxPH = fish2.parameters[0].maxPH;

    // Temp values
    let fish1minTemp = fish1.parameters[0].minTemp;
    let fish1maxTemp = fish1.parameters[0].maxTemp;
    let fish2minTemp = fish2.parameters[0].minTemp;
    let fish2maxTemp = fish2.parameters[0].maxTemp;

    // if fish has ecosystem parameters else skip
    if (fish1.ecosystem[0] && fish2.ecosystem[0]) {
      // check if water parameters match
      if (!checkWater(fish1.ecosystem[0], fish2.ecosystem[0])) {
        // return false if not true
        return false;
      }
    }

    // if both fish have pH values
    if ((fish1minPH, fish1maxPH, fish2minPH, fish2maxPH)) {
      // check ph range
      if (!checkRange(fish1minPH, fish1maxPH, fish2minPH, fish2maxPH)) {
        return false;
      }
    }

    // if both fish have temperature values
    if ((fish1minTemp, fish1maxTemp, fish2minTemp, fish2maxTemp)) {
      // check temp range
      if (!checkRange(fish1minTemp, fish1maxTemp, fish2minTemp, fish2maxTemp)) {
        return false;
      }
    }

    return true;
  };

  useEffect(() => {
    if (fish1 && fish2) {
      if (calculate(fish1, fish2)) {
        setComplete(true);
      }
    }
  }, [fish1, fish2]);

  return <>{complete ? <>Compatible</> : <>Not</>}</>;
}

CompatibilityCalculator.propTypes = {
  first: PropTypes.object,
  second: PropTypes.object,
};

let checkWater = (ecosystem1, ecosystem2) => {
  //check if water types match

  let fish1Water = ecosystem1.salinity.toUpperCase();
  let fish2Water = ecosystem2.salinity.toUpperCase();
  console.log(fish1Water, fish2Water);
  return fish1Water === fish2Water;
};

let checkRange = (fish1min, fish1max, fish2min, fish2max) => {
  let range1 = [];
  for (let i = fish1min; i <= fish1max; i++) {
    range1.push(i);
  }

  let range2 = [];
  for (let i = fish2min; i <= fish2max; i++) {
    range2.push(i);
  }

  console.log(range1, range2);

  for (let i = 0; i < range1.length; i++) {
    for (let j = 0; j < range2.length; j++) {
      if (range1[i] || range1[i] + 0.5 === range2[j] || range2[j] + 0.5) {
        return true;
      }
    }
  }

  return false;
};
