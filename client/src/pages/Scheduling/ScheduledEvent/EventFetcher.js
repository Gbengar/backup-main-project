import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Loader from "../../../components/loader/Loader";
import SetEventRange from "./SetEventRange";
import { useSelector } from "react-redux";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/users/`;

const EventFetcher = ({ startDay, endDay, user }) => {
  const [fetchMeeting, setFetchMeeting] = useState([]);
  const [fetchEvents, setFetchEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMeetings = async () => {
      if (user) {
        try {
          const res = await axios.get(`${API_URL}meeting/` + user._id);
          setFetchMeeting(res.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getMeetings();
  }, [user]);

  useEffect(() => {
    const getAllEvents = async () => {
      setLoading(true);

      if (fetchMeeting) {
        try {
          const events = [];
          for (let meeting of fetchMeeting) {
            const res = await axios.get(`${API_URL}events/` + meeting._id);
            events.push(res.data);
          }

          const allEvents = events.flat();

          const filteredEvents = allEvents.filter((event) => {
            const eventStartDate = moment(event.start).startOf("day");
            const eventEndDate = moment(event.end).endOf("day");
            return (
              eventStartDate.isBetween(startDay, endDay, null, "[]") &&
              eventEndDate.isBetween(startDay, endDay, null, "[]")
            );
          });

          setFetchEvents(filteredEvents);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getAllEvents();
  }, [fetchMeeting, startDay, endDay]);

  if (loading) {
    return <Loader />;
  }

  return <SetEventRange events={fetchEvents} />;
};

export default EventFetcher;