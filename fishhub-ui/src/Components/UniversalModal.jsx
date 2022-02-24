import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";

export default function UniversalModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={props.show || show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.body}</Modal.Body>
        <Modal.Footer>{props.footer}</Modal.Footer>
      </Modal>
    </>
  );
}

UniversalModal.propTypes = {
  show: PropTypes.bool,
  title: PropTypes.string,
  body: PropTypes.string,
  footer: PropTypes.string,
};
