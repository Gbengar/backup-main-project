import React from "react";
import Select from "react-select";

const RecurringSelect = ({ options, value, onChange }) => {
  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      className="select-container"
      isSearchable={false}
      isClearable={false}
    />
  );
};

export default RecurringSelect;
