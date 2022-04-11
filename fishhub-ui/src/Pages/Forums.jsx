import React, { useContext, useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import AuthContext from "../Context/Auth";
import UserService from "../Services/UserService";
import ThreadService from "../Services/ThreadService";
import "../Styles/Forums.css";
import CreateThread from "../Components/CreateThread";
import ReactPaginate from "react-paginate";
import ForumItems from "../Components/ForumItems";

export default function Forums() {
  let itemsPerPage = 3;
  const { loggedIn } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
  });
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [items, setItems] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
  ]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);

  useEffect(() => {
    async function getUser() {
      if (loggedIn) {
        await UserService.get().then((response) => {
          setUserData(response.data);
        });
      }
    }

    getUser();
  }, [loggedIn]);

  useEffect(() => {
    async function getThreads() {
      await ThreadService.getAll().then(() => {});
    }
    setItems([
      {
        topic: "Top 10 Aquarium Fish",
        body: "What are your top 10 aquarium fish in order?",
        createdBy: "623a5c439953b6e23466b3f7",
        createdAt: "2022-04-10T23:15:37.922Z",
        updatedAt: "2022-04-10T23:15:37.922Z",
        id: "62536519e90df7e96ac2e45f",
      },
      {
        topic: "Help sick fish!",
        body: "My sick has small white spots on fins what could they be?",
        createdBy: "623a5c439953b6e23466b3f7",
        createdAt: "2022-04-10T23:16:50.326Z",
        updatedAt: "2022-04-10T23:16:50.326Z",
        id: "62536562b52e49cdc7657648",
      },
    ]);

    getThreads();
  }, []);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <Container className="forum-box">
      <Row className="top-row">
        <Col>
          <h3>fishhub forum</h3>
        </Col>
        <Col className="top-mid-col">
          {loggedIn ? <h3>Welcome {userData.username}</h3> : <></>}
        </Col>
        <Col className="top-right-col">
          <CreateThread username={userData.username} />
        </Col>
      </Row>
      <Row>
        <Col>User</Col>
        <Col xs={7}>Topic</Col>
        <Col>Replies</Col>
        <Col>Posted On</Col>
      </Row>
      <ForumItems currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next →"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="← Previous"
        renderOnZeroPageCount={null}
        activeClassName={"pagination__link--active"}
        disabledClassName={"pagination__link--disabled"}
        nextLinkClassName={"pagination__link"}
        previousLinkClassName={"pagination__link"}
        containerClassName={"pagination"}
      />
    </Container>
  );
}
