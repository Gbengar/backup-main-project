import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Card from "../../../components/card/Card";
import EventType from "../../../components/eventType/EventType";
import Button from "../../../components/TImeline/createButton/CreateButton";
import EventButton from "../../../components/TImeline/createButton/EventType";
import PageMenuTimeline from "../../../components/TImeline/PageMenuTimeline";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { RESET, getUser } from "../../../redux-app/features/auth/authSlice";
import "./timeline.scss";
import EachEventCard from "./EachEventCard";
import Loader from "../../../components/loader/Loader";
import Fuse from "fuse.js";
import SearchBox from "react-search-box";
import ReactPaginate from "react-paginate";

const Timeline = ({ events, loading }) => {
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
  const [greeting, setGreeting] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(events); // Initialize with all events
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const eventsPerPage = 6;

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

  useEffect(() => {
    const currentHour = new Date().getHours();
    let newGreeting = "";

    if (currentHour >= 5 && currentHour < 12) {
      newGreeting = "Good morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      newGreeting = "Good afternoon";
    } else {
      newGreeting = "Good evening";
    }

    setGreeting(newGreeting);
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      // If the search term is empty, show all events
      setFilteredEvents(events);
    } else {
      // Configure the Fuse.js options
      const options = {
        includeScore: true,
        keys: ["eventName"], // Specify the keys to search in your event object
      };

      // Create a new Fuse instance with the events and options
      const fuse = new Fuse(events, options);

      // Search for events based on the search term
      const searchResults = fuse.search(searchTerm);

      // Map the search results to get only the event objects
      const filteredResults = searchResults.map((result) => result.item);

      // Update the filtered events state
      setFilteredEvents(filteredResults);
    }
  }, [searchTerm, events]);

  const handleChange = (value) => {
    setSearchTerm(value);
  };

  const pageCount = Math.ceil(filteredEvents.length / eventsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const startIndex = currentPage * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const displayedEvents = filteredEvents.slice(startIndex, endIndex);

  return (
    <div>
      <div className="button-style">
        <Button buttonText="Create" />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <section>
          <div className="container">
            <PageMenuTimeline />
          </div>
          <div className="filter">
            <div className="filter-container">
              <div className="filterforname">
                <h4 className="--color-success --fw-thin">
                  {greeting}, {profile?.name}
                </h4>
              </div>
              <div className="event-button-container">
                <EventButton />
              </div>
            </div>
            <div className="search-container">
              <SearchBox
                onChange={handleChange}
                value={searchTerm}
                placeholder="Search events"
                inputBoxHeight="10px"
              />
            </div>
          </div>
          <div>
            <div className="filterforname">
              <EachEventCard events={displayedEvents} loading={loading} />
            </div>
          </div>
          <div className="pagination-container">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={1}
              pageRangeDisplayed={3}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </div>
        </section>
      )}
    </div>
  );
};

export default Timeline;
