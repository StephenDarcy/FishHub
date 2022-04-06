import React from "react";
import Figure from "react-bootstrap/Figure";
import SampleUserImg from "../Images/sample-user.webp";

export default function UserAvatar() {
  return (
    <Figure>
      <Figure.Image
        width={120}
        height={120}
        alt="171x180"
        src={SampleUserImg}
      />
    </Figure>
  );
}
