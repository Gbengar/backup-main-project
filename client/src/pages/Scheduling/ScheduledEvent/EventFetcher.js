import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import SetEventRange from "./SetEventRange";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/users/`;

const EventFetcher = ({ startDay, endDay, user }) => {
  const [fetchMeeting, setFetchMeeting] = useState([]);
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
              })
              .catch((error) => {
                console.log(error);
              })
              .finally(() => {
                setLoading(false);
              });
          } else {
            setFetchEvents([]);
            setLoading(false);
          }
        } catch (error) {
          console.log(error);
        }
      };

      getMeetings();
    }
  }, [user, startDay, endDay]);

  return (
    <SetEventRange events={fetchEvents} loading={loading} endDay={endDay} />
  );
};

export default EventFetcher;
