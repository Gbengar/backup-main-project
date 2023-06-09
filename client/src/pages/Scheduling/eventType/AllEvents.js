import moment from "moment";
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const AllEvents = ({ events }) => {
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
      <Calendar
        localizer={localizer}
        events={eventList}
        startAccessor="start"
        endAccessor="end"
        views={["month", "week", "day"]}
        style={{ height: "300px" }}
      />
    </div>
  );
};

export default AllEvents;
