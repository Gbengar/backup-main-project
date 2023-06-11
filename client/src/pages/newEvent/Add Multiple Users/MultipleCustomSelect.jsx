import React, { useCallback, useEffect, useMemo, useState } from "react";
import Select from "react-select";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ConstructionIcon from "@mui/icons-material/Construction";
import "./style.scss";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

Modal.setAppElement("#root");

const options = [
  {
    value: "SetAddress",
    label: "In Person Meeting",
    text: "Set an address or a place",
    icon: <LocationOnIcon style={{ color: "red", fontSize: 25 }} />,
  },
  {
    value: "SetPhoneNumber",
    label: "Phone Call virtual",
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
    label: "Custom",
    text: "Leave customised location details",
    icon: <ConstructionIcon style={{ color: "yellow", fontSize: 25 }} />,
  },
];
const initialState = {
  location: "",
  locationAdd: "",
  callOption: "",
  customize: "",
  aconfirmInvitee: "",
  selectedUser: "",
};

const MultipleCustomSelect = ({ selectedUser, onSave, userData }) => {
  const { user, users } = useSelector(({ auth }) => auth);

  const [selectedOption, setSelectedOption] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState(false);
  const [modalSelectedOption, setModalSelectedOption] = useState(null);
  const [modalOptionSelected, setModalOptionSelected] = useState(false);

  const [newMeeting, setNewMeeting] = useState(initialState);

  const handleModalClose = useCallback(() => {
    setModalIsOpen(false);
  }, []);

  const handleMenuOpen = () => {
    setMenuIsOpen(true);
  };

  const handleMenuClose = () => {
    setMenuIsOpen(false);
  };

  const handleButtonClick = () => {
    setAdditionalInfo((prevState) => !prevState);
  };

  const handleChange = useCallback(
    (selectedOption) => {
      setSelectedOption(selectedOption);
      setIsSelected(true);

      if (!modalIsOpen) {
        setModalIsOpen(true);
        setModalOptionSelected(true);
        setModalSelectedOption(selectedOption);
      }
    },
    [modalIsOpen]
  );

  const handleModalCancelClick = () => {
    setModalSelectedOption(null);
    setModalIsOpen(false);
    setNewMeeting(initialState);
  };

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setNewMeeting({ ...newMeeting, [name]: value });
    },
    [newMeeting]
  );

  const handleSave = useCallback(
    async (combinedObject) => {
      if (selectedOption?.value === "SetAddress") {
        setNewMeeting((prevState) => ({
          ...prevState,
          location: prevState.location,
          locationAdd: additionalInfo ? newMeeting?.locationAdd : "",
        }));
      } else if (selectedOption?.value === "SetPhoneNumber") {
        setNewMeeting((prevState) => ({
          ...prevState,
          callOption: prevState.callOption,
        }));
      } else if (selectedOption?.value === "AskInvitee") {
        setNewMeeting((prevState) => ({
          ...prevState,
          location: "",
          locationAdd: "",
          callOption: "",
        }));
      } else if (selectedOption?.value === "SetCustom") {
        await setNewMeeting((prevState) => ({
          ...prevState,
          customize: prevState.customize,
        }));
      }
    },
    [additionalInfo, newMeeting, selectedOption]
  );

  const handleModalUpdateClick = async () => {
    setSelectedOption(modalSelectedOption);
    setModalOptionSelected(false);
    setModalIsOpen(false);

    const combinedObject = {
      ...modalSelectedOption,
      ...newMeeting,
      selectedUser,
    };

    await handleSave();
    onSave(combinedObject);
  };

  const modalContent = useMemo(() => {
    if (selectedOption?.value === "SetAddress") {
      return (
        <div className="form-group">
          <label>Location:</label>
          <div>
            <input
              className="input-css"
              type="text"
              name="location"
              value={newMeeting?.location}
              onChange={handleInputChange}
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
                name="locationAdd"
                rows="4"
                cols="50"
                type="text"
                value={newMeeting?.locationAdd}
                onChange={handleInputChange}
              ></textarea>
            </div>
          )}

          <div className="--flex-end">
            <div className="buttinnext">
              <button onClick={handleModalCancelClick}>Cancel</button>
            </div>
            {modalOptionSelected && (
              <div className="updatebtn --light-blue">
                <button onClick={handleModalUpdateClick}>Update</button>
              </div>
            )}
          </div>
        </div>
      );
    } else if (selectedOption?.value === "SetPhoneNumber") {
      return (
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
                      name="callOption"
                      value="call_me"
                      checked={newMeeting?.callOption === "call_me"}
                      onChange={handleInputChange}
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
                      name="callOption"
                      value="i_call"
                      checked={newMeeting?.callOption === "i_call"}
                      onChange={handleInputChange}
                    />
                    <h4 htmlFor="i_call" className="modal-label">
                      I will call my Invitee
                    </h4>
                  </div>
                  <div className="modal-span">
                    <span>
                      Applaza requires that your phone number is up-to-date
                      before scheduling. Please confirm your phone number below.
                      If it is not correct, please update it in your profile
                      tab.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {newMeeting?.callOption === "i_call" && modalIsOpen ? (
              <>
                <label>My Phone Number:</label>
                <span>{user.phone}</span>;
              </>
            ) : newMeeting?.callOption === "call_me" && modalIsOpen ? (
              <>
                {selectedUser ? (
                  <>
                    <label>Invitee Phone Number:</label>
                    <span>{selectedUser.phone}</span>
                  </>
                ) : (
                  <p>Select a user first.</p>
                )}
                ;
              </>
            ) : null}
            <div className="--flex-end">
              <div className="buttinnext">
                <button onClick={handleModalCancelClick}>Cancel</button>
              </div>
              {modalOptionSelected && (
                <div className="updatebtn --light-blue">
                  <button onClick={handleModalUpdateClick}>Update</button>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    } else if (selectedOption?.value === "SetCustom") {
      return (
        <div>
          <label>Customize:</label>
          <input
            className="input-css"
            type="text"
            name="customize"
            value={newMeeting?.customize}
            onChange={handleInputChange}
          />

          <div className="--flex-end">
            <div className="buttinnext">
              <button onClick={handleModalCancelClick}>Cancel</button>
            </div>
            {modalOptionSelected && (
              <div className="updatebtn --light-blue">
                <button onClick={handleModalUpdateClick}>Update</button>
              </div>
            )}
          </div>
        </div>
      );
    } else if (selectedOption?.value === "AskInvitee") {
      return (
        <div>
          <h4 style={{ display: "inline-block" }}>
            Are you sure you want Invitee to set the location?
          </h4>
          <div style={{ display: "inline-block", marginLeft: "10px" }}>
            <label>
              <input
                type="radio"
                name="aconfirmInvitee"
                value="yes"
                checked={newMeeting?.aconfirmInvitee === "yes"}
                onChange={handleInputChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="aconfirmInvitee"
                value="no"
                checked={newMeeting?.aconfirmInvitee === "no"}
                onChange={handleInputChange}
              />
              No
            </label>
          </div>
          <div className="--flex-end">
            <div className="buttinnext">
              <button onClick={handleModalCancelClick}>Cancel</button>
            </div>
            {modalOptionSelected && (
              <div className="updatebtn --light-blue">
                <button onClick={handleModalUpdateClick}>Confirm</button>
              </div>
            )}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }, [
    selectedOption,
    additionalInfo,
    newMeeting,
    handleInputChange,
    handleButtonClick,
  ]);
  return (
    <div>
      <Select
        className="select-container"
        placeholder="Select Option"
        value={selectedOption}
        options={options}
        onChange={handleChange}
        onSave={handleSave}
        userData={userData}
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
          shouldCloseOnOverlayClick={false}
          contentLabel={
            modalSelectedOption ? modalSelectedOption.label : "Modal"
          }
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

          <h2>{modalSelectedOption ? modalSelectedOption.label : ""}</h2>
          <p>{modalSelectedOption ? modalSelectedOption.text : ""}</p>

          <div className="moddall">{modalContent}</div>
        </Modal>
      )}
    </div>
  );
};

export default MultipleCustomSelect;
