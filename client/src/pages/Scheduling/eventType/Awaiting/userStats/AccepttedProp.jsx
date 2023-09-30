import React, { useState } from "react";
import "./List.scss";
import { confirmAlert } from "react-confirm-alert";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { Spinner } from "../../../../../components/loader/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import EditEventModal from "./Modal/EditEventModal";
import { toast } from "react-toastify";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/users/`;

const AccepttedProp = ({ events }) => {
  const { users, isLoading, isLoggedIn, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  console.log(events); // You can access the events prop here

  const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal with the selected event
  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedEvent(null); // Clear the selected event
    setIsModalOpen(false);
  };

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = events.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(events.length / itemsPerPage);

  // Invoke when the user clicks to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % events.length;
    setItemOffset(newOffset);
  };

  const [search, setSearch] = useState("");

  const removeEvent = async (id, meetingId) => {
    try {
      // Delete the event
      await axios.delete(`${API_URL}/eventdelete/${id}`);

      // Delete the meeting after deleting the event
      await axios.delete(`${API_URL}/meetingdelete/${meetingId}`);

      toast.success("Event deleted successfully");
      closeModal(); // Call the closeModal function to close the modal
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.log(error);
      toast.error("Delete not successful");
    }
  };

  const confirmDelete = (id, meetingId) => {
    confirmAlert({
      title: "Delete This Event",
      message: "Are you sure you want to delete this event?",
      buttons: [
        {
          label: "Delete",
          onClick: () => removeEvent(id, meetingId), // Call removeEvent with the event ID and meeting ID
        },
        {
          label: "Cancel",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };

  const stripHtmlTags = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  return (
    <div className="user-list">
      {isLoading && <Spinner />}
      <div className="table">
        <div className="--flex-between">
          <span>
            <h4>Approved Events</h4>
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
                const { eventName, meetingDescription, _id, start, meetingId } =
                  event;

                return (
                  <tr key={_id}>
                    <td>{eventName}</td>
                    <td>{stripHtmlTags(meetingDescription)}</td>
                    <td>{start.split("T")[0]}</td>

                    <td>
                      <span className="hover-icons" data-text="Delete">
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          beatFade
                          onClick={() => confirmDelete(_id, meetingId)}
                        />
                      </span>{" "}
                      <span className="hover-icons" data-text="Edit">
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          flip
                          style={{ color: "#c11f86" }}
                          onClick={() => openModal(event)}
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

      <EditEventModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        selectedEvent={selectedEvent || {}} // Pass an empty object if selectedEvent is null
      />
    </div>
  );
};

export default AccepttedProp;
