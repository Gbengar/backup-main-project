import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Loader from "../../../components/loader/Loader";

const localizer = momentLocalizer(moment);

const SetEventRange = ({ events }) => {
  if (!events || events.length === 0) {
    return <div>No events to display.</div>;
  }

  const eventList = events.map((event) => ({
    title: event.eventName,
    start: moment(event.start).toDate(),
    end: moment(event.end).toDate(),
  }));

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={eventList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default SetEventRange;
