import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ThreadPostService from "../Services/ThreadPostService";
import ThreadService from "../Services/ThreadService";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ThreadPost from "../Components/ThreadPost";
import ThreadComment from "../Components/ThreadComment";

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
        setTopic("thread.topic");
      });
    }

    getThread();
  }, []);
  return (
    <Container>
      <Row>
        <h1>{topic}</h1>
      </Row>
      <Row>
        <ThreadPost data={thread} />
      </Row>
      {threadPosts.map((threadPost) => (
        <Row key={threadPost.id}>
          <ThreadComment data={threadPost} />
        </Row>
      ))}
    </Container>
  );
}
