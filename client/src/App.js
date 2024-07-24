import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AccessCodeLogin from "./pages/auth/AccessCodeLogin";
import Forgot from "./pages/auth/Forgot";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Reset from "./pages/auth/Reset";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChangePassword from "./pages/changePassword/ChangePassword";
import UserList from "./pages/userList/UserList";
import {
  getLoginStatus,
  getUser,
  selectIsLoggedIn,
  selectUser,
} from "./redux-app/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import EditProfile from "./pages/profile/EditProfile";
import { Messenger } from "./pages/messenger/Messenger";
import ViewProfile from "./pages/profile/ViewProfile";
import ScheduledEvent from "./pages/Scheduling/ScheduledEvent/ScheduledEvent";
import NewEvent from "./pages/newEvent/NewEvent";
import OtherUsersEvent from "./pages/newEvent/OtherUsers/OtherUsersEvent";
import AddNewEvent from "./pages/newEvent/Add New Event/AddNewEvent";

import CompleteSchedule from "./pages/newEvent/Add New Event/ContinueSchedule/CompleteSchedule";

import FetchEvents from "./pages/Scheduling/eventType/FetchEvents";
import AllEventFetch from "./pages/Scheduling/eventType/AllEventFetch";
import EventOptions from "./pages/scheduleorReminder/EventOptions";
import NewEventMultipleUsers from "./pages/newEvent/Add Multiple Users/NewEventMultipleUsers";
import SingleReminder from "./pages/newEvent/Reminder/SingleReminder";
import RecurringReminder from "./pages/newEvent/RecurringReminder/RecurringReminder";
import TestCalendar from "./pages/userList/TestCalendar";
import EventSettings from "./pages/eventSetting/EventSettings";
import TimezoneSelector from "./pages/eventSetting/TimezoneSelector";
import CountrySelect from "./pages/eventSetting/CountrySelect";
import CircleOptions from "./pages/Scheduling/eventType/CircleOptions";
import AwaitingApprovalEventCard from "./pages/Scheduling/eventType/Awaiting/AwaitingApprovalEventCard";
import Testcomp from "./pages/Scheduling/eventType/Awaiting/userStats/AllEventProp";
import AwaitFetchEvent from "./pages/Scheduling/eventType/Awaiting/Fetch/AwaitFetchEvent";
import PageNation from "./components/TImeline/EventSchedule/PageNation";
import AwaitSchedule from "./pages/Scheduling/eventType/Awaiting/AwaitSchedule";
import AwaitScheduleEvent from "./pages/Scheduling/eventType/Awaiting/Fetch/AwaitScheduleEvent";
import Workflow from "./pages/Scheduling/eventType/Workflow/Workflow";
import Page from "../src/redux-app/Page";
import TestPage from "./pages/testpage/TestPage";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getLoginStatus());
    if (isLoggedIn && user === null) {
      dispatch(getUser());
    }
  }, [dispatch, isLoggedIn, user]);

  const [newEvent, setNewEvent] = useState(null);

  useEffect(() => {
    const storedEvent = JSON.parse(localStorage.getItem("newEvent"));
    if (storedEvent) {
      console.log("Setting newEvent from localStorage:", storedEvent);
      setNewEvent(storedEvent);
    }
  }, []);

  const storedEvent = JSON.parse(localStorage.getItem("newEvent"));

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Page pageTitle="Home">
                  <Home />
                </Page>
              </Layout>
            }
          />
          <Route
            path="/profile"
            element={
              <Layout>
                <Page pageTitle="Profile">
                  <Profile />
                </Page>
              </Layout>
            }
          />

          <Route
            path="/testpage"
            element={
              <Layout>
                <Page pageTitle="Profile">
                  <TestPage />
                </Page>
              </Layout>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <Layout>
                <Page pageTitle="Edit Profile">
                  <EditProfile />
                </Page>
              </Layout>
            }
          />

          <Route
            path="/profiles/:_id"
            element={
              <Layout>
                <ViewProfile />
              </Layout>
            }
          />
          <Route
            path="/messenger"
            element={
              <Layout>
                <Page pageTitle="Messenger">
                  <Messenger />
                </Page>
              </Layout>
            }
          />
          <Route
            path="/changePassword"
            element={
              <Layout>
                <Page pageTitle="Change Password">
                  <ChangePassword />
                </Page>
              </Layout>
            }
          />
          <Route
            path="/users"
            element={
              <Layout>
                <Page pageTitle="User Stat">
                  <UserList />
                </Page>
              </Layout>
            }
          />

          <Route
            path="/timeline"
            element={
              <Layout>
                <Page pageTitle="Timeline">
                  <FetchEvents />
                </Page>
              </Layout>
            }
          />
          <Route
            path="/calendar/meet"
            element={
              <Layout>
                <AllEventFetch />
              </Layout>
            }
          />
          <Route
            path="/scheduled"
            element={
              <Layout>
                <Page pageTitle="Schedule">
                  <AwaitScheduleEvent />
                </Page>
              </Layout>
            }
          />

          <Route
            path="/newevent"
            element={
              <Layout>
                <NewEvent />
              </Layout>
            }
          />

          <Route
            path="/addnewevent"
            element={
              <Layout>
                <Page pageTitle="Create New Event">
                  <AddNewEvent setNewEvent={setNewEvent} />
                </Page>
              </Layout>
            }
          />

          <Route
            path="/addneweventmultipleinvitees"
            element={
              <Layout>
                <Page pageTitle="Create New Event">
                  <NewEventMultipleUsers setNewEvent={setNewEvent} />
                </Page>
              </Layout>
            }
          />

          <Route
            path="/completeSchedule"
            element={
              storedEvent ? (
                <Layout>
                  <Page pageTitle="Create New Event">
                    <CompleteSchedule newEvent={storedEvent} />
                  </Page>
                </Layout>
              ) : (
                <Navigate to="/addnewevent" />
              )
            }
          />

          <Route
            path="/reminder"
            element={
              <Layout>
                <Page pageTitle="Create New Event">
                  <SingleReminder />
                </Page>
              </Layout>
            }
          />

          <Route
            path="/otherusersevent"
            element={
              <Layout>
                <OtherUsersEvent />
              </Layout>
            }
          />

          <Route
            path="/createeventype"
            element={
              <Layout>
                <Page pageTitle="New Event Type">
                  <EventOptions />
                </Page>
              </Layout>
            }
          />

          <Route
            path="/recurringreminder"
            element={
              <Layout>
                <Page pageTitle="Create New Event">
                  <RecurringReminder />
                </Page>
              </Layout>
            }
          />

          <Route
            path="/await"
            element={
              <Layout>
                <Page pageTitle="Events Stats">
                  <AwaitFetchEvent />
                </Page>
              </Layout>
            }
          />

          <Route
            path="/flow"
            element={
              <Layout>
                <Page pageTitle="Work Flow">
                  <Workflow />
                </Page>
              </Layout>
            }
          />

          <Route
            path="/eventsetting"
            element={
              <Layout>
                <EventSettings />
              </Layout>
            }
          />

          <Route
            path="/follow"
            element={
              <Layout>
                <AwaitFetchEvent />
              </Layout>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/resetPassword/:resetToken" element={<Reset />} />
          <Route path="/accessCodeLogin/:email" element={<AccessCodeLogin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
