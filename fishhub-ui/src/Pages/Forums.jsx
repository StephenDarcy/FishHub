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
import { MdForum } from "react-icons/md";

export default function Forums() {
  let itemsPerPage = 8;
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
      await ThreadService.getAll().then((response) => {
        setItems(response.data);
      });
    }

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
          <h3 style={{ fontSize: "3vw" }}>
            Forums <MdForum />
          </h3>
        </Col>
        <Col className="top-mid-col">
          {loggedIn ? (
            <h3 style={{ fontSize: "3vw" }}>Welcome {userData.username}</h3>
          ) : (
            <></>
          )}
        </Col>
        <Col className="top-right-col">
          <CreateThread username={userData.username} />
        </Col>
      </Row>
      <Row className="headings-row">
        <Col style={{ fontSize: "2vw" }}>User</Col>
        <Col xs={7} style={{ fontSize: "2vw" }}>
          Topic
        </Col>
        <Col style={{ fontSize: "2vw" }}>Replies</Col>
        <Col style={{ fontSize: "2vw" }}>Posted On</Col>
      </Row>
      <Row className="content-row">
        <ForumItems currentItems={currentItems} />
      </Row>
      <Row style={{ paddingTop: "1%" }}>
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
      </Row>
    </Container>
  );
}
