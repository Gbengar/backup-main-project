import React from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import axios from "axios";
import Button from "@mui/material/Button";

import "./createButtonn.scss";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/users/`;

const customModalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 99999,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "200px", // Adjust the width to your preference
    height: "100px", // Adjust the height to your preference
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
};

const DeleteModal = ({ event, onClose }) => {
  const handleModalClose = () => {
    onClose();
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`${API_URL}/eventdelete/${event._id}`)
      .then(() => {
        // Delete the meeting after deleting the event
        axios
          .delete(`${API_URL}/meetingdelete/${event.meetingId}`)
          .then(() => {
            toast.success("Event deleted successfully");
            handleModalClose();
            window.location.reload(); // Refresh the page
          })
          .catch((error) => {
            console.log(error);
            toast.error("Delete not successful");
          });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Delete not successful");
      });
  };

  const handleCancelClick = () => {
    handleModalClose();
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={handleModalClose}
      style={customModalStyles}
      shouldCloseOnOverlayClick={false}
      contentLabel="Delete Event Confirmation"
    >
      <div className="modal-content2">
        <h4 className="delete-modal-title">Are you sure?</h4>
        <div className="save-button">
          <Button className="delete-modal-button" onClick={handleCancelClick}>
            No
          </Button>
          <Button
            className="delete-modal-button delete-confirm-button"
            onClick={handleConfirmDelete}
          >
            Yes
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
