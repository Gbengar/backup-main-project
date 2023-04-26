import React, { useState } from "react";
import Select from "react-select";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import Modal from "react-modal";

const customStyles = {
  content: {
    width: "50%",
    margin: "auto",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
};

Modal.setAppElement("#root");

const Test = () => {
  const options = [
    {
      value: "newOption1",
      label: "In Person Meeting",
      text: "Set an address or a place",
      icon: <LocationOnIcon style={{ color: "red", fontSize: 25 }} />,
    },
    {
      value: "newOption2",
      label: "Phone Call virtual",
      text: "Inbound or Outgoing call",
      icon: <PhoneInTalkIcon style={{ color: "green", fontSize: 25 }} />,
    },
    {
      value: "newOption3",
      label: "Ask Invitee for Location",
      text: "My Invitee will set the place",
      icon: <QuestionAnswerIcon style={{ color: "blue", fontSize: 25 }} />,
    },
  ];

  const callOptions = [
    { value: "call_me", label: "My Invitee should call me" },
    { value: "i_call", label: "I will call my invitee" },
  ];

  const [selectedOption, setSelectedOption] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [inviteeLocation, setInviteeLocation] = useState("");
  const [callOption, setCallOption] = useState(null);

  const handleModalOpen = () => {
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
    setPhoneNumber("");
    if (selectedOption?.value === "newOption3") {
      setInviteeLocation("");
    }
  };

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    handleModalOpen();
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleInviteeLocationChange = (e) => {
    setInviteeLocation(e.target.value);
  };

  const handleCallOptionChange = (e) => {
    setCallOption(e.target.value);
    setPhoneNumber(""); // Reset phone number state
  };

  let modalContent;
  if (selectedOption?.value === "newOption1") {
    modalContent = (
      <div>
        <h2>{selectedOption.label}</h2>
        <label>Location:</label>
        <input type="text" value={location} onChange={handleLocationChange} />
      </div>
    );
  } else if (selectedOption?.value === "newOption2") {
    modalContent = (
      <div>
        <h2>{selectedOption.label}</h2>
        <div>
          <label>Call Option:</label>
          <div>
            <input
              type="radio"
              id="call_me"
              name="call_option"
              value="call_me"
              onChange={handleCallOptionChange}
              checked={callOption === "call_me"}
            />
            <label htmlFor="call_me">My Invitee should call me</label>
          </div>
          <div>
            <input
              type="radio"
              id="i_call"
              name="call_option"
              value="i_call"
              onChange={handleCallOptionChange}
              checked={callOption === "i_call"}
            />
            <label htmlFor="i_call">I will call my invitee</label>
          </div>
          {callOption === "i_call" && modalIsOpen ? (
            <>
              <label>My Phone Number:</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
            </>
          ) : callOption === "call_me" && modalIsOpen ? (
            <>
              <label>Invitee Phone Number:</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
            </>
          ) : null}
        </div>
      </div>
    );
  } else if (selectedOption?.value === "newOption3") {
    modalContent = (
      <div>
        <h2>{selectedOption.label}</h2>
        <label>Invitee Location:</label>
        <input
          type="text"
          value={inviteeLocation}
          onChange={handleInviteeLocationChange}
        />
      </div>
    );
  }

  return (
    <div>
      <Select
        className="select-container"
        placeholder="Select Option"
        value={selectedOption}
        options={options}
        onChange={handleChange}
      />
      {selectedOption && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleModalClose}
          style={customStyles}
        >
          {modalContent}
        </Modal>
      )}
    </div>
  );
};

export default Test;
