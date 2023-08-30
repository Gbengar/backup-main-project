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
import AccepttedProp from "./userStats/AccepttedProp";
import PendingProp from "./userStats/PendingProp";
import RejectedProp from "./userStats/RejectedProp";

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

  const excludedValues = [
    "Public Holiday",
    "Christian",
    "Observance",
    "Season",
    "Local holiday",
  ];

  const [profile, setProfile] = useState(initialState);
  const [showTestcomp, setShowTestcomp] = useState(false);
  const [showApproved, setShowApproved] = useState(false);
  const [showPending, setShowPending] = useState(false);
  const [showRejected, setShowRejected] = useState(false);

  const acceptedEvents = events.filter(
    (event) =>
      event.status === "accept" && !excludedValues.includes(event.value)
  );
  const pendingEvents = events.filter(
    (event) =>
      event.status === "pending" && !excludedValues.includes(event.value)
  );
  const rejectedEvents = events.filter((event) => event.status === "reject");

  const handleIcon1Click = () => {
    // Close the currently open component and show Testcomp component
    setShowTestcomp(!showTestcomp);
    setShowApproved(false);
    setShowPending(false); // Close pending component
    setShowRejected(false); // Close rejected component
  };

  const handleIcon2Click = () => {
    // Close the currently open component and show Approved component
    setShowApproved(!showApproved);
    setShowTestcomp(false);
    setShowPending(false); // Close pending component
    setShowRejected(false); // Close rejected component
  };

  const handleIcon3Click = () => {
    // Close the currently open components and show Pending component
    setShowPending(!showPending);
    setShowApproved(false); // Close approved component
    setShowTestcomp(false);
    setShowRejected(false); // Close rejected component
  };

  const handleIcon4Click = () => {
    // Close the currently open components and show Rejected component
    setShowRejected(!showRejected);
    setShowApproved(false); // Close approved component
    setShowTestcomp(false);
    setShowPending(false); // Close pending component
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
                handleIcon3Click={handleIcon3Click}
                handleIcon4Click={handleIcon4Click}
                events={events}
              />
              {showTestcomp && <AllEventProp events={events} />}
              {showApproved && <AccepttedProp events={acceptedEvents} />}
              {showPending && <PendingProp events={pendingEvents} />}
              {showRejected && <RejectedProp events={rejectedEvents} />}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default AwaitingApprovalEventCard;
