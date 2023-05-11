import React, { useEffect, useState } from "react";
import "./AddNewEvent.scss";
import Back from "../../../components/Buttons/Back/Back";
import Share from "../../../components/Buttons/Share/Share";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomSelect from "./CustomSelect";
import UserFollowing from "./UserFollowing";
import { handleSelectChange } from "./UserFollowing";
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

const AddNewEvent = ({ selectedUser }) => {
  const { user, isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();

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

    const data = {
      value,
      eventName,
      meetingDescription,
      text,
      location,
      locationAdd,
      callOption,
      customize,
      selectedUserId: combinedObject.selectedUser._id,
      meetingId,
    };

    setShowModal(false);

    try {
      setIsSubmitting(true);
      const res = await axios.post(`${API_URL}createeventSetup`, data);
      console.log(res.data);
      setMeetingData({ ...meetingData, meetingId: res.data._id });
      setIsSubmitting(false);
      toast.success("Event has been created.");
      navigate("/completeSchedule");

      // move toast.success call here
    } catch (error) {
      setIsSubmitting(false);
      console.log(error);
      toast.error("Error creating event.");
    }
    console.log(combinedObject.selectedUser._id);
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

  useEffect(() => {
    const setMeeting = async () => {
      if (user && combinedObject.selectedUser) {
        try {
          const members = [user._id, combinedObject.selectedUser._id];
          const res = await axios.post(`${API_URL}meeting`, { members });
          setMeetingId(res.data._id);
          console.log(res.data._id);
        } catch (error) {
          console.log(error);
        }
      }
    };
    setMeeting();
  }, [user, combinedObject.selectedUser]);

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
