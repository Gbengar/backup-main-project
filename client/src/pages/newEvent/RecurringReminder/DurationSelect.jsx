import React, { useEffect, useState } from "react";
import Select from "react-select";

const options = [
  { value: "2 months", label: "2 months" },
  { value: "3 months", label: "3 months" },
  { value: "6 months", label: "6 months" },
  { value: "1 year", label: "1 year" },
  { value: "2 years", label: "2 years" },
];

const DurationSelect = ({ onDurationLengthChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (selectedOption) {
      onDurationLengthChange(selectedOption.value);
    }
  }, [selectedOption]);

  const handleChange = (options) => {
    setSelectedOption(options);
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

export default DurationSelect;
