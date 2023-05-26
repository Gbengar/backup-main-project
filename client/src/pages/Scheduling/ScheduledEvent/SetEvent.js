import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import SetCalendar from "./SetCalender";
import { NavLink } from "react-router-dom";
import Loader from "../../../components/loader/Loader"; // Add the Loader import
import moment from "moment";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/users/`;

const SetEvent = ({ activeComponent, display, startDate, endDate }) => {
  const { user } = useSelector((state) => state.auth);
  const [fetchMeeting, setFetchMeeting] = useState(null);
  const [fetchEvents, setFetchEvents] = useState(null);
  const [loading, setLoading] = useState(true); // Add the loading state

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
          setFetchEvents(events);
        } catch (error) {
          console.log(error);
        }
        setLoading(false); // Set loading to false when the events are fetched
      }
    };
    getAllEvents();
  }, [fetchMeeting]);

  return (
    <div>
      {loading ? ( // Display the Loader while loading is true
        <Loader />
      ) : (
        fetchEvents && (
          <SetCalendar events={fetchEvents.flat()} activeComponent={display} />
        )
      )}
    </div>
  );
};

export default SetEvent;
