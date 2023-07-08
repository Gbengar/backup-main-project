import React from "react";

const ModalComponent = ({ event, handleInputChange }) => {
  return (
    <div className="modal-content">
      <div className="input-group">
        <label>Event Title</label>
        <input
          type="text"
          name="eventName"
          value={event.eventName}
          onChange={handleInputChange}
        />
      </div>
      {/* Add more input fields or content as needed */}
    </div>
  );
};

export default ModalComponent;
