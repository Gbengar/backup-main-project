import React, { useEffect, useState } from "react";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";

import axios from "axios";
import { useSelector } from "react-redux";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "react-modal";
import moment from "moment";

import Loader from "../../../components/loader/Loader";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/users/`;

const SetEventRange = ({ startDate, endDate }) => {
  const locales = {
    "en-US": enUS,
  };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  const { user } = useSelector((state) => state.auth);
  const [fetchMeeting, setFetchMeeting] = useState(null);
  const [fetchEvents, setFetchEvents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getMeetings = async () => {
      if (user) {
        try {
          const res = await axios.get(`${API_URL}meeting/` + user._id);
          setFetchMeeting(res.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getMeetings();
  }, [user]);

  useEffect(() => {
    const getAllEvents = async () => {
      if (fetchMeeting) {
        try {
          const events = [];
          for (let meeting of fetchMeeting) {
            const res = await axios.get(`${API_URL}events/` + meeting._id);
            events.push(res.data);
          }
          const flattenedEvents = events.flat();
          const filteredEvents = flattenedEvents.filter((event) => {
            const eventDate = moment(event.start).format("YYYY-MM-DD");
            return (
              moment(eventDate).isSameOrAfter(startDate, "day") &&
              moment(eventDate).isSameOrBefore(endDate, "day")
            );
          });
          const sortedEvents = filteredEvents.sort((a, b) =>
            moment(a.start).diff(moment(b.start))
          );
          setFetchEvents(sortedEvents);
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      }
    };
    getAllEvents();
  }, [fetchMeeting, startDate, endDate]);

  useEffect(() => {
    // Handle props change here if needed
    // Refactor the code to use memoization or move to getDerivedStateFromProps
  }, [startDate, endDate]);

  const calendarEvents = fetchEvents
    ? fetchEvents.map((event) => ({
        title: event.eventName,
        start: moment(event.start).toDate(),
        end: moment(event.end).toDate(),
        value: event.value,
        meetingDescription: event.meetingDescription,
      }))
    : [];

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const eventStartTime = moment(selectedEvent?.start).format("HH:mm");
  const eventEndTime = moment(selectedEvent?.end).format("HH:mm");

  const noEventsMessage = !fetchEvents && !loading && (
    <div className="no-events-message">No events from the selected date</div>
  );

  const disabledDates = !fetchEvents
    ? []
    : (date) => {
        const currentDate = moment(date).format("YYYY-MM-DD");
        return (
          moment(currentDate).isBefore(startDate, "day") ||
          moment(currentDate).isAfter(endDate, "day")
        );
      };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {noEventsMessage}
          <div style={{ position: "relative" }}>
            <div style={{ maxWidth: "400px", margin: "0 auto" }}>
              <Calendar
                selectable={true}
                popup={true}
                views={["month", "week", "day", "agenda"]}
                localizer={localizer}
                events={calendarEvents}
                startAccessor={(event) => moment(event.start).toDate()}
                endAccessor={(event) => moment(event.end).toDate()}
                titleAccessor="title"
                defaultView="month"
                style={{ height: "400px" }}
                messages={{
                  previous: "prev",
                  next: "next",
                  today: "today",
                  month: "Month",
                  week: "Week",
                  day: "Day",
                  agenda: "Agenda",
                }}
                components={{
                  agenda: {
                    event: ({ event }) => {
                      const tempElement = document.createElement("div");
                      tempElement.innerHTML = event.meetingDescription;
                      const meetingDescriptionText =
                        tempElement.textContent || tempElement.innerText;

                      return (
                        <div>
                          <p style={{ fontSize: "16px", fontWeight: "bold" }}>
                            {event.title}
                          </p>
                          <p style={{ fontSize: "14px" }}>
                            <strong>Value:</strong> {event.value}
                          </p>
                          <p style={{ fontSize: "14px" }}>
                            <strong>Meeting Description:</strong>{" "}
                            {meetingDescriptionText}
                          </p>
                        </div>
                      );
                    },
                  },
                }}
                onSelectEvent={handleEventClick}
                min={startDate}
                max={endDate}
                dateCellWrapper={disabledDates}
              />
            </div>
          </div>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Event Details"
          >
            {selectedEvent && (
              <div>
                <h3>{selectedEvent.title}</h3>
                <p>
                  <strong>Start Time:</strong> {eventStartTime}
                </p>
                <p>
                  <strong>End Time:</strong> {eventEndTime}
                </p>
                <p>
                  <strong>Value:</strong> {selectedEvent.value}
                </p>
                <p>
                  <strong>Meeting Description:</strong>{" "}
                  {selectedEvent.meetingDescription}
                </p>
              </div>
            )}
            <button onClick={closeModal}>Close</button>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default SetEventRange;
