import React, { useState, useEffect } from "react";
import moment from "moment";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const OtherUsersCalendar = ({ events }) => {
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [currentView, setCurrentView] = useState("dayGridMonth");

  useEffect(() => {
    setCalendarEvents(
      events
        .map((event) => {
          const duration = moment.duration(
            moment(event.end).diff(moment(event.start))
          ); // calculate duration of event
          const days = duration.asDays();
          const eventDates = []; // create an array to store the individual event dates
          for (let i = 0; i <= days; i++) {
            eventDates.push(moment(event.start).add(i, "days").toDate());
          }
          return {
            id: event._id,
            title: event.title,
            start: moment(event.start).toDate(),
            end: moment(event.end).toDate(),
            eventDates: eventDates,
          };
        })
        .flat() // flatten the array of events
    );
  }, [events]);

  const handleDateSelect = (selectInfo) => {
    console.log(selectInfo.start);
    console.log(selectInfo.end);
    console.log(selectInfo.allDay);
  };

  const handleEventClick = (clickInfo) => {
    const eventDates = clickInfo.event.extendedProps.eventDates;
    const selectedStart = moment(eventDates[0]).startOf("week"); // start of selected week
    const selectedEnd = moment(eventDates[eventDates.length - 1]).endOf("week"); // end of selected week
    const selectedEvents = calendarEvents.filter(
      (event) =>
        event.eventDates.some((date) =>
          moment(date).isBetween(selectedStart, selectedEnd, null, "[]")
        ) // filter events within selected week
    );

    console.log(selectedEvents);
    // display selected events in a modal or some other container
  };

  const handleViewChange = (viewInfo) => {
    setCurrentView(viewInfo.view.type);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      weekends={true}
      events={calendarEvents}
      dateClick={handleDateSelect}
      eventClick={handleEventClick}
      headerToolbar={{
        start: "prev,next today",
        center: "title",
        end: "dayGridMonth,timeGridWeek,timeGridDay",
        // add the timeGridWeek and timeGridDay buttons to the header toolbar
      }}
      views={{
        dayGridMonth: {
          buttonText: "Month",
        },
        timeGridWeek: {
          buttonText: "Week",
          dayMaxEventRows: 6, // maximum number of events displayed per day
          dayMaxEvents: true, // whether to show a "+X more" indicator for days with too many events
        },
        timeGridDay: {
          buttonText: "Day",
          dayMaxEventRows: 6, // maximum number of events displayed per day
          dayMaxEvents: true, // whether to show a "+X more" indicator for days with too many events
        },
      }}
      viewDidMount={handleViewChange}
    />
  );
};

export default OtherUsersCalendar;
