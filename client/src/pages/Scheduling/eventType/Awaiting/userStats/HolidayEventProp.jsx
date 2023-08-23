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

const HolidayEventProp = ({ events }) => {
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

  const currentItems = filteredUsers.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredUsers.length;
    setItemOffset(newOffset);
  };

  const [search, setSearch] = useState("");

  const removeUser = async (id) => {
    await dispatch(deleteUser(id));
    dispatch(getUsers());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete This User",
      message: "Are you sure to do delete this user?",
      buttons: [
        {
          label: "Delete",
          onClick: () => removeUser(id),
        },
        {
          label: "Cancel",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };
  console.log(events);
  return (
    <div className="user-list">
      {isLoading && <Spinner />}
      <div className="table">
        <div className="--flex-between">
          <span>
            <h3>All Users</h3>
          </span>
        </div>
        {!isLoading && users.length === 0 ? (
          <p>No user found...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((user, index) => {
                const { _id, name, email } = user;

                return (
                  <tr key={_id}>
                    <td>{shortenText(name, 8)}</td>
                    <td>{email}</td>

                    <td>
                      <span>
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

export default HolidayEventProp;
