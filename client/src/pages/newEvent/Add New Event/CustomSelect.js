import React, { useState } from "react";
import Select from "react-select";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import "./AddNewEvent.scss";

const CustomSelect = () => {
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

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setIsSelected(true);
  };

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
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
      />
      {isSelected && (
        <div style={{ marginTop: 20, lineHeight: "25px" }}>
          <b>Selected Option:</b> {selectedOption.value}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
