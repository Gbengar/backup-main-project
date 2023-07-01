import axios from "axios";
import React, { useEffect, useState } from "react";
import PastEvent from "./PastEvent";
import moment from "moment";
import PendingEvent from "./PendingEvent";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/users/`;

const PendingEventFetch = ({ user }) => {
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
                setFetchEvents(events);

                // Filter events based on start and end dates
                const currentDate = moment().startOf("day");
                const filteredEvents = events.flat().filter((event) => {
                  const eventStartDate = moment(event.start).startOf("day");
                  const eventEndDate = moment(event.end).endOf("day");
                  return (
                    eventStartDate.isAfter(currentDate) &&
                    (eventEndDate.isSameOrAfter(currentDate) ||
                      event.end === null)
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

  return <PendingEvent events={fetchEvents} loading={loading} />;
};

export default PendingEventFetch;
