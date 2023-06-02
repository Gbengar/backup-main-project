import React, { useState, useRef, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Loader from "../../../components/loader/Loader";
import { Modal } from "react-overlays";
import "./scheduledevents.scss";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarXmark } from "@fortawesome/free-solid-svg-icons";
import Box from "@mui/material/Box";

const localizer = momentLocalizer(moment);

const PastEvent = ({ events, loading }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventPosition, setEventPosition] = useState({ top: 0, left: 0 });
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const modalRef = useRef();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoadingComplete(true);
      setShowCalendar(true);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const handleEventClick = (event, e) => {
    setSelectedEvent(event);

    const rect = e.target.getBoundingClientRect();
    setEventPosition({ top: rect.top, left: rect.left });
  };

  const handleModalClose = () => {
    setSelectedEvent(null);
    setEventPosition({ top: 0, left: 0 });
  };

  const handleClickOutsideModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleModalClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideModal);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, []);

  const eventList = events.map((event) => ({
    title: event.eventName,
    start: moment(event.start).toDate(),
    end: moment(event.end).toDate(),
    value: event.value,
    meetingDescription: event.meetingDescription,
    duration: event.duration,
    reminder: event.reminder,
  }));

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div style={{ position: "relative" }}>
          <div style={{ maxWidth: "400px", margin: "0 auto" }}>
            {loadingComplete && eventList.length === 0 ? (
              <div>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <FontAwesomeIcon icon={faCalendarXmark} bounce size="10x" />
                </Box>
                <br />
                <div style={{ textAlign: "center" }}>
                  <h4>You have had no past events yet.</h4>
                </div>
              </div>
            ) : (
              // Show the calendar only if showCalendar state is true
              showCalendar && (
                <Calendar
                  localizer={localizer}
                  events={eventList}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 400 }}
                  onSelectEvent={handleEventClick}
                />
              )
            )}
          </div>

          {selectedEvent && (
            <div ref={modalRef}>
              <Modal
                show={true}
                onHide={handleModalClose}
                style={{
                  position: "absolute",
                  top: eventPosition.top - 20,
                  left: eventPosition.left - 20,
                  transform: "translate(-20%, -20%)",
                  backgroundColor: "#f8f8f8", // Updated background color without transparency
                  padding: "10px",
                  borderRadius: "4px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                  zIndex: 9999,
                }}
                backdrop={true}
                keyboard={true}
              >
                <div className="event-Modal">
                  <h4>Event Name: {selectedEvent.title}</h4>
                  <p>Mode of Meeting: {selectedEvent.value}</p>
                  <p>Description: {selectedEvent.meetingDescription}</p>
                  <p>Duration: {selectedEvent.duration}</p>
                  <p>Reminder: {selectedEvent.reminder}</p>
                </div>
              </Modal>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PastEvent;
