/* eslint-disable react/prop-types */
import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import CircularProgress from "@mui/material/CircularProgress";
import "../Styles/CreateThread.css";
import AuthContext from "../Context/Auth";
import Form from "react-bootstrap/Form";
import ThreadPostService from "../Services/ThreadPostService";

export default function PostReply(props) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(false);
  const [body, setBody] = useState("");
  const [username, setUsername] = useState("");

  const [loading, setLoading] = useState(false);
  const { loggedIn } = useContext(AuthContext);

  const handleClickOpen = () => {
    setUsername(props.username);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => {
    console.log(body);
    setLoading(true);
    setData({
      threadId: props.id,
      body: body,
      username: username,
    });
  };

  function refreshPage() {
    window.location.reload(false);
  }

  useEffect(() => {
    async function createThread(data) {
      await ThreadPostService.create(data).then(() => {
        setLoading(false);
        setOpen(false);
        refreshPage();
      });
    }
    createThread(data);
  }, [data]);

  return (
    <>
      {loggedIn ? (
        <>
          <Button variant="outlined" onClick={handleClickOpen}>
            <h6 style={{ fontSize: "1.5vw" }}>Reply</h6>
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
              sx: { width: "100%", height: "60%", alignItems: "center" },
            }}
          >
            <DialogContent sx={{ width: "100%" }}>
              {loading ? (
                <CircularProgress />
              ) : (
                <>
                  <DialogContentText sx={{ textAlign: "center" }}>
                    Write your reply below
                  </DialogContentText>
                  <Form>
                    <Form.Group className="mt-1" style={{ height: 250 }}>
                      <Form.Control
                        style={{ height: 250, resize: "none" }}
                        type="text"
                        as="textarea"
                        placeholder="Enter text here"
                        onChange={(e) => {
                          setBody(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Form>
                </>
              )}
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleCreate}>Post Reply</Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <>
          <h6>Login/Signup to create a discussion</h6>
        </>
      )}
    </>
  );
}
