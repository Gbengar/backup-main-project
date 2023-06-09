import React, { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import DropdownButton from "../../../components/TImeline/createButton/DropdownButton";
import Card from "../../../components/card/Card";
import { Link, NavLink } from "react-router-dom";
import Loader from "../../../components/loader/Loader";
import moment from "moment";
import "./timeline.scss";

const EachEventCard = ({ events, loading }) => {
  const [checked, setChecked] = useState({});
  const [showAllEvents, setShowAllEvents] = useState(false);

  const handleCheckBoxChange = (event, id) => {
    setChecked((prevChecked) => ({
      ...prevChecked,
      [id]: event.target.checked,
    }));
  };

  const stripHtmlTags = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const convertDurationToText = (duration) => {
    if (duration < 60) {
      return `${duration} mins`;
    } else {
      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;
      if (minutes === 0) {
        if (hours === 1) {
          return `${hours} hr`;
        } else {
          return `${hours} hrs`;
        }
      } else {
        if (hours === 1) {
          return `${hours} hr ${minutes} min`;
        } else {
          return `${hours} hrs ${minutes} min`;
        }
      }
    }
  };

  const handleShowMore = () => {
    setShowAllEvents(true);
  };

  const visibleEvents = showAllEvents ? events : events.slice(0, 6);

  return (
    <div className="each-event-card-container">
      {visibleEvents.map((event, index) => (
        <Card
          key={event.id}
          cardClass={"card"}
          className="card-container"
          style={{
            marginLeft: index % 3 === 0 ? "0" : "1rem",
            marginTop: index >= 3 ? "1rem" : "0",
          }}
        >
          <div className="withincard">
            <div className="parent-container">
              <div className="dropleft">
                <Checkbox
                  checked={checked[event.id] || false}
                  onChange={(event) => handleCheckBoxChange(event, event.id)}
                  icon={<CheckBoxOutlineBlankIcon />}
                  checkedIcon={<CheckBoxIcon />}
                />
              </div>
              <div className="dropright">
                <DropdownButton />
              </div>
            </div>
            <div>
              <h4
                className="--fw-thin "
                style={{ fontSize: "150%", whiteSpace: "nowrap" }}
              >
                <span>{convertDurationToText(event.duration)},</span> One-on-One
              </h4>
              <span style={{ display: "block", marginTop: "0.9rem" }}>
                {event.eventName}
              </span>
            </div>
            <br />
            <div>
              <span>
                <NavLink to={`/meeting/${event.id}`}>View Booking Page</NavLink>
              </span>
            </div>
            <br />
            <br />
            <br />
            <div>
              <NavLink>
                <ContentCopyIcon /> Copy link
              </NavLink>
            </div>
            <br />
          </div>
        </Card>
      ))}
      {!showAllEvents && events.length > 6 && (
        <div className="show-more-container">
          <button onClick={handleShowMore} className="show-more-button">
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default EachEventCard;
