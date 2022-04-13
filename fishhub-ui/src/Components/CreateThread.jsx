/* eslint-disable react/prop-types */
import React, { useState, useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import "../Styles/CreateThread.css";
import AuthContext from "../Context/Auth";
import Form from "react-bootstrap/Form";
import ThreadService from "../Services/ThreadService";

export default function CreateThread(props) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(false);
  const [topic, setTopic] = useState("");
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
    console.log(topic, body);
    setLoading(true);
    setData({
      topic: topic,
      body: body,
      username: username,
    });
  };

  useEffect(() => {
    async function createThread(data) {
      await ThreadService.create(data).then(() => {
        setLoading(false);
        setOpen(false);
      });
    }
    createThread(data);
  }, [data]);

  return (
    <>
      {loggedIn ? (
        <>
          <Button variant="outlined" onClick={handleClickOpen}>
            Create a discussion
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
              sx: { width: "100%", height: "60%", alignItems: "center" },
            }}
          >
            <DialogTitle>Start a Discussion</DialogTitle>

            <DialogContent sx={{ width: "100%" }}>
              {loading ? (
                <CircularProgress />
              ) : (
                <>
                  <DialogContentText sx={{ textAlign: "center" }}>
                    Give your discussion a meaningful title and body
                  </DialogContentText>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter discussion topic here"
                        onChange={(e) => {
                          setTopic(e.target.value);
                        }}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" style={{ height: 200 }}>
                      <Form.Label>Body</Form.Label>
                      <Form.Control
                        style={{ height: 200, resize: "none" }}
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
              <Button onClick={handleCreate}>Create</Button>
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
