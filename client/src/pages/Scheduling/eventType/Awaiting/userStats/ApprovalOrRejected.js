import React from "react";
import InfoBox from "../../../../../components/infoBox/InfoBox";
import "./UserStats.scss";
import { FaUserFriends } from "react-icons/fa";
import { ImUserCheck, ImUserMinus } from "react-icons/im";
import { BiUserX } from "react-icons/bi";

// Icons
const icon1 = <FaUserFriends size={20} color="#fff" />;
const icon2 = <ImUserCheck size={20} color="#fff" />;
const icon3 = <ImUserMinus size={20} color="#fff" />;
const icon4 = <BiUserX size={20} color="#fff" />;

const ApprovalOrRejected = ({ events, handleIcon1Click, handleIcon2Click }) => {
  // Filter events based on status
  const acceptedEvents = events.filter((event) => event.status === "accept");
  const pendingEvents = events.filter((event) => event.status === "pending");
  const rejectedEvents = events.filter((event) => event.status === "reject");

  return (
    <div className="user-summary">
      <h3 className="--mt">Events Stats</h3>
      <div className="info-summary">
        <InfoBox
          icon={icon1}
          title={"All Events"}
          count={events ? events.length : 0}
          bgColor="card1"
          onClick={handleIcon1Click}
        />
        <InfoBox
          icon={icon2}
          title={"Approved Events"}
          count={acceptedEvents.length}
          bgColor="card2"
          onClick={handleIcon2Click}
        />
        <InfoBox
          icon={icon3}
          title={"Pending Events"}
          count={"1"}
          bgColor="card3"
        />
        <InfoBox
          icon={icon4}
          title={"Rejected Events"}
          count={rejectedEvents.length}
          bgColor="card4"
        />
      </div>
    </div>
  );
};

export default ApprovalOrRejected;
