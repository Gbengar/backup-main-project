import React, { useEffect, useState } from "react";
import "./style.scss";
import Back from "../../../components/Buttons/Back/Back";
import Share from "../../../components/Buttons/Share/Share";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DropdownButton from "../../../components/TImeline/createButton/DropdownButton";
import ReactQuill from "react-quill";
import MultipleUserFollowing from "./MultipleUserFollowing";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline"],
    [{ list: "bullet" }, { list: "ordered" }],
    ["link"],
  ],
  history: {
    delay: 2000,
    maxStack: 500,
    userOnly: true,
  },
};

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/users/`;

const NewEventMultipleUsers = ({}) => {
  const { user, isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();

  return (
    <div>
      <div className="tophead">
        <Back />
        <div className="title-container">
          <h3>One host and Multiple invitees Event Type</h3>
        </div>
        <Share />
      </div>
      <div className="settings">
        <DropdownButton />
      </div>
      <div className="container">
        <div className="form-section">
          <form action="">
            <div className="section-header">
              <div>
                <h5>What Event is this?</h5>
                <span>What Location</span>
              </div>
              <div className="--flex-end">
                <div className="buttinnext">
                  <button>Cancel</button>
                </div>
                <div className="buttin">
                  <button type="submit">Next</button>
                </div>
              </div>
            </div>
            <div className="margin-from-top">
              <div className="form-group">
                <label>Event Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="eventName"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="margin-from-top">
              <div className="form-group">
                <label>Select Invitees</label>
                <MultipleUserFollowing className="newText" />
              </div>
            </div>
            <div className="form-group">
              <label>Description/ Instructions</label>
              <ReactQuill
                className="select-container"
                name="meetingDescription"
                modules={modules}
                placeholder="Write a summary and any details your invitee should know about the event"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewEventMultipleUsers;
