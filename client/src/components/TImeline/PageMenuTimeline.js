import React from "react";
import { NavLink } from "react-router-dom";

const PageMenuTimeline = () => {
  return (
    <div>
      <nav className="--btn-timeline --p --mb">
        <ul className="home-links">
          <li>
            <NavLink to="/timeline">Event Type</NavLink>
          </li>
          <li>
            <NavLink to="/scheduled">Scheduled Events</NavLink>
          </li>
          <li>
            <NavLink to="/flow">Workflow</NavLink>
          </li>
          <li>
            <NavLink to="/flow">Routing Form</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PageMenuTimeline;
