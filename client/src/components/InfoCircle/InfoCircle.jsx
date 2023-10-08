import React from "react";
import "./InfoCircle.scss";

const InfoCircle = ({ bgColor, title, count, icon, onClick, active }) => {
  // Conditionally add the 'active' class if the 'active' prop is true
  const infoCircleClasses = `info-oval ${bgColor} ${active ? "active" : ""}`;

  return (
    <button className={infoCircleClasses} onClick={onClick}>
      <span className="info-icon --color-white">{icon}</span>
      <span className="info-text ">
        <p>{title}</p> <h4>{count}</h4>
      </span>
    </button>
  );
};

export default InfoCircle;
