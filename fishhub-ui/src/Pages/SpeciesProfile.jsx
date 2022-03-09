import React from "react";

import { useParams } from "react-router-dom";

export default function SpeciesProfile() {
  const { SpecCode } = useParams();

  console.log(SpecCode);
  return (
    <div>
      <h1>Species Profile: {SpecCode}</h1>
    </div>
  );
}
