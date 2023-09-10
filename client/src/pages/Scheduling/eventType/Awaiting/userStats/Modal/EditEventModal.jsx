import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import Select from "react-select";
import DatePicker from "react-datepicker";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import axios from "axios";
import moment from "moment";
import "./style.scss";

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
    height: "450px",
  },
};

const style = {
  control: (base, state, provided) => ({
    ...base,
    ...provided,
    display: "flex",
    width: "100%",
    height: 7,
    fontSize: "15px",
    textAlign: "left", // Center the content horizontally
    border: state.isFocused ? "3px solid black" : "2px solid #808080",
    boxShadow: state.isFocused ? "0" : "0",

    "&:hover": {
      border: state.isFocused ? "3px solid black" : "2px solid #808080",
    },
  }),
  menu: (base) => ({
    ...base,
    marginBottom: "0",
    marginTop: "0",
    position: "absolute",
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),
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

const EditEventModal = ({ isOpen, onRequestClose, selectedEvent }) => {
  const [startDate, setStartDate] = useState(new Date(selectedEvent.start));
  const [selectedDuration, setSelectedDuration] = useState(
    options.find((option) => option.value === selectedEvent.duration)
  );
  const [selectedReminder, setSelectedReminder] = useState(
    selectedEvent.reminder
      ? remiderOption.find((option) => option.value === selectedEvent.reminder)
      : { value: "", label: "" }
  );

  const eventNameRef = useRef(null);
  const reminderRef = useRef(null);
  const momentStartDate = moment(startDate);

  useEffect(() => {
    setStartDate(new Date(selectedEvent.start));
  }, [selectedEvent]);

  const handleModalClose = () => {
    onRequestClose();
  };

  const handleSaveClick = () => {
    const endTime = momentStartDate
      .add(selectedDuration.value, "minutes")
      .toDate();

    // Check if the selectedReminder is different from the event's current reminder
    const newReminder =
      selectedReminder.value !== selectedEvent.reminder
        ? selectedReminder.value
        : selectedEvent.reminder;

    const updatedEvent = {
      ...selectedEvent,
      eventName: eventNameRef.current.value,
      start: startDate,
      end: endTime,
      duration: selectedDuration.value,
      reminder: newReminder, // Use the newReminder value instead of selectedReminder.value
    };

    console.log("Updated Event:", updatedEvent);
    console.log(selectedEvent._id);

    axios
      .patch(`${API_URL}/updateevent/${selectedEvent._id}`, updatedEvent)
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

  if (!selectedEvent) {
    return null; // Render nothing if selectedEvent is not provided
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      style={customModalStyles}
      contentLabel="Edit Event"
    >
      <div className="modal-contents">
        <h4>Edit Event</h4>
        <form>
          <div className="--form-control">
            <label className="--fw-bold ">Event Name</label>
            <input
              type="text"
              defaultValue={selectedEvent.eventName}
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
              styles={style}
              options={remiderOption}
              menuPlacement="top"
            />
          </div>
          <div className="form-group">
            <label>Reminder</label>
            <Select
              styles={style}
              options={remiderOption}
              menuPlacement="top"
            />
            <div className="save-button">
              <Button>Cancel</Button>
              <Button>Save</Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditEventModal;
