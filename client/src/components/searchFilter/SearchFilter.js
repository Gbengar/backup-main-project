import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, getUser } from "../../redux-app/features/auth/authSlice";
import { FILTER_USERS } from "../../redux-app/features/auth/filterSlice";
import { Link } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";
import styles from "./Search.module.scss";

let MY_LIST = [];

const SearchFilter = () => {
  const { users, isLoading, isLoggedIn, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState({});
  const [filterlist, setFilterlist] = useState(MY_LIST);

  function onKeyUpHandler(e) {
    setSearchTerm(e.target.value.toLowerCase());
  }

  function onSelectItem(e, item) {
    setSelected(item);
    setSearchTerm("");
    clearFilter();
  }
  function clearFilter() {
    document.getElementById("searchFilter").value = "";
  }

  useEffect(() => {
    dispatch(FILTER_USERS({ users }));
  }, [dispatch, users]);

  MY_LIST = users;

  useEffect(() => {
    const filteredList = MY_LIST.filter((item) => {
      let all_str = `${item.id} ${item.name}`.toLowerCase();
      //return all_str.indexOf(search) > -1; // View All When Search Empty
      return all_str.indexOf(searchTerm) > -1 && searchTerm;
    });
    setFilterlist(filteredList);
  }, [searchTerm, MY_LIST]);

  console.log(MY_LIST);

  return (
    <div className={styles.topbarCenter}>
      <div className={styles.searchbar}>
        <input
          type="text"
          id="searchFilter"
          className={styles.searchInput}
          defaultValue={setSearchTerm}
          onKeyUp={onKeyUpHandler}
        />
        <div>
          <h5>
            {selected.id} {selected.title}
          </h5>
        </div>

        <div className="myUL">
          <ul>
            {filterlist.map((item, key) => (
              <li
                key={key}
                value={item.id}
                onClick={(e) => onSelectItem(e, item)}
              >
                <Link to={`/profiles/${item._id}`}>
                  {item.id} {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
