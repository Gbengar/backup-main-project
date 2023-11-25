// ComparePricesModal.jsx

import React from "react";
import Modal from "react-modal";
import { Icon } from "@iconify/react";
import "./ComparePricesModal.scss";
import ToggleSwitch from "./Toggle/ToggleSwitch";
import EachPricesCard from "./EachPrices/EachPricesCard";
import { Link, NavLink } from "react-router-dom";

const customModalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "70%", // Set the width as a percentage of the viewport width
    height: "800px", // Set the max height of the modal
    overflowY: "auto", // Enable vertical scrolling
    padding: 0,
    border: "none", // Remove the default border
  },
};

const ComparePricesModal = ({ isOpen, onRequestClose }) => {
  const closeIcon = <Icon icon="ci:close-sm" width="25" height="25" />;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={false}
      style={customModalStyles}
    >
      <div>
        <div className="close-icon-container">
          <button onClick={onRequestClose}>{closeIcon}</button>
        </div>
        <div className="header-content">
          <h4>Choose a plan that fits</h4>
          <div className="toggle-switch-container">
            <ToggleSwitch label="Notifications" />
          </div>
        </div>
      </div>
      <div className="modal-scontent">
        <EachPricesCard>
          <h3>Standard</h3>
          <h4>$10 USD per seat</h4>
        </EachPricesCard>

        <EachPricesCard>
          <h3>Teams</h3>
          <p>Description for Card 2.</p>
        </EachPricesCard>

        <EachPricesCard>
          <h3>Enterprise</h3>
          <p>Description for Card 3.</p>
        </EachPricesCard>
      </div>
    </Modal>
  );
};

export default ComparePricesModal;
