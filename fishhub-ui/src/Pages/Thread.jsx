import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ThreadPostService from "../Services/ThreadPostService";
import ThreadService from "../Services/ThreadService";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ThreadPost from "../Components/ThreadPost";
import ThreadComment from "../Components/ThreadComment";
import "../Styles/Thread.css";
import PostReply from "../Components/PostReply";

export default function Thread() {
  const { id } = useParams();
  const [threadPosts, setThreadPosts] = useState([]);
  const [thread, setThread] = useState({
    username: "",
  });
  const [topic, setTopic] = useState("");

  useEffect(() => {
    async function getThreadPosts() {
      await ThreadPostService.getAll(id).then((response) => {
        setThreadPosts(response.data);
      });
    }

    getThreadPosts();
  }, [id]);

  useEffect(() => {
    async function getThread() {
      await ThreadService.getOne(id).then((response) => {
        setThread(response.data);
        setTopic(response.data.topic);
      });
    }

    getThread();
  }, []);
  return (
    <Container style={{ backgroundColor: "#151a24" }}>
      <Row className="m-3 mb-0">
        <h2 style={{ color: "#dcdcdc" }}>{topic}</h2>
      </Row>
      <Container className="content-container">
        <Row>
          <ThreadPost data={thread} />
        </Row>
        {threadPosts.map((threadPost) => (
          <Row key={threadPost.id}>
            <ThreadComment data={threadPost} />
          </Row>
        ))}
        <Row className="mt-2">
          <Col sm={11}></Col>
          <Col sm={1}>
            <PostReply username={thread.username} id={thread.id} />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
