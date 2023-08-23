import Testcomp from "../userStats/AllEventProp";
import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import AwaitingApprovalEventCard from "../AwaitingApprovalEventCard";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/users/`;

const AwaitFetchEvent = () => {
  const { user } = useSelector((state) => state.auth);

  const [fetchEvents, setFetchEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          setLoading(true);

          const res = await axios.get(`${API_URL}meeting/` + user._id);
          const meetings = res.data;

          const events = [];

          for (let meeting of meetings) {
            const eventRes = await axios.get(`${API_URL}events/` + meeting._id);
            events.push(eventRes.data);
          }

          setFetchEvents(events.flat());
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [user]);

  return <AwaitingApprovalEventCard events={fetchEvents} loading={loading} />;
};

export default AwaitFetchEvent;
