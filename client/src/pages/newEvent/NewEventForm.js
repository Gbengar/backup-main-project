import React, { useState } from "react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/users/`;

const NewEventForm = ({ onClose, meetingId, onNewEvent }) => {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${API_URL}events`, {
        meetingId,
        title,
        start,
        end,
      });

      onNewEvent(response.data);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <label htmlFor="start">Start Date:</label>
        <input
          type="datetime-local"
          id="start"
          value={start}
          onChange={(event) => setStart(event.target.value)}
        />

        <label htmlFor="end">End Date:</label>
        <input
          type="datetime-local"
          id="end"
          value={end}
          onChange={(event) => setEnd(event.target.value)}
        />

        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default NewEventForm;
