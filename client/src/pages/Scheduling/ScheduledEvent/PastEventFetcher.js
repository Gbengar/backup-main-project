import axios from "axios";
import React, { useEffect, useState } from "react";
import PastEvent from "./PastEvent";
import moment from "moment";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/users/`;

const PastEventFetcher = ({ user }) => {
  const [fetchMeeting, setFetchMeeting] = useState([]);
  const [fetchEvents, setFetchEvents] = useState([]);
  const [loading, setLoading] = useState(false);

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
          // Filter events based on start and end dates
          const filteredEvents = allEvents.filter((event) => {
            const currentDate = moment().startOf("day");
            const eventEndDate = moment(event.end).endOf("day");
            return eventEndDate.isBefore(currentDate) || event.end === null;
          });

          setFetchEvents(filteredEvents);
          setLoading(false); // Set loading to false when the events are fetched
          console.log(filteredEvents);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getAllEvents();
  }, [fetchMeeting]);

  return <PastEvent events={fetchEvents} loading={loading} />;
};

export default PastEventFetcher;
