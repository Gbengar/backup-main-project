import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { toast } from "react-toastify";
import axios from "axios";
import moment from "moment";
import ReactQuill from "react-quill";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ConstructionIcon from "@mui/icons-material/Construction";
import DOMPurify from "dompurify";
import "react-datepicker/dist/react-datepicker.css";
import "react-quill/dist/quill.snow.css";
import "./style.scss";

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
// Define optionsLocation before using it
const optionsLocation = [
  {
    value: "SetAddress",
    label: "In Person Meeting (Set Address)",
    text: "Set an address or a place",
    icon: <LocationOnIcon style={{ color: "red", fontSize: 25 }} />,
  },
  {
    value: "SetPhoneNumber",
    label: "Phone Call (Set Phone Number)",
    text: "Inbound or Outgoing call",
    icon: <PhoneInTalkIcon style={{ color: "green", fontSize: 25 }} />,
  },
  {
    value: "AskInvitee",
    label: "Ask Invitee for Location",
    text: "My Invitee will set the place",
    icon: <QuestionAnswerIcon style={{ color: "blue", fontSize: 25 }} />,
  },
  {
    value: "SetCustom",
    label: "Custom (Leave Customised Location Details)",
    text: "Leave customised location details",
    icon: <ConstructionIcon style={{ color: "yellow", fontSize: 25 }} />,
  },
];

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
    textAlign: "left",
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

const reminderOptions = [
  { value: 15, label: "15 min" },
  { value: 30, label: "30 min" },
  { value: 60, label: "1 hour" },
  { value: 300, label: "5 hours" },
  { value: 1440, label: "1 day" },
  { value: 10080, label: "1 week" },
];

const EditEventModal = ({ isOpen, onRequestClose, selectedEvent }) => {
  const eventNameRef = useRef(null);

  const [formData, setFormData] = useState({
    startDate: new Date(selectedEvent.start),
    selectedDuration: options.find(
      (option) => option.value === selectedEvent.duration
    ),
    selectedReminder: selectedEvent.reminder
      ? reminderOptions.find(
          (option) => option.value === selectedEvent.reminder
        )
      : null,
    selectedValue: optionsLocation.find(
      (option) => option.value === selectedEvent.value
    ),
    additionalInput: selectedEvent.location || "",
    additionalTextArea: selectedEvent.locationAdd || "",
    isAdditionalInputVisible: false,
    isAdditionalInfoButtonVisible: false,
    isAdditionalTextAreaVisible: false,
    isOptionalInputVisible: false,
    isOptionalCustomVisible: false,
  });

  const reminderRef = useRef(null);
  const meetingDescription = useRef(null);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      startDate: new Date(selectedEvent.start),
      selectedDuration: options.find(
        (option) => option.value === selectedEvent.duration
      ),
      selectedReminder: selectedEvent.reminder
        ? reminderOptions.find(
            (option) => option.value === selectedEvent.reminder
          )
        : null,
      selectedValue: selectedEvent.value
        ? optionsLocation.find((option) => option.value === selectedEvent.value)
        : null,
      additionalInput: selectedEvent.additionalInput || "",
      additionalTextArea: selectedEvent.additionalTextArea || "",
    }));
  }, [selectedEvent]);

  useEffect(() => {
    if (formData.selectedValue) {
      switch (formData.selectedValue.value) {
        case "SetAddress":
          setFormData((prevData) => ({
            ...prevData,
            additionalInput: selectedEvent.location,
            additionalTextArea: selectedEvent.locationAdd,
          }));
          break;
        case "SetPhoneNumber":
          setFormData((prevData) => ({
            ...prevData,
            additionalInput: selectedEvent.callOption,
          }));
          break;
        case "SetCustom":
          setFormData((prevData) => ({
            ...prevData,
            additionalInput: selectedEvent.customize,
          }));
          break;
        case "AskInvitee":
          setFormData((prevData) => ({
            ...prevData,
          }));
          break;
        default:
          break;
      }
    }
  }, [formData.selectedValue, selectedEvent]);

  const handleModalClose = () => {
    onRequestClose();
  };

  const handleSaveClick = () => {
    const endTime = moment(formData.startDate)
      .add(formData.selectedDuration.value, "minutes")
      .toDate();

    const newReminder =
      formData.selectedReminder.value !== selectedEvent.reminder
        ? formData.selectedReminder.value
        : selectedEvent.reminder;

    const updatedEvent = {
      ...selectedEvent,
      duration: formData.selectedDuration.value,
      reminder: newReminder,
      start: formData.startDate,
      end: endTime,
      value: formData.selectedValue.value,
      eventName: eventNameRef.current.value,
      selectedUserId: selectedEvent.selectedUserId,
    };

    switch (formData.selectedValue.value) {
      case "AskInvitee":
        delete updatedEvent.customize;
        delete updatedEvent.location;
        delete updatedEvent.locationAdd;
        delete updatedEvent.callOption;
        break;
      case "SetAddress":
        updatedEvent.location = formData.additionalInput;
        updatedEvent.locationAdd = formData.additionalTextArea;
        delete updatedEvent.callOption;
        delete updatedEvent.customize;
        break;
      case "SetPhoneNumber":
        updatedEvent.callOption = formData.additionalInput;
        delete updatedEvent.location;
        delete updatedEvent.locationAdd;
        delete updatedEvent.customize;
        break;
      case "SetCustom":
        updatedEvent.customize = formData.additionalInput;
        delete updatedEvent.location;
        delete updatedEvent.locationAdd;
        delete updatedEvent.callOption;
        break;
      default:
        break;
    }

    const meetingDescriptionHtml =
      meetingDescription.current.getEditor().root.innerHTML;

    const sanitizedMeetingDescription = DOMPurify.sanitize(
      meetingDescriptionHtml,
      { USE_PROFILES: { html: true } }
    );

    updatedEvent.meetingDescription = sanitizedMeetingDescription;

    axios
      .patch(`${API_URL}updateevent/${selectedEvent._id}`, updatedEvent)
      .then(() => {
        toast.success("Event updated successfully");
        window.location.reload();
        handleModalClose();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Update not successful");
      });
  };

  const handleCancelClick = () => {
    handleModalClose();
  };

  const handleButtonClick = () => {
    setFormData((prevData) => ({
      ...prevData,
      isAdditionalTextAreaVisible: !prevData.isAdditionalTextAreaVisible,
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      style={customModalStyles}
      contentLabel="Edit Event"
      shouldCloseOnOverlayClick={false}
    >
      <h1
        style={{
          fontSize: "8px",
          color: "red",
        }}
      >
        *modal can only be closed on cancel or save button
      </h1>
      <div className="modal-contents">
        <h4>Edit Event</h4>

        <form>
          <div className="form-group">
            <label className="--fw-bold">Event Name</label>
            <input
              type="text"
              defaultValue={selectedEvent.eventName}
              ref={eventNameRef}
            />
          </div>
          <div className="form-group">
            <label className="--fw-bold">Start Date/Time</label>
            <DatePicker
              selected={formData.startDate}
              onChange={(date) =>
                setFormData((prevData) => ({ ...prevData, startDate: date }))
              }
              showTimeSelect
              timeFormat="HH:mm:ss"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </div>

          <div className="form-group">
            <label className="--fw-bold">Location</label>
            <Select
              options={optionsLocation}
              value={formData.selectedValue}
              onChange={(selectedOption) => {
                setFormData((prevData) => ({
                  ...prevData,
                  selectedValue: selectedOption,
                  isAdditionalAddressVisible:
                    selectedOption && selectedOption.value === "SetAddress",
                  isAdditionalInfoButtonVisible:
                    selectedOption && selectedOption.value === "SetAddress",
                  isOptionalInputVisible:
                    selectedOption && selectedOption.value === "SetPhoneNumber",
                  isOptionalCustomVisible:
                    selectedOption && selectedOption.value === "SetCustom",
                }));

                if (selectedOption && selectedOption.value === "AskInvitee") {
                  setFormData((prevData) => ({
                    ...prevData,
                    isAdditionalInputVisible: true,
                    isAdditionalTextAreaVisible: true,
                  }));
                } else {
                  setFormData((prevData) => ({
                    ...prevData,
                    isAdditionalInputVisible: false,
                    isAdditionalTextAreaVisible: false,
                  }));
                }
              }}
              menuPlacement="top"
              styles={style}
            />
          </div>

          {formData.isAdditionalAddressVisible && (
            <div className="form-group">
              <label className="--fw-bold">Additional Address</label>
              <input
                type="text"
                value={formData.additionalInput}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    additionalInput: e.target.value,
                  }))
                }
              />
            </div>
          )}

          {formData.isAdditionalInfoButtonVisible && (
            <label className="onHover" onClick={handleButtonClick}>
              + include additional Information:
            </label>
          )}

          {formData.isAdditionalInfoButtonVisible &&
            formData.isAdditionalTextAreaVisible && (
              <div className="form-group">
                <label className="--fw-bold">
                  Location Additional Information
                </label>
                <textarea
                  rows="5"
                  cols="50"
                  value={formData.additionalTextArea}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      additionalTextArea: e.target.value,
                    }))
                  }
                />
              </div>
            )}

          {formData.isOptionalInputVisible && (
            <div className="form-group">
              <label className="--fw-bold">Optional</label>
              <div className="radio-container">
                <div className="radio-option">
                  <input
                    type="radio"
                    name="optionalInput"
                    value="call_me"
                    checked={formData.additionalInput === "call_me"}
                    onChange={() =>
                      setFormData((prevData) => ({
                        ...prevData,
                        additionalInput: "call_me",
                      }))
                    }
                  />
                  <label>Call Me</label>
                </div>
                <div className="radio-option">
                  <input
                    type="radio"
                    name="optionalInput"
                    value="i_call"
                    checked={formData.additionalInput === "i_call"}
                    onChange={() =>
                      setFormData((prevData) => ({
                        ...prevData,
                        additionalInput: "i_call",
                      }))
                    }
                  />
                  <label>I Call</label>
                </div>
              </div>
            </div>
          )}

          {formData.isOptionalCustomVisible && (
            <div className="form-group">
              <label className="--fw-bold">Custom</label>
              <input
                type="text"
                value={formData.additionalInput}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    additionalInput: e.target.value,
                  }))
                }
              />
            </div>
          )}

          <div className="form-group">
            <label className="--fw-bold">Duration</label>
            <Select
              options={options}
              value={formData.selectedDuration}
              onChange={(selectedOption) =>
                setFormData((prevData) => ({
                  ...prevData,
                  selectedDuration: selectedOption,
                }))
              }
              menuPlacement="top"
              styles={style}
            />
          </div>
          <div className="form-group">
            <label className="--fw-bold">Reminder</label>
            <Select
              options={reminderOptions}
              value={formData.selectedReminder}
              inputRef={reminderRef}
              onChange={(selectedOption) =>
                setFormData((prevData) => ({
                  ...prevData,
                  selectedReminder: selectedOption,
                }))
              }
              menuPlacement="top"
              styles={style}
            />
          </div>

          <div className="form-group">
            <label className="--fw-bold">Description/ Instructions</label>
            <ReactQuill
              modules={modules}
              className="reactQuill"
              defaultValue={selectedEvent.meetingDescription}
              ref={meetingDescription}
            />
          </div>
        </form>

        <div className="save-button">
          <div className="button-container">
            <button className="button-88" onClick={handleCancelClick}>
              Cancel
            </button>
            <button className="button-88" onClick={handleSaveClick}>
              Save
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditEventModal;
