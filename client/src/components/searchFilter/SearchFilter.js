import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUsers } from "../../redux-app/features/auth/authSlice";
import FuzzyReactSelect from "./FuzzyReactSelect";

const SearchFilter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const { users, isLoading, isLoggedIn, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const pickedMockdata = users.map((data) => ({
    ...data,
    label: data["name"],
    value: data._id,
  }));

  // fuze.js options
  const fuzzyOptions = {
    keys: [
      { name: "name", weight: 0.7 },
      { name: "email", weight: 0.5 },
    ],
    valueKey: "name",
    maxPatternLength: 8,
    includeScore: true,
    maxResults: 25,
    threshold: 0.3,
  };

  const handleChange = (selectedOption) => {
    console.log("handleChange", selectedOption.value);
  };
  return (
    <div className="topbarCenter">
      <FuzzyReactSelect
        options={pickedMockdata}
        fuzzyOptions={fuzzyOptions}
        onChange={handleChange}
        autoCorrect="off"
        spellCheck="off"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchFilter;
