import React, { useState } from "react";
import Card from "../../../components/card/Card";
import Button from "../../../components/TImeline/createButton/CreateButton";
import EventCard from "../../../components/TImeline/eventCard/EventCard";
import PageMenuTimeline from "../../../components/TImeline/PageMenuTimeline";
import Upcoming from "./subEvent/Upcoming";
import "./scheduledevents.scss";
import { NavLink } from "react-router-dom";
import EventMenu from "../../../components/TImeline/EventSchedule/EventMenu";

const ScheduledEvent = () => {
  const [showUpcoming, setShowUpcoming] = useState(false);

  const handleUpcomingClick = () => {
    setShowUpcoming(true);
  };

  return (
    <>
      <div className="button-style">
        <Button buttonText="Create" />
      </div>
      <section>
        <div className="container">
          <PageMenuTimeline />
          <div className="pageNo">
            <p> Displaying 0 – 0 of 0 Events </p>
          </div>
        </div>

        <div className="container">
          <Card>
            <EventMenu />
          </Card>
        </div>
      </section>
    </>
  );
};

export default ScheduledEvent;
