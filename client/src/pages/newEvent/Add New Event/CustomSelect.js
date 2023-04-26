import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import "./AddNewEvent.scss";
import Modal from "react-modal";
import { useSelector } from "react-redux";

Modal.setAppElement("#root");

const CustomSelect = ({ selectedUser }) => {
  const { isLoading, isLoggedIn, isSuccess, message, user, users } =
    useSelector((state) => state.auth);

  if (selectedUser && selectedUser.phone) {
    console.log(selectedUser.phone);
  }

  const selectRef = useRef(null);

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

  const [selectedOption, setSelectedOption] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [inviteeLocation, setInviteeLocation] = useState("");
  const [callOption, setCallOption] = useState(null);

  const handleModalOpen = () => {
    if (!modalIsOpen) {
      setModalIsOpen(true);
    }
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setIsSelected(true);
    handleModalOpen();
  };

  const handleMenuOpen = () => {
    setMenuIsOpen(true);
  };

  const handleMenuClose = () => {
    setMenuIsOpen(false);
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
        <label>Location:</label>
        <input
          className="input-css"
          type="text"
          value={location}
          onChange={handleLocationChange}
        />
      </div>
    );
  } else if (selectedOption?.value === "newOption2") {
    modalContent = (
      <div>
        <div>
          <label>Call Option:</label>
          <div>
            <div className="modal-call">
              <div className="modal-content">
                <div className="modal-row">
                  <input
                    type="radio"
                    id="call_me"
                    name="call_option"
                    value="call_me"
                    onChange={handleCallOptionChange}
                    checked={callOption === "call_me"}
                  />
                  <h4 htmlFor="call_me" className="modal-label">
                    My Invitee should call me
                  </h4>
                </div>
                <div className="modal-span">
                  <span>
                    Calendly will require your invitee’s phone number before
                    scheduling.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="modal-call">
              <div className="modal-content">
                <div className="modal-row">
                  <input
                    type="radio"
                    id="i_call"
                    name="call_option"
                    value="i_call"
                    onChange={handleCallOptionChange}
                    checked={callOption === "i_call"}
                  />
                  <h4 htmlFor="i_call" className="modal-label">
                    I will call my Invitee
                  </h4>
                </div>
                <div className="modal-span">
                  <span>
                    Applaza requires that your phone number is up-to-date before
                    scheduling. Please confirm your phone number below. If it is
                    not correct, please update it in your profile tab.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {callOption === "i_call" && modalIsOpen ? (
            <>
              <label>My Phone Number:</label>
              <span>{user.phone}</span>
              <div className="--flex-end ">
                <div className="buttinnext">
                  <button>Cancel</button>
                </div>
                <div className="updatebtn --light-blue">
                  <button>Update</button>
                </div>
              </div>
              ;
            </>
          ) : callOption === "call_me" && modalIsOpen ? (
            <>
              {selectedUser ? (
                <>
                  <label>Invitee Phone Number:</label>
                  <span>{selectedUser.phone}</span>
                </>
              ) : (
                <p>Select a user first.</p>
              )}
              <div className="--flex-end">
                <div className="buttinnext">
                  <button>Cancel</button>
                </div>
                <div className="updatebtn --light-blue">
                  <button>Update</button>
                </div>
              </div>
              ;
            </>
          ) : null}
        </div>
      </div>
    );
  } else if (selectedOption?.value === "newOption3") {
    modalContent = (
      <div>
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
        getOptionLabel={(option) => {
          const isSelectedOption =
            selectedOption && selectedOption.value === option.value;
          const iconStyle = isSelectedOption
            ? { color: option.icon.props.style.color, fontSize: 15 }
            : option.icon.props.style;
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                marginRight: 10, // added margin
              }}
            >
              <div style={{ height: "150%", marginRight: 5 }}>
                {React.cloneElement(option.icon, { style: iconStyle })}
              </div>
              <div>
                <div style={{ fontSize: "0.9em", fontWeight: "normal" }}>
                  {option.label}
                </div>
                <div style={{ fontSize: "0.7em" }}>{option.text}</div>
              </div>
            </div>
          );
        }}
        menuPosition="fixed"
        menuPlacement={menuIsOpen ? "bottom" : "top"} // Change menuPlacement based on menuIsOpen
        onMenuOpen={handleMenuOpen} // Add event handler for when menu is opened
        onMenuClose={handleMenuClose}
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          dropdownIndicator: (provided, state) => ({
            ...provided,
            color: "#B5B5B5",
            transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null, // Change rotation based on menuIsOpen
          }),
        }}
      />
      {isSelected && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleModalClose}
          style={{
            content: {
              width: "30%",
              height: "70%",
              margin: "auto",
              backgroundColor: "white",
              borderRadius: "10px",
            },
          }}
        >
          <h3>Location :</h3>
          <Select
            value={selectedOption}
            onChange={handleChange}
            getOptionLabel={(option) => {
              const isSelectedOption =
                selectedOption && selectedOption.value === option.value;
              const iconStyle = isSelectedOption
                ? { color: option.icon.props.style.color, fontSize: 15 }
                : option.icon.props.style;
              return (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    marginRight: 10, // added margin
                  }}
                >
                  <div style={{ height: "150%", marginRight: 5 }}>
                    {React.cloneElement(option.icon, { style: iconStyle })}
                  </div>
                  <div>
                    <div style={{ fontSize: "0.9em", fontWeight: "normal" }}>
                      {option.label}
                    </div>
                    <div style={{ fontSize: "0.7em" }}>{option.text}</div>
                  </div>
                </div>
              );
            }}
            ref={selectRef}
          />
          <div className="moddall">{modalContent}</div>
        </Modal>
      )}
    </div>
  );
};

export default CustomSelect;
