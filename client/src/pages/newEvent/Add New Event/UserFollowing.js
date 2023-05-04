import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, getUsers } from "../../../redux-app/features/auth/authSlice";
import Select from "react-select";
import "./AddNewEvent.scss";
import CustomSelect from "./CustomSelect";

export const handleSelectChange = (selectedOption, users, setSelectedUser) => {
  const selectedUserId = selectedOption.value;
  const selectedUser = users.find((user) => user._id === selectedUserId);
  setSelectedUser(selectedUser);
};

const UserFollowing = ({ onSave }) => {
  const dispatch = useDispatch();
  const { isLoading, isLoggedIn, isSuccess, message, user, users } =
    useSelector((state) => state.auth);

  const [followingUserNames, setFollowingUserNames] = useState([]);
  const [menuIsOpen, setMenuIsOpen] = useState(false); // Add state for menuIsOpen
  const [selectedUser, setSelectedUser] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    dispatch(getUser());
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (user && users) {
      const followingUsers = user.followings;
      const followingUserNames = users
        .filter((u) => followingUsers.includes(u._id))
        .map((u) => ({ value: u._id, label: u.name }));
      setFollowingUserNames(followingUserNames);
    }
  }, [user, users]);

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      marginRight: 10, // added margin
    }),
    menu: (provided, state) => ({
      ...provided,
      marginTop: "8px", // added margin top
      borderRadius: "6px",
      boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
    }),
    control: (provided, state) => ({
      ...provided,
      border: "1px solid #E5E5E5",
      borderRadius: "6px",
      boxShadow: "none",
      "&:hover": {
        border: "1px solid #E5E5E5",
      },
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: "#B5B5B5",
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null, // Change rotation based on menuIsOpen
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: "none",
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: "#B5B5B5",
      fontWeight: "normal",
      fontSize: "0.9em",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      fontWeight: "normal",
      fontSize: "0.9em",
    }),
  };

  const handleMenuOpen = () => {
    setMenuIsOpen(true);
  };

  const handleMenuClose = () => {
    setMenuIsOpen(false);
  };

  const handleSave = (combinedObject) => {
    console.log(combinedObject);
    onSave(combinedObject); // call the onSave function from AddNewEvent
  };

  return (
    <div>
      <Select
        className="select-container"
        options={followingUserNames}
        onChange={(selectedOption) =>
          handleSelectChange(selectedOption, users, setSelectedUser)
        }
        styles={customStyles}
        menuPlacement={menuIsOpen ? "bottom" : "top"} // Change menuPlacement based on menuIsOpen
        onMenuOpen={handleMenuOpen} // Add event handler for when menu is opened
        onMenuClose={handleMenuClose}
      />
      {selectedUser && (
        <>
          <div style={{ marginTop: "10px" }}>
            <label>Location: </label>
            <CustomSelect
              selectedUser={selectedUser}
              onSave={handleSave}
              userData={userData}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UserFollowing;
