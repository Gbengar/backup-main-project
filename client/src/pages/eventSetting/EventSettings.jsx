import React, { useState } from "react";
import Back from "../../components/Buttons/Back/Back";
import Share from "../../components/Buttons/Share/Share";
import Card from "../../components/card/Card";
import "./style.scss";
import Button from "@mui/material/Button";
import Select from "react-select";
import TimezoneSelector from "./TimezoneSelector";
import CountrySelect from "./CountrySelect";

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
  duration: null, // Add duration state variable
};
const EventSettings = () => {
  const [isSubmitting, setIsSubmitting] = useState(false); // Add a state to track form submission
  const [completeMeeting, setCompleteMeeting] = useState(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(false);
  };

  const handleSelectCountry = (reminder) => {
    setCompleteMeeting((prevState) => ({
      ...prevState,
      reminder,
    }));
  };
  console.log("Reminder:", completeMeeting.reminder);

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
