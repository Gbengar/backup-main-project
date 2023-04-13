import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import React, { useRef, useState } from "react";
import "./AddNewEvent.scss";
import Back from "../../../components/Buttons/Back/Back";
import Share from "../../../components/Buttons/Share/Share";
import { DropdownButton } from "../../../components/TImeline/createButton/SettingsButton";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

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
          <div>
            <div>
              <div>
                <h4>What Event is this?</h4>
                <br />
                <h5>No location given</h5>
              </div>
            </div>
            <div className=" --flex-end --flat-header ">
              <div className="buttinnext">
                <button onClick={onNext}>Next</button>
              </div>
              <div className="buttin">
                <button onClick={onCancel}>Cancel</button>
              </div>
            </div>
          </div>
          <div>
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
                <Select
                  className="select-container"
                  options={options}
                  value={selectValue}
                  onChange={(value) => setSelectValue(value)}
                  placeholder="Select an option"
                />
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewEvent;
