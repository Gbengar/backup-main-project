import React from "react";
import Card from "../../../../components/card/Card";
import "./WorkFlowCard.scss";

const WorkFlowCard = ({ title, icon, onClick, content, button }) => {
  return (
    <div className="cardforworkflow" onClick={onClick}>
      <div className="divicon">
        <div>{icon}</div>
      </div>

      <div className="divtit">
        <p>{title}</p>
      </div>
      <div className="div-content">
        <p>{content}</p>
      </div>
      <div className="div-button">
        <button className="big-rounded-button">{button}</button>
      </div>
    </div>
  );
};

export default WorkFlowCard;
