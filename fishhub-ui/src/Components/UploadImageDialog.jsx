/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SampleUserImg from "../Images/sample-user.png";
import AvatarEditor from "react-avatar-editor";
import PropTypes from "prop-types";
import UserService from "../Services/UserService";

export default function UploadImageDialog(props) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(SampleUserImg);
  const [allowZoomOut, setAllowZoomOut] = useState({ x: 0.5, y: 0.5 });
  const [position, setPosition] = useState(false);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [borderRadius, setBorderRadius] = useState(0);
  const [preview, setPreview] = useState(null);
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNewImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleScale = (e) => {
    setScale(parseFloat(e.target.value));
  };

  const handlePositionChange = (position) => {
    setPosition(position);
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
            Drag and Drop an image below or select &apos;Upload&apos; to choose
            an image from your filesystem
          </DialogContentText>
          <AvatarEditor
            scale={parseFloat(scale)}
            width={width}
            height={height}
            position={position}
            onPositionChange={handlePositionChange}
            rotate={parseFloat(rotate)}
            borderRadius={width / (100 / borderRadius)}
            image={image}
          />
          <input name="newImage" type="file" onChange={handleNewImage} />
          Zoom:
          <input
            name="scale"
            type="range"
            onChange={handleScale}
            min={allowZoomOut ? "0.1" : "1"}
            max="2"
            step="0.01"
            defaultValue="1"
          />
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
