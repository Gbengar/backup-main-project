import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUsers } from "../../redux-app/features/auth/authSlice";
import FuzzyReactSelect from "./FuzzyReactSelect";
import { useHistory } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";

const SearchFilter = () => {
  const [selectValue, setSelectValue] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();

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
    if (selectedOption) {
      const userId = selectedOption.value;
      console.log("handleChange", userId);
      setSelectValue(userId);
      // Navigate to link using useHistory from react-router-dom
      navigate(`/profile/${userId}`);
    } else {
      setSelectValue("");
    }
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      cursor: "pointer",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      cursor: "pointer",
    }),
    option2: (provided, state) => ({
      ...provided,
      color: "red",
    }),
    option3: (provided, state) => ({
      ...provided,
      borderRadius: 0,
      colors: {
        ...provided.colors,
        primary25: "hotpink",
        primary: "black",
      },
    }),
  };
  return (
    <div className="topbarCenter">
      <FuzzyReactSelect
        options={pickedMockdata}
        fuzzyOptions={fuzzyOptions}
        onChange={handleChange}
        styles={customStyles}
        autoCorrect="off"
        spellCheck="off"
        placeholder="Search..."
        value={selectValue}
      />
    </div>
  );
};

export default SearchFilter;
