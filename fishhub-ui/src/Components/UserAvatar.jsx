import React from "react";
import Figure from "react-bootstrap/Figure";
import PropTypes from "prop-types";

export default function UserAvatar(props) {
  let getImage = () => {
    if (props.avatar) {
      return `data:image/png;base64,${props.avatar}`;
    } else {
      return props.img;
    }
  };
  return (
    <Figure>
      <Figure.Image width={120} height={120} alt="171x180" src={getImage()} />
    </Figure>
  );
}
UserAvatar.propTypes = {
  avatar: PropTypes.string,
  img: PropTypes.img,
};
