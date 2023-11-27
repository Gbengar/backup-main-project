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
            <ToggleSwitch
              selectionMode={1}
              roundCorner={true}
              option1={"Bill yearly (save up to 20%)"}
              option2={"Bill monthly"}
              selectionColor={"blue"}
            />
          </div>
        </div>
      </div>
      <div className="modal-scontent">
        <EachPricesCard>
          <h3>Standard</h3>
          <h4>$10 USD per seat</h4>
          <p>
            Eliminate the back-and-forth between you and your customers with
            automated and personalized scheduling experiences.
          </p>

          <button>Select</button>
        </EachPricesCard>

        <EachPricesCard>
          <h3>Teams</h3>
          <h4>Description for Card 2.</h4>
          <p>
            Collaborate effectively with team members and drive business results
            with smart automations, reporting, and advanced scheduling options.
          </p>
          <button>Select</button>
        </EachPricesCard>

        <EachPricesCard>
          <h3>Enterprise</h3>
          <h4>Description for Card 3.</h4>
          <p>
            Standardize the scheduling experience for your organization and
            access enterprise-level security, admin control, and personalized
            support.
          </p>
          <button>Select</button>
        </EachPricesCard>
      </div>
    </Modal>
  );
};

export default ComparePricesModal;
