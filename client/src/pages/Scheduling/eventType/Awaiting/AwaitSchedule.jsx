import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import PageMenuTimeline from "../../../../components/TImeline/PageMenuTimeline";
import useRedirectLoggedOutUser from "../../../../customHook/useRedirectLoggedOutUser";
import { RESET, getUser } from "../../../../redux-app/features/auth/authSlice";
import "./../timeline.scss";
import Loader from "../../../../components/loader/Loader";
import PageNation from "../../../../components/TImeline/EventSchedule/PageNation";
import PastEvent from "../../ScheduledEvent/PastEvent";
import PendingEvent from "../../ScheduledEvent/PendingEvent";
import moment from "moment";
import SetEventRange from "../../ScheduledEvent/SetEventRange";

const AwaitSchedule = ({ loading, events }) => {
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
  const [showPending, setShowPending] = useState(false);
  const [showRejected, setShowRejected] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateRangeSelectionInProgress, setDateRangeSelectionInProgress] =
    useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState(null); // Added

  const currentDate = moment();

  const filteredPastEvents = events.filter((event) =>
    moment(event.end).isBefore(currentDate)
  );

  const filteredPendingEvents = events.filter((event) =>
    moment(event.end).isAfter(currentDate)
  );

  const checkvent = events;

  const handleIcon1Click = () => {
    setShowTestcomp(!showTestcomp);
    setShowApproved(false);
    setShowPending(false);
    setShowRejected(false);
  };

  const handleIcon2Click = () => {
    setShowApproved(!showApproved);
    setShowTestcomp(false);
    setShowPending(false);
    setShowRejected(false);
  };

  const handleIcon3Click = () => {
    setShowApproved(false);
    setShowTestcomp(false);
    setShowRejected(false);
    setShowPending(!showPending);
  };

  const handleDateRangeChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
    setSelectedDateRange({ start, end }); // Added
  };

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
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

  const filteredEventsRange = events.filter((event) =>
    startDate && endDate
      ? moment(event.start).isBetween(startDate, endDate)
      : true
  );

  return (
    <div>
      <section>
        <div className="container">
          <PageMenuTimeline />
          {loading ? (
            <Loader />
          ) : (
            <>
              <PageNation
                handleIcon1Click={handleIcon1Click}
                handleIcon2Click={handleIcon2Click}
                handleIcon3Click={handleIcon3Click}
              />
              {showTestcomp && (
                <div className="past-event">
                  <PastEvent events={filteredPastEvents} loading={loading} />
                </div>
              )}
              {showApproved && (
                <div className="pending-event">
                  <PendingEvent
                    events={filteredPendingEvents}
                    loading={loading}
                  />
                </div>
              )}

              {showPending && !dateRangeSelectionInProgress && (
                <div className="date-range-picker">
                  <DatePicker
                    selected={startDate}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(dates) => {
                      const [start, end] = dates;
                      handleDateRangeChange(start, end);
                    }}
                    selectsRange
                    inline
                  />
                  <button onClick={() => setDateRangeSelectionInProgress(true)}>
                    Confirm Date Range
                  </button>
                </div>
              )}

              {showPending && dateRangeSelectionInProgress && (
                <div className="pending-event">
                  <SetEventRange
                    events={filteredEventsRange}
                    loading={loading}
                    selectedDateRange={selectedDateRange} // Pass selectedDateRange
                  />
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default AwaitSchedule;
