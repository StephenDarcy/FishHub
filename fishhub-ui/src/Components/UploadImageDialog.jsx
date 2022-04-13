/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SampleUserImg from "../Images/sample-user.png";
import PropTypes from "prop-types";
import UserService from "../Services/UserService";
import ReactAvatar from "./ReactAvatar";
import { Scrollbars } from "react-custom-scrollbars-2";

export default function UploadImageDialog(props) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(SampleUserImg);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <h6 onClick={handleClickOpen}>Upload a new image</h6>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { width: "100%", height: "80%", alignItems: "center" },
        }}
      >
        <Scrollbars style={{ height: "100%" }}>
          <DialogTitle>Upload Profile Picture</DialogTitle>

          <DialogContent sx={{ textAlign: "center" }}>
            <ReactAvatar />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Scrollbars>
      </Dialog>
    </>
  );
}

UploadImageDialog.propTypes = {
  setImage: PropTypes.func,
};
