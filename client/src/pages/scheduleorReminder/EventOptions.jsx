import React from "react";
import Back from "../../components/Buttons/Back/Back";
import Share from "../../components/Buttons/Share/Share";
import "./style.scss";
import Card from "../../components/card/Card";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPeopleArrows,
  faPeopleGroup,
  faPersonCirclePlus,
} from "@fortawesome/free-solid-svg-icons";

const EventOptions = () => {
  return (
    <div className="container">
      <div className="tophead">
        <Back className="--btn:hover" />
        <div className="title-container">
          <h3>Create New Event Type</h3>
        </div>
        <Share />
      </div>
      <div className="carded">
        <Card className="card-content">
          <NavLink to="#" className="nav-link">
            <div className="icondiv">
              <FontAwesomeIcon
                icon={faPeopleArrows}
                bounce
                style={{ color: "#1455d7" }}
                size="3x"
              />
            </div>
            <div className="linknote">
              <h3 className="--fw-thin one-on-one">One-on-One</h3>
              <h4 className="--fw-thin one-on-one">
                <strong>One host</strong> with <strong>one invitee</strong>
              </h4>
              <span className="--fw-thin one-on-one">
                Good for: coffee chat, 1:1 interview. etc
              </span>
            </div>
          </NavLink>
          <NavLink to="#" className="nav-link">
            <div className="icondiv">
              <FontAwesomeIcon
                icon={faPeopleGroup}
                bounce
                style={{ color: "#1455d7" }}
                size="3x"
              />
            </div>
            <div className="linknote">
              <h3 className="--fw-thin one-on-one">Group</h3>
              <h4 className="--fw-thin one-on-one">
                <strong>One host</strong> with{" "}
                <strong>multiple invitees</strong>
              </h4>
              <span className="--fw-thin one-on-one">
                Good for: panel interviews, twitter space. etc
              </span>
            </div>
          </NavLink>
          <NavLink to="#" className="nav-link">
            <div className="icondiv">
              <FontAwesomeIcon
                icon={faPersonCirclePlus}
                bounce
                style={{ color: "#1455d7" }}
                size="3x"
              />
            </div>
            <div className="linknote">
              <h3 className="--fw-thin one-on-one">Reminder</h3>
              <h4 className="--fw-thin one-on-one">
                <strong>Offline</strong> Events
              </h4>
              <span className="--fw-thin one-on-one">
                Good for: birthday reminder, special events. etc
              </span>
            </div>
          </NavLink>
          <NavLink to="#" className="nav-link last-link">
            <div className="icondiv">
              <FontAwesomeIcon
                icon={faPersonCirclePlus}
                bounce
                style={{ color: "#1455d7" }}
                size="3x"
              />
            </div>
            <div className="linknote">
              <h3 className="--fw-thin one-on-one">Recurring reminder</h3>
              <h4 className="--fw-thin one-on-one">
                <strong>Recurring Offline</strong> Events
              </h4>
              <span className="--fw-thin one-on-one">
                Good for: weekly/bi-weekly meetings, Doctor's sessions. etc
              </span>
            </div>
          </NavLink>
        </Card>
      </div>
    </div>
  );
};

export default EventOptions;
