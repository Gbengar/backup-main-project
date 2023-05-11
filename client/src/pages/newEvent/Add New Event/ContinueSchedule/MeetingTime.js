import React, { useEffect, useState } from "react";
import "../AddNewEvent.scss";
import Select from "react-select";

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
  { label: "Custom", value: "custom" },
];

const MeetingTime = ({ onDurationChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (selectedOption && selectedOption.value !== "custom") {
      onDurationChange(selectedOption.value);
    }
  }, [selectedOption, onDurationChange]);

  const handleChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <Select
      options={options}
      value={selectedOption}
      onChange={handleChange}
      className="select-container"
    />
  );
};

export default MeetingTime;
