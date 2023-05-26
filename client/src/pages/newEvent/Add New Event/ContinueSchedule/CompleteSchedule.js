import React, { useEffect, useState } from "react";
import "../AddNewEvent.scss";
import Back from "../../../../components/Buttons/Back/Back";
import Share from "../../../../components/Buttons/Share/Share";
import DropdownButton from "../../../../components/TImeline/createButton/DropdownButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MeetingTime from "./MeetingTime";
import SetMeetingReminder from "./SetMeetingReminder";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  RESET,
  createEvent,
} from "../../../../redux-app/features/auth/authSlice";

const CompleteSchedule = ({ newEvent }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);

  const { isLoading, isLoggedIn, isSuccess, message, isError, isEvent } =
    useSelector((state) => state.auth);

  useEffect(() => {
    const storedEvent = localStorage.getItem("newEvent");
    if (storedEvent) {
      const parsedEvent = JSON.parse(storedEvent);
      setEvent(parsedEvent);
      setTimeout(() => {
        localStorage.removeItem("newEvent");
      }, 5 * 60 * 1000); // remove after 5 minutes
    } else {
      setEvent(newEvent);
    }
  }, [newEvent]);

  const initialState = {
    start: null,
    end: null,
    duration: null,
    reminder: null,
    newEvent: newEvent || null,
  };

  const [completeMeeting, setCompleteMeeting] = useState(initialState);
  const { start, end, duration, reminder } = completeMeeting;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompleteMeeting((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "start") {
      setCompleteMeeting((prevState) => ({
        ...prevState,
        end: value,
      }));
    }
  };

  const handleDurationChange = (duration) => {
    setCompleteMeeting((prevState) => ({
      ...prevState,
      duration,
    }));
  };

  const handleReminderChange = (reminder) => {
    setCompleteMeeting((prevState) => ({
      ...prevState,
      reminder,
    }));
  };

  const handleSave = (newEvent) => {
    setCompleteMeeting((prevState) => ({
      ...prevState,
      start: newEvent.start,
      end: newEvent.end,
      duration: newEvent.duration,
      reminder: newEvent.reminder,
      newEvent: newEvent,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!start || !end || !duration || !reminder) {
      toast.error("Please fill all input fields.");
      return;
    }

    const {
      value,
      location,
      locationAdd,
      callOption,
      customize,
      eventName,
      meetingDescription,
      selectedUserId,
      meetingId,
    } = newEvent;

    const data = {
      value,
      eventName,
      meetingDescription,
      location,
      locationAdd,
      callOption,
      customize,
      selectedUserId,
      meetingId,
      start,
      end,
      duration,
      reminder,
    };

    // Call newEvent with the data object

    await handleSave(data);
    await dispatch(createEvent(data));
  };
  useEffect(() => {
    if (isEvent) {
      navigate("/timeline");
    }
    dispatch(RESET());
  }, [isEvent, dispatch, navigate, isError]);

  return (
    <>
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
              <div className="--flex-end">
                <div className="buttinnext">
                  <button type="button">Cancel</button>
                </div>
                <div className="buttin">
                  <button type="submit">Next</button>
                </div>
              </div>
            </div>
            <div className="margin-from-top">
              <div className="form-group">
                <label htmlFor="duration">Duration:</label>
                <MeetingTime
                  className="completesche2"
                  onDurationChange={handleDurationChange}
                  placeholder="duration"
                />
              </div>
              <div className="form-group">
                <label htmlFor="start">Start Date:</label>
                <DatePicker
                  selected={completeMeeting.start}
                  onChange={(date) => {
                    const newEndDate = new Date(
                      date.getTime() + (completeMeeting.duration || 0) * 60000
                    );
                    setCompleteMeeting((prevState) => ({
                      ...prevState,
                      start: date,
                      end: newEndDate,
                    }));
                  }}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="yyyy-MM-dd HH:mm"
                  className="completesche"
                  placeholderText="YYYY-MM-DD HH:mm"
                  style={{ width: "150%" }}
                  name="start"
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <label htmlFor="end">End Date:</label>
                <DatePicker
                  selected={completeMeeting.end || null}
                  onChange={(date) =>
                    setCompleteMeeting({ ...completeMeeting, end: date })
                  }
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="yyyy-MM-dd HH:mm"
                  className="completesche"
                  placeholderText="YYYY-MM-DD HH:mm"
                  name="end"
                  disabled={completeMeeting.start === null}
                  style={{ width: "150%" }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="end">Set Reminder:</label>
                <SetMeetingReminder onReminderChange={handleReminderChange} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CompleteSchedule;
