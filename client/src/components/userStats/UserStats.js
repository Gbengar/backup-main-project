import React from "react";
import InfoBox from "../infoBox/InfoBox";
import "./UserStats.scss";
import { FaUserFriends } from "react-icons/fa";
import { ImUserCheck, ImUserMinus } from "react-icons/im";
import { BiUserX } from "react-icons/bi";

// Icons

const icon1 = <FaUserFriends size={40} color="#fff" />;
const icon2 = <ImUserCheck size={40} color="#fff" />;
const icon3 = <ImUserMinus size={40} color="#fff" />;
const icon4 = <BiUserX size={40} color="#fff" />;

const UserStats = () => {
  return (
    <div className="user-summary">
      <h3 className="--mt">User Stats</h3>
      <div className="info-summary">
        <InfoBox icon={icon1} title={"All Users"} count={"3"} bgColor="card1" />
        <InfoBox
          icon={icon2}
          title={"Mutual Following"}
          count={"3"}
          bgColor="card2"
        />
        <InfoBox
          icon={icon3}
          title={"Pending Requests"}
          count={"3"}
          bgColor="card3"
        />
        <InfoBox
          icon={icon4}
          title={"Rejected Request"}
          count={"3"}
          bgColor="card4"
        />
      </div>
    </div>
  );
};

export default UserStats;
