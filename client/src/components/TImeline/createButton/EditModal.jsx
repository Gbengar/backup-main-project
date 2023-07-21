import React, { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import moment from "moment";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { toast } from "react-toastify";
import axios from "axios";
import Button from "@mui/material/Button";
import "./createButtonn.scss";

import "react-datepicker/dist/react-datepicker.css";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/users/`;

const customModalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "400px",
    height: "350px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
};

const options = [
  { label: "15 mins", value: 15 },
  { label: "30 mins", value: 30 },
  { label: "45 mins", value: 45 },
  { label: "1 hour", value: 60 },
  { label: "1 hour 15 mins", value: 75 },
  { label: "1 hour 30 mins", value: 90 },
  { label: "1 hour 45 mins", value: 105 },
  { label: "2 hours", value: 120 },
  { label: "2 hours 15 mins", value: 135 },
  { label: "2 hours 30 mins", value: 150 },
  { label: "2 hours 45 mins", value: 165 },
  { label: "3 hours", value: 180 },
];

const remiderOption = [
  { value: 15, label: "15 min" },
  { value: 30, label: "30 min" },
  { value: 60, label: "1 hour" },
  { value: 300, label: "5 hours" },
  { value: 1440, label: "1 day" },
  { value: 10080, label: "1 week" },
];

const EditModal = ({ event, onEditSuccess, onClose }) => {
  const [startDate, setStartDate] = useState(new Date(event.start));
  const [selectedDuration, setSelectedDuration] = useState(
    options.find((option) => option.value === event.duration)
  );
  const [selectedReminder, setSelectedReminder] = useState(
    event.reminder
      ? remiderOption.find((option) => option.value === event.reminder)
      : { value: "", label: "" }
  );

  const eventNameRef = useRef(null);
  const reminderRef = useRef(null);
  const momentStartDate = moment(startDate);

  useEffect(() => {
    setStartDate(new Date(event.start));
  }, [event]);

  const handleModalClose = () => {
    onClose();
  };

  const handleSaveClick = () => {
    const endTime = momentStartDate
      .add(selectedDuration.value, "minutes")
      .toDate();

    // Check if the selectedReminder is different from the event's current reminder
    const newReminder =
      selectedReminder.value !== event.reminder
        ? selectedReminder.value
        : event.reminder;

    const updatedEvent = {
      ...event,
      eventName: eventNameRef.current.value,
      start: startDate,
      end: endTime,
      duration: selectedDuration.value,
      reminder: newReminder, // Use the newReminder value instead of selectedReminder.value
    };

    console.log("Updated Event:", updatedEvent);
    console.log(event._id);

    axios
      .patch(`${API_URL}/updateevent/${event._id}`, updatedEvent)
      .then(() => {
        toast.success("Event updated successfully");
        handleModalClose();
        window.location.reload(); // Refresh the page
      })
      .catch((error) => {
        console.log(error);
        toast.error("Update not successful");
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
      contentLabel="Edit Event"
    >
      <div className="modal-content">
        <h4>Edit Event</h4>
        <form>
          <div className="form-group">
            <label>Event Name</label>
            <input
              type="text"
              defaultValue={event.eventName}
              ref={eventNameRef}
            />
          </div>
          <div className="form-group">
            <label>Start Date/Time</label>
            <DatePicker
              showTimeSelect
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              timeFormat="HH:mm"
              dateFormat="yyyy-MM-dd HH:mm"
              placeholderText={momentStartDate.format("yyyy-MM-dd HH:mm")}
              renderInput={(params) => (
                <input
                  {...params}
                  placeholder={momentStartDate.format("yyyy-MM-dd HH:mm")}
                />
              )}
            />
          </div>
          <div className="form-group">
            <label>Duration</label>
            <Select
              options={options}
              value={selectedDuration}
              onChange={setSelectedDuration}
              styles={{
                control: (provided) => ({
                  ...provided,
                  height: 7,
                }),
              }}
            />
          </div>
          <div className="form-group">
            <label>Reminder</label>
            <Select
              options={remiderOption}
              value={selectedReminder}
              inputRef={reminderRef} // Assign the ref to the input element
              onChange={setSelectedReminder}
              styles={{
                control: (provided) => ({
                  ...provided,
                  height: 7,
                }),
              }}
            />
            <div className="save-button">
              <Button onClick={handleCancelClick}>Cancel</Button>
              <Button onClick={handleSaveClick}>Save</Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditModal;
