import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";
import DatePicker from "react-datepicker";

const DateRange = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  return (
    <div>
      <div>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          inline
        />
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          inline
        />
      </div>
      <p>No Events Yet</p>
      <span>Share Event Type links to schedule events.</span>
      <button>View Event type</button>
    </div>
  );
};

export default DateRange;
