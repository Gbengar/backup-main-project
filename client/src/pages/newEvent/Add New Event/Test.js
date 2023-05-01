import React, { useState } from "react";
import Select from "react-select";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import "./AddNewEvent.scss";
import Modal from "react-modal";

Modal.setAppElement("#root");

const CustomSelect = ({ selectedUser }) => {
  if (selectedUser && selectedUser.phone) {
    console.log(selectedUser.phone);
  }

  const options = [
    {
      value: "newOption1",
      label: "In Person Meeting",
    },
    {
      value: "newOption3",
      label: "Ask Invitee for Location",
    },
  ];

  const [selectedOption, setSelectedOption] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState(false);
  const [modalSelectedOption, setModalSelectedOption] = useState(null);
  const [modalOptionSelected, setModalOptionSelected] = useState(false);

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleButtonClick = () => {
    setAdditionalInfo((prevState) => !prevState);
  };

  const handleModalOptionChange = (selectedOption) => {
    setModalSelectedOption(selectedOption);
  };

  const handleModalUpdateClick = () => {
    setSelectedOption(modalSelectedOption);
    setModalOptionSelected(true);
    setModalIsOpen(false);
  };

  const handleModalCancelClick = () => {
    setModalSelectedOption(null);
    setModalIsOpen(false);
  };

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setIsSelected(true);
    if (selectedOption.value === "newOption3") {
      setModalOptionSelected(true);
    } else {
      setModalIsOpen(true);
    }
  };

  let modalContent;
  if (selectedOption?.value === "newOption1") {
    modalContent = (
      <div className="form-group">
        <label>Location:</label>
        <div>
          <input
            className="input-css"
            type="text"
            value={location}
            onChange={handleLocationChange}
          />
        </div>
        <br />

        {additionalInfo ? null : (
          <label className="onHover" onClick={handleButtonClick}>
            + include additional Information:
          </label>
        )}

        {additionalInfo && (
          <div>
            <textarea
              placeholder="Type here..."
              className="input-css"
              rows="4"
              cols="50"
            ></textarea>
          </div>
        )}

        <div className="--flex-end">
          <div className="buttinnext">
            <button onClick={handleModalCancelClick}>Cancel</button>
          </div>
          {additionalInfo && modalOptionSelected && (
            <div className="updatebtn --light-blue">
              <button onClick={handleModalUpdateClick}>Update</button>
            </div>
          )}
        </div>
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
        menuPortalTarget={document.body}
      />
      {isSelected && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleModalClose}
          shouldCloseOnOverlayClick={false}
        >
          <h3>Location :</h3>
          <Select value={selectedOption} onChange={handleModalOptionChange} />
          <div className="moddall">{modalContent}</div>
        </Modal>
      )}
    </div>
  );
};

export default CustomSelect;
