import React, { useState } from "react";
import Select from "react-select";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

const CustomSelect = () => {
  const options = [
    {
      value: "newOption1",
      label: "In Person Meeting",
      text: "Set an address or a place",
      icon: <LocationOnIcon />,
    },
    {
      value: "newOption2",
      label: "Phone Call virtual",
      text: "Inbound or Outgoing call",
      icon: <PhoneInTalkIcon />,
    },
    {
      value: "newOption3",
      label: "Ask Invitee for Location",
      text: "My Invitee will set the place",
      icon: <QuestionAnswerIcon />,
    },
  ];

  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  return (
    <div>
      <Select
        placeholder="Select Option"
        value={selectedOption}
        options={options}
        onChange={handleChange}
        getOptionLabel={(option) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ height: "100%", marginRight: 5 }}>{option.icon}</div>
            <div>
              <div style={{ fontWeight: "bold" }}>{option.label}</div>
              <div style={{ fontSize: "0.8em" }}>{option.text}</div>
            </div>
          </div>
        )}
        menuPlacement="bottom"
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
      />
      {selectedOption && (
        <div style={{ marginTop: 20, lineHeight: "25px" }}>
          <b>Selected Option:</b> {selectedOption.value}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
