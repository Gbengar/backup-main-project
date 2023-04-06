import React, { useEffect, useState } from "react";
import axios from "axios";
import MyCalendar from "../MyCalendar";
import { useSelector } from "react-redux";
import OtherUsersPageMenu from "../../../components/pageMenu/OtherUsersPageMenu";
import Card from "../../../components/card/Card";
import { useParams } from "react-router-dom";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/users/`;

const OtherUsersEvent = () => {
  const { user, isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );

  const { _id: viewedUserId } = useParams();

  const [fetchMeeting, setFetchMeeting] = useState(null);
  const [fetchEvents, setFetchEvents] = useState(null);

  useEffect(() => {
    const getMeetings = async () => {
      if (user) {
        try {
          const res = await axios.get(`${API_URL}meeting/` + viewedUserId);
          setFetchMeeting(res.data);
          console.log(res.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getMeetings();
  }, [user, viewedUserId]);

  console.log(viewedUserId);

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
            {fetchEvents && <MyCalendar events={fetchEvents.flat()} />}
          </Card>
        </div>
      </section>
    </>
  );
};

export default OtherUsersEvent;
