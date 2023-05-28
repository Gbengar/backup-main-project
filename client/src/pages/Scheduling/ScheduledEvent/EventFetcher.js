import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Loader from "../../../components/loader/Loader";
import SetEventRange from "./SetEventRange";
import { useSelector } from "react-redux";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/users/`;

const EventFetcher = ({ startDate, endDate, user }) => {
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
      if (fetchMeeting) {
        try {
          const events = [];
          for (let meeting of fetchMeeting) {
            const res = await axios.get(`${API_URL}events/` + meeting._id);
            events.push(res.data);
          }

          // Flatten the events array
          const allEvents = events.flat();

          // Filter events based on start date and end date
          const filteredEvents = allEvents.filter((event) => {
            const eventStartDate = moment(event.startDate);
            const eventEndDate = moment(event.endDate);
            return (
              eventStartDate.isBetween(startDate, endDate, null, "[]") &&
              eventEndDate.isBetween(startDate, endDate, null, "[]")
            );
          });

          setFetchEvents(filteredEvents);
          setLoading(false); // Set loading to false when the events are fetched
          console.log(allEvents);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getAllEvents();
  }, [fetchMeeting, startDate, endDate]);

  return <SetEventRange events={fetchEvents} loading={loading} />;
};

export default EventFetcher;
