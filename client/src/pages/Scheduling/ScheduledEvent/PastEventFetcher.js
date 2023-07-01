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

                // Filter events based on start and end dates
                const filteredEvents = events.flat().filter((event) => {
                  const currentDate = moment().startOf("day");
                  const eventEndDate = moment(event.end).endOf("day");
                  return (
                    eventEndDate.isBefore(currentDate) || event.end === null
                  );
                });

                setFetchEvents(filteredEvents);
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

  return <PastEvent events={fetchEvents} loading={loading} />;
};

export default PastEventFetcher;
