import moment from "moment";
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { rrulestr } from "rrule";
import Loader from "../../components/loader/Loader";

const localizer = momentLocalizer(moment);

const TestEventCal = ({ events, loading }) => {
  const eventList = events.flatMap((event) => {
    if (event.rrule) {
      const { rrule, start, end, ...rest } = event;
      const rruleObject = rrulestr(rrule, {
        dtstart: moment.utc(start).toDate(),
      });
      const recurringDates = rruleObject.all();
      const freq = rruleObject.options.freq;
      const interval = rruleObject.options.interval || 1;

      return recurringDates
        .filter((date, index) => {
          if (freq === "WEEKLY") {
            // Skip next week if the interval is 2
            return index % interval === 0 && index % (interval * 2) !== 1;
          } else if (freq === "MONTHLY") {
            // Skip next two months if the interval is 3
            return index % interval === 0 && index % (interval * 3) !== 2;
          } else {
            return true; // For other frequencies, include all recurring dates
          }
        })
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
