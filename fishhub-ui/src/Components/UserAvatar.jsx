import React from "react";
import Avatar from "@mui/material/Avatar";
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
    <Avatar
      src={getImage()}
      alt="User"
      sx={{
        width: props.width || 120,
        height: props.height || 120,
        border: "1.5px solid #b9b9b9",
      }}
    />
  );
}
UserAvatar.propTypes = {
  avatar: PropTypes.string,
  img: PropTypes.img,
  height: PropTypes.number,
  width: PropTypes.number,
};
