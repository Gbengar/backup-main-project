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
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../../redux-app/features/auth/authSlice";
import { RRule } from "rrule";
import SetRecurringReminder from "./SetRecurringReminder";
import Loader from "../../../components/loader/Loader";
import Button from "@mui/material/Button";

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

const frequencyOptions = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "biweekly", label: "Bi-Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "yearly", label: "Yearly" },
];

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/users/`;

const initialState = {
  eventName: "",
  meetingDescription: "",
  meetingId: "",
  value: "SetRecurring",
  selectedUserId: null,
  start: null,
  end: null,
  reminder: null,
  duration: null, // Add duration state variable
};

const RecurringReminder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );

  const frequencyMap = {
    daily: RRule.DAILY,
    weekly: RRule.WEEKLY,
    biweekly: RRule.WEEKLY,
    monthly: RRule.MONTHLY,
    quarterly: RRule.MONTHLY,
    yearly: RRule.YEARLY,
  };

  const [completeMeeting, setCompleteMeeting] = useState(initialState);
  const [isDurationChanged, setIsDurationChanged] = useState(false);
  const [recurringFrequency, setRecurringFrequency] = useState(null);
  const [recurringUntil, setRecurringUntil] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add a state to track form submission

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!start || !end || !duration || !reminder || !recurringFrequency) {
      toast.error("Please fill all input fields.");
      return;
    }
    setIsSubmitting(true);

    const { location, locationAdd, callOption, customize } = completeMeeting;

    const durationValue = duration ? duration.value : null;
    try {
      const { location, locationAdd, callOption, customize } = completeMeeting;

      let rrule;

      if (recurringFrequency.value === "biweekly") {
        // Bi-Weekly (Once every 2 weeks)

        const dayOfWeek = start.getDay(); // Get the day of the week of the event
        const weekStartDay = 0;

        rrule = new RRule({
          freq: frequencyMap[recurringFrequency.value],
          until: recurringUntil,
          dtstart: start,
          interval: 2, // Set the interval to 2 for bi-weekly
          byweekday: [dayOfWeek === weekStartDay ? 6 : dayOfWeek - 1],
        });
      } else if (recurringFrequency.value === "quarterly") {
        // Quarterly (Once every 3 months)
        rrule = new RRule({
          freq: frequencyMap[recurringFrequency.value],
          until: recurringUntil,
          dtstart: start,
          interval: 3, // Set the interval to 3 for quarterly
        });
      } else {
        // Other frequencies (daily, weekly, monthly, yearly)
        rrule = new RRule({
          freq: frequencyMap[recurringFrequency.value],
          until: recurringUntil,
          dtstart: start,
        });
      }

      const rruleString = rrule.toString();

      const data = {
        value: "SetRecurring",
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
        duration: durationValue,
        reminder,
        rrule: rruleString,
      };

      await dispatch(createEvent(data)); // Dispatch the action and wait for it to finish
      handleSave(data);
      navigate("/timeline");
    } catch (error) {
      console.error("Error occurred during form submission:", error);
      toast.error("An error occurred while submitting the form.");
    } finally {
      setIsSubmitting(false); // Reset isSubmitting after the async operation is completed
    }
  };

  useEffect(() => {
    // Update recurringUntil based on the selected frequency
    if (recurringFrequency) {
      if (
        recurringFrequency.value === "quarterly" ||
        recurringFrequency.value === "yearly"
      ) {
        setRecurringUntil(
          new Date(start.getFullYear() + 5, start.getMonth(), start.getDate())
        );
      } else {
        setRecurringUntil(
          new Date(start.getFullYear() + 2, start.getMonth(), start.getDate())
        );
      }
    }
  }, [recurringFrequency, start]);

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
          <h3>Recurring Schedule/Reminder</h3>
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
                  <Button>Cancel</Button>
                </div>
                <div className="buttin">
                  <Button
                    type="submit"
                    className="--btn --btn-primary --btn-block"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Next"}
                  </Button>
                </div>
              </div>
            </div>

            <div className="margin-from-top flex-container">
              <div className="flow-left">
                <div className="form-group">
                  <label>Event Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="eventName"
                    autoComplete="off"
                    value={eventName}
                    onChange={handleInputChange}
                    placeholder="Event Name"
                  />
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
              </div>
              <div className="flow-right">
                <div className="date-picker-duration">
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
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="yyyy-MM-dd HH:mm"
                      className="completesche"
                      placeholderText="Choose a date and time"
                      name="start"
                      autoComplete="off"
                    />
                  </div>
                  <div className="form-group">
                    <label>Duration:</label>
                    <Select
                      options={options}
                      className="completesche2"
                      menuShouldScrollIntoView={true}
                      menuPlacement="top"
                      onChange={handleDurationChange}
                      placeholder="Select the length of the event"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Reminder:</label>
                  <SetRecurringReminder
                    className="completesche2"
                    onReminderChange={handleReminderChange}
                  />
                </div>
                <div className="form-group">
                  <label>Recurring Frequency:</label>
                  <Select
                    options={frequencyOptions}
                    className="completesche2"
                    menuShouldScrollIntoView={true}
                    menuPlacement="top"
                    value={recurringFrequency}
                    onChange={setRecurringFrequency}
                    placeholder="Set the Frequency of event"
                  />
                </div>
                {recurringFrequency && (
                  <div className="form-group">
                    <label>Recurring Until:</label>
                    <DatePicker
                      selected={recurringUntil}
                      onChange={setRecurringUntil}
                      minDate={new Date()}
                      dateFormat="yyyy-MM-dd"
                      className="completesche"
                      placeholderText="Choose a date"
                      name="recurringUntil"
                      autoComplete="off"
                    />
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecurringReminder;
