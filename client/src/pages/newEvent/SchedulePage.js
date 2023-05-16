import { useState } from "react";
import AddNewEvent from "./Add New Event/AddNewEvent";
import CompleteSchedule from "./Add New Event/ContinueSchedule/completeSchedule";

const SchedulePage = () => {
  const [scheduleData, setScheduleData] = useState([]);

  const handleAddNewEvent = (eventData) => {
    setScheduleData([...scheduleData, eventData]);
  };

  return (
    <>
      <AddNewEvent onAddNewEvent={handleAddNewEvent} />
      <CompleteSchedule scheduleData={scheduleData} />
    </>
  );
};

export default SchedulePage;
