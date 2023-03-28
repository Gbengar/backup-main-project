import React from "react";
import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";

const Upcoming = () => {
  return (
    <div>
      <div>
        <CalendarMonthTwoToneIcon size={1000} />
      </div>
      <p>No Events Yet</p>
      <span>Share Event Type links to schedule events.</span>
      <button>View Event type</button>
    </div>
  );
};

export default Upcoming;
