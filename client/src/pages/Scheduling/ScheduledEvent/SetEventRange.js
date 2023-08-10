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
import { rrulestr, RRule } from "rrule"; // Import rrulestr function

const localizer = momentLocalizer(moment);

const SetEventRange = ({ events, loading, endDay }) => {
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

  const eventList = events.flatMap((event) => {
    if (event.rrule) {
      const { rrule, start, end, ...rest } = event;
      const rruleObject = RRule.fromString(rrule);
      rruleObject.options.dtstart = moment.utc(start).toDate();
      rruleObject.options.until = moment.utc(endDay).toDate(); // Set the until value to endDay
      const recurringDates = rruleObject.all();

      return recurringDates.map((date) => {
        const eventStart = moment(date).toDate();
        const eventEnd = moment(date)
          .add(moment(end).diff(moment(start)))
          .toDate();

        return {
          title: event.eventName,
          start: eventStart,
          end: eventEnd,
          ...rest,
        };
      });
    }

    return [
      {
        title: event.eventName,
        start: moment(event.start).toDate(),
        end: moment(event.end).toDate(),
        value: event.value,
        meetingDescription: event.meetingDescription,
        duration: event.duration,
        reminder: event.reminder,
        rrule: event.rrule,
      },
    ];
  });

  const eventStyleGetter = (event, start, end, isSelected) => {
    let backgroundColor = "blue"; // Default background color
    let fontColor = "black"; // Default font
    let borderColor = "red"; // Default border color

    if (isSelected) {
      backgroundColor = "gray"; // Set background color to gray for selected events
    } else {
      // Apply color only to non-agenda views
      if (event.value === "AskInvitee") {
        backgroundColor = "#c1b3b3"; // Set background color to blue for "AskInvitee" events
      } else if (event.value === "SetReminder") {
        backgroundColor = "#ade8af"; // Set background color to red for "SetReminder" events
      } else if (event.value === "SetAddress") {
        backgroundColor = "#d5d2bc"; // Set background color to green for "SetAddress" events
      } else if (event.value === "SetCustom") {
        backgroundColor = "#b0b093"; // Set background color to yellow for "SetCustom" events
      } else if (event.value === "SetRecurring") {
        backgroundColor = "#eed8ee"; // Set background color to yellow for "SetCustom" events
      } else if (event.value === "Public Holiday") {
        backgroundColor = "#CB958E"; // Set background color to yellow for "SetCustom" events
      } else if (event.value === "Christian") {
        backgroundColor = "#240B36"; // Set background color to yellow for "SetCustom" events
      } else if (event.value === "Observance") {
        backgroundColor = "#40798C"; // Set background color to yellow for "SetCustom" events
      } else if (event.value === "Season") {
        backgroundColor = "#48435C"; // Set background color to yellow for "SetCustom" events
      } else if (event.value === "Local holiday") {
        backgroundColor = "#9AC4F8"; // Set background color to yellow for "SetCustom" events
      } else if (event.value === "Clock change/Daylight Saving Time") {
        backgroundColor = "#E36588"; // Set background color to yellow for "SetCustom" events
      }
      fontColor = "white";
    }

    return {
      style: {
        backgroundColor,
        color: fontColor,
        border: `px solid ${borderColor}`, // Add a border around the text
      },
    };
  };

  const CustomToolbar = (toolbar) => {
    const { label } = toolbar;
    return (
      <div className="custom-toolbar">
        <h6>Date Range</h6>
        <span>{label}</span>
      </div>
    );
  };

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
                  <h4>No events from selected dates.</h4>
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
                  toolbar={CustomToolbar}
                  eventPropGetter={eventStyleGetter}
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

export default SetEventRange;
