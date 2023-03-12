import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Select from "react-select/async";
import debounce from "debounce-promise";
import Fuse from "fuse.js";

import MenuList from "./MenuList";
import { Link } from "react-router-dom";

const FuzzyReactSelect = ({
  options,
  fuzzyOptions,
  wait,
  placeholder,
  ...props
}) => {
  const [fuse, setFuse] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);

  // use fuse to search
  const searchOptions = (inputValue) =>
    new Promise((resolve) => {
      resolve(fuse.search(inputValue).map((c) => ({ ...c.item })));
    });

  // call promiseOptions
  const loadOptions = (inputValue) => searchOptions(inputValue);

  // debouncer
  const debouncedLoadOptions = debounce(loadOptions, wait);

  useEffect(() => {
    setFuse(new Fuse(options, fuzzyOptions));
    return () => setFuse(null);
  }, [options, fuzzyOptions]);

  useEffect(() => {
    if ((options, fuse)) {
      fuse.setCollection(options);
    }
  }, [fuse, options]);

  const handleSelect = (selectedOption) => {
    setSelectedValue(selectedOption);
    props.onChange(selectedOption); // pass selected value to parent component
  };

  return (
    <Select
      defaultOptions={options}
      {...props}
      isSearchable
      components={{ MenuList }}
      loadOptions={(value) => debouncedLoadOptions(value)}
      value={selectedValue}
      onChange={handleSelect}
      placeholder={placeholder}
    />
  );
};

FuzzyReactSelect.defaultProps = {
  wait: 300,
  placeholder: "Select...",
  onChange: () => {},
};

FuzzyReactSelect.propTypes = {
  options: PropTypes.array.isRequired,
  fuzzyOptions: PropTypes.object.isRequired,
  wait: PropTypes.number,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export default FuzzyReactSelect;
