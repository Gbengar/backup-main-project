import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Upcoming from "../../../pages/Scheduling/ScheduledEvent/subEvent/Upcoming";

const EventMenu = () => {
  const [showUpcoming, setShowUpcoming] = useState(false);

  const handleUpcomingClick = () => {
    setShowUpcoming(true);
  };

  return (
    <div>
      <ul className="home-linkes">
        <li className="space">
          <NavLink onClick={handleUpcomingClick}>Upcoming</NavLink>
        </li>
        <li className="space">
          <NavLink to="/pending">Pending</NavLink>
        </li>
        <li className="space">
          <NavLink to="/past"> Past </NavLink>
        </li>
        <li className="space">
          <NavLink to="/daterange"> Date Range</NavLink>
        </li>
      </ul>

      <br />
      <br />
      <br />
      {showUpcoming && <Upcoming />}
    </div>
  );
};

export default EventMenu;
