import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import styles from "./Search.module.scss";

const Search = ({ value, onChange }) => {
  return (
    <div>
      <BiSearchAlt size={18} className={styles.icon} />
      <input
        placeholder="Search for friend, post or video"
        className="searchInput"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
