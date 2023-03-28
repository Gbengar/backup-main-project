import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const NewEvent = () => {
  const localizer = momentLocalizer(moment);

  const events = [
    {
      title: "Meeting",
      start: new Date(2023, 2, 28, 10, 30),
      end: new Date(2023, 2, 28, 12, 0),
    },
    // ...
  ];

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={["month", "week", "day"]}
      />
    </div>
  );
};

export default NewEvent;
