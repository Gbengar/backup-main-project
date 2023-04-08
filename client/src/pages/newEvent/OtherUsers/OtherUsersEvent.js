import React, { useEffect, useState } from "react";
import axios from "axios";
import MyCalendar from "../MyCalendar";
import { useSelector } from "react-redux";
import OtherUsersPageMenu from "../../../components/pageMenu/OtherUsersPageMenu";
import Card from "../../../components/card/Card";
import { useParams } from "react-router-dom";
import { selectSelectedUserId } from "../../../redux-app/features/auth/authSlice";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/users/`;

const OtherUsersEvent = () => {
  const { user, isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );
  const { _id: viewedUserId } = useParams();

  const selectedUserId = useSelector(selectSelectedUserId);
  const [fetchMeeting, setFetchMeeting] = useState(null);
  const [fetchEvents, setFetchEvents] = useState([]);

  useEffect(() => {
    const getMeetings = async () => {
      if (selectedUserId) {
        try {
          const res = await axios.get(`${API_URL}meeting/` + selectedUserId);
          setFetchMeeting(res.data);
          console.log(res.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getMeetings();
  }, [selectedUserId]);

  useEffect(() => {
    const getAllEvents = async () => {
      if (fetchMeeting) {
        try {
          const events = [];
          for (let meeting of fetchMeeting) {
            const res = await axios.get(`${API_URL}events/` + meeting._id);
            events.push(...res.data); // concatenate events for all meetings
          }
          setFetchEvents(events);
          console.log(events);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getAllEvents();
  }, [fetchMeeting]);

  return (
    <>
      <section>
        <div className="container">
          <OtherUsersPageMenu />
          <Card cardClass={"card"}>
            {fetchEvents.length > 0 && <MyCalendar events={fetchEvents} />}
          </Card>
        </div>
      </section>
    </>
  );
};

export default OtherUsersEvent;
