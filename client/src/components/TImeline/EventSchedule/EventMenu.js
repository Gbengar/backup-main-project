// EventMenu.js
import React, { useState } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { NavLink } from "react-router-dom";
import SetEvent from "../../../pages/Scheduling/ScheduledEvent/SetEvent";
import "./EventMenu.scss";
import SetCalendar from "../../../pages/Scheduling/ScheduledEvent/SetCalender";
import SetEventRange from "../../../pages/Scheduling/ScheduledEvent/SetEventRange";
import EventFetcher from "../../../pages/Scheduling/ScheduledEvent/EventFetcher";
import { useSelector } from "react-redux";

const EventMenu = () => {
  const { user } = useSelector((state) => state.auth);

  const [activeComponent, setActiveComponent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleClick = (componentName) => {
    if (activeComponent === componentName) {
      closeModal();
      setActiveComponent(null);
    } else {
      setActiveComponent(componentName);
    }
  };

  const openModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleApply = () => {
    closeModal();
    handleClick("datePicker");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <ul className="home-linkes">
        <NavLink className="space">
          <button onClick={() => handleClick("past")}>Past</button>
        </NavLink>
        <NavLink className="space">
          <button onClick={() => handleClick("upcoming")}>Upcoming</button>
        </NavLink>

        <div className="dropdown">
          <div className="space">
            <NavLink>
              <button className="dropdown-toggle" onClick={openModal}>
                Date Range
              </button>
            </NavLink>
          </div>
          {isModalOpen && (
            <div className="dropdown-content">
              <div className="date-picker-wrapper">
                <DatePicker
                  selected={startDate}
                  onChange={handleStartDateChange}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  dateFormat="YYYY-MM-DD"
                  inline
                />
                <DatePicker
                  selected={endDate}
                  onChange={handleEndDateChange}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  dateFormat="YYYY-MM-DD"
                  inline
                />
              </div>
              <button onClick={handleApply}>Apply</button>
            </div>
          )}
        </div>
      </ul>

      <br />
      <br />
      <br />

      {activeComponent === "past" && <SetEvent display="past" />}
      {activeComponent === "upcoming" && <SetEvent display="upcoming" />}
      {activeComponent === "datePicker" && (
        <EventFetcher user={user} startDate={startDate} endDate={endDate} />
      )}
    </div>
  );
};

export default EventMenu;
