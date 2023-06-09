import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { NavLink } from "react-router-dom";
import "./EventMenu.scss";
import EventFetcher from "../../../pages/Scheduling/ScheduledEvent/EventFetcher";
import { useSelector } from "react-redux";
import PendingEventFetch from "../../../pages/Scheduling/ScheduledEvent/PendingEventFetch";
import PastEventFetcher from "../../../pages/Scheduling/ScheduledEvent/PastEventFetcher";

const EventMenu = () => {
  const { user } = useSelector((state) => state.auth);

  const [activeComponent, setActiveComponent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const datePickerRef = useRef(null);

  const handleClick = (componentName) => {
    if (activeComponent === componentName) {
      setActiveComponent(null);
      if (isModalOpen) {
        closeModal();
      }
    } else {
      setActiveComponent(componentName);
    }
  };

  const openModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleApply = () => {
    closeModal();
    setActiveComponent("datePicker");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target) &&
        isModalOpen &&
        !event.target.classList.contains("react-datepicker")
      ) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen]);

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
            <div className="dropdown-content" ref={datePickerRef}>
              <div className="date-picker-wrapper">
                <DatePicker
                  selected={startDate}
                  onChange={handleStartDateChange}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  dateFormat="yyyy-MM-dd"
                  inline
                />
                <DatePicker
                  selected={endDate}
                  onChange={handleEndDateChange}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  dateFormat="yyyy-MM-dd"
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

      {activeComponent === "past" && <PastEventFetcher user={user} />}
      {activeComponent === "upcoming" && <PendingEventFetch user={user} />}
      {activeComponent === "datePicker" && (
        <EventFetcher user={user} startDay={startDate} endDay={endDate} />
      )}
    </div>
  );
};

export default EventMenu;
