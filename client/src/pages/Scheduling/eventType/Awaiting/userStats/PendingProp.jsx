import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Search from "../../../../../components/search/Search";
import "./List.scss";
import { confirmAlert } from "react-confirm-alert";
import {
  deleteUser,
  getUsers,
} from "../../../../../redux-app/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_USERS,
  selectUsers,
} from "../../../../../redux-app/features/auth/filterSlice";
import { FaTrashAlt } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { Spinner } from "../../../../../components/loader/Loader";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/users/`;

const PendingProp = ({ events }) => {
  const dispatch = useDispatch();
  const { users, user, isLoading, isLoggedIn, isSuccess, message } =
    useSelector((state) => state.auth);

  const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);
  const navigate = useNavigate(); // Get the navigation function

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = events.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(events.length / itemsPerPage);

  const removeEvent = async (id) => {
    // Implement your event removal logic here
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete This Event",
      message: "Are you sure you want to delete this event?",
      buttons: [
        {
          label: "Delete",
          onClick: () => removeEvent(id),
        },
        {
          label: "Cancel",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };

  const navigateToNewPage = () => {
    // Use the navigate function to navigate to a different page
    navigate("/await"); // Replace "/new-page" with the actual path
  };

  const handleAccept = async (eventId, userId) => {
    try {
      await updateEventUserStatus(eventId, userId, "accept");
      // Perform any necessary UI updates.
      console.log(eventId, userId);
      navigateToNewPage(); // Navigate to a different page on completion
    } catch (error) {
      console.error("Error accepting event:", error);
    }
  };

  const handleReject = async (eventId, userId) => {
    try {
      await updateEventUserStatus(eventId, userId, "reject");
      // Perform any necessary UI updates.
      navigateToNewPage(); // Navigate to a different page on completion
    } catch (error) {
      console.error("Error rejecting event:", error);
    }
  };

  const updateEventUserStatus = async (eventId, userId, status) => {
    try {
      await axios.patch(`${API_URL}/updateUserStatus/${eventId}`, {
        userId,
        status,
      });

      console.log(userId, status, eventId);
    } catch (error) {
      console.error("Error updating event user status:", error);
      throw error;
    }
  };

  const stripHtmlTags = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % events.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="user-list">
      {isLoading && <Spinner />}
      <div className="table">
        <div className="--flex-between">
          <span>
            <h4>All Events</h4>
          </span>
        </div>
        {!isLoading && events.length === 0 ? (
          <p>No event found...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Event Description</th>
                <th>Date of Event</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((event, index) => {
                const {
                  eventName,
                  meetingDescription,
                  _id,
                  start,
                  userStatuses,
                } = event;

                const userStatus = userStatuses.find(
                  (status) => status.userId === user._id
                );

                return (
                  <tr key={_id}>
                    <td>{eventName}</td>
                    <td className="event-description-cell">
                      {stripHtmlTags(meetingDescription)}
                    </td>
                    <td>{start.split("T")[0]}</td>
                    <td>
                      <span>
                        {userStatus && userStatus.status === "pending" && (
                          <>
                            <button
                              className="accept-button"
                              onClick={() => handleAccept(_id, user._id)}
                            >
                              Accept
                            </button>
                            <button
                              className="reject-button"
                              onClick={() => handleReject(_id, user._id)}
                            >
                              Reject
                            </button>
                          </>
                        )}
                        <FaTrashAlt
                          size={18}
                          color="red"
                          onClick={() => confirmDelete(_id)}
                        />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <hr />
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="Prev"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="activePage"
      />
    </div>
  );
};

export default PendingProp;
