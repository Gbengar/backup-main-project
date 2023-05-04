import React, { useState } from "react";
import "./AddNewEvent.scss";
import Back from "../../../components/Buttons/Back/Back";
import Share from "../../../components/Buttons/Share/Share";
import { DropdownButton } from "../../../components/TImeline/createButton/SettingsButton";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomSelect from "./CustomSelect";
import UserFollowing from "./UserFollowing";
import { handleSelectChange } from "./UserFollowing";
import { toast } from "react-toastify";
import Modal from "react-modal";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline"],
    [{ list: "bullet" }, { list: "ordered" }],
    ["link"],
  ],
  history: {
    delay: 2000,
    maxStack: 500,
    userOnly: true,
  },
};

const AddNewEvent = ({ selectedUser }) => {
  const handleSave = (combinedObject) => {
    console.log(combinedObject);
    setMeetingData((prevState) => ({
      ...prevState,
      combinedObject: combinedObject,
    }));
  };

  const initialState = {
    eventName: "",
    meetingDescription: "",
    combinedObject: {},
  };

  const [meetingData, setMeetingData] = useState(initialState);
  const { eventName, meetingDescription, combinedObject } = meetingData;
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    if (!e.target) {
      return;
    }
    const { name, value } = e.target;
    setMeetingData({ ...meetingData, [name]: value });
    console.log(e);
  };

  const handleMeetingDescriptionChange = (value) => {
    setMeetingData({ ...meetingData, meetingDescription: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!eventName || !meetingDescription) {
      return toast.error("All fields are required");
    }
    if (Object.keys(combinedObject).length === 0) {
      return toast.error("Select an invitee and location");
    }

    const data = {
      eventName,
      meetingDescription,
      combinedObject,
    };

    console.log(data);
    setShowModal(false);
    toast.success("Event has been created.");
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleConfirmCancel = () => {
    setMeetingData(initialState);
    setShowModal(false);
    window.location.reload();
  };

  const handleCancelModalClose = () => {
    setShowModal(false);
  };

  const customStyles = {
    content: {
      width: "30%",
      height: "fit-content",
      margin: "auto",
      top: "0",
      bottom: "0",
      left: "0",
      right: "0",
    },
  };

  return (
    <div>
      {showModal && (
        <Modal
          isOpen={showModal}
          onRequestClose={handleCancelModalClose}
          contentLabel="Cancel Modal"
          style={customStyles}
        >
          <div className="Cancelmodal-content">
            <p>Are you sure you want to cancel?</p>
            <div className="Cancelmodal-buttons">
              <button onClick={handleConfirmCancel}>Yes</button>
              <button onClick={handleCancelModalClose}>No</button>
            </div>
          </div>
        </Modal>
      )}

      <div className="tophead">
        <Back />
        <div className="title-container">
          <h3>Add One-on-One Event Type</h3>
        </div>
        <Share />
      </div>
      <div className="settings">
        <DropdownButton />
      </div>
      <div className="container">
        <div className="form-section">
          <form onSubmit={handleSubmit}>
            <div className="section-header">
              <div>
                <h5>What Event is this?</h5>
                <span>What Location</span>
              </div>
              <div className="--flex-end">
                <div className="buttinnext">
                  <button onClick={handleCancel}>Cancel</button>
                </div>
                <div className="buttin">
                  <button type="submit">Next</button>
                </div>
              </div>
            </div>
            <div className="margin-from-top">
              <div className="form-group">
                <label>Event Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="eventName"
                  autoComplete="off"
                  value={eventName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Select Invitee</label>
                <UserFollowing className="newText" onSave={handleSave} />
              </div>

              <div className="form-group">
                <label>Description/ Instructions</label>
                <ReactQuill
                  className="select-container"
                  value={meetingDescription}
                  name="meetingDescription"
                  onChange={handleMeetingDescriptionChange}
                  modules={modules}
                  placeholder="Write a summary and any details your invitee should know about the event"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewEvent;
