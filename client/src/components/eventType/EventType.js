import React, { useState } from "react";
import { VscSearch } from "react-icons/vsc";

const EventType = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <VscSearch />
      <input
        style={{ border: "none" }}
        type="text"
        value={searchTerm}
        placeholder="Filter"
        onChange={handleChange}
      />
      <p>{searchTerm}</p>
    </div>
  );
};

export default EventType;
