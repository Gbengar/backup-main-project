import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./style.scss";
import Back from "../../../components/Buttons/Back/Back";
import Share from "../../../components/Buttons/Share/Share";
import DropdownButton from "../../../components/TImeline/createButton/DropdownButton";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../../redux-app/features/auth/authSlice";
import RecurringSelect from "./RecurringSelect";

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

const options = [
  { value: 5, label: "5 min" },
  { value: 10, label: "10 min" },
  { value: 15, label: "15 min" },
  { value: 30, label: "30 min" },
  { value: 45, label: "45 min" },
  { value: 60, label: "1 hour" },
];

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/users/`;

const initialState = {
  eventName: "",
  meetingDescription: "",
  meetingId: "",
  value: "Reminder",
  selectedUserId: null,
  start: null,
  end: null,
  reminder: null,
  duration: null, // Add duration state variable
  recurring: null, // Add recurring state variable
};

const RecurringReminder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );

  const [completeMeeting, setCompleteMeeting] = useState(initialState);
  const [isDurationChanged, setIsDurationChanged] = useState(false);

  const {
    eventName,
    meetingDescription,
    meetingId,
    value,
    selectedUserId,
    start,
    end,
    reminder,
    duration,
    recurring,
  } = completeMeeting;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompleteMeeting((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleMeetingDescriptionChange = (value) => {
    setCompleteMeeting((prevState) => ({
      ...prevState,
      meetingDescription: value,
    }));
  };

  const handleDurationChange = (selectedOption) => {
    const durationInMinutes = selectedOption.value;
    const newEnd = new Date(start.getTime() + durationInMinutes * 60000);
    setCompleteMeeting((prevState) => ({
      ...prevState,
      duration: selectedOption,
      end: newEnd,
    }));
    setIsDurationChanged(true);
  };

  const handleReminderChange = (reminder) => {
    setCompleteMeeting((prevState) => ({
      ...prevState,
      reminder,
    }));
  };

  const handleRecurringChange = (selectedOption) => {
    setCompleteMeeting((prevState) => ({
      ...prevState,
      recurring: selectedOption,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!start || !end || !duration || !reminder || !recurring) {
      toast.error("Please fill all input fields.");
      return;
    }

    const { location, locationAdd, callOption, customize } = completeMeeting;

    const durationValue = duration ? duration.value : null;

    const data = {
      value: recurring ? "Recurring" : "SetReminder",
      eventName,
      meetingDescription,
      location,
      locationAdd,
      callOption,
      customize,
      selectedUserId: user._id,
      meetingId,
      start,
      end: new Date(start.getTime() + duration.value * 60000),
      aReminder: "null",
      duration: durationValue,
      reminder,
    };

    await handleSave(data);
    await dispatch(createEvent(data)); // Call newEvent with the data object
  };

  const handleSave = (newEvent) => {
    // Save the event data
    console.log(newEvent);
  };

  useEffect(() => {
    const fetchMeetingId = async () => {
      if (user) {
        const members = [user._id, user._id];
        const response = await axios.post(`${API_URL}meeting`, {
          senderId: user._id,
          receiverId: null,
        });
        setCompleteMeeting((prevState) => ({
          ...prevState,
          meetingId: response.data._id,
        }));
        console.log(response.data._id);
        console.log(members);
      }
    };

    if (isDurationChanged) {
      fetchMeetingId();
    }
  }, [isDurationChanged, user]);

  return (
    <div>
      <div className="tophead">
        <Back />
        <div className="title-container">
          <h3>Single Schedule</h3>
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
                  <button>Cancel</button>
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
            </div>
            <div className="form-group">
              <label>Description/ Instructions</label>
              <ReactQuill
                className="select-container"
                name="meetingDescription"
                modules={modules}
                placeholder="Write a summary and any details your invitee should know about the event"
                value={meetingDescription}
                onChange={handleMeetingDescriptionChange}
              />
            </div>
            <div className="form-group">
              <label>Date Picker</label>
              <DatePicker
                selected={start}
                onChange={(date) => {
                  const newEndDate = new Date(
                    date.getTime() + (duration || 0) * 60000
                  );
                  setCompleteMeeting((prevState) => ({
                    ...prevState,
                    start: date,
                    end: newEndDate,
                  }));
                }}
                showTimeSelect
                dateFormat="Pp"
              />
            </div>
            <div className="form-group">
              <label>Duration</label>
              <RecurringSelect
                options={options}
                value={duration}
                onChange={handleDurationChange}
              />
            </div>
            <div className="form-group">
              <label>Reminder</label>
              <RecurringSelect
                options={options}
                value={reminder}
                onChange={handleReminderChange}
              />
            </div>
            <div className="form-group">
              <label>Recurring</label>
              <RecurringSelect
                options={options}
                value={recurring}
                onChange={handleRecurringChange}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecurringReminder;
