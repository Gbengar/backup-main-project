import React, { useEffect, useState } from "react";
import Select from "react-select";
import { RRule } from "rrule";

const options = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "bi-weekly", label: "Bi-weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

const RecurringSelect = ({ onRecurringChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (selectedOption) {
      const rule = createRRule(selectedOption.value);
      onRecurringChange(rule);
    }
  }, [selectedOption]);

  const handleChange = (option) => {
    setSelectedOption(option);
  };

  const createRRule = (optionValue) => {
    const frequencyMap = {
      daily: RRule.DAILY,
      weekly: RRule.WEEKLY,
      "bi-weekly": RRule.WEEKLY,
      monthly: RRule.MONTHLY,
      yearly: RRule.YEARLY,
    };

    const untilMap = {
      daily: 3, // Set until value to 3 months for daily recurring events
      weekly: 3, // Set until value to 3 months for weekly recurring events
      "bi-weekly": 3, // Set until value to 3 months for bi-weekly recurring events
      monthly: 2, // Set until value to 2 years for monthly recurring events
      yearly: 5, // Set until value to 5 years for yearly recurring events
    };

    const frequency = frequencyMap[optionValue];
    const until = new Date();
    until.setFullYear(until.getFullYear() + untilMap[optionValue]);

    return new RRule({
      freq: frequency,
      dtstart: new Date(),
      until: until,
    });
  };

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      menuShouldScrollIntoView={true}
      options={options}
      className="select-container"
      isSearchable={false}
      isClearable={false}
    />
  );
};

export default RecurringSelect;
