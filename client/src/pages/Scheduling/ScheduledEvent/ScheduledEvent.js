import React, { useEffect, useState } from "react";
import Card from "../../../components/card/Card";
import Button from "../../../components/TImeline/createButton/CreateButton";
import EventCard from "../../../components/TImeline/eventCard/EventCard";
import PageMenuTimeline from "../../../components/TImeline/PageMenuTimeline";
import Upcoming from "./subEvent/Upcoming";
import "./scheduledevents.scss";
import { NavLink } from "react-router-dom";
import EventMenu from "../../../components/TImeline/EventSchedule/EventMenu";
import { useSelector } from "react-redux";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/users/`;

const ScheduledEvent = () => {
  const { user, isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );

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
          <EventMenu />
        </div>
      </section>
    </>
  );
};

export default ScheduledEvent;
