import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function UploadImageDialog() {
  const [open, setOpen] = useState(false);

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
          sx: { width: "100%", height: "70%", alignItems: "center" },
        }}
      >
        <DialogTitle>Upload Profile Picture</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Drag and Drop an image below or click &apos;Select an image&apos; to
            choose an image from your filesystem
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button>Upload</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
