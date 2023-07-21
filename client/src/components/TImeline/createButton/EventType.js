import React from "react";
import { NavLink } from "react-router-dom";
import { FaPlus, FaCog } from "react-icons/fa";

function EventButton(props) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <NavLink to="/createeventype">
        <button
          style={{
            padding: "10px",
            borderRadius: "20px 0 0 20px",
            border: "none",
          }}
          title="Add new event"
        >
          <FaPlus style={{ fontSize: "1.2rem", cursor: "pointer" }} />
        </button>
      </NavLink>

      <button
        style={{
          padding: "10px",
          borderRadius: "0 20px 20px 0",
          border: "none",
        }}
        onClick={props.handleSettings}
      >
        <span
          style={{
            border: "1px solid black",
            padding: "5px 10px",
            borderRadius: "20px",
          }}
        >
          Settings{" "}
          <NavLink to="/eventsetting">
            <FaCog style={{ fontSize: "1.2rem", marginLeft: "5px" }} />
          </NavLink>
        </span>
      </button>
    </div>
  );
}

export default EventButton;
