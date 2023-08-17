import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import Timeline from "./Timeline";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/users/`;

const FetchEvents = () => {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [fetchEvents, setFetchEvents] = useState([]);

  const filteredEvents = useMemo(() => {
    const unwantedValues = [
      "Public Holiday",
      "Christian",
      "Observance",
      "Season",
      "Local holiday",
    ];
    return fetchEvents
      .flat()
      .filter((event) => !unwantedValues.includes(event.value));
  }, [fetchEvents]);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}meeting/` + user._id);
        const fetchMeeting = res.data;

        const eventPromises = fetchMeeting.map(async (meeting) => {
          const eventRes = await axios.get(`${API_URL}events/` + meeting._id);
          return eventRes.data;
        });

        const events = await Promise.all(eventPromises);
        setFetchEvents(events);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  return <Timeline events={filteredEvents} loading={loading} />;
};

export default FetchEvents;
