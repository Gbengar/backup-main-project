import React, { useEffect, useState } from "react";
import moment from "moment";
import Select from "react-select";
import Back from "../../components/Buttons/Back/Back";
import Share from "../../components/Buttons/Share/Share";
import Card from "../../components/card/Card";
import Button from "@mui/material/Button";
import TimezoneSelector from "./TimezoneSelector";
import CountrySelect from "./CountrySelect";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const time = [
  { value: 12, label: "12h (am/pm)" },
  { value: 24, label: "24h" },
];
const dateformat = [
  { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
  { value: "DD/MM/YYYY", label: "MM/DD/YYYY" },
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
  duration: null,
};

const EventSettings = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completeMeeting, setCompleteMeeting] = useState(initialState);
  const [holidays, setHolidays] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeetingData = async () => {
      if (user && holidays.length > 0) {
        const meetingId = await fetchMeetingId();

        const initialStatesForHolidays = holidays.map((holiday) => {
          const eventDate = moment(holiday.date.iso); // Use iso datetime here

          const hasTimeInfo =
            eventDate.hour() !== 0 ||
            eventDate.minute() !== 0 ||
            eventDate.second() !== 0;

          if (!hasTimeInfo) {
            eventDate.startOf("day");
          }

          const start = eventDate.toDate(); // Convert back to JavaScript Date object
          const end = eventDate.endOf("day").toDate();

          const duration = moment.duration(moment(end).diff(start)).asMinutes();

          return {
            eventName: holiday.name,
            meetingDescription: holiday.description,
            meetingId: meetingId,
            value: holiday.primary_type,
            selectedUserId: user._id,
            start: start,
            end: end,
            reminder: 1440,
            duration: Math.round(duration),
          };
        });

        setCompleteMeeting((prevState) => ({
          ...prevState,
          initialStatesForHolidays: initialStatesForHolidays,
        }));
      }
    };

    fetchMeetingData();
  }, [user, holidays]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (user && holidays.length > 0) {
      const meetingId = await fetchMeetingId();

      const initialStatesForHolidays = holidays.map((holiday) => {
        const eventDate = moment(holiday.date.iso); // Use iso datetime here

        const hasTimeInfo =
          eventDate.hour() !== 0 ||
          eventDate.minute() !== 0 ||
          eventDate.second() !== 0;

        if (!hasTimeInfo) {
          eventDate.startOf("day");
        }

        const start = eventDate.toDate(); // Convert back to JavaScript Date object
        const end = eventDate.endOf("day").toDate();

        const duration = moment.duration(moment(end).diff(start)).asMinutes();

        return {
          eventName: holiday.name,
          meetingDescription: holiday.description,
          meetingId: meetingId,
          value: holiday.primary_type,
          selectedUserId: user._id,
          start: start,
          end: end,
          reminder: 1440,
          duration: Math.round(duration),
        };
      });

      try {
        // Use Promise.all to post all events in parallel
        await Promise.all(
          initialStatesForHolidays.map((holidayData) =>
            axios.post(API_URL + "postevents", holidayData)
          )
        );

        // Handle successful submission
        setIsSubmitting(false);
        toast.success("Events posted successfully!"); // Show success toast
        navigate("/timeline"); // Use navigate to redirect to a success page or any other route you want
      } catch (error) {
        // Handle error if necessary
        setIsSubmitting(false);
        console.error("Error posting events:", error);
        toast.error("Error posting events."); // Show error toast
      }
    }
  };

  const fetchMeetingId = async () => {
    if (user) {
      const response = await axios.post(`${API_URL}meeting`, {
        senderId: user._id,
        receiverId: null,
      });

      return response.data._id;
    }
  };

  const handleSelectCountry = (selectedHolidays) => {
    setHolidays(selectedHolidays);
  };

  return (
    <div className="containersetting">
      <div className="tophead">
        <Back className="--btn:hover" />
        <div className="title-container">
          <h3> Event Settings</h3>
        </div>
        <Share />
      </div>

      <div className="container">
        <div className="form-section">
          <form>
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
                  <button
                    type="submit"
                    className="--btn --btn-primary --btn-block"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Save"}
                  </button>
                </div>
              </div>
            </div>
            <div className="margin-from-top flex-container">
              <div className="flow-left">
                <div className="form-group">
                  <label>Date Format</label>
                  <Select
                    type="text"
                    className="completesche2"
                    name="eventName"
                    options={time}
                    placeholder="Time Format"
                  />
                </div>
              </div>
              <div className="flow-left">
                <div className="form-group">
                  <label>Time Format</label>
                  <Select
                    type="text"
                    className="completesche2"
                    name="eventName"
                    options={dateformat}
                    placeholder="Date Format"
                  />
                </div>
              </div>
            </div>
            <div className="flex-container2">
              <div className="flow-left">
                <div className="form-group">
                  <TimezoneSelector
                    type="text"
                    className="completesche3"
                    name="eventName"
                    options={dateformat}
                    placeholder="Date Format"
                  />
                </div>
              </div>
            </div>
            <div className="flex-container2">
              <div className="flow-left">
                <div className="form-group">
                  <label>Select Country</label>
                  <CountrySelect
                    type="text"
                    className="completesche2"
                    name="eventName"
                    onCountryChange={handleSelectCountry}
                    placeholder="Date Format"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventSettings;
