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

export default function UploadImageDialog(props) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(SampleUserImg);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpload = async () => {
    await convertBase64(image).then((base64) => {
      let data = {
        avatar: base64,
      };

      UserService.uploadAvatar(data).then(() => {
        setOpen(false);
      });
    });
  };

  // taken from https://github.com/Rinlama/react-howtoseries/blob/imagetobase64Tut/src/App.js
  const convertBase64 = (file) => {
    console.log(file);
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <>
      <h6 onClick={handleClickOpen}>Upload a new image</h6>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { width: "100%", height: "70%", alignItems: "center" },
        }}
      >
        <DialogTitle>Upload Profile Picture</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Drag and Drop an image below or select &apos;Choose file&apos; to
            choose an image from your filesystem
          </DialogContentText>
          <ReactAvatar />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpload}>Upload</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

UploadImageDialog.propTypes = {
  setImage: PropTypes.func,
};
