import React from "react";
import Card from "../../../../components/card/Card";
import "./WorkFlowCard.scss";

const WorkFlowCard = ({ title, icon, onClick, content, button, disable }) => {
  return (
    <div
      className={`cardforworkflow${disable ? " disabled" : ""}`}
      onClick={onClick}
    >
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
        <button className={`big-rounded-button${disable ? " disabled" : ""}`}>
          {button}
        </button>
      </div>
    </div>
  );
};

export default WorkFlowCard;
