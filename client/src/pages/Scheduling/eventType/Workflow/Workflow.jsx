import React from "react";
import PageMenuTimeline from "../../../../components/TImeline/PageMenuTimeline";
import "./style.scss";
import loginImg from "../../../../assets/images/image.svg";
import useRedirectLoggedOutUser from "../../../../customHook/useRedirectLoggedOutUser";
import { NavLink } from "react-router-dom";

const Workflow = () => {
  useRedirectLoggedOutUser("/login");

  return (
    <section>
      <div className="container">
        <PageMenuTimeline />
        <div className="workflow">
          <p>
            <NavLink>Upgrade your subscription</NavLink> to automate your event
            notifications and reminders with workflows.
          </p>
        </div>
        <div className="halfpage">
          <div className="automate">
            <div className="notep">
              <div>
                <h2>Save time with workflows</h2>
              </div>
              <p>
                Automate all the work you do around events, such as text
                messages when events are booked, email reminders before events,
                and more. You can start with a commonly used workflow or create
                your own.
              </p>
            </div>

            <div className="button-container">
              <button className="big-rounded-button">Upgrade Now</button>
              <button className="plain-text">Learn More</button>
            </div>
          </div>
          <div className="imagejpg">
            <img src={loginImg} alt="Auth" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workflow;
