import React, { useEffect, useState } from "react";
import Select from "react-select";

const options = [
  { value: 15, label: "15 min" },
  { value: 30, label: "30 min" },
  { value: 60, label: "1 hour" },
  { value: 300, label: "5 hours" },
  { value: 1440, label: "1 day" },
  { value: 10080, label: "1 week" },
];

const SetRecurringReminder = ({ onReminderChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (selectedOption) {
      onReminderChange(selectedOption.value);
    }
  }, [selectedOption]);

  const handleChange = (options) => {
    setSelectedOption(options);
  };

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      options={options}
      className="completesche2"
      menuShouldScrollIntoView={true} // set this to true to scroll to the top of the menu
      menuPlacement="top" // set this to "top" to place the menu above the select input
    />
  );
};

export default SetRecurringReminder;
