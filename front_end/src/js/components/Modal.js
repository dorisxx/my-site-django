import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import api from "../apis";

const DeleteWarning =
  "Are u sure that u want to delete this post? This can not be undone!";
const FailedWarning = "Deletion failed";

const AlertModal = props => {
  const [show, setShow] = useState(true);
  const [content, setContent] = useState(DeleteWarning);

  const handleClose = () => setShow(false);

  const handleDelete = () => {
    api
      .delete(`/posts/${props.slug}/`)
      .then(response => {
        if (response.status === 204) {
          location.reload();
          setShow(false);
        }
      })
      .catch(() => {
        setContent(FailedWarning);
      });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AlertModal;
