import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./Calendar.scss"; // Import the custom CSS file

const Past = () => {
  const events = []; // Replace with your events data

  return (
    <div style={{ position: "relative" }}>
      <div style={{ maxWidth: "250px", margin: "0 auto" }}>
        {events.length === 0 ? (
          <div className="overlay">
            <p>No Pending Event</p>
          </div>
        ) : null}
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          contentHeight="260px"
          aspectRatio={0.75}
          events={events}
          eventContent={renderEventContent}
        />
      </div>
    </div>
  );
};

// Custom event rendering function
const renderEventContent = (eventInfo) => {
  return (
    <div className="event-content">
      <div className="event-date">{eventInfo.dayNumberText}</div>
    </div>
  );
};

export default Past;
