import React, { useState } from "react";
import PageMenuTimeline from "../../../../components/TImeline/PageMenuTimeline";
import "./style.scss";
import loginImg from "../../../../assets/images/image.svg";
import useRedirectLoggedOutUser from "../../../../customHook/useRedirectLoggedOutUser";
import { Link, NavLink } from "react-router-dom";
import WorkFlowCard from "./WorkFlowCard";
import FlowCard from "./FlowCard/FlowCard";
import Modal from "react-modal";
import ModalImg from "../../../../assets/images/ModalImage.svg";
import { Icon } from "@iconify/react";
import ComparePricesModal from "./ComingSoon/ComparePricesModal";

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
    width: "550px",
    height: "550px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden", // Add this line to remove overflow
    padding: 0, // Add this line to remove padding
  },
};

const modalImageStyles = {
  marginBottom: "10%", // Adjust this value to set the desired distance from the top
  width: "100%",
};

const Workflow = () => {
  useRedirectLoggedOutUser("/login");

  const closeIcon = (
    <Icon icon="line-md:menu-to-close-transition" width="30" height="30" />
  );
  const icon = (
    <Icon
      icon="emojione-monotone:white-heavy-check-mark"
      width="12"
      height="12"
    />
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isComparePricesModalOpen, setIsComparePricesModalOpen] =
    useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openComparePricesModal = () => {
    setIsModalOpen(false); // Close the existing modal
    setIsComparePricesModalOpen(true); // Open the new modal
  };

  const closeComparePricesModal = () => {
    setIsComparePricesModalOpen(false);
  };

  return (
    <section>
      <div className="container">
        <PageMenuTimeline />
        <div className="workflow">
          <p>
            <NavLink onClick={openModal}>Upgrade your subscription</NavLink> to
            automate your event notifications and reminders with workflows.
          </p>
        </div>
        <div className="halfpage">
          <div className="automate">
            <div className="notep">
              <div>
                <h2>Save time with workflows</h2>
              </div>
              <p>
                Automate all the work you do around events, such as text
                messages when events are booked, email reminders before events,
                and more. You can start with a commonly used workflow or create
                your own.
              </p>
            </div>

            <div className="button-container">
              <button className="big-rounded-button" onClick={openModal}>
                Upgrade Now
              </button>
              <button className="plain-text">Learn More</button>
            </div>
          </div>
          <div className="imagejpg">
            <img src={loginImg} alt="Auth" />
          </div>
        </div>
        <div className="">
          <div className="each-event-card-container">
            <FlowCard />
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={false}
        style={customModalStyles}
      >
        <div>
          <div style={modalImageStyles}>
            <div className="modaljpg">
              <img src={ModalImg} alt="Auth" />
            </div>
            <div>
              <div className="insideMod">
                <h4>UPGRADE TO STANDARD</h4>
                <h3>Automate notifications with workflows and more!</h3>
                <button onClick={closeModal}>{closeIcon}</button>
              </div>
              <div className="paragP">
                <p>
                  {icon} Unlimited one-on-ones, group, and collective event
                  types
                </p>
                <p>{icon} Connect Google Analytics and Meta Pixel</p>
                <p>{icon} Collect payments with Stripe and PayPal</p>
              </div>
              <div className="bottom-div">
                <button
                  className="big-rounded2"
                  onClick={openComparePricesModal}
                >
                  Compare All Prices
                </button>
                <button className="big-rounded">Upgrade to Standard</button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <ComparePricesModal
        isOpen={isComparePricesModalOpen}
        onRequestClose={closeComparePricesModal}
      />
    </section>
  );
};

export default Workflow;
