import React, { useEffect, useState } from "react";
import "./style.scss";
import Back from "../../../components/Buttons/Back/Back";
import Share from "../../../components/Buttons/Share/Share";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import MultipleUserFollowing from "./MultipleUserFollowing";
import { toast } from "react-toastify";
import Modal from "react-modal";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DropdownButton from "../../../components/TImeline/createButton/DropdownButton";

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

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/users/`;

const NewEventMultipleUsers = ({ setIsAccessed, setNewEvent }) => {
  const { user, users, isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();

  const handleSave = (combinedObject) => {
    console.log(combinedObject);
    setMeetingData({
      ...meetingData,
      combinedObject: combinedObject,
    });
  };

  const initialState = {
    eventName: "",
    meetingDescription: "",
    combinedObject: {},
    meetingId: "",
  };

  const [meetingData, setMeetingData] = useState(initialState);
  const { eventName, meetingDescription, combinedObject } = meetingData;
  const [showModal, setShowModal] = useState(false);
  const [meetingId, setMeetingId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // add state variable

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!eventName || !meetingDescription) {
      return toast.error("All fields are required");
    }
    if (Object.keys(combinedObject).length === 0) {
      return toast.error("Select an invitee and location");
    }

    const { value, text, location, locationAdd, callOption, customize } =
      combinedObject;

    const selectedUserIds = combinedObject.selectedUser.map((user) => user._id);

    const data = {
      value,
      eventName,
      meetingDescription,
      text,
      location,
      locationAdd,
      callOption,
      customize,
      selectedUserId: selectedUserIds,
      meetingId: "", // Initialize meetingId as an empty string
    };

    setShowModal(false);

    try {
      setIsSubmitting(true);

      const receiverId = combinedObject.selectedUser.map((user) => user._id);

      if (user && receiverId.length > 0) {
        const members = [user._id, ...receiverId];
        const response = await axios.post(`${API_URL}meeting`, {
          senderId: user._id,
          receiverId: receiverId,
        });
        data.meetingId = response.data._id; // Set the meetingId in the data object
        console.log(response.data._id);
        console.log(members);
      }

      await handleSave(data);

      setIsSubmitting(false);
      setNewEvent(data);
      navigate("/completeSchedule");

      localStorage.setItem("newEvent", JSON.stringify(data));
      setTimeout(() => {
        localStorage.removeItem("newEvent");
      }, 5 * 60 * 1000);
    } catch (error) {
      setIsSubmitting(false);
      console.log(error);
      toast.error("Error creating event.");
    }
  };

  const setMeetingIdFunction = async () => {
    const receiverId = combinedObject.selectedUser?._id;

    if (user && receiverId) {
      const members = [user._id, receiverId];
      try {
        const response = await axios.post(`${API_URL}meeting`, {
          senderId: user._id,
          receiverId: receiverId,
        });
        setMeetingId(response.data._id);
        console.log(response.data._id);
        console.log(members);
      } catch (error) {
        console.log(error);
      }
    }
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
                <MultipleUserFollowing
                  className="newText"
                  onSave={handleSave}
                />
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

export default NewEventMultipleUsers;
