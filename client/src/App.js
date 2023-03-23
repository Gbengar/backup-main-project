import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import { useEffect } from "react";
import EditProfile from "./pages/profile/EditProfile";
import { Messenger } from "./pages/messenger/Messenger";
import ViewProfile from "./pages/profile/ViewProfile";
import Timeline from "./pages/eventCenter/Timeline";

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

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/profile"
            element={
              <Layout>
                <Profile />
              </Layout>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <Layout>
                <EditProfile />
              </Layout>
            }
          />

          <Route
            path="/profile/:_id"
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
                <Messenger />
              </Layout>
            }
          />
          <Route
            path="/changePassword"
            element={
              <Layout>
                <ChangePassword />
              </Layout>
            }
          />
          <Route
            path="/users"
            element={
              <Layout>
                <UserList />
              </Layout>
            }
          />

          <Route
            path="/timeline"
            element={
              <Layout>
                <Timeline />
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
