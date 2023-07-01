import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import EachEventCard from "./EachEventCard";
import Timeline from "./Timeline";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/users/`;

const FetchEvents = () => {
  const { user } = useSelector((state) => state.auth);
  const [fetchEvents, setFetchEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const getMeetings = async () => {
        try {
          const res = await axios.get(`${API_URL}meeting/` + user._id);
          const meetingIds = res.data.map((meeting) => meeting._id);

          if (meetingIds.length > 0) {
            const fetchEventPromises = meetingIds.map((meetingId) =>
              axios.get(`${API_URL}events/` + meetingId)
            );

            setLoading(true);

            Promise.all(fetchEventPromises)
              .then((results) => {
                const events = results.map((res) => res.data);
                setFetchEvents(events);
              })
              .catch((error) => {
                console.log(error);
              })
              .finally(() => {
                setLoading(false);
              });
          }
        } catch (error) {
          console.log(error);
        }
      };

      getMeetings();
    }
  }, [user]);
  return <Timeline events={fetchEvents.flat()} loading={loading} />;
};

export default FetchEvents;
