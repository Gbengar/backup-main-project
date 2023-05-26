import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import moment from "moment";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Loader from "../../../components/loader/Loader";

const calculateEventDates = (start, end) => {
  const duration = moment.duration(moment(end).diff(moment(start)));
  const days = duration.asDays();
  const eventDates = [];
  for (let i = 0; i <= days; i++) {
    eventDates.push(moment(start).add(i, "days").toDate());
  }
  return eventDates;
};

const SetCalendar = ({ events, activeComponent, startDate, endDate }) => {
  const [pastEvents, setPastEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [betWeenDates, setBetweenDates] = useState([]);
  const [currentView, setCurrentView] = useState("dayGridMonth");

  console.log(moment(startDate, endDate));
  useEffect(() => {
    const currentDate = moment().startOf("day");

    const filteredPastEvents = events.filter((event) =>
      moment(event.end).isBefore(currentDate)
    );

    const filteredUpcomingEvents = events.filter((event) =>
      moment(event.start).isSameOrAfter(currentDate)
    );

    setPastEvents(filteredPastEvents);
    setUpcomingEvents(filteredUpcomingEvents);
  }, [events, startDate, endDate]);

  console.log(pastEvents);
  console.log(upcomingEvents);
  console.log(betWeenDates);

  const handleDateSelect = (selectInfo) => {
    const selectedStart = moment(selectInfo.start).startOf("day");
    const selectedEnd = moment(selectInfo.end).endOf("day");
  };

  const handleEventClick = (clickInfo) => {
    const eventDates = clickInfo.event.extendedProps.eventDates;
    const selectedStart = moment(eventDates[0]).startOf("week");
    const selectedEnd = moment(eventDates[eventDates.length - 1]).endOf("week");

    const selectedEvents = upcomingEvents.filter((event) =>
      event.eventDates.some((date) =>
        moment(date).isBetween(selectedStart, selectedEnd, null, "[]")
      )
    );

    console.log(selectedEvents);
  };

  const handleViewChange = (viewInfo) => {
    setCurrentView(viewInfo.view.type);
  };

  return (
    <div style={{ position: "relative" }}>
      <div style={{ maxWidth: "400px", margin: "0 auto" }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          selectable={true}
          contentHeight="400px"
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          events={
            activeComponent === "past"
              ? pastEvents
              : activeComponent === "upcoming"
              ? upcomingEvents
              : activeComponent === "datePicker"
              ? betWeenDates
              : []
          }
          select={handleDateSelect}
          headerToolbar={{
            start: "prev,next today",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          views={{
            dayGridMonth: { buttonText: "Month" },
            timeGridWeek: {
              buttonText: "Week",
              dayMaxEventRows: 6,
              dayMaxEvents: true,
            },
            timeGridDay: {
              buttonText: "Day",
              dayMaxEventRows: 6,
              dayMaxEvents: true,
            },
          }}
          viewDidMount={handleViewChange}
        />
      </div>
    </div>
  );
};

export default SetCalendar;
