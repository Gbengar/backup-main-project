import React, { useRef, useState } from "react";
import "./AddNewEvent.scss";
import Back from "../../../components/Buttons/Back/Back";
import Share from "../../../components/Buttons/Share/Share";
import { DropdownButton } from "../../../components/TImeline/createButton/SettingsButton";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import CustomSelect from "./CustomSelect";
import UserFollowing from "./UserFollowing";

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

const AddNewEvent = () => {
  const onNext = () => {};
  const onCancel = () => {};

  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [selectValue, setSelectValue] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Input 1:", input1);
    console.log("Input 2:", input2);
    console.log("Selected option:", selectValue);
  };

  return (
    <div>
      <div className="tophead">
        <Back />
        <div className="title-container">
          <h3>Add One-on-One Event Type</h3>
        </div>
        <Share />
      </div>
      <div className="settings">
        <DropdownButton />
      </div>
      <div className="container">
        <div className="form-section">
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
                <button>Next</button>
              </div>
            </div>
          </div>
          <div className="margin-from-top">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Event Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Input 1"
                  value={input1}
                  onChange={(e) => setInput1(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Description/Instructions</label>
                <CustomSelect className="newText" />
              </div>

              <div className="form-group">
                <label>Location</label>

                <ReactQuill
                  className="select-container"
                  value={input2}
                  onChange={setInput2}
                  modules={modules}
                  placeholder="Write a summary and any details your invitee should know about the event"
                />
              </div>
              <div className="form-group">
                <label>Select Invitee</label>
                <UserFollowing
                  className="select-container"
                  placeholder="Select user to schedule meeting with"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewEvent;
