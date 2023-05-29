import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Loader from "../../../components/loader/Loader";

const localizer = momentLocalizer(moment);

const SetEventRange = ({ events, loading }) => {
  if (loading) {
    return <Loader />; // Render a loader while events are being fetched
  }

  console.log(events);

  const eventList = events.map((event) => ({
    eventName: event.eventName,
    start: moment(event.start).toDate(),
    end: moment(event.end).toDate(),
  }));

  console.log(eventList);

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
