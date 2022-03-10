import React from "react";

import { useParams } from "react-router-dom";

export default function SpeciesProfile() {
  const { SpeciesCode } = useParams();

  console.log(SpeciesCode);
  return (
    <div>
      <h1>Species Profile: {SpeciesCode}</h1>
    </div>
  );
}
