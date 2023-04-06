import React from "react";
import { NavLink } from "react-router-dom";

const OtherUsersPageMenu = () => {
  return (
    <div>
      <nav className="--btn-google --p --mb">
        <ul className="home-links">
          <li>
            <NavLink to="/profiles/:_id">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/otherusersevent">Scheduled Events</NavLink>
          </li>
          <li>
            <NavLink to="/users">Users</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default OtherUsersPageMenu;
