import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import PageMenuTimeline from "../../../../components/TImeline/PageMenuTimeline";
import useRedirectLoggedOutUser from "../../../../customHook/useRedirectLoggedOutUser";
import { RESET, getUser } from "../../../../redux-app/features/auth/authSlice";
import "./../timeline.scss";
import Loader from "../../../../components/loader/Loader";

import ApprovalOrRejected from "./userStats/ApprovalOrRejected";
import UserList from "../../../userList/UserList";
import AllEventProp from "./userStats/AllEventProp";
import HolidayEventProp from "./userStats/HolidayEventProp";

const AwaitingApprovalEventCard = ({ loading, events }) => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const { isLoading, isLoggedIn, message, user } = useSelector(
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
  const [showTestcomp, setShowTestcomp] = useState(false);
  const [showApproved, setShowApproved] = useState(false);

  const handleIcon1Click = () => {
    // Close the currently open component and show Testcomp component
    setShowTestcomp(!showTestcomp);
    setShowApproved(false);
  };

  const handleIcon2Click = () => {
    // Close the currently open component and show Approved component
    setShowApproved(!showApproved);
    setShowTestcomp(false);
  };

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

  console.log(events);
  return (
    <div>
      <section>
        <div className="container">
          <PageMenuTimeline />
          {loading ? (
            <Loader />
          ) : (
            <>
              <ApprovalOrRejected
                handleIcon1Click={handleIcon1Click}
                handleIcon2Click={handleIcon2Click}
                events={events}
              />
              {showTestcomp && <AllEventProp events={events} />}
              {showApproved && <HolidayEventProp events={events} />}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default AwaitingApprovalEventCard;
