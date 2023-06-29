import moment from "moment";
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { rrulestr } from "rrule";
import Loader from "../../components/loader/Loader";

const localizer = momentLocalizer(moment);

const TestEventCal = ({ events, loading }) => {
  const eventList = events.flatMap((event) => {
    if (event.value === "SetRecurring" && event.rrule) {
      const { rrule, start, end, ...rest } = event;
      const rruleObject = rrulestr(rrule, {
        dtstart: moment.utc(start).toDate(),
      });
      const recurringDates = rruleObject.all();
      const until = moment.utc(rruleObject.options.until).toDate();
      const interval = rruleObject.options.interval || 1; // Get the interval or default to 1

      return recurringDates
        .filter((date, index) => index % interval === 0) // Include every second date based on the interval
        .filter((date) => date <= until)
        .map((date) => {
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

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Calendar
          localizer={localizer}
          events={eventList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "300px" }}
        />
      )}
    </>
  );
};

export default TestEventCal;
