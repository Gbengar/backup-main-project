import React from "react";
import Card from "../../../../../../components/card/Card";
import "./style.scss";

const EachPricesCard = ({ children, isHighlighted }) => {
  const cardClass = isHighlighted ? "highlighted-card" : "sacard";
  return (
    <Card cardClass={cardClass}>
      {isHighlighted && <div className="highlighted-border-box "></div>}
      {children}
    </Card>
  );
};

export default EachPricesCard;
