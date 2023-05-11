import React, { useState } from "react";
import "../AddNewEvent.scss";
import Back from "../../../../components/Buttons/Back/Back";
import Share from "../../../../components/Buttons/Share/Share";
import DropdownButton from "../../../../components/TImeline/createButton/DropdownButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MeetingTime from "./MeetingTime";

const CompleteSchedule = () => {
  const [completeMeeting, setCompleteMeeting] = useState({
    title: "",
    start: null,
    end: null,
  });
  const [duration, setDuration] = useState(null);
  const [customDuration, setCustomDuration] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompleteMeeting({ ...completeMeeting, [name]: value });

    if (name === "start") {
      setCompleteMeeting({ ...completeMeeting, end: value });
    }
  };

  const handleDurationChange = (duration) => {
    if (duration === "custom") {
      setCustomDuration(true);
    } else {
      setCustomDuration(false);
      setDuration(duration);
    }
  };

  const handleStartChange = (date) => {
    if (customDuration) {
      setCompleteMeeting({
        ...completeMeeting,
        start: date,
      });
    } else {
      setCompleteMeeting({
        ...completeMeeting,
        start: date,
        end: duration ? new Date(date.getTime() + duration * 60000) : date,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(completeMeeting);
  };

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
          <form>
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
                <label htmlFor="title">Title:</label>
                <MeetingTime
                  className="newText"
                  onDurationChange={handleDurationChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="start">Start Date:</label>
                <DatePicker
                  selected={completeMeeting.start}
                  onChange={handleStartChange}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="yyyy-MM-dd HH:mm"
                  className="form-control"
                  placeholderText="YYYY-MM-DD HH:mm"
                  name="start"
                />
              </div>
              {!customDuration && (
                <div className="form-group">
                  <label htmlFor="end">End Date:</label>
                  <DatePicker
                    selected={completeMeeting.end || null}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="yyyy-MM-dd HH:mm"
                    className="form-control"
                    placeholderText="YYYY-MM-DD HH:mm"
                    name="end"
                    disabled={completeMeeting.start !== null}
                  />
                </div>
              )}
              {customDuration && (
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
                    className="form-control"
                    placeholderText="YYYY-MM-DD HH:mm"
                    name="end"
                  />
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CompleteSchedule;
