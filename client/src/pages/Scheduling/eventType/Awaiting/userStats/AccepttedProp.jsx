import React, { useEffect, useState } from "react";
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
import { shortenText } from "../../../../profile/EditProfile";
import ReactPaginate from "react-paginate";
import { Spinner } from "../../../../../components/loader/Loader";
import { FcApprove } from "react-icons/fc";

const AccepttedProp = ({ events }) => {
  const dispatch = useDispatch();
  const { users, isLoading, isLoggedIn, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  console.log(events); // You can access the events prop here

  const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    dispatch(FILTER_USERS({ users, search }));
  }, [dispatch, users]);

  const filteredUsers = useSelector(selectUsers);

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = events.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(events.length / itemsPerPage);

  // Invoke when user clicks to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % events.length;
    setItemOffset(newOffset);
  };

  const [search, setSearch] = useState("");

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
                const { eventName, meetingDescription, _id, start } = event;

                return (
                  <tr key={_id}>
                    <td>{eventName}</td>
                    <td>{stripHtmlTags(meetingDescription)}</td>
                    <td>{start.split("T")[0]}</td>

                    <td>
                      <span>
                        <FaTrashAlt
                          size={18}
                          color="red"
                          onClick={() => confirmDelete(_id)}
                        />
                      </span>
                      <span>
                        <FcApprove
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

export default AccepttedProp;
