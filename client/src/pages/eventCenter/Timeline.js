import React, { useEffect, useLayoutEffect, useState } from "react";
import { FaCog } from "react-icons/fa";
import SettingsIcon from "@mui/icons-material/Settings";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Card from "../../components/card/Card";
import EventType from "../../components/eventType/EventType";
import Button from "../../components/TImeline/createButton/CreateButton";
import EventButton from "../../components/TImeline/createButton/EventType";
import PageMenuTimeline from "../../components/TImeline/PageMenuTimeline";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { getUser } from "../../redux-app/features/auth/authSlice";
import "./timeline.scss";
import SettingsButton, {
  DropdownButton,
} from "../../components/TImeline/createButton/SettingsButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

const Timeline = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const { isLoading, isLoggedIn, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );

  const initialState = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    photo: user?.photo || "",
    bio: user?.bio || "",
  };

  const [profile, setProfile] = useState(initialState);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useLayoutEffect(() => {
    if (user) {
      setProfile({
        ...profile,
        name: user.name,
        email: user.email,
        phone: user.phone,
        photo: user.photo,
        bio: user.bio,
      });
    }
  }, [user]);

  const handleCheckBoxChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <>
      <div className="button-style">
        <Button buttonText="Create" />
      </div>
      <section>
        <div className=" container">
          <PageMenuTimeline />
        </div>
        <div className="filter">
          <EventType />
        </div>
        <div className="filter-container">
          <div className="filterforname">
            <h4>{profile?.name}</h4>
          </div>
          <div className="event-button-container">
            <EventButton />
          </div>
        </div>
        <div className="filterforname">
          <Card cardClass={"card"}>
            <div className="withincard">
              <div className="parent-container">
                <div className="dropleft">
                  <Checkbox
                    checked={checked}
                    onChange={handleCheckBoxChange}
                    icon={<CheckBoxOutlineBlankIcon />}
                    checkedIcon={<CheckBoxIcon />}
                  />
                </div>
                <div className="dropright">
                  <DropdownButton />
                </div>
              </div>
              <div>
                <h4>30 Minutes Meeting</h4>
                <span>30 Mins One on One</span>
              </div>
              <br />
              <div>
                <span>
                  <Link to="/meeting">View Booking Page</Link>
                </span>
              </div>
              <br />
              <br />
              <br />
              <div>
                <NavLink>
                  <ContentCopyIcon /> Copy link
                </NavLink>
              </div>

              <br />
            </div>
          </Card>
        </div>
      </section>
    </>
  );
};

export default Timeline;
